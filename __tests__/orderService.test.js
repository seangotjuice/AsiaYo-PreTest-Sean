const OrderService = require('../services/orderService');

describe('OrderService', () => {
    test('should throw error if name contains non-English characters', () => {
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

        expect(() => {
            OrderService.validateAndTransformOrder(order);
        }).toThrow('Name contains non-English characters');
    });

    test('should throw error if name is not capitalized', () => {
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

        expect(() => {
            OrderService.validateAndTransformOrder(order);
        }).toThrow('Name is not capitalized');
    });

    test('should throw error if price is over 2000', () => {
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

        expect(() => {
            OrderService.validateAndTransformOrder(order);
        }).toThrow('Price is over 2000');
    });

    test('should throw error if currency format is wrong', () => {
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

        expect(() => {
            OrderService.validateAndTransformOrder(order);
        }).toThrow('Currency format is wrong');
    });

    test('should transform USD to TWD and multiply price by 31', () => {
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

        const transformedOrder = OrderService.validateAndTransformOrder(order);

        expect(transformedOrder.price).toBe("3100");
        expect(transformedOrder.currency).toBe("TWD");
    });

    test('should pass for valid order', () => {
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

        const transformedOrder = OrderService.validateAndTransformOrder(order);

        expect(transformedOrder).toEqual(order);
    });
});
