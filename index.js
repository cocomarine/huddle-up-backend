const app = require('./src/app');

// error-handling middleware
// app.use((req, res, next) => {
//   const err = new Error('Not found');
//   err.status = 404;

//   next(err);
// });

// app.use((err, req, res, next) => {
//   res.status(err.status || 500).json({
//     // success: false,
//     message: err.message || 'Something went wrong'
//   });
// });

const APP_PORT = 4000;

app.listen(APP_PORT, () => {
  console.log(`App is listening on port ${APP_PORT}`);
});