# sql-file-load

This package is a simple SQL file loader.

## Synopsis

File: /var/www/sql/users.sql

```sql
-- (find)
SELECT * FROM users WHERE id = ?;
 
-- # find-all
SELECT * FROM users ORDER BY id DESC;
 
-- [insert]
INSERT INTO users (name, login, password) VALUES (?, ?, ?);
```

Code:

```ts
import path from 'sql-file-load';

const sqlPath = path('/var/www/sql');

// load users.sql file
const users: any = await sqlPath.load('users');
  
const find = users.name('find');        // SELECT * FROM users WHERE id = ?;
const findAll = users.name('find-all'); // SELECT * FROM users ORDER BY id DESC;
const insert = users.name('insert');    // INSERT INTO users (name, login, password) VALUES (?, ?, ?);

// or

const find = await sqlPath.load('users#find');        // SELECT * FROM users WHERE id = ?; 
const findAll = await sqlPath.load('users#find-all'); // SELECT * FROM users ORDER BY id DESC;
const insert = await sqlPath.load('users#insert');    // INSERT INTO users (name, login, password) VALUES (?, ?, ?);
```

## Install

```
npm install sql-file-load
```

## Version

1.1.4

## Methods

### load

```ts
const method: any = await sqlPath.load('file-name'); 
const method: any = await sqlPath.load('file-name.sql');
const sql = await sqlPath.load('file-name#sql-name'); // when passed the name returns the SQL
```

Load the content in the reference and return an instance of class FileMethod.

# Class FileMethod

## Methods

### at

```ts

/*
SELECT * FROM admin;

UPDATE admin SET name = ? WHERE id = ?;

DELETE FROM admin WHERE id = ?;
*/

const sql = method.at(1); // SELECT * FROM admin;

const sql = method.at(2); // UPDATE admin SET name = ? WHERE id = ?;

const sql = method.at(3); // DELETE FROM admin WHERE id = ?;
```

Returns the SQL by position in the list, starting with 1.

### default

```ts
const sql = method.default();
```

Returns the first SQL or SQL named as default.

### first

```ts
const sql = method.first();
```

Returns first the SQL.

### last

```ts
const sql = method.last();
```

Returns last the SQL.

### name

```ts
/*
Three formats to define a name
-- # name
-- [name]
-- (name)
*/

const sql = method.name('name');
```

Returns SQL by name.

### next

```ts
let currentSql;

while ((currentSql = method.next()) !== null) {
  console.log(currentSql);
}
```

Returns the next SQL like an iterator.

## Author

Lucas Tiago de Moraes

## Copyright

(c) Lucas Tiago de Moraes 2022 - 2023

## License

MIT