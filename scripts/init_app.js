#!/usr/bin/env node
// const handler = require('./handler').handler;
// const createServer = require('unit-http').createServer;

import { handler } from './handler.js';
import { createServer } from 'unit-http';

createServer(handler).listen();

export { handler };
