export enum Url {
    LOGIN = '/auth/login',
    LOGOUT = '/auth/me',
    AUTH_ME = '/auth/me',
    REGISTER = '/auth/register',

    GET_CONTACTS='/contacts',
    ADD_CONTACTS='/contacts',
    DELETE_CONTACTS='/contacts/',
}
export enum PATH {
    LOGIN = '/login',
    REGISTRATION = '/registration',
    PROFILE = '/',
    SEND_EMAIL = '/send-email',
    NEW_PASSWORD = '/new-password/:token',
    CHECK_EMAIL = '/check-email',
    NOT_FOUND = '/404',
    EDIT_PROFILE = '/edit-profile',
}