# gecon_pub
Store data for public use
Michaelzhou
--------------------
error message
--------------------
connect.sid=s%3AUk5bSbBxnbwEQO4oyI2a70zuvpbHXxDy.2ZLlut5j%2BaBmRe3BaYsvxyMoEiNseX6AT%2FY6jbuMBHA
Thu, 10 Nov 2022 04:59:51 GMT
users/sdate :webcookie: 2022-08-01
/app/routes/gsapi.js:27

throw err;
^
Error: read ECONNRESET

at TCP.onStreamRead (node:internal/stream_base_commons:217:20)

at Protocol._enqueue (/app/node_modules/mysql/lib/protocol/Protocol.js:144:48)

at Connection.query (/app/node_modules/mysql/lib/Connection.js:198:25)

at /app/routes/gsapi.js:25:24

at Layer.handle [as handle_request] (/app/node_modules/express/lib/router/layer.js:95:5)

at next (/app/node_modules/express/lib/router/route.js:144:13)

at Route.dispatch (/app/node_modules/express/lib/router/route.js:114:3)

at Layer.handle [as handle_request] (/app/node_modules/express/lib/router/layer.js:95:5)

at /app/node_modules/express/lib/router/index.js:284:15

at Function.process_params (/app/node_modules/express/lib/router/index.js:346:12)

at next (/app/node_modules/express/lib/router/index.js:280:10) {

errno: -104,
code: 'ECONNRESET',
syscall: 'read',
fatal: true

}


Showing 320 logs


