export type list = Array<string>;

export interface method {
  at(index: number): string | null;
  default(): string | null;
  first(): string | null;
  last(): string | null;
  name(name: string): string | null;
  next(): string | null;
}
