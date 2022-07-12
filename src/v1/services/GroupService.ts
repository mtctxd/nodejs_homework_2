import { Request } from 'express';
import { Group, GroupModel } from '../types';
import Service from './Service';
import { v4 as uuid } from 'uuid';
import { Op } from 'sequelize';

class GroupService<T extends GroupModel> extends Service<T> {
  constructor(model: T) {
    super(model);
  }

  public async getAll(req: Request) {
    const { limit, name } = req.query;

    if (name) {
      return await this.model.findAll({
        limit: Number(limit) || 10,
        where: {
          name: {
            [Op.iLike]: '%' + name + '%',
          },
        },
      });
    } else {
      return await this.model.findAll({
        limit: Number(limit) || 10,
      });
    }
  }

  public getById = async (id: string) => {
    return await this.model.findByPk(id);
  };

  public async create(itemInfo: Partial<Group>) {
    const { name, premissions } = itemInfo;
    const newItem = await this.model.create({
      group_id: uuid(),
      name,
      premissions,
    });

    return newItem;
  }

  public async update(id: string, itemInfo: Partial<Group>) {
    const { name, premissions } = itemInfo;

    try {
      await this.model.update(
        { name, premissions },
        {
          where: {
            id,
          },
        }
      );

      return await this.getById(id);
    } catch (error) {
      return { messege: 'server error: ', error };
    }
  }

  public async delete(id: string) {
    try {
      // await this.model.update(
      //   { is_deleted: true },
      //   {
      //     where: {
      //       id,
      //     },
      //   }
      // );
      const deletedItem = await this.model.destroy({ where: { id } });

      return deletedItem;
    } catch (error) {
      return { messege: 'server error: ', error };
    }
  }
}

export default GroupService;
