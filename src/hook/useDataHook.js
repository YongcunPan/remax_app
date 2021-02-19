import { useCallback, useState,useEffect } from 'react';
import { useDeepCompareEffect} from 'react-use';
import {ServicesModel } from '../services';

export const useDataHook = (source, ext = {}) => {

    const { data = {}, defaultRes = {}, deps = [], condition = () => true } = ext;
    const [loading, setLoading] = useState(true);
    const [res, setRes] = useState(defaultRes);
    const [error, setError] = useState(false);
    const [count, setCount] = useState(0);

    const reload = useCallback(() => setCount(count => count + 1), []);

    useDeepCompareEffect(() => {
        const sourceFn = ServicesModel[source];
        if (!sourceFn) {
            !sourceFn && console.error("不存在的source:", source);
            setLoading(false);
            return;
        }
        if (!condition()) {
            setLoading(false);
            return;
        }
        setLoading(true);
        const cancel = sourceFn(data).subscribe({
            next: (_res) => {
                setRes(_res);
                setLoading(false);
            },
            error: (error) => {
                console.error(error);
                setError(true);
                setLoading(false);
            }
        });
        return () => cancel.unsubscribe();
    }, [data, count, ...deps]);

    return [loading, res, { error, reload }];
};