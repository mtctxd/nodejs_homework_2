import { z } from 'zod';
import { UserCreateProperties } from '../../../types';

const passwordRules = {
  errorMessage:
    'password shoulc contain between 6 and 16 characters, at least one number, special character',
  regexp:
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
};

const userSchema = {
  user_id: z.undefined(),
  is_deleted: z.undefined(),
  login: z.string().trim().min(6).max(21),
  password: z
    .string()
    .trim()
    .regex(passwordRules.regexp, { message: passwordRules.errorMessage }),
  age: z.number().int().min(12).max(120),
};

const userSchemaOptional = {
  user_id: z.undefined(),
  is_deleted: z.undefined(),
  login: z.string().trim().min(6).max(21).optional(),
  password: z
    .string()
    .trim()
    .regex(passwordRules.regexp, { message: passwordRules.errorMessage })
    .optional(),
  age: z.number().int().min(12).max(120).optional(),
};

const userCreateSchema: z.ZodSchema<UserCreateProperties> =
  z.object(userSchema);
const userUpdataSchema: z.ZodSchema<Partial<UserCreateProperties>> =
  z.object(userSchemaOptional);

const userValidationSchema = {
  create: userCreateSchema,
  update: userUpdataSchema,
};

export type UserCreateSchemaType = z.infer<typeof userCreateSchema>;
export type UserUpdateSchemaType = z.infer<typeof userUpdataSchema>;
export type UserValidationSchema = typeof userValidationSchema;
export type UserValidationKeys = keyof UserValidationSchema;

export default userValidationSchema;

