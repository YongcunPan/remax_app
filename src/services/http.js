import { Observable } from "rxjs";
import store from 'store';
import { curry, contains, clone, is } from "ramda";
import {request} from 'remax/wechat';

console.log(request)
export class Http {
    baseUrl = "";
    devUrl = "";
    domain = ""
    version = "";
    env = "dev";
    tokenName = "token";

    getBaseUrl(url, ignoreDomain = false) {

        if (ignoreDomain) {
            return `${this.env === "dev" ? this.devUrl : this.baseUrl}/api/${url}`;
        }
        return `${this.env === "dev" ? this.devUrl : this.baseUrl}/api/${this.domain}/${this.version ? this.version + "/" : ""}${url}`;
    }

    getData(data1, data2) {
        return {
            ...data1,
            ...data2
        }
    }

    GET(url, data = {}, headers = {}, ignoreDomain = false) {
        return _axios({ method: HTTPMethod.GET, tokenName: this.tokenName }, this.getBaseUrl(url, ignoreDomain), data, headers);
    }

    POST(url, data = {}, headers = {}, ignoreDomain = false) {
        return _axios({ method: HTTPMethod.POST, tokenName: this.tokenName }, this.getBaseUrl(url, ignoreDomain), data, headers);
    }

    PUT(url, data = {}, headers = {}) {
        return _axios({ method: HTTPMethod.PUT, tokenName: this.tokenName }, this.getBaseUrl(url), data, headers);
    }

    DELETE(url, data = {}, headers = {}) {
        return _axios({ method: HTTPMethod.DELETE, tokenName: this.tokenName }, this.getBaseUrl(url), data, headers);
    }

    UPLOAD(url, data, filePath) {
        return _axios({ method: HTTPMethod.UPLOAD, tokenName: this.tokenName, filePath }, this.getBaseUrl(url), data);
    }

}

class HTTPMethod {
    static GET = "GET";
    static POST = "POST";
    static PUT = "PUT";
    static DELETE = "DELETE";
    static UPLOAD = "UPLOAD";
}

const _axios = curry(({ method = HTTPMethod.GET, tokenName = 'token' }, url, data = {}, headers = {}) => {
    const token = store.get(tokenName) || 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJabl94dDE3ejYiLCJ1c2VySWQiOiIxODEyMTgiLCJuYW1lIjoidGFuZ2xlIiwiZXhwIjoxNjEzNzg3NjM2fQ.Ob4svA9s-6Cwmyxe0S0kZESF8CDgJxtmtQq0cLMUubl1bIq4RSS3NM-FndwXL5sGgTOuNHOFc8uR4KAc8-qAVa5xIItncG1fezcFFJ-EMZYUuBECmt5y2vrJcgtpAOYMuTh-uMMwE7HCRuIJMvxSn3eZBiD6DdW0oONOnAspBTg';

    let { size, page, ..._data } = data;

    let options = {
        url,
        headers: {
            'Content-Type': 'application/json',
            // 内网测试（包含secure为内网）
            // locationhref: 'paper-secure.console.ncrcnd.ttctrc.com',
            // locationhref: window.location.hostname,
            [tokenName]: token,
            'X-Host':'worker.console.ncrcnd.ttctrc.com',
            ...headers,
        },
        data: _data,
        params: { size: size === -1 ? 2000 : size, page },
        method,
        proxy:{
            host:'htpps://worker.console.ncrcnd.ttctrc.com'
        }
    };
    if (method === HTTPMethod.GET) {
        options.params = { ...options.params, ...data };
    }
    return new Observable(subscriber => {

        const cancel = request({
            ...options,
            success(res) {
                subscriber.next(res);
            },
            fail(err) {
                subscriber.error(err);
            },
            complete() {
                subscriber.complete();
            }
        });

        return () => cancel(`The Request is Cancel, URL: ${url}, Method: ${method}`);
    });
});

const formateRequest = (res) => {
    let _res = clone(res);
    if (is(Object, _res)) {
        const { pagination } = _res;
        if (pagination) {
            const { currentPage } = pagination;
            _res.pagination.currentPage = currentPage + 1;
        }
    }
    return _res;
};