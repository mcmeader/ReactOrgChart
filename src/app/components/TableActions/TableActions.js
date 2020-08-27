import React from 'react';
import {Link} from "react-router-dom";
import {useToasts} from "react-toast-notifications";

const TableActions = ({ row, column }) => {
    const { addToast } = useToasts();

    const handleDelete = async () => {
        try {
            await column.handleDelete(row.id);
        } catch (e) {
            addToast(
                "Failed to delete item",
                {
                    appearance: 'error'
                }
            )
        }
    }
    return (
        <div>
            <Link data-testid={`row-${row.id}-edit-link`} to={`${column.editLink}/${row.id}`}>Edit</Link>
            <button data-testid={`row-${row.id}-delete-button`} onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default TableActions;