import React from 'react';

import styles from './Layout.module.css';

const SideBar = (props) => {
    return (
        <div className={styles.container}>
            <table className={styles.table}>
                {props.tableContent.forEach((data, clickHandler, isNested) => { isNested ? <NestedButton data={data} clickHandler={clickHandler} /> : <TextButton data={data} clickHandler={clickHandler} /> })}
            </table>
        </div>
    );
};

export default SideBar;