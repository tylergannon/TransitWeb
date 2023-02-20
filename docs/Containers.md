# Docker Containers

## tylergannon/node

Since Node doesn't have a good build for aarch64, and since 


## Web Server (prod)

- Based on ubuntu.
- nodejs is built from source, for compatibility with aarch64.
- The node application is served and controlled by [Nginx Unit](https://unit.nginx.org).

### Unit configuration

#### Building our own Node

The linkage between nginx unit and our node application involves the
[unit-http](https://www.npmjs.com/package/unit-http) npm package, which includes
C code that must be compiled by [node-gyp](https://www.npmjs.com/package/node-gyp),
using C libraries that are provided by the `node-dev` apt package, which in turn
requires `libssl3>=3.0.0`.  To get `libssl3` on an Ubuntu-based Docker image,
you need Ubuntu >= 22.04.

Hence, we do not use the official `node` image but we build node ourselves on top
of the official Ubuntu umage.

