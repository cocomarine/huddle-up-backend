const express = require('express');
const cors = require('cors');
const authRouter = require('./routers/auth');
const userRouter = require('./routers/user');
const eventRouter = require('./routers/event');
const userEventRouter = require('./routers/userEvent');
const suggestionRouter = require('./routers/suggestion');

const app = express();

app.use((_, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (_, res) => {
  res.status(200).json({ message: 'Welcome to HuddleUp!'});
});

app.use('/users', userRouter);
app.use('/events', eventRouter);
app.use('/userevents', userEventRouter);
app.use('/suggestions', suggestionRouter);
app.use('/auth', authRouter);

module.exports = app;
