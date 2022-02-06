import { IRoutes, TTab } from "./models";

export const BUN = 'bun'
export const SAUCE = 'sauce';
export const MAIN = 'main';

export const TABS:ReadonlyArray<TTab> = [
    {displayName: 'Булки', type: BUN}, 
    {displayName: 'Соусы', type: SAUCE}, 
    {displayName: 'Начинки', type: MAIN}]

export const NO_BUN_IN_ORDER = 'Пожалуйста выберите булку.';

export const ROUTES:IRoutes = {
    Home: {title: "Конструктор", path: "/"},
    Login: {title: "Вход", path: "/login"},
    Register: {title: "Регистрация", path: "/register"},
    ForgotPassword: {title: "Восстановление пароля", path: "/forgot-password"},
    ResetPassword: {title: "Восстановление пароля", path: "/reset-password"},
    Profile: {title: "Личный кабинет", path: "/profile"},
    Ingredient: {title: "Ингредиент", path: "/ingredients/:id"},
    Orders: {title: "Лента заказов", path: "/orders"},
    History: {title: "", path: "/profile/orders"}
}

export const AUTH_PREFIX = 'Bearer';
export const REFRESH_TOKEN_COOKIE = 'refreshToken';
export const ACCESS_TOKEN_COOKIE = 'accessToken';