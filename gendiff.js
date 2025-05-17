
import { program } from 'commander'
import compareFiles from './bin/compare.js';
import * as formaters from './bin/formaters.js'

const diff = () => {
  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .option('-f, --format <type>', 'output format', 'stylish')
    .argument('<file1>', 'first file')
    .argument('<file2>', 'second file')
    .action((file1, file2) => {
      const options = program.opts();
      const diff = compareFiles((file1), (file2));

      const result = formaters.stylish(diff);
      console.log(result);
  });

  program.parse()
};

export {diff};

// node .\gendiff.js __fixtures__\files\file1.json __fixtures__\files\file2.json         // для powershell
// gendiff __fixtures__/file11.json __fixtures__/file12.json                   // для bash
// gendiff __fixtures__/file12.yaml __fixtures__/file11.yml 