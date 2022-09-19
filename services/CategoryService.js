import { getDbConnection } from './DbService';

export async function createCategory(description) {
    
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO TB_CATEGORY(DESCRIPTION)
                    VALUES (?); `;
        const connection = getDbConnection();

        connection.transaction(transaction => {
            transaction.executeSql(query, [description],
                (_, result) => {
                    resolve(result.rowsAffected > 0);
                });
        }, error => {
            resolve(false);
        });
    });
}

export async function getCategories() {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM TB_CATEGORY; `;
        const connection = getDbConnection();

        connection.transaction(transaction => {
            transaction.executeSql(query, [],
                (_, results) => {
                    const categories = [];
                    for (let n = 0; n < results.rows.length; n++) {
                        const category = {
                            code: results.rows.item(n)['CATEGORY_ID'],
                            description: results.rows.item(n)['DESCRIPTION']
                        };
                        categories.push(category);
                    }
                    resolve(categories);
                });
        }, error => {
            console.log(error);
            resolve([]);
        });
    });
}

export async function removeCategoryByCode(code) {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM TB_CATEGORY WHERE CATEGORY_ID = ?;`;
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

export async function updateCategoryByCode({ code, description }) {
    return new Promise((resolve, reject) => {
        const query = `UPDATE TB_CATEGORY SET DESCRIPTION = ?
                    WHERE CATEGORY_ID = ?; `;
        const connection = getDbConnection();

        connection.transaction(transaction => {
            transaction.executeSql(query, [description, code],
                (_, result) => {
                    resolve(result.rowsAffected > 0);
                });
        }, error => {
            console.log(error);
            resolve(false);
        });
    });
}