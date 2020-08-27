import React from 'react';

import styles from './Table.module.css';

const TableBody = ({ data, columnConfig}) => {
    return (
        <tbody className={styles.tableBody}>
            {data.map((row, rowIndex) => (
                <tr key={rowIndex} className={styles.tableRow}>
                    {columnConfig.map((Column, columnIndex) => (
                            <td data-testid={`table-row-${row.id}-column-${Column.title.toLowerCase().replace(/\s/g, '-')}`} className={styles.tableCell} key={columnIndex}>
                                { Column.component ? <Column.component row={row} column={Column} /> : row[Column.displayValue]}
                            </td>
                        )
                    )}
                </tr>
            ))}
        </tbody>
    );
};

export default TableBody;