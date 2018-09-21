const fs = require('fs');
const assert = require('assert');
const { promisify } = require('util');
const control = require('../index');
let testf = () => {
    let i = 0;
    return (...args) => {
        i++;
        // console.log(i)
        return promisify(fs.readFile)(...args).then(value => {
            return i--;
        })
    };
}

let readfile = control(testf(), 3);

describe('control', () => {
    it('return same result', async () => {
        const p = promisify(fs.readFile);
        let v1 = await p(__filename);
        let v2 = await control(p, 1)(__filename);
        assert.strictEqual(v1.toString(), v2.toString());
    });
    it('less than 3 excuting functions at same time ', async () => {
        let arr=[];
        for (let i = 0; i <= 10; i++) {
            arr.push(readfile(__filename))
        }

        for(let a of await Promise.all(arr)){
            assert.ok(a<=3)
        }
    })
})