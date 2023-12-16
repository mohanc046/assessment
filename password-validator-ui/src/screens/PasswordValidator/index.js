import React, { useState } from 'react';
import { notification, Col, Row, Layout } from 'antd';
import isEmpty from 'lodash/isEmpty';
import { validatePasswordAPI } from '../../utils/api-services';
import { CustomButton } from '../../components/customButton';
import CustomTextInput from '../../components/customTextInput';
import { CustomAlert } from '../../components/alert';
import { Content, Header } from 'antd/es/layout/layout';
import LeftNav from '../../components/sideBar';
import './index.css';
import CustomBreadCrumb from '../../components/customBreadCrumb';

/**
 * PasswordValidator component for validating passwords.
 * @returns {JSX.Element} PasswordValidator component.
 */
function PasswordValidator() {

    const [isLoading, setLoadingStatus] = useState(false);
    const [password, setPassword] = useState('');
    const [validationResult, setValidationResult] = useState({});

    /**
     * Handles the button click to validate the password.
     * @returns {Promise<void>}
     */
    const handleButtonClick = async () => {
        try {
            setLoadingStatus(true);
            const response = await validatePasswordAPI({ password });
            setValidationResult(response);
        } catch (error) {
            notification.warning({ message: 'Facing issue while validating password!' });
        } finally {
            setLoadingStatus(false);
        }
    };

    return (
        <Layout className='layout-container'>
            <LeftNav />
            <Layout>
                <Header className="header-container" />
                <Content className="context-container">
                    <CustomBreadCrumb />
                    <Row className="row-container" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row" span={18}>
                            <CustomTextInput
                                name="password"
                                placeholder="Enter password text"
                                onChange={(event) => setPassword(event.target.value)}
                                value={password}
                                allowClear
                            />
                        </Col>
                        <Col className="gutter-row" span={4}>
                            <CustomButton label="Validate" onClick={handleButtonClick} loaderStatus={isLoading} />
                        </Col>
                    </Row>
                    {password && !isEmpty(validationResult) && (
                        <CustomAlert
                            message={validationResult.message}
                            description={`Minimum number of steps required to make password strong - ${validationResult.validationResult || 0}`}
                            showIcon
                            type={validationResult.validationResult ? 'warning' : 'success'}
                        />
                    )}
                </Content>
            </Layout>
        </Layout>
    );
}

export default PasswordValidator;
