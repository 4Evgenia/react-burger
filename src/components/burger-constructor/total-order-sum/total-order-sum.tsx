import React, {FC} from 'react';
import styles from './total-order-sum.module.css';
import { CurrencyIcon  } from "@ya.praktikum/react-developer-burger-ui-components";

type TTotalOrderProps = {
    prices: ReadonlyArray<number>
};

const TotalOrderSum:FC<TTotalOrderProps> = (props) => {
    const totalPrice = React.useMemo(() => 
        props.prices.reduce(((acc:number, price:number) => !isNaN(price) ? (price + acc) : acc), 0), 
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

export default TotalOrderSum;
