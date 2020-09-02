import React from 'react';

import styles from './Center.module.css';

const Layout = (centerComponent) => {
    return (
        <div className={styles.container}>
            {centerComponent}
        </div>
    );
};

export default Layout;