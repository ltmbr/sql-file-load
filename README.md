# sql-file-load

This package is a simple SQL file loader.

file: /var/www/sql/users.sql

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
const users = await sqlPath.load('users');
  
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

1.0.0

## Methods

### load

```ts
const method = sqlPath.load('file-name'); 
const method = sqlPath.load('file-name.sql');
const sql = sqlPath.load('file-name#sql-name'); // when passed the name returns the SQL
```

Load the content in the reference and return an instance of class Method.

# Class Method

## Methods

### at

```ts
const sql = method.at('1');
```

Returns the SQL by position in the list, starting with 1.

### default

```ts
const sql = method.default();
```

Returns the first SQL or SQL named as default.

## Author

Lucas Tiago de Moraes

## Copyright

(c) Lucas Tiago de Moraes 2022

## License

MIT