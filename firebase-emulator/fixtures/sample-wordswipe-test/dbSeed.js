// run this script to update your emulator database / auth with samples from manifest.json and test users
// the emulator database / auth can later be exported and reused in development
// firebase emulators:start --export-on-exit=./firebase-emulator/fixtures/sample-wordswipe-test/saved-data

const admin = require("firebase-admin");
const _ = require("lodash");
const manifest = require("./sample-wordswipe-test-manifest.json");
process.env.FIREBASE_DATABASE_EMULATOR_HOST = "localhost:9000";

// Set the projectID and databaseURL to your own project id
admin.initializeApp({
  projectId: "wordswipe-test",
  databaseURL: "https://wordswipe-test-default-rtdb.firebaseio.com",
});

var db = admin.database();

function initSamples() {
  console.log("Initializing samples");
  const samplesRef = db.ref("samples");
  const leftSamples = manifest["0"].map(sampleId => ({
    sampleId,
    isRight: false,
  }));
  const rightSamples = manifest["1"].map(sampleId => ({
    sampleId,
    isRight: true,
  }));
  const shuffledSamples = _.shuffle([...leftSamples, ...rightSamples]);

  const promises = shuffledSamples.map(({ sampleId, isRight }) => {
    const sampleRef = samplesRef.child(sampleId);
    return sampleRef.set({
      totalSeenCount: 0,
      averageVote: 0,
      isRight,
    });
  });
  return Promise.all(promises).then(() => {
    console.log("Samples initialized");
  });
}
function initVotes() {
  console.log("Initializing votes");
  const votesRef = db.ref("votes");
  return votesRef.set(0).then(() => {
    console.log("Votes initialized");
  });
}
function initGames() {
  console.log("Initializing games");
  const votesRef = db.ref("games");
  return votesRef.set(0).then(() => {
    console.log("Games initialized");
  });
}
function initUsers() {
  console.log("Initializing users");
  const usersRef = db.ref("users");
  return usersRef.set(0).then(() => {
    console.log("Users initialized");
  });
}
function initUserSeenSamples() {
  console.log("Initializing userSeenSamples");
  const usersRef = db.ref("userSeenSamples");
  return usersRef.set(0).then(() => {
    console.log("userSeenSamples initialized");
  });
}

async function initializeDatabase() {
  await initSamples();
  await initVotes();
  await initUsers();
  await initGames();
  await initUserSeenSamples();
  process.exit();
}

initializeDatabase();
