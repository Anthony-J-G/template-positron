import * as sqlite3 from 'sqlite3';
import * as path from "path";

// Open a SQLite database in-memory (you can use a file path for a persistent database)
// const db = new sqlite3.Database(':memory:');
const DATABASE_PATH = path.join(process.cwd(), 'test.sqlite');



class Table {
    private tableName: string = "";
    columns: Array<string> = [];
    rows: Array<any> = [];
    err: any = null;
    errno: number = -1;

    // path.join(process.cwd(), 'test.db')
    constructor(table_name) {
        this.tableName = table_name;
    }

}


async function loadTableColumns(table_name: string): Promise<any> {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(DATABASE_PATH);
        const tmp: Table = new Table(table_name);

        const pragmaStmt = `PRAGMA table_info(${table_name});`;
        var columns: Array<string> = [];
        db.all(pragmaStmt, [], (err, rows) => {
            if (err) {
                reject(err)
            }
            if (rows === undefined) {
                resolve(columns)
            }

            var i: number = 0
            rows.forEach((row) => {
                columns.push(row["name"]);
            });
            db.close();
            resolve(columns);
        });
    });
}


async function loadTableData(table_name: string): Promise<any> {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(DATABASE_PATH);

        const selectStmt = `SELECT * FROM ${table_name}`;
        var data: Array<any> = [];
        db.all(selectStmt, [], (err, rows) => {
            if (err) {
                reject(err)
            }
            if (rows === undefined) {
                resolve(data)
            }

            var i: number = 0
            rows.forEach((row) => {
                data.push(row);
            });
            db.close();
            resolve(data);
        });
    });
}


export function openDatabase() {
    const db = new sqlite3.Database(path.join(process.cwd(), 'test.db'));
}


export async function getDemoTable(): Promise<Table> {
    const demoTableName = "Temples"
    const targetTable: Table = new Table(demoTableName);

    await loadTableColumns(demoTableName)
    .then(columns => {
        targetTable.columns = columns;
    })
    .catch(error => {
        targetTable.err = error;
        console.error('Error loading table while attempting to read columns\n', error);
    });

    await loadTableData(demoTableName)
    .then(data => {
        targetTable.rows = data;
    })
    .catch(error => {
        targetTable.err = error;
        console.error('Error loading table while attempting to read data\n', error);
    });

    return targetTable;
}