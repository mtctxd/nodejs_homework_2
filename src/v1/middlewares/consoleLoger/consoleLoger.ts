import { NextFunction, Request, Response } from "express";

class ConsoleLoger {
  constructor(
    protected req: Request,
    protected res: Response,
    protected next: NextFunction
  ) {
    this.req = req;
    this.res = res;
    this.next = next;

    console.log("called");

    return this;
  }
}

export const consoleLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => new ConsoleLoger(req, res, next);

export default ConsoleLoger;
