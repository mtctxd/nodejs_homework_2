import { Model } from "sequelize/types";
import { UserModel } from "../models";

class Service<T extends typeof UserModel> {
    public model: T; 

    constructor(model: T) {
        this.model = model;
    }

    getAll = async () => {
        const items = await this.model.findAll();
        return items;
    }
}

export const userService = new Service(UserModel);