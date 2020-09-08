import React from 'react';
import PropTypes from 'prop-types'

import styles from './Table.module.css'

const TableCell = (props) => {
    return {}
        < td > {
            props.editField ? <input type="text" onChange={}</ td>
                )
                };

TableCell.propTypes = {
                    headers: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.arrayOf(PropTypes.object),
}

export default TableCell;