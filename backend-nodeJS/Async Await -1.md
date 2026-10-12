# JavaScript `async`, `await`, `resolve`, and `reject` — Complete Guide

JavaScript backend mein `async/await` samajhne ke liye ek fundamental rule yaad rakho:

- Resolve: Promise successfully fulfill ho gaya.
    
- Reject: Promise fail ho gaya.
    
- `async`: Function hamesha ek Promise return karta hai.
    
- `await`: Promise settle hone tak us `async` function ki execution ko pause karta hai.
    
- `try/catch`: Rejected Promise ki error ko handle kar sakta hai, agar rejection `try` ke andar awaited ho ya synchronous error throw ho.
    

Hum pehle `await` ke bina saari conditions samjhenge, phir `await` ke saath, aur finally `try/catch` ke saare important cases.

## 1. First, understand `resolve` and `reject`

```
const p1 = new Promise((resolve, reject) => {
    resolve("Success");
});

const p2 = new Promise((resolve, reject) => {
    reject("Failed");
});
```

- `p1` fulfilled Promise hai.
    
- `p2` rejected Promise hai.
    

Promise ka state ek baar fulfilled ya rejected ho jaaye, toh baad mein change nahi hota. `resolve()` kisi doosre Promise ko adopt bhi kar sakta hai, isliye us case mein final settlement us Promise par depend karega.

## 2. Without `await` — all important conditions

Suppose we have this function:

```
async function getData(shouldFail) {
    if (shouldFail) {
        throw new Error("Something went wrong");
    }

    return "Data received";
}
```

Yahan `return` aur `throw` ka behaviour important hai.

|Code inside `async`|Returned Promise|
|---|---|
|`return "Hello"`|Fulfilled with `"Hello"`|
|`return 10`|Fulfilled with `10`|
|`return Promise.resolve(10)`|Adopts that Promise's outcome|
|`return Promise.reject("Error")`|Rejected|
|`throw new Error("Failed")`|Rejected|
|No `return`|Fulfilled with `undefined`|

Ab har condition ko code se samjho.

### Case 1: Async function successfully returns a value

```
async function test() {
    return "Success";
}

const result = test();

console.log(result);
```

Output conceptually:

```
Promise { "Success" }
```

`result` direct `"Success"` nahi hai. It is a Promise fulfilled with `"Success"`.

To get the value without `await`, use `.then()`:

```
test().then((data) => {
    console.log(data); // Success
});
```

Rule: `return value` inside `async` means the returned Promise fulfills with that value.

### Case 2: Async function throws an error

```
async function test() {
    throw new Error("Failed");
}

const result = test();

console.log(result);
```

`result` is a rejected Promise.

You can handle it with `.catch()`:

```
test()
    .then((data) => console.log(data))
    .catch((error) => console.log(error.message));

// Failed
```

Rule: `throw` inside an `async` function rejects its returned Promise. It does not normally throw that error synchronously to the caller.

### Case 3: Return a resolved Promise

```
async function test() {
    return Promise.resolve("Success");
}

test().then(console.log);

// Success
```

The returned Promise adopts the outcome of the Promise you returned.

### Case 4: Return a rejected Promise

```
async function test() {
    return Promise.reject(new Error("Failed"));
}

test()
    .then(console.log)
    .catch((error) => console.log(error.message));

// Failed
```

Even though there is no `throw`, the returned Promise rejects because the returned Promise rejects.

### Case 5: No return statement

```
async function test() {
    console.log("Running");
}

test().then((data) => {
    console.log(data);
});
```

Output:

```
Running
undefined
```

The Promise fulfills with `undefined`.

## 3. What happens when you call an async function without `await`?

Consider this:

```
async function getData() {
    console.log("Inside function - 1");

    return "Success";
}

console.log("Start");

const result = getData();

console.log("End");

result.then(console.log);
```

Output:

```
Start
Inside function - 1
End
Success
```

Why?

1. The async function starts executing immediately.
    
2. It logs `Inside function - 1`.
    
3. It returns a fulfilled Promise.
    
4. JavaScript continues to `End`.
    
5. The `.then()` callback executes asynchronously as a microtask.
    

Important: `async` does not mean the entire function runs in the background. Its synchronous code executes immediately until it reaches an `await` or finishes.

## 4. Without `await` + `try/catch`

This is one of the most important distinctions.

### Case A: Rejected Promise is not awaited

```
async function test() {
    throw new Error("Failed");
}

try {
    const result = test();
    console.log("After call");
} catch (error) {
    console.log("Caught:", error.message);
}
```

Output:

```
After call
```

The `catch` does not catch the rejection.

Why? `test()` returns a rejected Promise. It doesn't synchronously throw an exception to the outer `try/catch`.

The rejected Promise remains unhandled unless you attach a rejection handler elsewhere.

### Case B: Handle it using `.catch()`

```
async function test() {
    throw new Error("Failed");
}

try {
    test().catch((error) => {
        console.log("Caught:", error.message);
    });

    console.log("After call");
} catch (error) {
    console.log("Outer catch:", error.message);
}
```

Output:

```
After call
Caught: Failed
```

Here, `.catch()` handles the Promise rejection. The outer `try/catch` still does not handle that asynchronous rejection.

### Case C: Synchronous error before a Promise is returned

```
function test() {
    throw new Error("Failed");
}

try {
    test();
} catch (error) {
    console.log("Caught:", error.message);
}
```

Output:

```
Caught: Failed
```

Notice that `test()` is a normal function, not an `async` function. Its `throw` is synchronous, so the outer `try/catch` catches it.

|Function called inside `try`|Does outer `catch` catch its failure without `await`?|
|---|---|
|Normal function throws synchronously|Yes|
|Async function throws|No, its Promise rejects|
|Normal function returns a rejected Promise|No|
|Async function returns a fulfilled Promise|No error to catch|

## 5. Now, with `await` — all important conditions

`await` unwraps a fulfilled Promise to its fulfillment value. If the Promise rejects, `await` throws that rejection reason at the `await` expression.

### Case 1: Await a fulfilled Promise

```
async function test() {
    return "Success";
}

async function main() {
    const result = await test();

    console.log(result);
}

main();
```

Output:

```
Success
```

Without `await`, `result` would be a Promise. With `await`, it is `"Success"`.

### Case 2: Await a rejected Promise

```
async function test() {
    throw new Error("Failed");
}

async function main() {
    const result = await test();

    console.log(result);
}

main();
```

The `console.log(result)` line will not execute because `await test()` throws the rejection reason. The `main()` function's returned Promise becomes rejected.

If no rejection handler is attached, this can result in an unhandled rejection.

### Case 3: Await with `try/catch`

```
async function test() {
    throw new Error("Failed");
}

async function main() {
    try {
        const result = await test();
        console.log(result);
    } catch (error) {
        console.log("Caught:", error.message);
    }
}

main();
```

Output:

```
Caught: Failed
```

This is the standard backend pattern for handling errors from asynchronous operations.

### Case 4: Await a fulfilled Promise inside `try/catch`

```
async function test() {
    return "Success";
}

async function main() {
    try {
        const result = await test();
        console.log(result);
    } catch (error) {
        console.log("Caught:", error.message);
    }
}

main();
```

Output:

```
Success
```

The `catch` doesn't execute because the Promise fulfilled.

### Case 5: `await` with `Promise.resolve()`

```
async function main() {
    const result = await Promise.resolve("Done");
    console.log(result);
}

main();
```

Output:

```
Done
```

### Case 6: `await` with `Promise.reject()`

```
async function main() {
    try {
        const result = await Promise.reject(
            new Error("Rejected")
        );

        console.log(result);
    } catch (error) {
        console.log(error.message);
    }
}

main();
```

Output:

```
Rejected
```

`await` converts the rejection into a thrown error within the current async function. The surrounding `catch` handles it.

### Case 7: Await a normal value, not a Promise

```
async function main() {
    const a = await 10;
    const b = await "Hello";

    console.log(a);
    console.log(b);
}

main();
```

Output:

```
10
Hello
```

`await` accepts non-Promise values too. They are effectively treated as fulfilled values.

## 6. All `await` + `try/catch` combinations

Consider these four scenarios:

1. `await` + resolve

```
try {
    const data = await Promise.resolve("OK");
    console.log(data);
} catch (err) {
    console.log("Error");
}
```

Output: OK

The `try` succeeds. `catch` is skipped.

2. `await` + reject

```
try {
    const data = await Promise.reject("Failed");
    console.log(data);
} catch (err) {
    console.log(err);
}
```

Output: Failed

The `await` throws; `catch` executes.

3. `await` + successful async function

```
async function getData() {
    return 100;
}

try {
    const data = await getData();
    console.log(data);
} catch (err) {
    console.log(err);
}
```

Output: 100

4. `await` + failing async function

```
async function getData() {
    throw new Error("DB failed");
}

try {
    const data = await getData();
    console.log(data);
} catch (err) {
    console.log(err.message);
}
```

Output: DB failed

## 7. Important difference: `try/catch` scope

Even with `await`, placement matters.

Example A — inside `try`:

```
async function main() {
    try {
        await Promise.reject("Failed");
    } catch (error) {
        console.log("Handled:", error);
    }
}
```

Output:

```
Handled: Failed
```

Example B — outside `try`:

```
async function main() {
    try {
        console.log("Starting");
    } catch (error) {
        console.log("Caught");
    }

    await Promise.reject("Failed");
}

main().catch(console.log);
```

Output:

```
Starting
Failed
```

The inner `try/catch` cannot catch the rejection because the `await` is outside its scope. The `.catch()` attached to `main()` handles the rejection of `main()` itself.

Rule: A `try/catch` catches synchronous exceptions and awaited Promise rejections only when the failing operation occurs inside its `try` block.

## 8. What if you use `.then()` and `.catch()` instead of `await`?

Both approaches can handle Promise outcomes.

Using Promise methods:

```
getData()
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log(error);
    });
```

Using `async/await`:

```
async function main() {
    try {
        const data = await getData();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

main();
```

|Promise methods|Async/await|
|---|---|
|`.then()` handles fulfillment|`await` gives the fulfillment value|
|`.catch()` handles rejection|`try/catch` handles rejection|
|Promise chain style|Sequential-looking code|
|No `await` required|Must be inside an `async` function in standard JavaScript contexts|

## 9. Special cases you should know

|Situation|Result|
|---|---|
|`resolve(10); reject(20)`|Fulfilled with `10`|
|`reject(10); resolve(20)`|Rejected with `10`|
|`throw new Error()` inside Promise executor|Promise rejects|
|`throw new Error()` inside `.then()` callback|The next Promise in the chain rejects|
|`return Promise.reject("X")` inside `.then()`|The next Promise rejects|
|`return Promise.reject("X")` inside `async`|The async function's Promise rejects|
|`await` a rejected Promise without `try/catch`|The current async function's Promise rejects|
|`return;` inside `async`|Promise fulfills with `undefined`|

Note that `resolve()` and `reject()` settle a Promise only once; subsequent settlement attempts are ignored.