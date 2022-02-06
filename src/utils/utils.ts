import { ACCESS_TOKEN_COOKIE, AUTH_PREFIX, REFRESH_TOKEN_COOKIE } from "../models/constants";

export function getCookie(name:string) {
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


export function setCookie(name:string, value:string | null, props?:TCookieProps & TExpiredCookie) {
  props = props || {};
  let exp:(Date | null) = null;
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

export function deleteCookie(name:string) {
  setCookie(name, null, { expires: -1 });
}

  export const storeTokens = (response: TTokenResponse) => {
    if (response.accessToken && response.accessToken.indexOf(AUTH_PREFIX) === 0){
        setCookie(ACCESS_TOKEN_COOKIE, response.accessToken.split(`${AUTH_PREFIX} `)[1], { expires: 20*60 });
    }
    if (response.refreshToken){
        setCookie(REFRESH_TOKEN_COOKIE, response.refreshToken);
    }
}

export type TTokenResponse = {
  accessToken?: string;
  refreshToken?: string;
}
