import { IRoutes, TTab } from "./models";

export const BUN = 'bun'
export const SAUCE = 'sauce';
export const MAIN = 'main';

export const TABS: ReadonlyArray<TTab> = [
    { displayName: 'Булки', type: BUN },
    { displayName: 'Соусы', type: SAUCE },
    { displayName: 'Начинки', type: MAIN }]

export const NO_BUN_IN_ORDER = 'Пожалуйста выберите булку.';

export const ROUTES: IRoutes = {
    Home: { title: "Конструктор", path: "/" },
    Login: { title: "Вход", path: "/login" },
    Register: { title: "Регистрация", path: "/register" },
    ForgotPassword: { title: "Восстановление пароля", path: "/forgot-password" },
    ResetPassword: { title: "Восстановление пароля", path: "/reset-password" },
    Profile: { title: "Личный кабинет", path: "/profile" },
    Ingredient: { title: "Ингредиент", path: "/ingredients/:id" },
    Feed: { title: "Лента заказов", path: "/feed" },
    Order: { title: "", path: "/feed/:id"},
    History: { title: "", path: "/profile/orders" },
    OrderHistory: { title: "", path: "/profile/orders/:id"}
}

export const AUTH_PREFIX = 'Bearer';
export const REFRESH_TOKEN_COOKIE = 'refreshToken';
export const ACCESS_TOKEN_COOKIE = 'accessToken';

export const DONE_STATUS = 'done';
export const PENDING_STATUS = 'pending';
export const CREATED_STATUS = 'created';