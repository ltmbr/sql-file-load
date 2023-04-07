import {existsSync} from 'node:fs';
import {findFile, nameList, loadFile, removeExtension} from './util.js';
import method from './method.js';
import {list} from './types.js';

export default function path(path: string) {
  return new LoadPath(path);
}

class LoadPath {
  private path: string;

  constructor(path: string) {
    if (!path)
      throw Error(`Path not defined!`);

    if (!existsSync(path)) 
      throw Error(`The ${path} path does not exist!`);

    this.path = path.replace(/\/$/, '');
  }

  async load(fileName: string) {
    let name;

    const parts = fileName.split('#');

    if (parts.length == 2) {
      fileName = removeExtension(parts[0]);
      name     = parts[0];       
    } else {
      fileName = removeExtension(fileName);
    }

    if (fileName && /^[\w\-\/]+$/.test(fileName)) {
      const names: list = nameList(`${this.path}/${fileName}`);

      const file = await findFile(names);

      if (file === undefined) 
        throw Error(`The ${fileName} file does not exist!`);

      const content = await loadFile(file);

      if (content === undefined)
        throw Error(`The ${file} file has no content!`);

      return method(content); 
    }

    return null;
  }
}
