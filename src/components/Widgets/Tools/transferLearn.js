/* TensorflowJS related imports */
import * as tf from '@tensorflow/tfjs';

class ControllerDataset {
  constructor(numClasses) {
    this.numClasses = numClasses;
  }

  /**
   * Adds an example to the controller dataset.
   * @param {Tensor} example A tensor representing the example. It can be an image,
   *     an activation, or any other type of Tensor.
   * @param {number} label The label of the example. Should be a number.
   */
  addExample(example, label) {
    // One-hot encode the label.
    const y = tf.tidy(
        () => tf.oneHot(tf.tensor1d([label]).toInt(), this.numClasses));

    if (this.xs == null) {
      // For the first example that gets added, keep example and y so that the
      // ControllerDataset owns the memory of the inputs. This makes sure that
      // if addExample() is called in a tf.tidy(), these Tensors will not get
      // disposed.
      this.xs = tf.keep(example);
      this.ys = tf.keep(y);
    } else {
      const oldX = this.xs;
      this.xs = tf.keep(oldX.concat(example, 0));

      const oldY = this.ys;
      this.ys = tf.keep(oldY.concat(y, 0));

      oldX.dispose();
      oldY.dispose();
      y.dispose();
    }
  }
}


// Loads mobilenet and returns a model that returns the internal activation
// we'll use as input to our classifier model.
async function loadDecapitatedMobilenet() {
  const mobilenet = await tf.loadModel(
      'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');

  // Return a model that outputs an internal activation.
  const layer = mobilenet.getLayer('conv_pw_13_relu');
  return tf.model({ inputs: mobilenet.inputs, outputs: layer.output });
}

/**
* controller dataset
*/
const controllerDataset = new ControllerDataset(2);

async function init(img) {
  const decapitatedMobilenet = await loadDecapitatedMobilenet();

  // Warm up the model. This uploads weights to the GPU and compiles the WebGL
  // programs so the first time we collect data from the webcam it will be
  // quick.
  tf.tidy(() => decapitatedMobilenet.predict(img));
  return decapitatedMobilenet;
}

/**
 * Crops an image tensor so we get a square image with no white space.
 * @param {Tensor4D} img An input image Tensor to crop.
 */
function cropImage(img) {
  const size = Math.min(img.shape[0], img.shape[1]);
  const centerHeight = img.shape[0] / 2;
  const beginHeight = centerHeight - (size / 2);
  const centerWidth = img.shape[1] / 2;
  const beginWidth = centerWidth - (size / 2);
  return img.slice([beginHeight, beginWidth, 0], [size, size, 3]);
}

/**
 * Captures a frame from the webcam and normalizes it between -1 and 1.
 * Returns a batched image (1-element batch) of shape [1, w, h, c].
 */
function capture(imgElement) {
  return tf.tidy(() => {
    // Reads the image as a Tensor from the webcam <video> element.
    const webcamImage = tf.fromPixels(imgElement);

    // Crop the image so we're using the center square of the rectangular
    // webcam.
    const croppedImage = cropImage(webcamImage);

    // Expand the outer most dimension so we have a batch size of 1.
    const batchedImage = croppedImage.expandDims(0);

    // Normalize the image between -1 and 1. The image comes in between 0-255,
    // so we divide by 127 and subtract 1.
    return batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
  });
}

async function train(decapitatedMobilenet,
  cd, // the controller dataset
  denseUnits,
  learningRate,
  batchSizeFraction,
  epochs) {
  if (cd.xs == null) {
    throw new Error('Add some examples before training!');
  }

  // Creates a 2-layer fully connected model. By creating a separate model,
  // rather than adding layers to the mobilenet model, we "freeze" the weights
  // of the mobilenet model, and only train weights from the new model.
  const model = tf.sequential({
    layers: [
      // Flattens the input to a vector so we can use it in a dense layer. While
      // technically a layer, this only performs a reshape (and has no training
      // parameters).
      tf.layers.flatten({
        inputShape: decapitatedMobilenet.outputs[0].shape.slice(1),
      }),
      // Layer 1.
      tf.layers.dense({
        units: denseUnits,
        activation: 'relu',
        kernelInitializer: 'varianceScaling',
        useBias: true,
      }),
      // Layer 2. The number of units of the last layer should correspond
      // to the number of classes we want to predict.
      tf.layers.dense({
        units: 2,
        kernelInitializer: 'varianceScaling',
        useBias: false,
        activation: 'softmax',
      }),
    ],
  });

  // Creates the optimizers which drives training of the model.
  const optimizer = tf.train.adam(learningRate);
  // We use categoricalCrossentropy which is the loss function we use for
  // categorical classification which measures the error between our predicted
  // probability distribution over classes (probability that an input is of each
  // class), versus the label (100% probability in the true class)>
  model.compile({ optimizer, loss: 'categoricalCrossentropy' });
  console.log('compiled model', cd.xs.shape);
  // We parameterize batch size as a fraction of the entire dataset because the
  // number of examples that are collected depends on how many examples the user
  // collects. This allows us to have a flexible batch size.
  const batchSize =
      Math.floor(cd.xs.shape[0] * batchSizeFraction);
  if (!(batchSize > 0)) {
    throw new Error(
        'Batch size is 0 or NaN. Please choose a non-zero fraction.');
  }

  // Train the model! Model.fit() will shuffle xs & ys so we don't have to.
  model.fit(cd.xs, cd.ys, {
    batchSize,
    epochs,
    callbacks: {
      onBatchEnd: async (batch, logs) => {
        console.log(`Loss: ${logs.loss.toFixed(5)}`);
      },
    },
  });
  return model;
}


async function predict(img, decapitatedMobilenet, model) {
  // ui.isPredicting();
  const predictedClass = tf.tidy(() => {
    // Capture the frame from the webcam.
    // const img = webcam.capture();

    // Make a prediction through mobilenet, getting the internal activation of
    // the mobilenet model, i.e., "embeddings" of the input images.
    const embeddings = decapitatedMobilenet.predict(img);

    // Make a prediction through our newly-trained model using the embeddings
    // from mobilenet as input.
    const predictions = model.predict(embeddings);

    // Returns the index with the maximum probability. This number corresponds
    // to the class the model thinks is the most probable given the input.
    return predictions.as1D().argMax();
  });

  const classId = (await predictedClass.data())[0];
  predictedClass.dispose();

  // ui.predictClass(classId);
  await tf.nextFrame();

  // ui.donePredicting();
  return classId;
}

export { controllerDataset, init, capture, train, predict };
