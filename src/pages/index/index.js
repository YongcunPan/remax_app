import React, { Fragment,useState} from 'react';
import { Button, Card, Input } from 'annar';
import { View,showToast,Text, } from 'remax/wechat';
import {usePageEvent } from 'remax/macro';
import {ActiveForm,FormItem} from '../../components/ActiveForm';
import css from './index.less';

export default () =>{
    const [res, setRes] = useState();
    const [r, setR] = useState();
    const list = new Map([
        [1, "宇宙起源，天地开泰太极首领数。（吉）"],
        [2, "混饨未定，分离破败数。（凶）"],
        [3, "进取如意的增进繁荣数。（吉）"],
        [4, "破败凶变的万事休止数（凶）"],
        [5, "福禄长寿的福德集门数。（吉）"],
        [6, "安稳余庆吉人天相数。（吉）"],
        [7, "刚毅果断勇往直前的进取数。（吉）"],
        [8, "意志刚健的勤勉发展数。（吉）"],
        [9, "兴尽凶始，穷乏困苦数。（凶）"],
        [10, "万事终局充满损耗数。（凶）"],
        [11, "稳健吉右富贵荣达数。（吉）"],
        [12, "意志薄弱的家庭寂寞数。（凶）"],
        [13, "智略超群的博学多才数。（吉）"],
        [14, "沦落天涯失意烦闷数。（凶）"],
        [15, "福寿双全的立身兴家数。（吉）"],
        [16, "贵人相助兴家兴业的大吉数。（吉）"],
        [17, "突破万难的刚柔兼备数。（吉）"],
        [18, "有志竟成的内名有运数。（吉）"],
        [19, "反应机敏，先声夺人数。（凶）"],
        [20, "实而不华，深藏不露数。（凶）"],
        [21, "明月中天，独立权威数。（吉）"],
        [22, "秋草逢霜的两士相争数。（凶）"],
        [23, "旭日东升的质实刚坚数。（吉）"],
        [24, "家门余庆的金钱丰盈数。（吉）"],
        [25, "英俊刚毅资性聪敏数。（吉）"],
        [26, "变怪奇异的豪侠数。（凶）"],
        [27, "足智多谋，先苦后甜数。（凶）"],
        [28, "家亲缘薄，离群独处无定数。（凶）"],
        [29, "智谋兼备，欲望难足数。（吉）"],
        [30, "一成一败，绝处逢生数。（凶）"],
        [31, "智勇得志，心想事成数。（吉）"],
        [32, "权贵显达的意外惠泽数。（吉）"],
        [33, "家门隆昌的才德开展数。（吉）"],
        [34, "破家亡身财命危险数。（凶）"],
        [35, "温和平静的优雅发展数。（吉）"],
        [36, "风浪不息的侠义薄运数。（凶）"],
        [37, "权威显达, 吉人天相数。（吉）"],
        [38, "磨铁成针刻意经营数。（凶）"],
        [39, "富贵荣华的变化无穷数。（吉）"],
        [40, "谨慎保安的豪胆迈进数。（凶）"],
        [41, "德高望重的事事如意数。（吉）"],
        [42, "寒婵在柳，十艺不成数。（凶）"],
        [43, "邪途散财，外祥内苦数。（凶）"],
        [44, "须眉难展力量有限数。（凶）"],
        [45, "顺风扬帆, 新生泰和的万事如意数。（吉）"],
        [46, "罗网系身离祖成家数。（凶）"],
        [47, "点铁成金，开花结果的权威进取数。（吉）"],
        [48, "青松方鹤, 德智兼备的出身清贵数。（吉）"],
        [49, "吉凶难分的不断辛劳数。（凶）"],
        [50, "小舟入海，吉凶参半，须防倾覆数。（凶）"],
        [51, "盛衰交加的竭力经营数。（凶）"],
        [52, "先见之明，理想实现数。（吉）"],
        [53, "忧愁困苦，先苦后甜数。（凶）"],
        [54, "多难悲运的难望成功数。（凶）"],
        [55, "外祥内苦的和顺不实数。（凶）"],
        [56, "浪里行舟, 历尽艰辛，四周障害数。（凶）"],
        [57, "寒雪青松的最大荣运数。（吉）"],
        [58, "晚行遇月, 先苦后甘，宽宏扬名数。（凶）"],
        [59, "寒婵悲风, 时运不济数。（凶）"],
        [60, "争名夺利，黑暗无光数。（凶）"],
        [61, "名利双收的修炼积德数。（吉）"],
        [62, "基础虚弱的艰难困苦数。（凶）"],
        [63, "富贵荣华的身心安泰数。（吉）"],
        [64, "骨肉分离，孤儿悲愁数。（凶）"],
        [65, "富贵长寿的光明正大数。（吉）"],
        [66, "内外不和的多欲失福数。（凶）"],
        [67, "财路亨通的志气坚强数。（吉）"],
        [68, "兴家立业的宽容好运数。（吉）"],
        [69, "坐立不安的外世多难数。（凶）"],
        [70, "家运衰退的晚景凄凉数。（凶）"],
        [71, "毫无实质的耗神而劳数。（凶）"],
        [72, "先甜后苦的万难艰辛数。（凶）"],
        [73, "志高力微的努力奋斗数。（凶）"],
        [74, "沉沦逆境的秋叶落寞数。（凶）"],
        [75, "守者可安，发迹甚迟数。（凶）"],
        [76, "倾覆离散，虽劳无功数。（凶）"],
        [77, "家庭有悦的半吉半凶数。（凶）"],
        [78, "晚境凄凉的功德光荣数。（凶）"],
        [79, "挽回乏力的身疲力尽数。（凶）"],
        [80, "凶星入度的清本缩小数。（凶）"],
        [81, "万物回春，还原复始的积极盛大数。（吉）"],
    ]);
    
    const onSubmit = ({number}) => {
        let _r = parseInt(number, 10) % 80;
        if (_r) {
            setR(_r);
            setRes(list.get(_r));
        } else {
            setR("");
            setRes("");
            showToast({
                title: "请输入数字",
                icon: "none",
            });
        }
    };

    usePageEvent('onPullDownRefresh',()=>false);
    
    return (
        <View className={css.page }>
            <View className={css.header}>
                <Card title="吉祥数字测试">
                    <View className={css.form}>
                        <ActiveForm onSubmit={onSubmit}>
                            <FormItem name="number"
                                rules={[{ pattern: /\d$/g, message: '请输入数字' }]}
                                required>
                                <Input size="large" placeholder="请输入数字" />
                            </FormItem>
                            <FormItem>
                                {
                                    (c, m, form) => <Fragment>
                                        <Button
                                            onTap={() => form.submit()}
                                            type="primary"
                                            size="large"
                                            shape="square"
                                            block>测试</Button>
                                        <Button
                                            className={css.btn}
                                            onTap={() => {
                                                form.resetFields();
                                                setR('');
                                                setRes('');
                                            }}
                                            size="large"
                                            shape="square"
                                            block>重置</Button>
                                    </Fragment>
                                }
                            </FormItem>
                        </ActiveForm>
                    </View>
                    <View className={css.res}>
                        {
                            res ? <Text>{r}-{res}</Text> : null
                        }
                    </View>
                </Card>
            </View>
            <View className={ css.footer }>
                <View className={css.info}>测试结果仅供娱乐</View>
            </View>
        </View>
    );
};