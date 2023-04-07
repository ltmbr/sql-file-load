import {findFile, generateKey, loadFile, nameList, removeExtension} from '../lib/util.js';
import t from 'tap';

t.test('Util', async t => {
  await t.test('findFile', async () => {
    const find1 = await findFile(['test/sql/users', 'test/sql/Users']);

    t.ok(find1);
    t.equal(find1, 'test/sql/users.sql');

    const find2 = await findFile(['test/sql/foo', 'test/sql/Foo']);

    t.type(find2, undefined);
  });

  await t.test('generateKey', async () => {
    const array = [5, 10, 15, 20, 25];

    for (const i of array) {
      const key = generateKey(i);
      t.match(key, /^[a-zA-Z0-9]+$/);
    }
  });

  await t.test('loadFile', async () => {
    const fileData = await loadFile('test/sql/users.sql');
    t.match(fileData, /INSERT/);
    t.match(fileData, /UPDATE/);
    t.match(fileData, /DELETE/);
    t.match(fileData, /SELECT/);
  });

  await t.test('nameList', async () => {
    const fileNameList1 = nameList('path/my-file.sql');
    t.equal(fileNameList1[0], 'path/my-file');
    t.equal(fileNameList1[1], 'path/my_file');
    t.equal(fileNameList1[2], 'Path/MyFile');

    const fileNameList2 = nameList('path/my_folders/my_users.sql');
    t.equal(fileNameList2[0], 'path/my-folders/my-users');
    t.equal(fileNameList2[1], 'path/my_folders/my_users');
    t.equal(fileNameList2[2], 'Path/MyFolders/MyUsers');

    const fileNameList3 = nameList('Path/MyFolders/MyArticles.sql');
    t.equal(fileNameList3[0], 'path/my-folders/my-articles');
    t.equal(fileNameList3[1], 'path/my_folders/my_articles');
    t.equal(fileNameList3[2], 'Path/MyFolders/MyArticles');
  });

  await t.test('removeExtension', async () => {
    const fileName1 = removeExtension('path/file.sql');
    t.equal(fileName1, 'path/file');

    const fileName2 = removeExtension('Path/File.Sql');
    t.equal(fileName2, 'Path/File');

    const fileName3 = removeExtension('PATH/FILE.SQL');
    t.equal(fileName3, 'PATH/FILE');
  });

  t.end();
});
