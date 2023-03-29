Blocking code

Here's an example of some code that would prevent your API from receiving more requests until its done.

```js
import fs from "fs";

const result = fs.readFileSync("some/path/to/file.txt");
```

Reading a file with the sync version of the method is blocking. If that file was huge and running on a popular route where many requests triggered its execution, your API will eventually slow down. To avoid this, you'd want to make sure this code was async.

```js
// promise version
import fs from "fs/promises";

const result = await fs.readFile("some/path/to/file.txt");
```

Now, this code will no longer tie up the main thread, allowing more requests to come through. If you ABSOLUTELY could not convert some sync code to async code, then you should use a child process to run the code on a different thread.

