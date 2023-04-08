import type {list, method} from './type.js';
import {existsSync} from 'node:fs';
import fileMethod from './method.js';
import {findFile, nameList, loadFile, removeExtension} from './util.js';

export default function path(path: string) {
  return new LoadPath(path);
}

class LoadPath {
  private path: string;

  constructor(path: string) {
    if (!path) throw Error(`Path not defined!`);

    if (!existsSync(path)) throw Error(`The ${path} path does not exist!`);

    this.path = path.replace(/\/$/, '');
  }

  async load(fileName: string): Promise<string | method | null> {
    let name: string | null = null;

    const parts = fileName.split('#');

    if (parts.length == 2) {
      fileName = removeExtension(parts[0]);
      name = parts[1];
    } else {
      fileName = removeExtension(fileName);
    }

    if (!fileName || /^\s+$/.test(fileName)) throw Error(`The file name is empty!`);

    const names: list = nameList(`${this.path}/${fileName}`);

    const file = await findFile(names);

    if (file === undefined) throw Error(`The ${fileName} file does not exist!`);

    const content = await loadFile(file);

    if (content === undefined) throw Error(`The ${file} file has no content!`);

    const loadMethod: method = fileMethod(content);

    if (name && loadMethod.name(name)) return loadMethod.name(name);

    return loadMethod;
  }
}
