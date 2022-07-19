import { z } from 'zod';
import {
  GroupCreateProperties,
  premisionTypes,
  UserCreateProperties,
} from '../../../types';

const groupSchema = {
  group_id: z.undefined(),
  name: z.string().min(6).max(16),
  premissions: z.array(z.enum(premisionTypes)),
  users: z.array(z.string()).optional(),
};

const groupSchemaOptional = {
  group_id: z.undefined().optional(),
  name: z.string().min(6).max(16).optional(),
  premissions: z.array(z.enum(premisionTypes)).optional(),
  users: z.array(z.string()).optional(),
};

const groupCreateSchema: z.ZodSchema<GroupCreateProperties> =
  z.object(groupSchema);
const groupUpdataSchema: z.ZodSchema<Partial<GroupCreateProperties>> =
  z.object(groupSchemaOptional);

const groupValidationSchema = {
  create: groupCreateSchema,
  update: groupUpdataSchema,
};

export type GroupCreateSchemaType = z.infer<typeof groupCreateSchema>;
export type GroupUpdateSchemaType = z.infer<typeof groupUpdataSchema>;
export type GroupValidationSchema = typeof groupValidationSchema;
export type GroupValidationKeys = keyof GroupValidationSchema;

export default groupValidationSchema;
