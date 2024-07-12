class OrderService {
    static validateAndTransformOrder(order) {
        if (/[^a-zA-Z\s]/.test(order.name)) {
            throw new Error('Name contains non-English characters');
        }
        if (order.name !== order.name.charAt(0).toUpperCase() + order.name.slice(1)) {
            throw new Error('Name is not capitalized');
        }
        if (parseFloat(order.price) > 2000) {
            throw new Error('Price is over 2000');
        }
        if (!['TWD', 'USD'].includes(order.currency)) {
            throw new Error('Currency format is wrong');
        }
        if (order.currency === 'USD') {
            order.price = (parseFloat(order.price) * 31).toString();
            order.currency = 'TWD';
        }
        return order;
    }
}

module.exports = OrderService;
