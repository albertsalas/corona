const app = require('../app.js');
const supertest = require('supertest');
const request = supertest(app);
const Product = require("../models/Product.js");

let product = new Product({
    name: "Name",
    description: "Description",
    price: 9.99,
    quantity: 100
});

describe('Test all Product methods', () => {
    test('Creates new product and inserts into database', async () => {
        const response = await request.post('/products').send(product);
        expect(response.statusCode).toBe(200);
    }, 20000);

    test('Find a single product', async () => {
        const response = await request.get('/products/' + product.name);
        expect(response.body[0]).toBeTruthy();
    }, 20000);

    test('Find all products', async () => {
        const response = await request.get('/products');
        console.log(response);
        expect(response.body).toBeTruthy();
    });

    test('Update a single product', async () => {
        product.name = "new_name";
        const response = await request.put('/products/name').send(product);
        expect(response.body.name).toBe("new_name");
    });

    test('Delete a single product', async () => {
        const response = await request.delete('/products/' + product.name);
        expect(response.statusCode).toBe(200);
    }, 20000);
});