import React from 'react';
import { View } from 'remax/wechat';
import {Input} from 'annar';

export const CustomField = ({ className, children = <Input />,...props }) => {
    return <View className={className}>{React.cloneElement(children, { ...props })}</View>;
}
