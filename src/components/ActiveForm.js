import React from 'react';
import { Text, View } from 'remax/wechat';
import Form, { Field, useForm } from 'rc-field-form';

export const ActiveForm = ({ children, form, onSubmit, ...props }) => {
    const [_form] = useForm();
    const __from = form || _form;
    return (
        <Form
            form={__from}
            // onValuesChange={ (v,vs)=>console.log(v,vs) }
            onFinish={onSubmit}
            {...props}>
            { children || <Text />}
        </Form>
    );
};

export const FormItem = ({ label, name, children, required = false, rules = [], ...restProps }) => {

    return (
        <Field
            name={name}
            // trigger="onInput"
            // validateTrigger="onInput"
            // getValueFromEvent={value => value.detail.value}
            rules={[...rules, { required, message: `${label || ''}不能为空！` }]}
            {...restProps}>
            {(control, meta, form) => {
                const childNode =
                    typeof children === 'function'
                        ? children(control, meta, form)
                        : React.cloneElement(children, {
                            ...control,
                        });
                return (
                    <View style={{ marginBottom: 20 }}>
                        {
                            label ?
                                <View>
                                    {required ? <Text style={{ color: 'red' }}>*</Text> : null}
                                    <Text>{label}</Text>
                                </View> : null
                        }
                        <View>
                            <View>{childNode}</View>
                            <Error>{meta.errors}</Error>
                        </View>
                    </View>
                );
            }}
        </Field>
    );
};

const Error = ({ children }) => (
    <View style={{ color: 'red', height: `${children.length * 1.88}rem`, transition: 'height .3s' }} >
        {children.map((error, index) => (
            <View key={index} style={{ lineHeight: '1.88rem' }}>{error}</View>
        ))}
    </View>
);