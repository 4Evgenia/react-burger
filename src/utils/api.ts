const BASE_API_URL = "https://norma.nomoreparties.space/api/";

const SERVER_ERROR_MESSAGE = "Server Error";

const buildUrl = (endPoint:string) => `${BASE_API_URL}${endPoint}`;

// FETCH INGREDIENTS
export const fetchIngredients = () => fetch(buildUrl("ingredients"))
                                    .then(checkResponse);

// SUBMIT ORDER
export const postOrder = (data:any) => fetch(buildUrl("orders"), {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {'Content-Type': 'application/json'},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ingredients:data})
}).then(checkResponse);

// FORGOT PASSWORD
export const passwordReset = (email:any) => fetch(buildUrl("password-reset"), {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {'Content-Type': 'application/json'},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({email})
}).then(checkResponse);

// RESET PASSWORD SUBMIT
export const passwordResetSubmit = (password: any) => fetch(buildUrl("password-reset/reset"), {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {'Content-Type': 'application/json'},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({password})
}).then(checkResponse);

// LOGIN
export const loginRequest = (email:string, password:string) => fetch(buildUrl("auth/login"),  {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {'Content-Type': 'application/json'},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({email, password})
}).then(checkResponse);

// REGISTER
export const registerRequest = (email:string, password:string, name:string) => fetch(buildUrl("auth/register"), {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {'Content-Type': 'application/json'},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({name, email, password})
}).then(checkResponse);

// LOGOUT
export const logoutRequest = () => fetch(buildUrl("auth/logout"),  {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {'Content-Type': 'application/json'},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: ''
}).then(checkResponse);

// REFRESH TOKEN
export const tokenRequest = () => fetch(buildUrl("auth/token"),  {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {'Content-Type': 'application/json'},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: ''
}).then(checkResponse);

const checkResponse = (res:any) => {
    if (res.ok)
        return res.json();
    throw new Error(SERVER_ERROR_MESSAGE)
}