/**
 * Triggered from a change to a Cloud Storage bucket.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */

// HINT
const { Storage } = require("@google-cloud/storage");
const sharp = require("sharp");

exports.helloGCS = async (event, context) => {
  if (event.name.includes("thumb/")) return;
  // if(event.name.includes('thumb/m/')) return
  // if(event.name.includes('thumb/l/')) return

  const storage = new Storage().bucket(event.bucket);

  await Promise.all([
    new Promise((resolve, reject) => {
      storage
        .file(event.name)
        .createReadStream()
        .pipe(sharp().resize({ width: 320 }))
        .pipe(storage.file(`thumb/s/${event.name}`).createWriteStream())
        .on("finish", () => resolve())
        .on("error", () => reject());
    }),

    new Promise((resolve, reject) => {
      storage
        .file(event.name)
        .createReadStream()
        .pipe(sharp().resize({ width: 640 }))
        .pipe(storage.file(`thumb/m/${event.name}`).createWriteStream())
        .on("finish", () => resolve())
        .on("error", () => reject());
    }),

    new Promise((resolve, reject) => {
      storage
        .file(event.name)
        .createReadStream()
        .pipe(sharp().resize({ width: 1280 }))
        .pipe(storage.file(`thumb/l/${event.name}`).createWriteStream())
        .on("finish", () => resolve())
        .on("error", () => reject());
    }),
  ]);
};
