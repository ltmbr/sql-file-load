import {nameList} from './util.js';
import {list, MethodInterface} from './types.js';

export default function method(content: string): MethodInterface {
  return new Method(content);
}

class Method implements MethodInterface {
  private content: string;
  private data: Array<string> = [];
  private list: Array<string> = [];
  private hash: any = {};
  private keys: any = {};
  private sqlNext: number | undefined = 0;

  constructor(content: string) {
    this.content = content;
    this.parse();
  }

  at(index: number): string | null {
    if (index > 0 && this.list?.[--index] !== undefined)
      return this.list[index];

    return null;
  }

  default(): string | null {
    if (this.hash.hasOwnProperty('default'))
      return this.hash.default;

    return this.first();  
  }

  first(): string | null {
    if (this.list?.[0] !== undefined)
      return this.list[0];    

    return null;
  }

  last(): string | null {
    if (this.list.slice(-1)[0] !== undefined)
      return this.list.slice(-1)[0];     

    return null;
  }

  name(name: string): string | null {
    const real = this.keys.hasOwnProperty(name) ? this.keys[name] : name;

    if (this.hash.hasOwnProperty(real))
      return this.hash[real];

    return null; 
  }

  next(): string | null {
    if (this.sqlNext !== undefined) {
      const next = this.sqlNext++;

      if (this.list?.[next] !== undefined)
        return this.list[next];

      this.sqlNext = undefined;
    }

    return null;
  }

  private parse() {
    const match = this.content.match(/([^;]+;)/gm);

    // set data
    for (const index in match) {
      const data = match[Number(index)];
      const query = data.match(/--\s*(?:#|\[|\()\s*([\w-]+)\s*(?:|]|\))\n([^;]+;)/);
      
      if (query) {
        const name = query[1];
        const sql = query[2];

        this.data.push(name.trim());
        this.data.push(sql.trim());
      } else {
        this.data.push(index);
        this.data.push(data.trim());
      }
    }

    if (this.data.length == 0) {
      this.data.push('default');
      this.data.push(this.content.trim());      
    }

    for (let i = 0; i < this.data.length; i += 2) {
      const key = this.data[i];
      const value = this.data[i + 1];

      // set hash
      this.hash[key] = value;   
      
      // get name list
      const names: list = nameList(key);

      // set keys
      for (const name of names)
        this.keys[name] = key;

      // set list
      this.list.push(value);
    }
  }
}
