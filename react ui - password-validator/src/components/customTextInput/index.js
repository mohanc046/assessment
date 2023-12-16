import React from 'react';
import { Input } from 'antd';

/**
 * Custom TextInput component using Ant Design Input with additional props.
 * @param {Object} props - Props for CustomTextInput component.
 * @param {string} placeholder - Placeholder text for the input field.
 * @param {Function} onChange - Function to be executed on input change.
 * @param {string} value - Value of the input field.
 * @param {string} name - Name attribute for the input field.
 * @param {boolean} allowClear - Flag to enable clearing the input.
 * @returns {JSX.Element} CustomTextInput component.
 */
const CustomTextInput = (props) => {
    const { placeholder = "", onChange, value, name, allowClear = false } = props;

    return (
        <Input
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            name={name}
            allowClear={allowClear}
        />
    );
};

export default CustomTextInput;
