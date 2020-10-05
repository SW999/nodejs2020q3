const fs = require('fs');
// eslint-disable-next-line node/no-unsupported-features/node-builtins
const { Transform } = require('stream');
const util = require('util');

function EncodeDecode(options) {
  this.options = options;
  if (!(this instanceof EncodeDecode)) {
    return new EncodeDecode(options);
  }

  Transform.call(this, options);
}
util.inherits(EncodeDecode, Transform);

// eslint-disable-next-line func-names
EncodeDecode.prototype._transform = function (chunk, enc, cb) {
  const transformed = this.options.coder(
    chunk.toString(),
    this.options.shift * this.options.flag
  );
  this.push(transformed);

  cb();
};

function isOutputPathExists(path) {
  let flag = true;
  try {
    // eslint-disable-next-line no-sync
    fs.accessSync(path, fs.constants.F_OK);
  } catch (e) {
    flag = false;
  }
  return flag;
}

exports.isOutputPathExists = isOutputPathExists;
exports.EncodeDecode = EncodeDecode;
