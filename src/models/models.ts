export type IngredientType = 'bun' | 'sauce' | 'main';

export interface IIngredient {
    _id: string;
    name: string;
    type: IngredientType;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    qty: number;
    guid?: string;
}

export interface IOrder {
    _id: number;
}

export interface IUser {
    name: string;
    email: string;
    password?: string;
}

export interface IUserWithPass extends IUser {
    password: string;
}

export type TTab = {
    displayName: string;
    type: IngredientType;
}

export type TRoute = {
    title: string;
    path: string;
}

export interface IRoutes {
    [propertyName: string]: TRoute
}

export interface LocationState {
    from?: {
        pathname: string;
    };
}

export type TIngredientParam = {
    id: string;
}

export type TMessage = {
    message: string;
}

export interface IFeedItem {
    date: string;
    title: string;
    status: string;
    ingredients: IIngredient[];
    _id: string;
    number: number;
}

export interface IFeedSummary {
    done: number[];
    inProgress: number[];
    total: number;
    totalToday: number;
}

export interface IFeed {
    orders: ReadonlyArray<IFeedItemDb>;
    total: number;
    totalToday: number;
}

export interface IFeedItemDb {
    ingredients: ReadonlyArray<string>;
    _id: string;
    status: string;
    number: number;
    createdAt: string;
    updatedAt: string;
    name: string;
}