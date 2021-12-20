const BASE_API_URL = "https://norma.nomoreparties.space/api/";

const SERVER_ERROR_MESSAGE = "Server Error";

const buildUrl = (endPoint:string) => `${BASE_API_URL}${endPoint}`;

export const fetchIngredients = fetch(buildUrl("ingredients"))
                                    .then(res => {
                                        if (res.ok)
                                            return res.json();
                                        throw new Error(SERVER_ERROR_MESSAGE)
                                    });

export const postOrder = (data:any) => fetch(buildUrl("orders"), {
                                method: 'POST',
                                cache: 'no-cache',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ingredients:data})
                            }).then(res => {
                                if (res.ok)
                                    return res.json();
                                throw new Error(SERVER_ERROR_MESSAGE)
                            });