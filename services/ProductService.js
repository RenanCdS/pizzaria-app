import * as SQLite from 'expo-sqlite';
import { getDbConnection } from './DbService';


export async function createProduct(description, price) {
    
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO TB_PRODUCT (DESCRIPTION, PRICE)
                    VALUES (?, ?); `;
        const connection = getDbConnection();

        connection.transaction(transaction => {
            transaction.executeSql(query, [description, price],
                (_, result) => {
                    resolve(result.rowsAffected > 0);
                });
        }, error => {
            console.log(error);
            resolve(false);
        });
    });
}

export async function getProducts() {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM TB_PRODUCT; `;
        const connection = getDbConnection();

        connection.transaction(transaction => {
            transaction.executeSql(query, [],
                (_, results) => {
                    const products = [];
                    for (let n = 0; n < results.rows.length; n++) {
                        const product = {
                            code: results.rows.item(n)['PRODUCT_ID'],
                            description: results.rows.item(n)['DESCRIPTION'],
                            price: results.rows.item(n)['PRICE']
                        };
                        products.push(product);
                    }
                    resolve(products);
                });
        }, error => {
            console.log(error);
            resolve([]);
        });
    });
}