import express, { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from './types';

const app = express();

app.use(express.json());

const ErrorCatchable =
  (metadata: any = {}) =>
  (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
    const fn = descriptor.value;

    descriptor.value = (req: Request, res: Response, next: NextFunction) => {
      try {
        fn.call(this, req, res, next);
      } catch (error) {
        console.error({
          type: 'controller error',
          info: JSON.stringify(error),
        });
        res
          .status(HTTP_STATUS.BAD_REQUEST_400)
          .send({ message: 'Bad Request', details: error });
      }
    };
  };

const time = (target: any, key: string, t: any) => {
  console.log('^^^^^^^^^^^^^^^^^^^^^^^^^6');
};

class Test {
  constructor(protected readonly name: string) {
    this.name = name;
  }

  //   @ErrorCatchable()
  //   public async run (_req: Request, res: Response) {

  //     await this.logName();

  //     res.send(this.name);
  //   }

  @time
  public run = async (_req: Request, res: Response) => {
    await this.logName();

    res.send(this.name);
  };

  public async logName() {
    await Promise.resolve(() => console.log(this.name));
  }
}

const instance = new Test('Dima');

app.get('/', (req, res) => instance.run(req, res));

app.listen(3000, () => console.log('server started'));
