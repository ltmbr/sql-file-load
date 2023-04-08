import path from '../lib/load.js';
import t from 'tap';

t.test('Load', async t => {
  const sqlPath = path('test/sql');

  await t.test('load', async () => {
    const file1 = await sqlPath.load('users');

    t.type(file1, 'Object');
    t.type(file1, 'FileMethod');

    try {
      await sqlPath.load('foo');
    } catch (error) {
      t.type(error, 'Error');
      t.equal(error.message, 'The foo file does not exist!');
    }
  });

  await t.test('method', async () => {
    const method = await sqlPath.load('users');

    // load and name
    t.equal(
      await sqlPath.load('users#insert'),
      'INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?);'
    );
    t.equal(
      await sqlPath.load('users#update'),
      'UPDATE users SET name = ?, email = ?, username = ?, password = ? WHERE id = ?;'
    );
    t.equal(await sqlPath.load('users#delete'), 'DELETE FROM users WHERE id = ?;');
    t.equal(await sqlPath.load('users#find'), 'SELECT * FROM users WHERE id = ?;');
    t.equal(await sqlPath.load('users#find-all'), 'SELECT * FROM users ORDER BY id DESC;');
    t.equal(await sqlPath.load('users#find-by-email'), 'SELECT * FROM users WHERE email = ?;');
    t.equal(await sqlPath.load('users#find-by-username'), 'SELECT * FROM users WHERE username = ?;');

    // at
    t.equal(method.at(1), 'INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?);');
    t.equal(method.at(2), 'UPDATE users SET name = ?, email = ?, username = ?, password = ? WHERE id = ?;');
    t.equal(method.at(3), 'DELETE FROM users WHERE id = ?;');
    t.equal(method.at(4), 'SELECT * FROM users WHERE id = ?;');
    t.equal(method.at(5), 'SELECT * FROM users ORDER BY id DESC;');
    t.equal(method.at(6), 'SELECT * FROM users WHERE email = ?;');
    t.equal(method.at(7), 'SELECT * FROM users WHERE username = ?;');
    t.equal(method.at(8), null);

    // default
    t.equal(method.default(), 'INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?);');

    // first
    t.equal(method.first(), 'INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?);');

    // last
    t.equal(method.last(), 'SELECT * FROM users WHERE username = ?;');

    // name
    t.equal(method.name('insert'), 'INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?);');
    t.equal(method.name('Insert'), 'INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?);');
    t.equal(method.name('update'), 'UPDATE users SET name = ?, email = ?, username = ?, password = ? WHERE id = ?;');
    t.equal(method.name('Update'), 'UPDATE users SET name = ?, email = ?, username = ?, password = ? WHERE id = ?;');
    t.equal(method.name('delete'), 'DELETE FROM users WHERE id = ?;');
    t.equal(method.name('Delete'), 'DELETE FROM users WHERE id = ?;');
    t.equal(method.name('find'), 'SELECT * FROM users WHERE id = ?;');
    t.equal(method.name('Find'), 'SELECT * FROM users WHERE id = ?;');
    t.equal(method.name('find-all'), 'SELECT * FROM users ORDER BY id DESC;');
    t.equal(method.name('find_all'), 'SELECT * FROM users ORDER BY id DESC;');
    t.equal(method.name('FindAll'), 'SELECT * FROM users ORDER BY id DESC;');
    t.equal(method.name('find-by-email'), 'SELECT * FROM users WHERE email = ?;');
    t.equal(method.name('find_by_email'), 'SELECT * FROM users WHERE email = ?;');
    t.equal(method.name('FindByEmail'), 'SELECT * FROM users WHERE email = ?;');
    t.equal(method.name('find-by-username'), 'SELECT * FROM users WHERE username = ?;');
    t.equal(method.name('find_by_username'), 'SELECT * FROM users WHERE username = ?;');
    t.equal(method.name('FindByUsername'), 'SELECT * FROM users WHERE username = ?;');

    // next
    t.equal(method.next(), 'INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?);');
    t.equal(method.next(), 'UPDATE users SET name = ?, email = ?, username = ?, password = ? WHERE id = ?;');
    t.equal(method.next(), 'DELETE FROM users WHERE id = ?;');
    t.equal(method.next(), 'SELECT * FROM users WHERE id = ?;');
    t.equal(method.next(), 'SELECT * FROM users ORDER BY id DESC;');
    t.equal(method.next(), 'SELECT * FROM users WHERE email = ?;');
    t.equal(method.next(), 'SELECT * FROM users WHERE username = ?;');
    t.equal(method.next(), null);
    t.equal(method.next(), null);
    t.equal(method.next(), null);
  });
});
