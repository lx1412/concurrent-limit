/**
 *@param {Function} fn function returns a promiseLike value
 *@param {Number} limit max concurrency
 */
function control(fn, limit) {
    let queue = [], count = 0;

    let next = function () {
        let resolve = queue.shift();
        resolve && resolve();
    };

    let wrap = function (...args) {
        let p = Promise.resolve();
        let ret = p.then(() => fn(...args));
        ret.catch(e => e).then(() => count--);

        return ret;
    }

    return function (...args) {
        count++;

        let p = count <= limit ? Promise.resolve() : new Promise(resolve => queue.push(resolve));

        let ret = p.then(() => wrap(...args));
        ret.catch(e=>e).then(next);

        return ret;
    }
}

module.exports = control;