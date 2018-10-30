# Preparing your data

## What you need
* Data (images, sounds, or text), of up to 10,000 different samples you need  annotated
* You need to have a static server available to you (S3, or GitHub)
* You need to be able to write a JSON file. We will do this in Python, but you can use any language

## Naming your files

* Datasets should be named with alphanumeric characters (A-Z, a-z, 0-9) and underscore (\_)
* Datasets should be stored ideally in a flat structure (e.g. no folders).

## Upload your files to a static server

* If you use Amazon S3, make sure your bucket allows **cross origin requests** and is **publically readable**
  * An example URL to your data would be: `https://s3.amazonaws.com/your_bucket_name/your_filename.extension`
* If you use GitHub, make sure your repo is public.
  * An example URL to your data would be:
 `https://raw.githubusercontent.com/your_username/your_repo_name/master/your_filename.extension`

 ## Create a manifest file
* Lets say your data consists of images, and they were uploaded to S3. They would be located at: `https://s3.amazonaws.com/my_bucket_name/image001.jpg`, `https://s3.amazonaws.com/my_bucket_name/image002.jpg`,
`https://s3.amazonaws.com/my_bucket_name/image003.jpg`,
`https://s3.amazonaws.com/my_bucket_name/image004.jpg`
* you need to create a `.json` file that is a list of strings, where each item is a unique filename.
* the items should NOT have extensions, it should look like:

```javascript
[
  "image001",
  "image002",
  "image003",
  "image004"
]
```

* upload this file (it can be named any way you want) to your static server (github, S3, etc) and note its URL. For example, see https://raw.githubusercontent.com/SwipesForScience/exampleConfig/master/bsHbnManifest.json
