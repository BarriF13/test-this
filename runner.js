// file collector
//setup env
//run test
const fs = require('fs')
class Runner {
  //store a reference to every test files we discover
  constructor() {
    this.files = [];
  }
  //has to find all the test files in the directory and put them into this.files
 async collectFiles(targetPath) {
  const files = await fs.promises.readdir(targetPath);
  return files;
  }
}
module.exports = Runner;