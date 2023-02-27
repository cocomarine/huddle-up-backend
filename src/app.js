const express = require('express');
const userRouter = require('./routers/user');
const eventRouter = require('./routers/event');

const app = express();

app.use(express.json());

app.get('/', (_, res) => {
  res.status(200).json({ message: 'Welcome to HuddleUp!'});
});

app.use('/users', userRouter);
app.use('/events', eventRouter);
// app.use('/userevents', userEventRouter);
// app.use('/suggestions', suggestionsRouter);

module.exports = app;
