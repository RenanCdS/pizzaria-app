import { getDbConnection } from "./DbService";

export function createOrder (orderProducts) {
    return new Promise((resolve, reject) => {
        const queryOrder = `INSERT INTO TB_ORDER (ORDER_DATE, STATUS)
                    VALUES (?, ?); `;
        const queryOrderProduct = `INSERT INTO TB_ORDER_PRODUCT (QUANTITY, PRODUCT_ID, ORDER_ID)
                    VALUES (?, ?, ?); `;
        let orderId = 0;
        const connection = getDbConnection();
        const currentDate = new Date();
        const currentDbDate = currentDate.getFullYear() + '-' +
         (Number(currentDate.getMonth()) + 1) + '-' + currentDate.getDate();
        connection.transaction(transaction => {
            transaction.executeSql(queryOrder, [currentDbDate, 'FINISHED'],
                (_, result) => {
                    orderId = result.insertId;
                    orderProducts.map((orderProduct) => {
                        transaction.executeSql(queryOrderProduct, [orderProduct.quantity, 
                                                        orderProduct.code, orderId],
                                (_, resultOrderProduct) => {
                                    resolve(true);
                                });
                });
            })
        }, error => {
            console.log(error);
            resolve(false);
        });
    });
}

export function getOrders () {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM TB_ORDER O INNER JOIN 
                    TB_ORDER_PRODUCT OP ON O.ORDER_ID = OP.ORDER_ID
                    INNER JOIN TB_PRODUCT P ON P.PRODUCT_ID = OP.PRODUCT_ID; `;
            const connection = getDbConnection();
    
            connection.transaction(transaction => {
                transaction.executeSql(query, [],
                    (_, results) => {
                        const ordersProducts = [];
                        for (let n = 0; n < results.rows.length; n++) {
                            const orderId = results.rows.item(n)['ORDER_ID'];
                            const currentOrder = ordersProducts.find(orderProduct => orderProduct.code === orderId);
                            if (currentOrder === null || currentOrder === undefined) {
                                ordersProducts.push({
                                    code: orderId,
                                    products: [{ 
                                        productId: results.rows.item(n)['PRODUCT_ID'],
                                        description: results.rows.item(n)['DESCRIPTION'],
                                        quantity: results.rows.item(n)['QUANTITY'],
                                        price: results.rows.item(n)['PRICE'],
                                        date: results.rows.item(n)['ORDER_DATE']
                                    }]
                                })
                            } else {
                                currentOrder.products.push({
                                    productId: results.rows.item(n)['PRODUCT_ID'],
                                        description: results.rows.item(n)['DESCRIPTION'],
                                        quantity: results.rows.item(n)['QUANTITY'],
                                        price: results.rows.item(n)['PRICE'],
                                        date: results.rows.item(n)['ORDER_DATE']
                                })
                            }
                        }
                        resolve(ordersProducts);
                    });
            }, error => {
                console.log(error);
                resolve([]);
            });
        });
}