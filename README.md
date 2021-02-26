# vite-repro-ssr-fix-stacktrace

`node server.js` fails in Node 12, but succeeds in later versions.

If it works, you should see something like this:

```
$ node server.js
should point to line 2:
    at /path/to/vite-repro-ssr-fix-stacktrace/src/component.svelte:2:11
should point to line 2:
    at Module.foo (null:2:8)
```

(I'm not sure why the `sourceURL` isn't being respected for `src/index.js`);

In Node 12, we see this instead:

```
$ node server.js
should point to line 2:
    at eval (/src/component.svelte:6:8)
(node:92624) UnhandledPromiseRejectionWarning: TypeError: Line must be greater than or equal to 1, got 0
    at BasicSourceMapConsumer.SourceMapConsumer_findMapping [as _findMapping] (/Users/richard/Development/VITE/vite-tests/vite-repro-ssr-fix-stacktrace/node_modules/vite/dist/node/chunks/dep-00e79b84.js:25563:13)
    at BasicSourceMapConsumer.SourceMapConsumer_originalPositionFor [as originalPositionFor] (/Users/richard/Development/VITE/vite-tests/vite-repro-ssr-fix-stacktrace/node_modules/vite/dist/node/chunks/dep-00e79b84.js:25632:22)
    at /Users/richard/Development/VITE/vite-tests/vite-repro-ssr-fix-stacktrace/node_modules/vite/dist/node/chunks/dep-00e79b84.js:67790:34
    at String.replace (<anonymous>)
    at /Users/richard/Development/VITE/vite-tests/vite-repro-ssr-fix-stacktrace/node_modules/vite/dist/node/chunks/dep-00e79b84.js:67780:21
    at Array.map (<anonymous>)
    at ssrRewriteStacktrace (/Users/richard/Development/VITE/vite-tests/vite-repro-ssr-fix-stacktrace/node_modules/vite/dist/node/chunks/dep-00e79b84.js:67779:10)
    at Object.ssrFixStacktrace (/Users/richard/Development/VITE/vite-tests/vite-repro-ssr-fix-stacktrace/node_modules/vite/dist/node/chunks/dep-00e79b84.js:68035:27)
    at main (file:///Users/richard/Development/VITE/vite-tests/vite-repro-ssr-fix-stacktrace/server.js:23:10)
(node:92624) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
(node:92624) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
```

