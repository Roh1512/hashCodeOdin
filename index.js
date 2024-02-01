class Item {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

class HashMap {
  constructor() {
    this.table = new Array(17);
    this.numberOfItems = 0;
  }
  hash(string, tableSize) {
    const str = String(string);
    let hash = 17; //choose prime number
    for (let i = 0; i < str.length; i++) {
      hash = 13 * hash * str.charCodeAt(i);
    }
    return hash % tableSize;
  }

  resize() {
    console.log("Resizing");
    const newTable = new Array(this.table.length * 2);
    for (let i = 0; i < this.table.length; i++) {
      const items = this.table[i];
      if (items) {
        items.forEach((item) => {
          const { key, value } = item;
          const index = this.hash(key, newTable.length);
          if (newTable[index]) {
            newTable[index].push(new Item(key, value));
          } else {
            newTable[index] = [new Item(key, value)];
          }
        });
      }
    }
    this.table = newTable;
  }

  setItem(key, value) {
    this.numberOfItems++;
    const loadFactor = this.numberOfItems / this.table.length;
    if (loadFactor > 0.75) {
      //Resize table
      this.resize();
    }
    const index = this.hash(key, this.table.length);
    console.log(index);
    if (this.table[index]) {
      this.table[index].push(new Item(key, value));
    } else {
      this.table[index] = [new Item(key, value)];
    }
  }

  getItem(key) {
    const index = this.hash(key, this.table.length);
    if (!this.table[index]) {
      return null;
    }
    const item = this.table[index].find((obj) => obj.key === key);
    return item;
  }

  has(key) {
    const index = this.hash(key, this.table.length);
    const array = this.table[index];
    if (!array) return false; // If the index is empty, key does not exist
    for (let i = 0; i < array.length; i++) {
      if (array[i].key === key) {
        return true; // Key found
      }
    }
    return false; // Key not found in the array at the calculated index
  }

  remove(key) {
    const index = this.hash(key, this.table.length);
    if (!this.table[index]) return false; // If the index is empty, key does not exist
    for (let i = 0; i < this.table[index].length; i++) {
      if (this.table[index][i].key === key) {
        this.table[index].splice(i, 1);
        return true;
      }
    }
    return false;
  }

  allItems() {
    const array = [];
    this.table.forEach((items) => {
      if (items) {
        items.forEach((item) => {
          array.push({ key: item.key, value: item.value });
        });
      }
    });
    return array;
  }
  getAllKeys() {
    const arrayOfKeys = [];
    this.table.forEach((items) => {
      if (items) {
        items.forEach((item) => {
          arrayOfKeys.push(item.key);
        });
      }
    });
    return arrayOfKeys;
  }

  getAllValues() {
    const arrayOfValues = [];
    this.table.forEach((items) => {
      if (items) {
        items.forEach((item) => {
          arrayOfValues.push(item.value);
        });
      }
    });
    return arrayOfValues;
  }
  numberOfKeys() {
    let number = 0;
    this.table.forEach((items) => {
      if (items) {
        items.forEach((item) => {
          if (item && item.hasOwnProperty("key")) {
            number++;
          }
        });
      }
    });
    return number;
  }

  clearAll() {
    this.table = new Array(17);
    this.numberOfItems = 0;
  }
}

const myTable = new HashMap();
myTable.setItem("name", "John");
console.log([...myTable.table]);
myTable.setItem("name1", "Wick");
console.log([...myTable.table]);
myTable.setItem("name2", "Snow");
console.log([...myTable.table]);
console.log(myTable.allItems());
console.log(myTable.has("name"));
console.log(myTable.remove("name"));
console.log([...myTable.table]);
console.log(myTable.allItems());
console.log(myTable.getAllKeys());
console.log(myTable.getAllValues());
console.log(myTable.allItems());
myTable.setItem("name", "John");
console.log(myTable.numberOfKeys());
myTable.clearAll();
console.log(myTable.table);
