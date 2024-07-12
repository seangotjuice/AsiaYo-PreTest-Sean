const request = require('supertest');
const app = require('../app');

describe('POST /api/orders', () => {
    test('should return 400 if name contains non-English characters', async () => {
        const order = {
            id: "A0000001",
            name: "Mélody Holiday Inn",
            address: {
                city: "taipei-city",
                district: "da-an-district",
                street: "fuxing-south-road"
            },
            price: "2050",
            currency: "TWD"
        };

        const response = await request(app)
            .post('/api/orders')
            .send(order);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Name contains non-English characters');
    });

    test('should return 400 if name is not capitalized', async () => {
        const order = {
            id: "A0000001",
            name: "melody Holiday Inn",
            address: {
                city: "taipei-city",
                district: "da-an-district",
                street: "fuxing-south-road"
            },
            price: "2050",
            currency: "TWD"
        };

        const response = await request(app)
            .post('/api/orders')
            .send(order);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Name is not capitalized');
    });

    test('should return 400 if price is over 2000', async () => {
        const order = {
            id: "A0000001",
            name: "Melody Holiday Inn",
            address: {
                city: "taipei-city",
                district: "da-an-district",
                street: "fuxing-south-road"
            },
            price: "2051",
            currency: "TWD"
        };

        const response = await request(app)
            .post('/api/orders')
            .send(order);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Price is over 2000');
    });

    test('should return 400 if currency format is wrong', async () => {
        const order = {
            id: "A0000001",
            name: "Melody Holiday Inn",
            address: {
                city: "taipei-city",
                district: "da-an-district",
                street: "fuxing-south-road"
            },
            price: "2000",
            currency: "EUR"
        };

        const response = await request(app)
            .post('/api/orders')
            .send(order);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Currency format is wrong');
    });

    test('should transform USD to TWD and multiply price by 31', async () => {
        const order = {
            id: "A0000001",
            name: "Melody Holiday Inn",
            address: {
                city: "taipei-city",
                district: "da-an-district",
                street: "fuxing-south-road"
            },
            price: "100",
            currency: "USD"
        };

        const response = await request(app)
            .post('/api/orders')
            .send(order);

        expect(response.status).toBe(200);
        expect(response.body.price).toBe("3100");
        expect(response.body.currency).toBe("TWD");
    });

    test('should pass for valid order', async () => {
        const order = {
            id: "A0000001",
            name: "Melody Holiday Inn",
            address: {
                city: "taipei-city",
                district: "da-an-district",
                street: "fuxing-south-road"
            },
            price: "2000",
            currency: "TWD"
        };

        const response = await request(app)
            .post('/api/orders')
            .send(order);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(order);
    });
});
