import React from 'react';

import styles from './Tree.module.css'

const TreeContainer = ({ children }) => {
    return (
        <div className={styles.treeContainer}>
            {children}
        </div>
    );
};

export default TreeContainer;