import express from 'express';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';
import mongoose from 'mongoose';
import profilesRoutes from './routes/profiles.js';
import postsRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';
import morgan from 'morgan';

const { connect } = mongoose;

import {
  errorHandler,
  routeNotFoundHandler,
} from './middlewares/errors/errorHandling.js';

import ErrorResponse from './utilities/errorResponse.js';

const app = express();
app.use(morgan('dev'));

//   const whiteList = [process.env.FE_URL_DEV, process.env.FE_URL_PROD];
//   // da configurare anke su heroku

//   const corsOptions = {
//     origin: function (origin, next) {
//       if (whiteList.indexOf(origin) !== -1) {
//         console.log("ORIGIN: ", origin);
//         //origin trovata in whitelist
//         next(null, true);
//       } else {
//         // origin non trovata in white, sucati i cors
//         next(new ErrorResponse(`NOT ALLOWED BY CORS`, 403));
//       }
//     },
//   };

app.use(cors());
// app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/profile', profilesRoutes);
// app.use('/api/experience', experiencesRoutes);
app.use('/api/posts', postsRoutes);

app.use(routeNotFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

console.table(listEndpoints(app));

connect(process.env.MONGO_CONNECTION, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
  .then(() => {
    app.listen(PORT, () => {
      if (process.env.NODE_ENV === 'production') {
        // no need to configure it manually on Heroku
        console.log('Server running on cloud on port: ', PORT);
      } else {
        console.log('Server running locally on port: ', PORT);
      }
    });
  })
  .catch((err) => console.log(err));
