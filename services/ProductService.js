import * as SQLite from 'expo-sqlite';
import { getDbConnection } from './DbService';

export async function createProduct(description, price, categoryCode) {
    
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO TB_PRODUCT (DESCRIPTION, PRICE, CATEGORY_ID)
                    VALUES (?, ?, ?); `;
        const connection = getDbConnection();

        connection.transaction(transaction => {
            transaction.executeSql(query, [description, price, categoryCode],
                (_, result) => {
                    resolve(result.rowsAffected > 0);
                });
        }, error => {
            resolve(false);
        });
    });
}

export async function getProducts() {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM TB_PRODUCT WHERE ACTIVE = 1; `;
        const connection = getDbConnection();

        connection.transaction(transaction => {
            transaction.executeSql(query, [],
                (_, results) => {
                    const products = [];
                    for (let n = 0; n < results.rows.length; n++) {
                        const product = {
                            code: results.rows.item(n)['PRODUCT_ID'],
                            description: results.rows.item(n)['DESCRIPTION'],
                            price: results.rows.item(n)['PRICE'],
                            category: results.rows.item(n)['CATEGORY_ID'],
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

export async function getProductsByCategoryCode(categoryCode) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM TB_PRODUCT WHERE CATEGORY_ID = ? AND ACTIVE = 1; `;
        const connection = getDbConnection();

        connection.transaction(transaction => {
            transaction.executeSql(query, [categoryCode],
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

export async function removeProductByCode(code) {
    return new Promise((resolve, reject) => {
        const query = `UPDATE TB_PRODUCT SET ACTIVE = 0 WHERE PRODUCT_ID = ?;`;
        const connection = getDbConnection();

        connection.transaction(transaction => {
            transaction.executeSql(query, [code],
                (_) => {
                    resolve(true);
                });
        }, error => {
            console.log(error);
            resolve(false);
        });
    });
}

export async function updateProductByCode({ code, description, price, category}) {
    return new Promise((resolve, reject) => {
        const query = `UPDATE TB_PRODUCT SET DESCRIPTION = ?, PRICE = ?, CATEGORY_ID = ?
                    WHERE PRODUCT_ID = ?; `;
        const connection = getDbConnection();

        connection.transaction(transaction => {
            transaction.executeSql(query, [description, price, category, code],
                (_, result) => {
                    resolve(result.rowsAffected > 0);
                });
        }, error => {
            console.log(error);
            resolve(false);
        });
    });
}