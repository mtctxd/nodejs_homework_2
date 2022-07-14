import { z } from 'zod';

const passwordRules = {
  errorMessage:
    'password should contain eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
  regexp:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};

const userSchema = {
  id: z.undefined(),
  user_id: z.undefined(),
  login: z.string().trim().min(6).max(21),
  password: z
    .string()
    .trim()
    .regex(passwordRules.regexp, { message: passwordRules.errorMessage }),
  age: z.number().int().min(12).max(120),
};

const userSchemaOptional = {
  id: z.undefined(),
  user_id: z.undefined(),
  login: z.string().trim().min(6).max(21).optional(),
  password: z
    .string()
    .trim()
    .regex(passwordRules.regexp, { message: passwordRules.errorMessage })
    .optional(),
  age: z.number().int().min(12).max(120).optional(),
};

const userCreateSchema = z.object(userSchema);
const userUpdataSchema = z.object(userSchemaOptional);

const userValidationSchema = {
  create: userCreateSchema,
  update: userUpdataSchema,
};

export default userValidationSchema;
