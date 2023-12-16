import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import './index.css';

const { Sider } = Layout;

/**
 * LeftNav component for displaying a collapsible sidebar menu using Ant Design Layout and Menu.
 * @returns {JSX.Element} LeftNav component.
 */
const LeftNav = () => {
    // Define menu items with icons and labels
    const items = [
        {
            icon: UserOutlined,
            label: 'Password Validator',
        },
    ].map((entry, index) => ({
        key: String(index + 1),
        icon: React.createElement(entry.icon),
        label: entry.label,
    }));

    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => { }}
            onCollapse={(collapsed, type) => { }}
        >
            <div className="mock-logo-container" />
            {/* Render Menu with dark theme and inline mode */}
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
        </Sider>
    );
};

export default LeftNav;
