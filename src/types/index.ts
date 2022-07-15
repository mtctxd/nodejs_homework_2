export enum HTTP_STATUS {
    OK_200 = 200,
    CREATED_201 = 201,
    ACCEPTED_202 = 202,
    NO_CONTENT_204 = 204,
    BAD_REQUEST_400 = 400,
    UNAUTHORIZED_401 = 401,
    FORBIDDEN_403 = 403,
    NOT_FOUND_404 = 404,
    REQUEST_TIMEOUT_408 = 408,
    INTERNAL_SERVER_ERROR_500 = 500,
}

export enum ValidationMethods {
    CREATE = 'create',
    UPDATE = 'update',
}