/**
 * 万里通商城项目工具
 **/

import React, { Component, PropTypes} from 'react';



// 合并对象操作
/**
 * [DeepExtends description]
 * @param {[type]} destination [description]
 * @param {[type]} source      [description]
 * var destination = { foo: "bar", baz: { bang: "zoom" } };
 * var source = { baz: { thud: "narf" } };
 * Extends.extend(destination, source);
 */



const extend = function(target, source, deep) {
    let key;
    let isWindow = function(obj) {
      return obj != null && obj == obj.window
    }
    let isArray = function(value) {
        return value instanceof Array
    }
    let isPlainObject = function(obj) {
         return typeof(obj) == "object" && !isWindow(obj) && obj.__proto__ == Object.prototype
    }

    for (key in source){
        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
            if (isPlainObject(source[key]) && !isPlainObject(target[key]))
                target[key] = {}
            if (isArray(source[key]) && !isArray(target[key]))
                target[key] = []

            Extends(target[key], source[key], deep)
        }
        else if (source[key] !== undefined) {
            target[key] = source[key]
        }
    }

    return target
}

const assign = function(src) {
  var objs = [].slice.call(arguments, 1), obj;

  for (var i = 0, len = objs.length; i < len; i++) {
    obj = objs[i];
    for (var prop in obj) {
      src[prop] = obj[prop];
    }
  }

  return src;
}

// SIGN签名
const sign = function() {
    let [PRIVATE_KEY, REQ_TIME] = ['09FB84B1-D90E-4C14-84DB-DEE924A87B51', 'reqTime'];
    let ts;
    let a = arguments;
    let o = a[0] || {};
    let pk = a.length > 1 ? a[1] : PRIVATE_KEY;
    let pks = []

    for( let k in o) {
        if(k === REQ_TIME) {
            ts = o[k];
            continue;
        }
        pks.push(k);
    }

    pks.sort();

    let sign = '';
    if(ts) {
        for(let i in pks) {
            let k = pks[i];
            let v = o[k] === 0 ? '0' :o[k] ? o[k].toString() : '';
            sign += v + ts.toString();
        }
        sign += pk;
        let oSign = SHA1(sign);
        return oSign.toString();
    } else {
        console.log('缺少必要参数reqTime');
    }
}

// 统计打点

const Track = function(id) {
    let [TRACK_SITE, TRACK_DOMAIN] = ['wlt', 'wanlitong.com']
    let memberId = id ? id : '';
    let loginUserId = memberId;

    if(loginUserId === '') {
        loginUserId = '0'
    }

    let _paq = {
        site: TRACK_SITE,
        domain: TRACK_DOMAIN,
        userId: loginUserId,
        userType: 1
    };

    window._paq = _paq;

    let elScript = document.createElement('script');
    if (location.protocol.toLowerCase() == 'http:') {
        elScript.setAttribute('src', '//webstat.wanlitong.com/webstat/pa_beacon_cdn.js');
    } else {
        elScript.setAttribute('src', '//webstat.wanlitong.com/js/pa_beacon_https.js');
    }
    document.body.appendChild(elScript);
}()

// 关闭壹钱包webview

const CloseWebView = function(messages,type) {
    if(type){
        window.location.href = 'ewap://1qianbao/merchant/action_finish';
        //console.log('CloseWebView >> 关闭webview成功，没有反应看是不是在app内执行。');
    }else {
        Popup(messages);
        setTimeout(function () {
            window.location.href = 'ewap://1qianbao/merchant/action_finish';
            //console.log('CloseWebView >> 关闭webview成功，没有反应看是不是在app内执行。');
        }, 1000);
    }
};

//检查token是否异常
const Check_Token = function(result){
    var flag_token = true;
    var ENUM = {
        MESSAGE: {
            API_RESP_STATUS: {
                UNKNOWN: '未知错误',
                NETWORK_ERROR: '请求失败',
                TIMEOUT: '网络异常，请稍后再试！',
                INIT: {
                    '9010': '网络超时，请重新访问。',
                    '9011': '网络超时，请重新访问。',
                    '9012': '网络超时，请重新访问。',
                    '9013': '尊敬的用户，您本次登录地区与上次登录非同一区域，为了您的账号安全，请重新登录，谢谢。'
                }
            }
        }
    };
    var rsp = result.head;
    if (rsp.rspCode != 0) {
        var message = '',
            flag_token = false;
        if (ENUM.MESSAGE.API_RESP_STATUS.INIT.hasOwnProperty(rsp.rspCode)) {
            message = ENUM.MESSAGE.API_RESP_STATUS.INIT[rsp.rspCode];
        } else {
            message = ENUM.MESSAGE.API_RESP_STATUS.UNKNOWN;
        }
        CloseWebView(message);

    }
    return flag_token;

}


/**
 * fetch方法扩展 Fetch(url, data, option).then(function(res){console.log(res)})
 * @param url api url
 * @param data 传入扩展数据
 * @param option 原生fetch option
 */

const Fetch = function(url,paramsObj = {}, option={method: 'POST', headers: {'Content-Type': 'application/x-www-form-urlencoded'}}){
    let requestData,
        userDataUrl = '',
        key;

    let baseData= {
        authType: 'SHA1_1',
        coordinate: '168.49679,28.82855',
        custString: '1.36',
        machineNo: '864375028810514',
        msgVersion:'3.6.1',
        platform: 'ios',
        reqAppId: 'ios_app_wanlitong',
        reqTime: new Date().getTime(),
        screenSize: '960*480'
    };

    requestData =Extends(paramsObj,baseData)

    requestData =Extends(requestData,{
        sign: Sign(requestData)
    })
    let _requestData
    for(let key in requestData){
        if(key == 'productName'){
            requestData[key] = encodeURIComponent(requestData[key]);
        }
        _requestData = requestData[key] ? requestData[key] : '';
        userDataUrl += '&' + key + '=' + _requestData
    }

    userDataUrl = userDataUrl.slice(1);

    let _option = option;
    _option.body = userDataUrl;

    return fetch(url, _option).then(res => res.json());

}

/**
 * jsonp 方法扩展 FetchJsonp(url, data, option).then(function(res){console.log(res)})
 * @param url api url
 * @param data 传入扩展数据
 * @param option 原生fetch option
 * callback 与 jsonpCallbackFunction 需要自定义必须一致，因为加签需要匹配
 */
const FetchJsonp = function(url, paramsObj = {callback: 'wanlitong_jsonp'}, option={jsonpCallbackFunction: 'wanlitong_jsonp'}){
    let requestData,
        userDataUrl = '',
        key;

    let baseData= {
        authType: 'SHA1_1',
        coordinate: '168.49679,28.82855',
        custString: '1.36',
        machineNo: '864375028810514',
        msgVersion:'3.6.1',
        platform: 'ios',
        reqAppId: 'ios_app_wanlitong',
        reqTime: new Date().getTime(),
        callback: paramsObj.callback ? paramsObj.callback : 'wanlitong_jsonp'
    };
    requestData =Extends(paramsObj,baseData)

    requestData =Extends(requestData,{
        sign: Sign(requestData)
    })

    if(paramsObj.callback) {
        delete requestData['callback']
    }

    for(key in requestData){
        userDataUrl += '&' + key + '=' + requestData[key]
    }

    userDataUrl = url + '?' + userDataUrl.slice(1);

    return fetcher(userDataUrl, option).then(res => res.json());

}

/**
 * 获取登录token并且保存起来
 * @param {String} token [token]
 */

const SaveToken = function(token) {
    if(token) {
        let _token = {
            token: token
        };
        window.sessionStorage.setItem('wlt.user', JSON.stringify(_token));
    }
}

/**
 * js 相乘精度
 * liukai
 */

const accMul = function (arg1,arg2)

{

    var m=0,s1=arg1.toString(),s2=arg2.toString();

    try{m+=s1.split(".")[1].length}catch(e){}

    try{m+=s2.split(".")[1].length}catch(e){}

    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)

}

/**
 * js 相加精度
 * liyanping
 */
const accAdd = function(num1,num2){
    var r1,r2,m;
    try{
        r1 = num1.toString().split('.')[1].length;
    }catch(e){r1 = 0;}
    try{
        r2=num2.toString().split(".")[1].length;
    }catch(e){r2=0;}

    m=Math.pow(10,Math.max(r1,r2));

    return Math.round(num1*m+num2*m)/m;
}

/**
 * 检查是否存在壹钱包native方法
 * @param {function} 成功回调
 * @param {function} 失败回调
 */

 const NativeInjectReady = function(successCallback, failCallback) {
     let t = 0,
         timeout = 1000 * 30,
         intervalId = setInterval(function() {
             if (typeof window.YiQianBao !== 'undefined') {
                 typeof successCallback !== 'undefined' && successCallback();
                 window.clearInterval(intervalId);
             } else if (t >= timeout) {
                 typeof failCallback !== 'undefined' && failCallback();
                 window.clearInterval(intervalId);
             } else {
                 t += 100;
             }
         }, 100);
 }

 /**
 * 壹钱包头部配置方法简版
 * @param title {string} 标题
 * @param btn {string} 按钮文案
 * @param btnevent {string} 按钮事件
 * @param isexist {boolean} 是否需要检测window.YiQianBao存在
 */

 const NativeHeaderConfig = function(title,btn,btnevent,isexist){
    let Header = {
        "title": {
            "type": "TitleNormal",
            "value": title,
            "widthClassName": "rb0rt1"
        },
        "right": [
            {
                "type": "OnlyTitle",
                "txtValue": btn,
                "onClickCallBackEval": btnevent
            }
        ]
    }
    if(isexist){
        let n = 0;
        const timer = setInterval(()=>{
            n++;
            if(n == 1000){
                clearInterval(timer);
            }
            if(window.YiQianBao != undefined){
                document.title=title;
                window.YiQianBao.UniversalJSFunction('getNavigationConfig',JSON.stringify(Header));
                clearInterval(timer);
            }
        },1)
    }else{
        document.title=title;
        window.YiQianBao.UniversalJSFunction('getNavigationConfig',JSON.stringify(Header));
    }
 };

const getYQBNativeVesion = function () {
    let ua =  window.YqbNativeUserAgentForTest|| window.navigator.userAgent,
        androidRegExp = /1qianbao-android-(\d+)(\.\d+)+/,
        iosRegExp = /1qianbao-ios-(\d+)(\.\d+)+/,
        version = "",
        systemName = "";
    if (androidRegExp.test(ua)) {
        version = ua.match(androidRegExp)[0].replace(/1qianbao-android-/, "");
        systemName = "android";
    } else if (iosRegExp.test(ua)) {
        version = ua.match(iosRegExp)[0].replace(/1qianbao-ios-/, "");
        systemName = "ios";
    }else{
        return false;
    }
    return {
        system: systemName,
        version: version
    };
};

const compareVersion = function (version, baseVersion) {
    var versionNumArray = version.split('.'),
        baseVersionNumArray = baseVersion.split('.');
    res = false;
    if (parseInt(versionNumArray[0]) > parseInt(baseVersionNumArray[0]) ||
        (parseInt(versionNumArray[0]) == parseInt(baseVersionNumArray[0]) && parseInt(versionNumArray[1]) > parseInt(baseVersionNumArray[1]))||
        (parseInt(versionNumArray[0]) == parseInt(baseVersionNumArray[0]) && parseInt(versionNumArray[1]) == parseInt(baseVersionNumArray[1]) && parseInt(versionNumArray[2]) >= parseInt(baseVersionNumArray[2]))){
        res = true;
    }
    return res;
};


const type = function(v){
    return Object.prototype.toString.call(v);
};

const isObject = function (v) {
    return !!v && type(v) === '[object Object]';
};

const isNumber = function(v){
    return typeof v === 'number';
};

const isBoolean = function(v){
    return typeof v === 'boolean';
};

const isDate = function(v){
    return type(v) === '[object Date]';
};

const isString = function(v){
    return typeof v === 'string';
};

const isArray = function(v){
    return type(v) === '[object Array]';
};
const isFunction = function(v){
    return type(v) === '[object Function]';
};



const forEach = function (obj, iterator, context) {
    var key, length;
    if (obj) {
        if (isFunction(obj)) {
            for (key in obj) {
                if (key != 'prototype' && key != 'length' && key != 'name' && (!obj.hasOwnProperty || obj.hasOwnProperty(key))) {
                    iterator.call(context, obj[key], key, obj);
                }
            }
        } else if (isArray(obj) && obj.length) {
            var isPrimitive = typeof obj !== 'object';
            for (key = 0, length = obj.length; key < length; key++) {
                if (isPrimitive || key in obj) {
                    iterator.call(context, obj[key], key, obj);
                }
            }
        } else if (obj.forEach && obj.forEach !== forEach) {
            obj.forEach(iterator, context, obj);
        } else {
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    iterator.call(context, obj[key], key, obj);
                }
            }
        }
    }
    return obj;
}

const merge= function (dst) {
    for (var i = 1, ii = arguments.length; i < ii; i++) {
        var obj = arguments[i];
        if (obj) {
            var keys = Object.keys(obj);
            for (var j = 0, jj = keys.length; j < jj; j++) {
                var key = keys[j];
                dst[key] = obj[key];
            }
        }
    }
    return dst;
}

export {
    assign,
    merge


};
