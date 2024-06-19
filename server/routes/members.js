const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');
const {writeMembersToFile, readMembersFromFile} = require("../public/persist");

const members = !readMembersFromFile() ? [] : JSON.parse(readMembersFromFile());

// Helper function to validate member data
const validateMember = (data) => {
  const { name, description, ageStr, hobby } = data;
  if (!name || typeof name !== 'string') return 'Invalid or missing "name"';
  if (!description && typeof description !== 'string') return 'Invalid "description"';
  try {
    parseInt(ageStr);
  } catch (e) {
    return 'Invalid "age"';
  }
  if (typeof hobby !== 'string') return 'Invalid "hobby"';
  return null;
};

// Get all users
router.get('/', (req, res, next) => {
  return res.send(members);
});

// Get a single member by name
router.get('/:name', (req, res, next) => {
  const id = getId(req.params.name);
  const foundMember = members.find(member => member.id === id);
  if (!foundMember) return res.status(404).send({ message: 'Member not found' });
  return res.send(foundMember);
});

// Return member ID given name
function getId(name) {
  const memberIndex = members.findIndex(member => member.name === name);
  if (memberIndex === -1) return "";

  return members[memberIndex]["id"];
}

// Add a new member
router.post('/', (req, res, next) => {
  const validationError = validateMember(req.body);
  if (validationError) {
    return res.status(400).send({ message: validationError });
  }

  const member = { id: uuid(), age:parseInt(req.body.age), ...req.body };
  members.push(member);
  writeMembersToFile(JSON.stringify(members));
  return res.send({message: `${member.name} added successfully`});
});

// Update a member by id
router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const memberIndex = members.findIndex(member => member.id === id);
  if (memberIndex === -1) return res.status(404).send({ message: 'Member not found' });

  const updatedMember = { ...members[memberIndex], ...req.body };
  members[memberIndex] = updatedMember;
  writeMembersToFile(JSON.stringify(members)); // Save to JSON file
  return res.send(updatedMember);
});

// Delete a member by id
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  console.log(req.params.id);
  const memberIndex = members.findIndex(member => member.id === id);
  if (memberIndex === -1) return res.status(404).send({ message: 'Member not found' });

  const name = members[memberIndex].name;
  members.splice(memberIndex, 1);
  writeMembersToFile(JSON.stringify(members));
  return res.send({ message: `${name} deleted successfully` });
});

router.delete('/', (req, res, next) => {
  members.splice(0, members.length);
  writeMembersToFile(JSON.stringify(members));
  return res.send({ message: 'All Members deleted successfully' });
});

module.exports = router;
