const path = require('path')
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const render = async (filename) => {
  const filePath = path.join(process.cwd(), filename); // path of html file 
  const dom = await JSDOM.fromFile(filePath, {
    runScripts: 'dangerously',
    resources: 'usable'
  });
  //wrap inside promise to delay the loading of the whole page 
  return new Promise((resolve, reject) => {
    dom.window.document.addEventListener('DOMContentLoaded', () => {
      //console.log(window.stuffLoaded)
      resolve(dom);
    });
  })

  // return dom;

};
module.exports = render;