import express from 'express';
import router from './routes.js';
import cors from 'cors'

const port = process.env.PORT || 3000;
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
//protection - set currently to public but typically you would set it to get requests to limited domains.
app.use(cors());

//route export
app.use('/api/shows', router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
