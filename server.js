const express = require('express'); // importing a CommonJS module
const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");


const server = express();


server.use("/posts", postRouter);
server.use("/users", userRouter);
server.use(express.json());
server.use(logger);





const logger = (req, res, next) => {
  console.log(`[${Date()}] ${req.method} to ${req.url}`);
  req.body = "name";
  next();
}




// adding global middlewares with server.use
// the req and the res objects travel through them
server.use(express.json()); // the req now has a body object
server.use(helmet()); // the res now has better headers
server.use(morgan('dev')); // logs things to the console
server.use(logger('useless')); // configurable console.log
server.use(moodyGateKeeper);

// the router is a group of middlewares
// server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API,</p>
  `);
});

module.exports = server;

