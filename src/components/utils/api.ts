const INGREDIENT_API = "https://norma.nomoreparties.space/api/ingredients";
const ORDER_API = "https://norma.nomoreparties.space/api/orders";

const SERVER_ERROR_MESSAGE = "Server Error";

export const fetchIngredients = fetch(INGREDIENT_API)
                                    .then(res => {
                                        if (res.ok)
                                            return res.json();
                                        throw new Error(SERVER_ERROR_MESSAGE)
                                    });

export const postOrder = (data:any) => fetch(ORDER_API, {
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