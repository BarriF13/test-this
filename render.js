const path = require('path')
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const render = async (filename) => {
  const filePath = path.join(process.cwd(), filename); // path of html file 
  const dom = await JSDOM.fromFile(filePath, {
    runScripts: 'dangerously',
    resources: 'usable'
  });

  return dom;

};
module.exports = render;