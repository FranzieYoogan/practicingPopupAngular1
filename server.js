// index.js
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// MongoDB connection setup
const mongoURI = 'mongodb+srv://franzieyoogan2:admin357159@cluster0.guw8a4s.mongodb.net/'; // Replace with your MongoDB URI
const dbName = 'feedback1'; // Replace with your database name
let db;

// Connect to MongoDB
MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    db = client.db(dbName);
    console.log('MongoDB connected');
  })
  .catch(err => console.error(err));

// Define routes

// GET all items
app.get('/api/items', async (req, res) => {
  try {
    const items = await db.collection('feedback').find().toArray();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single item by ID
app.get('/api/items/:id', async (req, res) => {
  try {
    const item = await db.collection('feedback').findOne({ _id: new ObjectId(req.params.id) });
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new item
app.post('/api/items', async (req, res) => {
  const newItem = {
    name: req.body.name,
    email: req.body.email,
    about: req.body.about
  };

  try {
    const result = await db.collection('feedback').insertOne(newItem);
    res.status(201).json(result.ops[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an item
app.delete('/api/items/:id', async (req, res) => {
  try {
    const result = await db.collection('feedback').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 1) {
      res.json({ message: 'Item deleted' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});