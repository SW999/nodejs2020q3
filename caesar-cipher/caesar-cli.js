const { program } = require('commander');
const { useCaesarCipher } = require('./caesar-cipher');
const { isOutputPathExists, EncodeDecode } = require('./utils');
const { useStreams } = require('./streams');

program.storeOptionsAsProperties(true);

program
  .option('-s, --shift <shift>', 'a shift for encode and decode')
  .option('-i, --input [input]', 'an input file')
  .option('-o, --output [output]', 'an output file')
  .option('-a, --action <action>', 'an action encode/decode');

program.parse(process.argv);

if (program.output && !isOutputPathExists(program.output)) {
  console.error(`File -- ${program.output} -- doesn't exist.`);
  // eslint-disable-next-line no-process-exit
  process.exit(1);
} else if (program.shift !== undefined && program.action !== undefined) {
  const flag = program.action === 'encode' ? 1 : -1;
  const caesar = new EncodeDecode({
    shift: program.shift,
    flag,
    coder: useCaesarCipher
  });

  useStreams(program.input, program.output, caesar);
}
