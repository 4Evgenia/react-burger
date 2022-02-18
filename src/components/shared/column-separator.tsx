import React, { FC } from 'react';
import styles from './column-separator.module.css';

type TColumnSeparator = {
    arr: Array<number>;
    length?: number;
    isDone?: boolean;
}

const ColumnSeparator: FC<TColumnSeparator> = ({ arr, length, isDone }) => {
    const rowInColumn = length ?? 10;
    const columnCount = Math.ceil(arr.length / rowInColumn);
    const indexArray = Array.from(Array(columnCount).keys());
    const className = isDone ? styles.done : '';
    return (
        <div className={styles.table}>
            {indexArray.map(index => 
                <div key={index} className={styles.column}>
                    <div className='text text_type_digits-default'>
                        {
                            arr.filter((item, i) => Math.floor(i / rowInColumn) === index)
                                .map(item => {return (<div key={item} className={`${className}`}>{item}</div>)})
                        }
                    </div>
                </div>
            )}
        </div>
    );
}

export default ColumnSeparator;