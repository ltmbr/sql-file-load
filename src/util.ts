import type {list} from './type.js';
import {existsSync, lstatSync, readFileSync} from 'node:fs';
import camelCase from 'camelcase';
import decamelize from 'decamelize';

export async function findFile(nameList: list) {
  let file_name;

  nameList.forEach(file => {
    if (existsSync(`${file}.sql`)) {
      file_name = `${file}.sql`;

      return false;
    }
  });

  return file_name;
}

export function generateKey(max: number) {
  const array = [...genCharArray('a', 'z'), ...genCharArray('A', 'Z'), ...genCharArray('0', '9')];

  const total = array.length;

  let key = '';

  for (let i = 0; i < (max || 16); i++) key += array[randomInt(total)];

  return key;
}

export async function loadFile(fileName: string) {
  if (lstatSync(fileName.toString()).isFile()) {
    try {
      const data = readFileSync(fileName.toString(), 'utf8');
      return data;
    } catch (error) {
      throw Error(`Error in load file ${error}`);
    }
  }
}

export function nameList(name: string): list {
  name = removeExtension(name);

  const list: list = [];

  let tmp_list: list = name.split('/');

  tmp_list = camelCaseList(tmp_list);
  list.push(tmp_list.join('/'));

  tmp_list = snakeCaseList(tmp_list);
  list.push(tmp_list.join('/'));

  tmp_list = kebabCaseList(tmp_list);
  list.push(tmp_list.join('/'));

  return list.reverse();
}

export function removeExtension(fileName: string): string {
  return fileName.replace(/\.sql$/i, '');
}

function randomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

function genCharArray(char1: string, char2: string) {
  let i = char1.charCodeAt(0);
  const j = char2.charCodeAt(0);
  const a = [];

  for (; i <= j; ++i) a.push(String.fromCharCode(i));

  return a;
}

function camelCaseList(data: list): list {
  for (let i = 0; i < data.length; i++) data[i] = camelCase(data[i], {pascalCase: true});

  return data;
}

function snakeCaseList(data: list): list {
  for (let i = 0; i < data.length; i++) data[i] = decamelize(data[i], {separator: '_'});

  return data;
}

function kebabCaseList(data: list): list {
  for (let i = 0; i < data.length; i++) data[i] = data[i].replaceAll('_', '-');

  return data;
}
