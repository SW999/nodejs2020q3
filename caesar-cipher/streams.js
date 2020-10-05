const fs = require('fs');
const path = require('path');
// eslint-disable-next-line node/no-unsupported-features/node-builtins
const { pipeline } = require('stream');

function useStreams(input, output, transformStream) {
  return pipeline(
    input ? fs.createReadStream(path.resolve(input)) : process.stdin,
    transformStream,
    output
      ? fs.createWriteStream(path.resolve(output), {
          flags: 'a'
        })
      : process.stdout,
    e => {
      if (e && e.syscall === 'open') {
        console.error(`File -- ${e.path} -- doesn't exist.`);
        // eslint-disable-next-line no-process-exit
        process.exit(1);
      }
    }
  );
}

exports.useStreams = useStreams;
