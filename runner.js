// file collector
//setup env
//run test

const fs = require('fs');
const path = require('path');
const chalk = require('chalk')
class Runner {
  //store a reference to every test files we discover
  constructor() {
    this.testFiles = [];

  }
  //----------------
  //after finding files we run the tests
  async runTests() {
    for (let file of this.testFiles) {
      console.log(chalk.gray(`--- ${file.shortName}`));
      const beforeEaches = [];
      global.beforeEach = (fn) => {
        beforeEaches.push(fn)
      };
      global.it = (desc, fn) => {
        // console.log(desc);
        beforeEaches.forEach(func => func());
        //to handle errors ocurred during our test we need to do try and catch to avoid the test to collapse
        try {
          fn();
          console.log(chalk.green(`\tOK - ${desc}`));
        } catch (err) {
          const message = err.message.replace(/\n/g, '\n\t\t');
          console.log(chalk.red(`\tX -  ${desc}`));
          console.log(chalk.red('\t', message));// \t is tab 
        }

      };
      //to skip the typo in stopping test for running
      try {
        require(file.name);//when we require the file inside a func node will find it and execute the file here
      } catch (err) {
        console.log(chalk.red('X - Error Loading File'), file.name);
        console.log(chalk.red(err));
      }

    }
  }

  //---------------
  //has to find all the test files in the directory and put them into this.files
  async collectFiles(targetPath) {
    const files = await fs.promises.readdir(targetPath);

    for (let file of files) {
      const filepath = path.join(targetPath, file);//absolute path

      const stats = await fs.promises.lstat(filepath); // if is path file or folder?

      if (stats.isFile() && file.includes('.test.js')) {
        this.testFiles.push({ name: filepath, shortName: file })
      } else if (stats.isDirectory()) {
        const childFiles = await fs.promises.readdir(filepath);

        files.push(...childFiles.map(f => path.join(file, f)));
      }
    }
  }
}
module.exports = Runner;