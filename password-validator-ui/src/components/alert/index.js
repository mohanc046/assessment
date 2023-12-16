import React from 'react';
import { Alert, Col, Row } from 'antd';
import './index.css';

/**
 * Custom Alert component to display messages with Ant Design Alert.
 * @param {Object} props - Props for CustomAlert component.
 * @param {string} props.message - The message content for the alert.
 * @param {string} props.description - The description/content of the alert.
 * @param {string} props.type - The type of the alert ('success', 'info', 'warning', 'error').
 * @param {boolean} [props.showIcon=false] - Flag to display an icon in the alert.
 * @returns {JSX.Element} CustomAlert component.
 */
export const CustomAlert = (props) => {
    const { message, description, type, showIcon = false } = props;

    return (
        <div className='alert-container'>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" span={18}>
                    <Alert
                        message={message}
                        description={description}
                        type={type}
                        showIcon={showIcon}
                    />
                </Col>
            </Row>
        </div>
    );
};
