import PropTypes from 'prop-types';
import {BUN, SAUCE, MAIN} from '../models/constants'

export const ingredientPropType = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf([BUN, SAUCE, MAIN]),
    proteins:  PropTypes.number.isRequired,
    fat:  PropTypes.number.isRequired,
    carbohydrates:  PropTypes.number.isRequired,
    calories:  PropTypes.number.isRequired,
    price:  PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
    qty: PropTypes.number,
    guid: PropTypes.string
});

export const orderPropType = PropTypes.shape({
    _id: PropTypes.number.isRequired,
});


export const tabPropType = PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
})



