// success
// Executing (default): SELECT "id", "group_id", "name", "premissions", "createdAt", "updatedAt" FROM "groups" AS "GroupModel" WHERE "GroupModel"."id" = 2;
// Executing (default): SELECT "id", "user_id", "login", "password", "age", "is_deleted", "createdAt", "updatedAt" FROM "users" AS "UserModel" WHERE "UserModel"."id" = 2;
// Executing (default): INSERT INTO "user_group" ("id","group_id","user_id","createdAt","updatedAt") VALUES (DEFAULT,$1,$2,$3,$4) RETURNING "id","group_id","user_id","createdAt","updatedAt";

// error
// Executing (default): SELECT "id", "group_id", "name", "premissions", "createdAt", "updatedAt" FROM "groups" AS "GroupModel" WHERE "GroupModel"."id" = 2;
// Executing (default): SELECT "id", "user_id", "login", "password", "age", "is_deleted", "createdAt", "updatedAt" FROM "users" AS "UserModel" WHERE "UserModel"."id" = 2;
