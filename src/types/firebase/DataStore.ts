type JsonValue = string | number | boolean | null | JsonObject | JsonArray;

export interface JsonObject {
  [key: string]: JsonValue;
}

interface JsonArray extends Array<JsonValue> {}

export interface DataStoreInterface {
  data: JsonObject | Array<string>;
}

/**
 * Represents a data store for storing and updating data.
 */
export default class DataStore implements DataStoreInterface {
  data: JsonObject = {};

  constructor() {
    this.data = {};
  }

  updatePut(path: string, obj: JsonObject) {
    if (path === '/') {
      this.data = obj;
      return;
    }

    const pathParts = path.split('/');
    pathParts.shift();
    let currentNode: JsonObject | JsonValue = this.data;

    for (let i = 0; i < pathParts.length; i += 1) {
      const part = pathParts[i];

      if (i === pathParts.length - 1) {
        currentNode[part] = obj;
      } else {
        currentNode[part] = currentNode[part] || {};
        currentNode = currentNode[part];
      }
    }
  }

  updatePatch(path: string, obj: JsonObject): void {
    if (path === '/') {
      this.data = { ...this.data, ...obj };
      return;
    }

    const pathParts = path.split('/');
    pathParts.shift();
    let currentNode: JsonObject | JsonValue = this.data;

    for (let i = 0; i < pathParts.length; i += 1) {
      const part = pathParts[i];

      if (i === pathParts.length - 1) {
        currentNode[part] = { ...currentNode[part], ...obj };
      } else {
        currentNode[part] = currentNode[part] || {};
        currentNode = currentNode[part];
      }
    }
  }

  static createWithTestData(testData: JsonObject): DataStore {
    const store = new DataStore();
    store.data = testData;
    return store;
  }
}
