const request = require('supertest');
const express = require('express');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const memberRoutes = require('../routes/members');
const { connectToDatabase, getDb } = require('../db');


const app = express();
app.use(express.json());
app.use('/members', memberRoutes);

describe('insert', () => {
    let connection;
    let db;
    let users;

    beforeAll(async () => {
        await connectToDatabase("test");
        db = getDb();
        users = db.collection('members');
    });

    afterAll(async () => {
        // await db.close();
    });

    describe('GET /members/:name', () => {
        it('should return a single member by name', async () => {

            const testMember = { name: 'John Doe', description: 'Test description', age: 30, hobby: 'reading' };
            await users.insertOne(testMember);

            const response = await request(app).get('/members/John Doe');
            expect(response.status).toBe(200);
            expect(response.body.name).toBe('John Doe');
        });

        it('should return 404 if member not found', async () => {
            const response = await request(app).get('/members/Nonexistent');
            expect(response.status).toBe(404);
        });
    });

    describe('POST /members', () => {
        it('should create a new member', async () => {
            const newMember = { name: 'New Member', description: 'Test description', age: 35, hobby: 'coding' };
            const response = await request(app).post('/members').send(newMember);
            expect(response.status).toBe(201);
            expect(response.body.name).toBe('New Member');
            expect(response.body._id).toBeDefined();
        });

        it('should return 400 if validation fails', async () => {
            const invalidMember = { description: 'Invalid member' };
            const response = await request(app).post('/members').send(invalidMember);
            expect(response.status).toBe(400);
        });
    });

    describe('PUT /members/:id', () => {
        it('should update an existing member', async () => {



            const member = { name: 'Update Test', description: 'Original description', age: 40, hobby: 'running' };
            const insertResult = await users.insertOne(member);
            const memberId = insertResult.insertedId.toString();

            const updatedFields = { description: 'Updated description', age: 41 };
            const removedFields = ['hobby'];

            const response = await request(app)
                .put(`/members/${memberId}`)
                .send({ updatedFields, removedFields });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Member updated successfully');
            expect(response.body.member.description).toBe('Updated description');
            expect(response.body.member.age).toBe(41);
            expect(response.body.member.hobby).toBeUndefined();
        });

        it('should return 404 if member not found', async () => {
            const nonexistentId = new ObjectId().toString();
            const response = await request(app)
                .put(`/members/${nonexistentId}`)
                .send({ updatedFields: { description: 'Test' } });

            expect(response.status).toBe(404);
        });
    });

    describe('DELETE /members/:id', () => {
        it('should delete an existing member', async () => {

            const member = { name: 'Delete Test', description: 'To be deleted' };
            const insertResult = await users.insertOne(member);
            const memberId = insertResult.insertedId.toString();
            console.log(memberId);
            const response = await request(app).delete(`/members/${memberId}`);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Member deleted successfully');
            expect(response.body.id).toBe(memberId);

            const deletedMember = await users.findOne({ _id: new ObjectId(memberId) });
            expect(deletedMember).toBeNull();
        });

        it('should return 404 if member not found', async () => {
            const nonexistentId = new ObjectId().toString();
            const response = await request(app).delete(`/members/${nonexistentId}`);
            expect(response.status).toBe(404);
        });
    });

    describe('DELETE /members', () => {
        it('should delete all members', async () => {



            const testMembers = [
                { name: 'John Doe', description: 'Test description' },
                { name: 'Jane Smith', description: 'Another test' }
            ];
            await users.insertMany(testMembers);

            const response = await request(app).delete('/members');
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('All members deleted successfully');

            const remainingMembers = await users.find().toArray();
            expect(remainingMembers.length).toBe(0);
        });
    });
});