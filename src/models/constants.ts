export const BUN = 'bun'
export const SAUCE = 'sauce';
export const MAIN = 'main';

export const TABS = [
    {displayName: 'Булки', type: BUN}, 
    {displayName: 'Соусы', type: SAUCE}, 
    {displayName: 'Начинки', type: MAIN}]

export const NO_BUN_IN_ORDER = 'Пожалуйста выберите булку.';

export const ROUTES = {
    Home: {title: "Конструктор", path: "/"},
    Login: {title: "Вход", path: "/login"},
    Register: {title: "Регистрация", path: "/register"},
    ForgotPassword: {title: "Восстановление пароля", path: "/forgot-password"},
    ResetPassword: {title: "Восстановление пароля", path: "/reset-password"},
    Profile: {title: "Личный кабинет", path: "/profile"},
    Ingredient: {title: "Ингредиент", path: "/ingredients/:id"},
    Orders: {title: "Лента заказов", path: "/orders"}
}