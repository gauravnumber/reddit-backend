const crypto = require("crypto")
const { finished } = require('stream');
const { promisify } = require('util');
const finishedAsync = promisify(finished);

module.exports = {
  Mutation: {
    singleUpload: async (parent, { file }) => {
      // console.log('parent', parent)
      // console.log('file', file)
      // console.log('crypto', crypto.randomBytes(20).toString('hex'))
      const { createReadStream, filename, mimetype, encoding } = await file;

      console.log(filename, mimetype, encoding)
      // Invoking the `createReadStream` will return a Readable Stream.
      // See https://nodejs.org/api/stream.html#stream_readable_streams
      const stream = createReadStream();

      // This is purely for demonstration purposes and will overwrite the
      // local-file-output.txt in the current working directory on EACH upload.
      // const out = require('fs').createWriteStream('local-file-output.txt');
      // const out = require('fs').createWriteStream('bar.jpg');
      // const out = require('fs').createWriteStream(`${crypto.randomUUID({ disableEntropyCache: true })}.jpg`);
      // const out = require('fs').createWriteStream(`${(Math.random() + 1).toString(36).substring(2)}.jpg`);
      const out = require('fs').createWriteStream(`${crypto.randomBytes(20).toString('hex')}.jpg`);

      stream.pipe(out);
      // await finished(out);
      await finishedAsync(out);
      // finished(out);

      // return "image saved"
      return { filename, mimetype, encoding };
    },
  }
}