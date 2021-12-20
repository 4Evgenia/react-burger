import React from 'react';
import PropTypes from 'prop-types';
import styles from './total-order-sum.module.css';
import { CurrencyIcon  } from "@ya.praktikum/react-developer-burger-ui-components";

const TotalOrderSum = (props:any) => {
    const totalPrice = React.useMemo(() => 
        props.prices.reduce(((acc:number, price:any) => price + acc), 0), 
                    [props.prices]);
    
    
    return (
        <section className="text text_type_digits-medium mr-10">
            <div className={styles.priceContaner}>
                    <div className="price mr-2">{totalPrice}</div>
                <div>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </section>
    )
}

TotalOrderSum.propTypes = {
    prices: PropTypes.arrayOf(PropTypes.number)
}

export default TotalOrderSum;
