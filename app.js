import express from 'express';
import router from './routes.js';

const port = process.env.PORT || 3000;
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//route export
app.use('/api/shows', router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
