// file collector
//setup env
//run test
const fs = require('fs');
const path = require('path')
class Runner {
  //store a reference to every test files we discover
  constructor() {
    this.testFiles = [];

  }
  //----------------
  //after finding files we run the tests
  async runTests(){
    for(let file of this.testFiles){
      require(file.name);//when we require the file inside a func node will find it and execute the file here
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
        this.testFiles.push({ name: filepath })
      } else if (stats.isDirectory()) {
        const childFiles = await fs.promises.readdir(filepath);

        files.push(...childFiles.map(f=> path.join(file , f)));
      }
    }
  }
}
module.exports = Runner;