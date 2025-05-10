
import { program } from 'commander'
import compareFiles from './bin/compare.js';

const diff = () => {
  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .option('-f, --format [type]', 'output format')
    .argument('<file1>', 'first file')
    .argument('<file2>', 'second file')
    .action((file1, file2) => {
      console.log(compareFiles((file1), (file2)));
      //return compareFiles(myParse(file1), myParse(file2));
  });

  program.parse()
};

export {diff};

// node .\gendiff.js src\files\file1.json src\files\file2.json         // для powershell
// gendiff src/files/file1.json src/files/file2.json                   // для bash