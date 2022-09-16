import * as SQLite from 'expo-sqlite';

export function getDbConnection() {
    const connection = SQLite.openDatabase('pizzaria.db');
    return connection;
}

export function createTables() {
    return new Promise((resolve, reject) => {
        const queryProductTable = `CREATE TABLE IF NOT EXISTS TB_PRODUCT
        (
            PRODUCT_ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            DESCRIPTION TEXT NOT NULL,
            PRICE TEXT NOT NULL
        ); `;

        const queryOrderTable = `CREATE TABLE IF NOT EXISTS TB_ORDER
        (
            ORDER_ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            ORDER_DATE DATE NOT NULL,
            STATUS TEXT NOT NULL
        ); `;

        const queryOrderProductTable = `CREATE TABLE IF NOT EXISTS TB_ORDER_PRODUCT
        (
            ORDER_PRODUCT_ID TEXT NOT NULL PRIMARY KEY AUTOINCREMENT,
            QUANTITY INTEGER NOT NULL,
            PRODUCT_ID INTEGER NOT NULL,
            ORDER_ID INTEGER NOT NULL,
            FOREIGN KEY(PRODUCT_ID) REFERENCES TB_PRODUCT(PRODUCT_ID),
            FOREIGN KEY(ORDER_ID) REFERENCES TB_ORDER(ORDER_ID)
        ); `;

        const fullDatabaseCreationQuery = queryProductTable + queryOrderTable 
                                         + queryOrderProductTable;

        const dbConnection = getDbConnection();

        dbConnection.transaction(transaction => {
            transaction.executeSql(fullDatabaseCreationQuery, [],
                (_) => resolve(true))
        }, error => {
            console.log(error);
            resolve(false);
        });
    })
}