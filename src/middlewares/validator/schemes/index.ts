import { groupValidationsSchema } from "./groupSchema";
import { userValidationsSchema } from "./userSchema";

export type ValidatorSchema = typeof validationShcemes.user | typeof validationShcemes.group;

export const validationShcemes = {
  user: userValidationsSchema,
  group: groupValidationsSchema,
};
