import express, { Application } from "express";
import appConfig from "../config";
import { appLogger } from "../feature/logger";
import { GroupModel } from "../v1/models/groupModel";
import { UserGroupModel } from "../v1/models/userGroupModel";
import { UserModel } from "../v1/models/userModel";
import groupRouter from "../v1/routers/groupRouter";
import userRouter from "../v1/routers/userRouter";
import { GroupCreateProperties, LoggingTypes } from "../v1/types";

const mockUsers = [
  {
    login: "Romkaa",
    password: "asd@3wdASd",
    age: 15,
    user_id: "1",
  },
  {
    login: "RomkaAada",
    password: "asd@3asdwdASd",
    age: 51,
    user_id: "2",
  },
  {
    login: "Vaaraaasx",
    password: "asd@3wdASd",
    age: 15,
    user_id: "3",
  },
  {
    login: "Vaaraaasxada",
    password: "asd@3asdwdASd",
    age: 51,
    user_id: "4",
  },
];

const mockGroups = [
  {
    group_id: "1",
    name: "GUESTS",
    premissions: ["DELETE", "UPLOAD_FILES", "WRITE"],
  },
  {
    group_id: "2",
    name: "ADMINS",
    premissions: ["SHARE", "WRITE"],
  },
];

const initExpress = (app: Application) => {
  app.use(express.json());
  app.use("/v1/user", userRouter);
  app.use("/v1/group", groupRouter);

  app.get("/v1/drop", async (req, res) => {
    try {
      await UserModel.drop({ cascade: true });
      console.log("UserModel table droped");
      await GroupModel.drop({ cascade: true });
      console.log("GroupModel table droped");
      await UserGroupModel.drop({ cascade: true });
      console.log("UserGroup table droped");

      res.send("droped");
    } catch (error) {
      res.send(error);
    }
  });

  app.post("/v1/mock", async (req, res) => {
    try {
      const users = await UserModel.bulkCreate(mockUsers, {
        returning: true,
        include: GroupModel,
      });
      const groups = await GroupModel.bulkCreate(
        mockGroups as GroupCreateProperties[],
        {
          returning: true,
          include: UserModel,
        }
      );

      res.send({
        data: {
          users,
          groups,
        },
      });
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  });

  app.get("/v1/all", async (req, res) => {
    try {
      const users = await UserModel.findAll({ include: GroupModel });
      const groups = await GroupModel.findAll({ include: UserModel });

      res.send({
        data: {
          users,
          groups,
        },
      });
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  });

  app.listen(appConfig.express.port, () => {
    appLogger.log(
      LoggingTypes.Info,
      `Server is started on port ${appConfig.express.port}`
    );
  });
};

export default initExpress;
