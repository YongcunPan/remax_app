import * as React from 'react';
import { View,  login  } from 'remax/wechat';
// import { useDataHook } from '../../hook/useDataHook';
// import api from '../../services/aaa';
import styles from './index.css';
import { timer } from 'rxjs';
import { ActiveForm, FormItem} from '../../components/ActiveForm'; 
import { Input, Button, DatePicker } from 'annar';
import { CustomField } from '../../components/CustomField';
import { values } from 'ramda';

const useData = () => {

    const [data, setData] = React.useState(0);
    const timerSub = timer(0, 2000);

    React.useEffect(() => {
        // const Api = new api();
        login({
            success: res => {
                console.log(res)
                // const { code } = res;
                // Api.post('/api/admin/wechat/user/token', { jsCode: code, appCode: 'mp:znsc' }).subscribe(
                //     next => console.log('next', next),
                //     error => console.log('error', error),
                //     complete => console.log('complete', complete)
                // );
            }
        });

        timerSub.subscribe(number => {
            setData(number);
        });
    }, []);
    return [data];
}

export default () => { 
    // pattern: /^1[3456789]\d{9}$/, message: '请输入11位手机号码'
    const onFinish = (values) => {
        console.log('values', values);
    }; 
    return (
        <View className={styles.app}> 
            <ActiveForm onSubmit={onFinish} >
                <FormItem 
                    name="username" 
                    label="测试"
                    required >
                    <Input />
                </FormItem> 
                <FormItem
                    name="password"
                    label="密码" >
                    <CustomField type="password" />
                </FormItem> 
                <FormItem
                    name="datetime"
                    label="时间" >
                    <DatePicker type="datetime" >
                        {
                            (value) => <View>{value || '请填写'}</View>
                        }
                    </DatePicker>
                </FormItem>
                <FormItem>
                    {
                        (control, meta, form) => <React.Fragment>
                            <Button type="primary" onTap={() => form.submit()} style={{marginBottom:20}} block>submit</Button>
                            <Button onTap={() => form.resetFields()} style={{ marginBottom: 20 }} block>reset</Button>
                        </React.Fragment>
                    }
                </FormItem>
            </ActiveForm>
        </View>
    );
};
