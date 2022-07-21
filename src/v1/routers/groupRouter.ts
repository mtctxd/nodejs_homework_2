import { Router } from "express";
import { groupController } from "../controllers";

const groupRouter = Router();

(async () => {
  groupRouter.get("/", (req, res) => groupController.getAll(req, res));
  groupRouter.get("/:id", (req, res) => groupController.getByID(req, res));
  groupRouter.post("/", (req, res) => groupController.create(req, res));
  groupRouter.put("/:id", (req, res) => groupController.update(req, res));
  groupRouter.delete("/:id", (req, res) => groupController.delete(req, res));
})();

export default groupRouter;
