import { userValidator } from '../middlewares/validator/Validator';
import { UserModel } from '../models';

class Service<T extends typeof UserModel, V extends typeof userValidator> {
  public model: T;
  public validator: V;

  constructor(model: T, validator: V) {
    this.model = model;
    this.validator = validator;
  }
}

export default Service;
