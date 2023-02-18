# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

- The hash generation logic is repeated and independent from the rest of the logic, so that was abstracted into a helper function. This also helps testing because the function can be easily mocked as a separate module.
- Constants were extracted out of the function body and exported to improve readabilty and improve the robestness of tests
- The conditional that checks whether the candidate variable is truthy and not a string is only relevant if the input `event` has a defined `partitionKey`. Since this operation is only relevant for the first conditional, it was moved to that block
- Similarly, the conditional that checks whether the candidate exceeds the maximum length is also relevant when the `partitionKey` is defined, this operation was also moved into the first conditional block
- Basic conditionals were replaced with ternary operators where appropriate to minimize nested logic statements
- Multiple return statements were used to make it easier to see where the relevant logic ends in each use case. It also makes the vaguely-named variable `candidate` unnecessary, allowing for more specific variable names. 
- Statements were condensed where appropriate