import { v4 as uuid } from 'uuid';

import { UserCreationAttributes, UserModel } from '../models';
import { User } from '../types';

class Service<T extends typeof UserModel> {
  public model: T;

  constructor(model: T) {
    this.model = model;
  }
}

export default Service;
