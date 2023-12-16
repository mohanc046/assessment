import React from 'react';
import { Breadcrumb } from 'antd';

/**
 * Custom BreadCrumb component to display breadcrumb navigation using Ant Design Breadcrumb.
 * @returns {JSX.Element} CustomBreadCrumb component.
 */
const CustomBreadCrumb = () => (
    <Breadcrumb
        items={[
            {
                title: 'Home',
            },
            {
                title: 'Password Validator',
            },
        ]}
    />
);

export default CustomBreadCrumb;
