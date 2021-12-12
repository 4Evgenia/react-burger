const INGREDIENT_API = "https://norma.nomoreparties.space/api/ingredients";

const SERVER_ERROR_MESSAGE = "Server Error";

export const fetchIngredients = fetch(INGREDIENT_API)
                                    .then(res => {
                                        if (res.ok)
                                            return res.json();
                                        throw new Error(SERVER_ERROR_MESSAGE)
                                    });