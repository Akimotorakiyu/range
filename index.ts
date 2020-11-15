class _Range {
  constructor(public end: number) {
    this.end = end;
  }

  *[Symbol.iterator]() {
    const end = this.end;
    for (let index = 0; index < end; index++) {
      yield index;
    }
  }

  readuce<T, F>(
    fn: (readucer: T, it: number, index: number, range: _Range) => T,
    readucer: T
  ) {
    let temp = readucer;
    for (const iterator of this) {
      temp = fn(temp, iterator, iterator, this);
    }
    return temp;
  }

  forEach(fn: (it: number, index: number, range: _Range) => void) {
    for (const iterator of this) {
      fn(iterator, iterator, this);
    }
  }

  map<T>(fn: (it: number, index: number, range: _Range) => T): T[] {
    const temp = [];
    for (const iterator of this) {
      temp.push(fn(iterator, iterator, this));
    }
    return temp;
  }

  filter(fn: (it: number, index: number, range: _Range) => boolean) {
    const temp: number[] = [];
    for (const iterator of this) {
      if (fn(iterator, iterator, this)) {
        temp.push(iterator);
      }
    }
    return temp;
  }

  some(fn: (it: number, index: number, range: _Range) => boolean) {
    for (const iterator of this) {
      if (fn(iterator, iterator, this)) {
        return true;
      }
    }
    return false;
  }

  every(fn: (it: number, index: number, range: _Range) => boolean) {
    for (const iterator of this) {
      if (!fn(iterator, iterator, this)) {
        return false;
      }
    }
    return true;
  }

  values() {
    return this[Symbol.iterator]();
  }
}

export function range(end: number) {
  return new _Range(end);
}

export default range;
