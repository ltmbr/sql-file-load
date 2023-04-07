import {generateKey, findFile, loadFile, nameList, removeExtension} from '../lib/util.js';
import t from 'tap';

t.test('Util', async t => {
  await t.test('loadFile', async () => {
    const file_data = await loadFile('test/sql/users.sql'); 
    t.match(file_data, /INSERT/);
    t.match(file_data, /UPDATE/);
    t.match(file_data, /DELETE/);
    t.match(file_data, /SELECT/);

    generateKey();
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
