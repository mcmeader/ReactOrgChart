import React from 'react';
import TreeContainer from "./TreeContainer";
import TreeNode from "./TreeNode";

const Tree = ({ label, children }) => {
    return (
        <TreeContainer>
            <TreeNode label={label}>{children}</TreeNode>
        </TreeContainer>
    );
};

export default Tree;