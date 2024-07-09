const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { getDb } = require('../db');

// Helper function to validate member data
const validateMember = (data) => {
  const { name, description, age, hobby, image } = data;
  if (!name || typeof name !== 'string') return 'Invalid or missing "name"';
  if (!description || typeof description !== 'string') return 'Invalid or missing "description"';
  if (age && isNaN(parseInt(age))) return 'Invalid "age"';
  if (typeof hobby !== 'string') return 'Invalid "hobby"';
  return null;
};

// Get all members
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const members = await db.collection('members').find().toArray();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching members', error: error.message });
  }
});

// Get a single member by name
router.get('/:name', async (req, res) => {
  try {
    const db = getDb();
    const member = await db.collection('members').findOne({ name: req.params.name});
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching member', error: error.message });
  }
});

// Add a new member
router.post('/', async (req, res) => {
  const validationError = validateMember(req.body);
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  try {
    const db = getDb();
    const result = await db.collection('members').insertOne(req.body);
    res.status(201).json({ _id: result.insertedId, ...req.body });
  } catch (error) {
    res.status(500).json({ message: 'Error adding member', error: error.message });
  }
});

// Update a member by ID
router.put('/:id', async (req, res) => {
  delete req.body["_id"];
  try {
    const db = getDb();
    const { updatedFields, removedFields } = req.body;

    // Prepare the update operation
    const updateOp = {};
    if (Object.keys(updatedFields).length > 0) {
      updateOp.$set = updatedFields;
    }
    if (removedFields && removedFields.length > 0) {
      updateOp.$unset = removedFields.reduce((acc, field) => {
        acc[field] = "";
        return acc;
      }, {});
    }

    const result = await db.collection('members').updateOne(
        { _id: new ObjectId(req.params.id) },
        updateOp
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Member not found' });
    }
    const member = await db.collection('members').findOne({ _id: new ObjectId(req.params.id) });
    res.json({ message: 'Member updated successfully', member: member });
  } catch (error) {
    res.status(500).json({ message: 'Error updating member', error: error.message });
  }
});

// Delete a member by ID
router.delete('/:id', async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection('members').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json({ message: 'Member deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting member', error: error.message });
  }
});

router.delete('/', async (req, res) => {
  try {
    const db = getDb();
    await db.collection('members').deleteMany({});
    res.json({ message: 'All members deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting all members', error: error.message });
  }
});

module.exports = router;