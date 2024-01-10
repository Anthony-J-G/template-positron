import sqlite3



DATABASE_PATH = "../test.sqlite"
TABLE_NAME = "Temples"



def GenerateSampleTable():
    # SQLite statement to create a table if it doesn't exist
    create_table_sql = '''
        CREATE TABLE IF NOT EXISTS Temples (
            Name TEXT PRIMARY KEY,
            Boss TEXT,
            Item TEXT,
            FairyReward TEXT
        );
    '''
    CreateTable(create_table_sql)

    primary_keys = ["Woodfall", "Snowhead", "Great Bay", "Stone Tower"]
    data_to_insert = [
        ("Woodfall", "Odoolwa", "Bow", "Super Spin Attack"),
        ("Snowhead", "Goht", "Fire Arrows", "Double Magic Meter"),
        ("Great Bay", "Gyorg", "Ice Arrows", "Double Defense"),
        ("Stone Tower", "Twinmold", "Light Arrows", "Great Fairy's Sword")
    ]
    insert_sql = f'''
        INSERT INTO Temples (Name, Boss, Item, FairyReward)
        VALUES (?, ?, ?, ?);
    '''
    if (RowsExist(primary_keys)):
        print("Rows already exist, aborting insert operation")
        return
    else:
        InsertData(insert_sql, data_to_insert)


def RowsExist(primary_keys):
    # Connect to SQLite database
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    check_rows_sql = f'''
        SELECT 
            COUNT(*)
        FROM 
            {TABLE_NAME}
    '''
    cursor.execute(check_rows_sql)
    row_count = cursor.fetchone()[0]

    conn.close()

    return row_count > 0


def CreateTable(sql_stmt):
    conn = sqlite3.connect(DATABASE_PATH)

    # Create a cursor object to execute SQL statements
    cursor = conn.cursor()
    # Execute the SQL statement
    cursor.execute(sql_stmt)

    # Commit the changes and close the connection
    conn.commit()
    conn.close()

    print("Statement executed successfully.") 


def InsertData(sql_stmt, data):
    conn = sqlite3.connect(DATABASE_PATH)

    # Create a cursor object to execute SQL statements
    cursor = conn.cursor()
    # Execute the SQL statement
    cursor.executemany(sql_stmt, data)

    # Commit the changes and close the connection
    conn.commit()
    conn.close()

    print("Statement executed successfully.")



if __name__ == "__main__":
    GenerateSampleTable()