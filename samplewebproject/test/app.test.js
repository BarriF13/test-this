
const assert = require('assert');

it ('has a test input' , async ()=>{
const dom =await render('index.html');

const input = dom.window.document.querySelector('input');
assert(input)
});