const assert = require('assert');
const { forEach } = require('../index');

let num;
beforeEach(()=>{
num =[ 1,2,3];
})
it('should sum an array', () => {
  // const num = [1, 2, 3];

  let total = 0;
  forEach(num, (value) => {
    total += value;

  });
assert.strictEqual(total , 6);
num.push(3);
num.push(3);
num.push(3);
num.push(3);
});

it ('beforeEach is ran each time' , ()=>{
  assert.strictEqual(num.length , 3);
})
