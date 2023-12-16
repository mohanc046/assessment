import React from 'react';
import { Button } from 'antd';

/**
 * Custom Button component using Ant Design Button with additional props.
 * @param {Object} props - Props for CustomButton component.
 * @param {string} label - The label/text to be displayed on the button.
 * @param {Function} onClick - Function to be executed on button click.
 * @param {boolean} loaderStatus - Flag to indicate loading state of the button.
 * @returns {JSX.Element} CustomButton component.
 */
export const CustomButton = (props) => {
    const { label = "", onClick, loaderStatus = false } = props || {};
    return (
        <Button type="primary" loading={loaderStatus} onClick={onClick}>
            {label}
        </Button>
    );
};
