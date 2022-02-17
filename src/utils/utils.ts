import { ACCESS_TOKEN_COOKIE, AUTH_PREFIX, REFRESH_TOKEN_COOKIE } from "../models/constants";
import moment from "moment";
import 'moment/locale/ru';
import { IIngredient } from "../models/models";

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

type TCookieProps = {
  [name: string]: number | string | boolean;
}

type TExpiredCookie = {
  expires?: number | Date | string;
}


export function setCookie(name: string, value: string | null, props?: TCookieProps & TExpiredCookie) {
  props = props || {};
  let exp: (Date | null) = null;
  if (typeof props.expires == 'number' && props.expires) {
    const d = new Date();
    d.setTime(d.getTime() + props.expires * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value ?? '');
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
  setCookie(name, null, { expires: -1 });
}

export const storeTokens = (response: TTokenResponse) => {
  if (response.accessToken && response.accessToken.indexOf(AUTH_PREFIX) === 0) {
    setCookie(ACCESS_TOKEN_COOKIE, response.accessToken.split(`${AUTH_PREFIX} `)[1], { expires: 20 * 60 });
  }
  if (response.refreshToken) {
    setCookie(REFRESH_TOKEN_COOKIE, response.refreshToken);
  }
}

export const calculateDateString = (date: string) => {
  const dateMoment = moment(date, "YYYYMMDD hh:mm:ss Z");
  const today = moment().startOf('day');
  const yesterday = moment().startOf('day').subtract(1, 'days').startOf('day');
  let result = '';
  if (dateMoment.isSame(today, 'D')) {
    result = 'Сегодня';
  }
  else if (dateMoment.isSame(yesterday, 'D')) {
    result = 'Вчера';
  }
  else {
    result = dateMoment.fromNow();
  }
  return `${result}, ${dateMoment.format('HH:mm i-GМTZ')}`;
}

export type TTokenResponse = {
  accessToken?: string;
  refreshToken?: string;
}

export const onlyUnique = (value: string, index: number, self: readonly string[]) =>
  self.indexOf(value) === index;

export const calculateTotal = (ingredients: IIngredient[]) => {
  if (ingredients.length === 0)
       return 0;
  return ingredients.reduce((acc: number, ing: IIngredient) => acc + ing.price * ing.qty, 0);
}