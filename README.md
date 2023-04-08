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
  
const find = users.name('find');     // SELECT * FROM users WHERE id = ?;
const findAll = users.name('find-all'); // SELECT * FROM users ORDER BY id DESC;
const insert = users.name('insert');   // INSERT INTO users (name, login, password) VALUES (?, ?, ?);

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

## Author

Lucas Tiago de Moraes

## Copyright

(c) Lucas Tiago de Moraes 2022

## License

MIT