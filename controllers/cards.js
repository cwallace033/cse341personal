const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getCards = async (req, res, next) => {
  try {
    const db = mongodb.getDb();
    const result = await db.collection('cards').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error('Error getting cards', error);
    return res.status(500).json({ message: 'Failed to retrieve cards' });
  }
};

const getCardById = async (req, res, next) => {
  try {
    const cardId = new ObjectId(req.params.id);
    const db = mongodb.getDb();
    const result = await db.collection('cards').findOne({ _id: cardId });

    if (!result) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error('Error getting card by ID', error);
    return res.status(500).json({ message: 'Failed to retrieve card' });
  }
};

const createCard = async (req, res, next) => {
  try {
    const { name, description, price, rarity, set, cardType } = req.body;

    if (!name || !description || !price || !rarity || !set  || !cardType) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const newCard = {
      name,
      description,
      price,
      rarity,
      set,
      cardType
    };

    const db = mongodb.getDb();
    const result = await db.collection('cards').insertOne(newCard);

    if (result.acknowledged) {
      return res.status(201).json({ id: result.insertedId });
    } else {
      return res.status(500).json({ message: 'Failed to create card' });
    }
  } catch (error) {
    console.error('Error creating card', error);
    return res.status(500).json({ message: 'Failed to create card' });
  }
};

const updateCard = async (req, res, next) => {
  try {
    const cardId = new ObjectId(req.params.id); 

    const { name, description, price, rarity, set, cardType } = req.body;

    if (!name && !description && !price && !rarity && !set && !cardType) {
      return res.status(400).json({ message: 'Please provide at least one field to update' });
    }

    const updateInfo = {};
    if (name) updateInfo.name = name;
    if (description) updateInfo.description = description;
    if (price) updateInfo.price = price;
    if (rarity) updateInfo.rarity = rarity;
    if (set) updateInfo.set = set;
    if (cardType) updateInfo.cardType = cardType;

    const db = mongodb.getDb();
    const result = await db.collection('cards').updateOne(
      { _id: cardId },
      { $set: updateInfo }
    );

    if (result.matchedCount === 1) {
      return res.status(204).json({ message: 'Card updated successfully' });
    } else {
      return res.status(404).json({ message: 'Card not found' });
    }
  } catch (error) {
    console.error('Error updating card', error);
    return res.status(500).json({ message: 'Failed to update card' });
  }
};

const deleteCard = async (req, res) => {
  try {
    const cardId = new ObjectId(req.params.id);
    const db = mongodb.getDb(); // Get the database instance
    const result = await db.collection('cards').deleteOne({ _id: cardId });

    if (result.deletedCount === 1) {
      return res.status(204).json({ message: 'Card deleted' });
    } else {
      return res.status(404).json({ message: 'Card not found' });
    }

  } catch (error) {
    console.error('Error deleting card', error);
    return res.status(500).json({ message: 'Failed to delete card' });
  }
}

module.exports = { getCards, getCardById, createCard, updateCard, deleteCard };
