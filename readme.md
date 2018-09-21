# Introduction
Limit the concurrency when calling an asynchronous API
# Install
```
npm install concurrent-limit
```

# Examples
## In Node
```
const fs = require('fs');
const { promisify } = require('util');
const control = require('concurrent-limit'); 

const readfile = promisify(fs.readFile);// function returns a promiseLike value.

const readfile_limit = control(readfile,10);

for(let i=0;i<100;i++){//no more than 10 fs.readFile functions being excuted at same time;
    readfile_limit(__filename).then(buffer=>console.log(buffer.toString()));
}

```
## In Browser
### ES6
```
import control from '../concurrent-limit.min.js';
const myFetch=control(fetch,10);

/**your code here*/
```
### Script Tag
```
<script scr="../concurrent-limit.min.js"></script>

<script>
const myFetch=ConcurrentLimit(fetch,10);
/**your code here*/
</script>
```
