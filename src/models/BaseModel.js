export default class BaseModel {
  constructor(model = {}) {
    this.assign(model);
  }

  static mapModel(data = {}) {
    return new this(data);
  }

  static mapModels(arr = []) {
    return arr.map((data) => this.mapModel(data));
  }

  assign(model) {
    Object.assign(this, model);
  }
}
