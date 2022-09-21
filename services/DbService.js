import * as SQLite from 'expo-sqlite';

export function getDbConnection() {
    const connection = SQLite.openDatabase('pizzaria.db');
    return connection;
}

export function createTables() {
    return new Promise((resolve, reject) => {
        const queryCategoryTable = `CREATE TABLE IF NOT EXISTS TB_CATEGORY
        (
            CATEGORY_ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            DESCRIPTION TEXT NOT NULL,
            ACTIVE INTEGER NOT NULL DEFAULT 1
        ); `;
        
        const queryProductTable = `CREATE TABLE IF NOT EXISTS TB_PRODUCT
        (
            PRODUCT_ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            DESCRIPTION TEXT NOT NULL,
            CATEGORY_ID INTEGER NOT NULL,
            PRICE TEXT NOT NULL,
            ACTIVE INTEGER NOT NULL DEFAULT 1,
            FOREIGN KEY(CATEGORY_ID) REFERENCES TB_CATEGORY(CATEGORY_ID)
        ); `;

        const queryOrderTable = `CREATE TABLE IF NOT EXISTS TB_ORDER
        (
            ORDER_ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            ORDER_DATE DATE NOT NULL,
            STATUS TEXT NOT NULL,
            ACTIVE INTEGER NOT NULL DEFAULT 1
        ); `;

        const queryOrderProductTable = `CREATE TABLE IF NOT EXISTS TB_ORDER_PRODUCT
        (
            ORDER_PRODUCT_ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            QUANTITY INTEGER NOT NULL,
            PRODUCT_ID INTEGER NOT NULL,
            ORDER_ID INTEGER NOT NULL,
            ACTIVE INTEGER NOT NULL DEFAULT 1,
            FOREIGN KEY(PRODUCT_ID) REFERENCES TB_PRODUCT(PRODUCT_ID),
            FOREIGN KEY(ORDER_ID) REFERENCES TB_ORDER(ORDER_ID)
        ); `;

        const fullDatabaseCreationQuery = queryCategoryTable + queryProductTable + queryOrderTable 
                                         + queryOrderProductTable;

        const dbConnection = getDbConnection();


        dbConnection.transaction(transaction => {
            transaction.executeSql(fullDatabaseCreationQuery, [],
                (_) => { resolve(true) })
        }, error => {
            console.log(error);
            resolve(false);
        });
    })
}