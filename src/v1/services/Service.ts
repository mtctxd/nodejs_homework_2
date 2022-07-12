import { Models } from '../types';

class Service<T extends Models> {
  public model: T;
  constructor(model: T) {
    this.model = model;
  }
}

export default Service;