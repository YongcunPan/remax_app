import { getStorageSync, clearStorage, request, showToast, navigateTo } from 'remax/wechat'
import { Observable } from "rxjs";
// 获取环境变量
export function getBaseURI() {
    switch (process.env.NODE_ENV) {
        case 'dev': return 'https://www.*.com'
        case 'test': return 'https://www.*.com'
        case 'prod': return 'https://www.*.com'
        default: return 'https://www.*.com'
    }
}

// 请求头
export const headers = {
    'Accept': 'application/json',
    'content-type': 'application/json',
    'Authorization':'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJabl94dDE3ejYiLCJ1c2VySWQiOiIxODEyMTgiLCJuYW1lIjoidGFuZ2xlIiwiZXhwIjoxNjEzNzg3NjM2fQ.Ob4svA9s-6Cwmyxe0S0kZESF8CDgJxtmtQq0cLMUubl1bIq4RSS3NM-FndwXL5sGgTOuNHOFc8uR4KAc8-qAVa5xIItncG1fezcFFJ-EMZYUuBECmt5y2vrJcgtpAOYMuTh-uMMwE7HCRuIJMvxSn3eZBiD6DdW0oONOnAspBTg',
    'X-Host': 'www.*.com',
    'appCode':'mp:znsc'
}

export default class Request {
    // get请求
    get(url, data = {}, header) {
        return this.request('GET', url, data, header)
    }
    // post请求
    post(url, data = {}, header) {
        // const token = getStorageSync('token')
        return this.request('POST', url, data, header)
    }
    request(method, url, data, header) {
        const _url = getBaseURI()+url;
        console.log(headers,_url,data)
        return new Observable(subscriber => {
            request({
                url: _url,
                method,
                data: data,
                header: header || headers,
                success(res) {
                    console.log('_success', res);
                    subscriber.next(res);
                },
                fail(err) {
                    console.log('_error',err);
                    subscriber.error(err);
                },
                complete(r) {
                    console.log('_complete',r)
                    subscriber.complete(r);
                }
            });
        });
        // return new Promise((resolve, reject) => {
        //     try {
        //         if (!!getStorageSync('token') && method === 'GET') {
        //             Object.assign(data, {
        //                 'token': getStorageSync('token')
        //             })
        //         }

        //         const response = request({
        //             url: getBaseURI() + url,
        //             method,
        //             data: data,
        //             header: header || headers,
        //             success: (res) => res,
        //             fail: (error) => error,
        //             complete(r) {
        //                 resolve(r)
        //                 // if (response.success) {
        //                 //     // token 失效跳回登录页面
        //                 //     if (response.success.code === -2 || response.success.code === -3 || response.success.code === 902 || response.success.code === 904) {
        //                 //         showToast({ title: '登录超时或未登录或token问题， 请重新登录！', icon: 'none', mask: true, duration: 1500 })
        //                 //         clearStorage();
        //                 //         setTimeout(() => { navigateTo({ url: '/pages/login/index' }) }, 1500)
        //                 //         return
        //                 //     }
        //                 //     // 接口请求失败
        //                 //     if (response.success.code === -1) {
        //                 //         showToast({ title: response.success.message, icon: 'none', duration: 1500 })
        //                 //         return
        //                 //     }
        //                 //     resolve(response.success)
        //                 // } else {
        //                 //     reject(response.fail)
        //                 // }
        //             }
        //         })
        //     } catch (error) {
        //         showToast({ title: '网络请求出错', icon: 'none' });
        //     }
        // })
    }
}