import React from 'react';
import { navigateTo, View } from 'remax/wechat';
import { Button, Form, Cell } from 'annar';

export default () =>{
    const handleFinish = (values) => {
        console.log('values', values);
        navigateTo({url:'/pages/index/index'})
    };
    const handleFinishFailed = (values, errorFields) => {
        console.log('errorFields', errorFields, values);
    };
    return (
        <View>
            <View>loginPage</View>
            <Button type="primary" icon="check" shape="square">primary</Button>
            <Form onFinish={handleFinish} onFinishFailed={handleFinishFailed}>
                <Form.Item
                    name="phone"
                    rules={[{ pattern: /^1[3456789]\d{9}$/, message: '请输入11位手机号码' }]}
                >
                    <Cell.Input label="Phone" placeholder="Please enter" border={false} />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ validator: (v) => v?.length >= 6, message: '密码至少6位' }]}
                >
                    <Cell.Input label="Password" placeholder="Please enter" border={false} />
                </Form.Item>
                <Form.Item style={{ marginTop: 20, padding: '0 20px' }}>
                    <Button
                        type="primary"
                        size="large"
                        shape="square"
                        look="orange"
                        block
                        nativeType="submit"
                    >
                        Login
              </Button>
                </Form.Item>
            </Form>
        </View>
    );
};
