const app = require('../app.js');
const supertest = require('supertest');
const request = supertest(app);
const User = require("../models/User.js");

let user = new User({
    username: "username",
    password: "password",
    firstName: "firstName",
    lastName: "lastName"
});

describe('Test all User methods', () => {
    test('Creates new user and inserts into database', async () => {
        const response = await request.post('/users').send(user);
        expect(response.statusCode).toBe(200);
    }, 20000);

    test('Find a single user', async () => {
        const response = await request.get('/users/' + user.username);
        expect(response.body[0]).toBeTruthy();
    }, 20000);

    test('Update a single user', async () => {
        user.username = "new_username";
        const response = await request.put('/users/username').send(user);
        expect(response.body.username).toBe("new_username");
    });

    test('Delete a single user', async () => {
        console.log(user.username);
        const response = await request.delete('/users/' + user.username);
        expect(response.statusCode).toBe(200);
    }, 20000);
});