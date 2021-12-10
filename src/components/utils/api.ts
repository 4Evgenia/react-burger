const INGREDIENT_API = "https://norma.nomoreparties.space/api/ingredients";

export const fetchIngredients = fetch(INGREDIENT_API)
                                    .then(res => res.json());