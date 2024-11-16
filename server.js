const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/groceryApp', { useNewUrlParser: true, useUnifiedTopology: true });

const ItemSchema = new mongoose.Schema({ name: String });
const Item = mongoose.model('Item', ItemSchema);

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/add-item', async (req, res) => {
  const item = new Item({ name: req.body.item });
  await item.save();
  res.sendStatus(200);
});

app.get('/get-items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.delete('/delete-item/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.sendStatus(200);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
