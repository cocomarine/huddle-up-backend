const express = require('express');
const cors = require('cors');
const userRouter = require('./routers/user');
const eventRouter = require('./routers/event');
const userEventRouter = require('./routers/userEvent');
const suggestionRouter = require('./routers/suggestion');

const app = express();

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:4001"
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));

app.get('/', (_, res) => {
  res.status(200).json({ message: 'Welcome to HuddleUp!'});
});


app.use('/users', userRouter);
app.use('/events', eventRouter);
app.use('/userevents', userEventRouter);
app.use('/suggestions', suggestionRouter);

module.exports = app;
