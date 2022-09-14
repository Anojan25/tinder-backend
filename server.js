import express from 'express';
import mongoose from 'mongoose';
import Cards from './dbCards.js';
import Cors from 'cors';

//appconfig
const app = express();
const port = process.env.PORT || 8001;
const connection_url = `mongodb+srv://admin:Zwk8XCrYvlo0wQXb@cluster0.6uqmhny.mongodb.net/?retryWrites=true&w=majority`;

//middlewares

app.use(express.json());
app.use(Cors());

//dbconfig
mongoose
  .connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('database Connected');
  })
  .catch((err) => {
    console.log('Database not connected' + err);
  });

//API endpoints
app.get('/', (req, res) => res.status(200).send('HELLO ANOJAN !!!!!'));

app.post('/tinder/cards', (req, res) => {
  const dbCard = req.body;

  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get('/tinder/cards', (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//listener

app.listen(port, () => console.log(`listening on localhost: ${port}`));
