const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');
const {writeMembersToFile, readMembersFromFile} = require("../public/persist");

const members = !readMembersFromFile() ? [] : JSON.parse(readMembersFromFile());

// Helper function to validate member data
const validateMember = (data) => {
  const { name, description, age, imageUrl, hobby } = data;
  if (!name || typeof name !== 'string') return 'Invalid or missing "name"';
  if (description && typeof description !== 'string') return 'Invalid "description"';
  if (age && typeof age !== 'number') return 'Invalid "age"';
  if (!imageUrl || typeof imageUrl !== 'string') return 'Invalid or missing "imageUrl"';
  if (hobby && typeof hobby !== 'string') return 'Invalid "hobby"';
  return null;
};

// Get all users
router.get('/', (req, res, next) => {
  return res.send(members);
});

// Get a single member by ID
router.get('/:memberId', (req, res, next) => {
  const foundMember = members.find(member => member.id === req.params.memberId);
  if (!foundMember) return res.status(404).send({ message: 'Member not found' });
  return res.send(foundMember);
});

// Add a new member
router.post('/', (req, res, next) => {
  const validationError = validateMember(req.body);
  if (validationError) {
    return res.status(400).send({ message: validationError });
  }

  const member = { id: uuid(), ...req.body };
  members.push(member);
  writeMembersToFile(JSON.stringify(members));
  return res.send(`${member.name} added successfully`);
});

// Update a member by ID
router.put('/:memberId', (req, res, next) => {
  const memberIndex = members.findIndex(member => member.id === req.params.memberId);
  if (memberIndex === -1) return res.status(404).send({ message: 'Member not found' });

  const updatedMember = { ...members[memberIndex], ...req.body };
  members[memberIndex] = updatedMember;
  writeMembersToFile(JSON.stringify(members)); // Save to JSON file
  return res.send(updatedMember);
});

// Delete a member by ID
router.delete('/:memberId', (req, res, next) => {
  const memberIndex = members.findIndex(member => member.id === req.params.memberId);
  if (memberIndex === -1) return res.status(404).send({ message: 'Member not found' });

  members.splice(memberIndex, 1);
  writeMembersToFile(JSON.stringify(members));
  return res.send({ message: 'Member deleted successfully' });
});

router.delete('/', (req, res, next) => {
  members.splice(0, members.length);
  writeMembersToFile(JSON.stringify(members));
  return res.send({ message: 'All Members deleted successfully' });
});

module.exports = router;
