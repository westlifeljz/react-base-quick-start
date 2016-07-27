/**
 * Created by luojianzong on 16/6/24.
 */

export class Utility {
    /**
     * try to decode url components.
     * @param  {string} value encoded url comonents.
     */
    static tryDecodeURIComponent(value) {
        try {
            return decodeURIComponent(value);
        } catch (e) {
            // Ignore any invalid uri component
        }
    }

    /**
     *  format string e.g  stringFormat("my name is {0}, sex is: {1}","tian","male")
     * @param  {array like} str the source string that will be replace by regex .
     */
    static stringFormat() {
        // use this string as the format,Note {x},x start from 1,2,3
        // walk through each argument passed in
        for (var fmt = arguments[0], ndx = 1; ndx < arguments.length; ++ndx) {
            // replace {1} with argument[1], {2} with argument[2], etc.
            fmt = fmt.replace(new RegExp('\\{' + (ndx - 1) + '\\}', "g"), angular.toJson(arguments[ndx]));
        }
        // return the formatted string
        return fmt;
    }
    /**
     * parseParams("a=1&b=2&a=3") ==> {a: "3", b: "2"}
     * @param  {string} str query string
     */
    static parseParams(str) {
        return str.split('&').reduce(function(params, param) {
            var paramSplit = param.split('=').map(function(value) {
                return decodeURIComponent(value.replace('+', ' '));
            });
            params[paramSplit[0]] = paramSplit[1];
            return params;
        }, {});
    }
    /**
     * parse objet to query string
     * @param  {object} obj {name:'ssss', password:''}
     */
    static toQueryString(obj) {
        var parts = [];
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
            }
        }
        return parts.join("&");
    }

    static getSerializedUrl(url, requestData) {
        var serializedParams = this.toQueryString(requestData);
        var newUrl = serializedParams ? url.split("?")[0] + "?" + serializedParams : url.split("?")[0];
        return newUrl;
    }

    // http request success converter.
    static httpRespDataConverter(data, status, headers, config) {
        var _newResult = {},
            resp = {};

        if (status == 200) {

            _newResult = angular.copy(data);
            delete _newResult.resultCode; //"1000"表示业务逻辑成功！,"1022"-业务走不下去的错误, "2022"-表示系统未知错误
            delete _newResult.resultMsg;

            resp = {
                code: data.resultCode || "", // code =="" 链接超时必须跳转到APP 超时页面。ewap://1qianbao/merchant/action_finish
                message: data.resultMsg || "",
                data: _newResult
            };
        } else {
            var _code = data && data.resultCode || status;
            resp = {
                code: _code,
                message: data && data.resultMsg || "[" + _code + ": 服务器未知错误]",
                data: _newResult
            };
        }
        // $log.debug(data, status, headers, config);
        return resp;
    }
    /**
     * TRACKING service utitlity for index.html live release version.
     */
    static tracking(eventId) {
        if (typeof Agent != "undefined" && Agent) {
            Agent.clickEvent(eventId);
        }
    }

    static isBrowser() {
        var ua = navigator.userAgent.toLowerCase();
        if (/micromessenger/i.test(ua)) {
            return 'wx';
        } else if (/android/i.test(ua)) {
            return 'android';
        } else if (/ipad|ipod|iphone/i.test(ua)) {
            return 'ios';
        } else {
            return 'pc';
        }
    }
}

export class NumberUtils {
    //加法
    static numAdd(num1, num2) {
        var baseNum, baseNum1, baseNum2;
        try {
            baseNum1 = num1.toString().split(".")[1].length;
        } catch (e) {
            baseNum1 = 0;
        }
        try {
            baseNum2 = num2.toString().split(".")[1].length;
        } catch (e) {
            baseNum2 = 0;
        }
        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
        return (num1 * baseNum + num2 * baseNum) / baseNum;
    }

    //减法
    static numSub(num1, num2) {
        var baseNum, baseNum1, baseNum2;
        var precision;
        try {
            baseNum1 = num1.toString().split(".")[1].length;
        } catch (e) {
            baseNum1 = 0;
        }
        try {
            baseNum2 = num2.toString().split(".")[1].length;
        } catch (e) {
            baseNum2 = 0;
        }
        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
        precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
        return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
    }

    //乘法
    static numMulti(num1, num2) {
        var baseNum = 0;
        try {
            baseNum += num1.toString().split(".")[1].length;
        } catch (e) {}
        try {
            baseNum += num2.toString().split(".")[1].length;
        } catch (e) {}
        return Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
    }

    //除法
    static numDiv(num1, num2) {
        var baseNum1 = 0,
            baseNum2 = 0;
        var baseNum3, baseNum4;
        try {
            baseNum1 = num1.toString().split(".")[1].length;
        } catch (e) {
            baseNum1 = 0;
        }
        try {
            baseNum2 = num2.toString().split(".")[1].length;
        } catch (e) {
            baseNum2 = 0;
        }
        baseNum3 = Number(num1.toString().replace(".", ""));
        baseNum4 = Number(num2.toString().replace(".", ""));
        return this.numMulti(baseNum3 / baseNum4, Math.pow(10, baseNum2 - baseNum1));
    }

}

