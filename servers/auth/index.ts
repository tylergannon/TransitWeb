import { IncomingMessage, ServerResponse, createServer } from 'http';
import { parse } from 'cookie';
import {createClient} from '@redis/client';
const SUCCESS = '😀'
const redisClient = createClient({
  url: process.env.REDIS_URL,
});

await redisClient.connect();

const checkSession = async (req: IncomingMessage, res: ServerResponse) => {
  const cookies = req.headers.cookie;

  if (!cookies) {
    res.statusCode = 401;
    res.end('Unauthorized');
    return;
  }

  const parsedCookies = parse(cookies);
  const sessionKey = parsedCookies['auth_session'];
  if (!sessionKey) {
    res.statusCode = 401;
    res.end('Unauthorized');
    return;
  }

  const sessionData = await redisClient.get(sessionKey)
  if (!sessionData) {
    res.statusCode = 401;
    res.end('Unauthorized');
    return;
  }

  const sessionObj = JSON.parse(sessionData);
  const now = Date.now();

  if (sessionObj.active_expires > now) {
    res.statusCode = 200;
    res.end(SUCCESS);
  } else {
    res.statusCode = 401;
    res.end('Unauthorized');
  }
};

const port = process.env.PORT || 80;
const CHECK_URL = "/check";
async function serverRoot(req: IncomingMessage, res: ServerResponse) {
  // if the request is to "/check" then just return 200
  // Otherwise forward the request to checkSession.
  if (req.url === CHECK_URL) {
    res.statusCode = 200;
    res.end(SUCCESS);
    return
  }
  await checkSession(req, res);
}

const server = createServer(serverRoot)

server.on("close", () => {
  return redisClient.disconnect();
})

server.listen(port, () => {
  console.log(`Auth server listening on port ${port}`);
});
