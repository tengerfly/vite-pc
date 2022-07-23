import router from '../router';
import * as dd from 'dingtalk-jsapi'; //dingtalk-jsapi  https://open.dingtalk.com/document/isvapp-client/read-before-development
/*
 * 重新获取钉钉code
 * */
export const refreshDDCode = () => {
    dd && dd.ready(function () {
        dd.runtime.permission.requestAuthCode({
            corpId: getQueryVariable("corpId"),
            onSuccess: function (result) {
                localStorage.setItem("DINGDING_CODE", result.code);
            },
            onFail: function (err) {}
        });
    });
}
/**
 * 本地Demo联调的时候请求走proxy代理（vite.config.js中的代理配置）
 * 其他情况请求域名https://qzz-okr.forwe.store/，通过Host配置来区分daily,gray,prod（线上）环境
 * return String[baseURL]
 */
export const checkUrl = () => {
    let localUrl = '';
    let baseURL = '';
    let dailyURL = 'https://daily-okr.forwe.store/';
    let prodURL = 'https://qzz-okr.forwe.store/';
    let isMock = location.host.includes('localhost') || location.host.includes('127.0.0.1');
    if (isMock) {
        baseURL = '';
    }
    return baseURL;
}
/*
 * 判断是否是钉钉环境
 * 钉钉开放平台暂时没有一个确定的方法可以判断是钉钉环境，后续完善
 * */
export const isDDEnv = () => {
    let isDDEnv = location.host.includes('localhost') || location.host.includes('127.0.0.1');
    return !isDDEnv;
}
/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
export const toLogin = () => {
    router.replace({
        path: '/login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    });
}
/**
 * 获取字符串的首字符
 */
export const getFirstStr = (str) => {
    if (str) {
        return str.substring(0, 1);
    }
}
/**
 * 获取当前月的第一天
 * @returns {string}
 * @param {Date obj}
 */
export const getCurrentMonthFirst = (d) => {
    let date = new Date(d);
    date.setDate(1);
    let year = date.getFullYear();
    let month = parseInt(date.getMonth() + 1);
    let day = date.getDate();
    if (month < 10) {
        month = '0' + month
    }
    if (day < 10) {
        day = '0' + day
    }
    return year + '年' + month + '月' + day + '日';
}
/**
 * 获取后边几个月的第一天
 * @returns {string}
 * @param {
 *        d:Date obj,
 *       n: month
 * }
 */
export const getAfterMonthFirst = (date, n) => {
    let d = new Date(date);
    d.setMonth(d.getMonth() + n);
    d.setDate(1);
    let year = d.getFullYear();
    let month = parseInt(d.getMonth() + 1);
    let day = d.getDate();
    if (month < 10) {
        month = '0' + month
    }
    if (day < 10) {
        day = '0' + day
    }
    return year + '-' + month + '-' + day;
}
export const getAfterMonthText = (date, n) => {
	let d = new Date(date);
	d.setMonth(d.getMonth() + n);
	d.setDate(1);
	let year = d.getFullYear();
	let month = parseInt(d.getMonth() + 1);
	let day = d.getDate();
	if (month < 10) {
		month = '0' + month
	}
	if (day < 10) {
		day = '0' + day
	}
	return year + '年' + month + '月';
}
/**
 * 合并两个数组并去重
 * @returns {Array}
 * @param {
 *        arr1:第1个数组
 *        arr2:第2个数组
 * }
 */
export const mergeTwoArrayAndClearRepeat = (arr1, arr2) => {
    // return Array.from(new Set([...arr1, ...arr2]));
    let arr3 = arr1.concat(arr2)
    let arr4 = []
    for (let i = 0, len = arr3.length; i < len; i++) {
        if (arr4.indexOf(arr3[i]) === -1) {
            arr4.push(arr3[i])
        }
    }
    return arr4;
}
/**
 * 合并数组对象中id相同的数据
 * @returns {Array}
 * @param {
 *        Array:数组
 *       kye:关键字
 * }
 */
export const mergeArray = (arr, key) => {
    const mp = {}
    for (let obj of arr) {
        const {
            key,
            value
        } = obj
        if (mp[key]) {
            mp[key].value.push(value)
        } else {
            mp[key] = {
                key,
                value: [value]
            }
        }
    }
    return Object.values(mp)
}
/*
 * 返回页面中的查询参数
 * */
export const getQueryVariable = (sKey) => {
    let resObj = {};
    let reg = /(\w+)=(\w+)/g;
    let sUrl = window.location.href;
    while (reg.exec(sUrl)) {
        resObj[RegExp.$1] ? resObj[RegExp.$1] = [].concat(resObj[RegExp.$1], RegExp.$2) : resObj[RegExp.$1] = RegExp.$2;
    }
    if (sKey) {
        return (resObj[sKey] ? resObj[sKey] : '');
    }
    return resObj;
}
/*
 * 返回页面中的查询参数
 * */
export const getDDCode = () => {
    return localStorage.getItem("DINGDING_CODE");
}
/*
 * 判断是否是一个空对象
 * */
export const checkEmptyObj = (obj) => {
    let arr = Object.keys(obj);
    if (arr.length == 0) {
        return true;
    }
    return false;
}

// 将数字变成大写
export const toChinesNum = (num) => {
    let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']; //changeNum[0] = "零"
    let unit = ["", "十", "百", "千", "万"];
    num = parseInt(num);
    let getWan = (temp) => {
        let strArr = temp.toString().split("").reverse();
        let newNum = "";
        for (var i = 0; i < strArr.length; i++) {
            newNum = (i == 0 && strArr[i] == 0 ? "" : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? "" : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum;
        }
        return newNum;
    }
    let overWan = Math.floor(num / 10000);
    let noWan = num % 10000;
    if (noWan.toString().length < 4) noWan = "0" + noWan;
    return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);

}
export const timeCycle = (time, num) => {
    time = time.replace(/\-/g, '/');
    const list = new Date(time)
    const timeCapital = ["日", "一", "二", "三", "四", "五", "六"];
	const Day = list.getDay();
    const Year = list.getFullYear() // 年
    let Month = list.getMonth() + 1 // 月
    let date = list.getDate() // 日
    let Hour = list.getHours() // 时
    let Minutes = list.getMinutes() // 分
    let Seconds = list.getSeconds() // 秒
    Month = Month < 10 ? "0" + Month : Month; //月份如果小于10，则在前面加一个0
    date = date < 10 ? "0" + date : date; //day如果小于10，则在前面加一个0
    Hour = Hour < 10 ? "0" + Hour : Hour; //月份如果小于10，则在前面加一个0
    Minutes = Minutes < 10 ? "0" + Minutes : Minutes; //day如果小于10，则在前面加一个0
    let result = ''
    switch (num) {
        case 1:
            result = `${Year}年${Month}月${date}日`
            break;
        case 2:
            result = `${Year}.${Month}.${date}`
            break;
        case 3:
            result = `${Month}.${date}`
            break;
        case 4:
            result = `${Hour}:${Minutes}`
            break;
		case 5:
			result = `星期${timeCapital[Day]}`;
            break;
        default:
            break;
    }
    return result
}
// 判断true/false
export const isTrue = (bol) => {
    return `${bol}` === 'true'
}
// 是否为空
export const isNull = (bol) => {
    return bol === '' || bol === null || bol == undefined || !/^(?!(\s+$))/.test(bol)
}

// 防抖
export const debounce = (fn, delay = 500) => {
    let timer;
    return function () {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments);
            timer = null;
        }, delay);
    };
};
//获取URL参数
export const handlerQuery = (name, queryStr = "") => {
    if (queryStr == null) {
        return null
    }
    // 以？截取字符串返回一个数组，数组的第一项为？前的数据，数据第2项为？后的数据
    let query = queryStr.split("?")[1]
    let queryList = query.split("&")
    for (let key of queryList) {
        // console.log(key)	//  username=admin    password=admin123
        if (key.split("=")[0] === name) {
            return key.split("=")[1]
        }
    }
}
// 存储localStorage
export function setStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
// 存储localStorage
export function getStorage(key) {
    const value = localStorage.getItem(key) || '';
    return value ? JSON.parse(value) : null;
}
// 处理时间格式兼容性问题  使用new Date('2022-06-01') 时，钉钉里边会有兼容问题，时间格式要改成2022/06/01
export function formatCompatibleTime(t) {
    if(t && t.toString().includes('-')){
        return t.replace(/\-/g, '/');
    }
    return t;
}
/******** 格式化时间 ********/
export const dateFormat = (fmt, date) =>{
	let ret;
	if(date){
		const opt = {
			"Y+": date.getFullYear().toString(),        // 年
			"m+": (date.getMonth() + 1).toString(),     // 月
			"d+": date.getDate().toString(),            // 日
			"H+": date.getHours().toString(),           // 时
			"M+": date.getMinutes().toString(),         // 分
			"S+": date.getSeconds().toString()          // 秒
			// 有其他格式化字符需求可以继续添加，必须转化成字符串
		};
		for (let k in opt) {
			ret = new RegExp("(" + k + ")").exec(fmt);
			if (ret) {
				fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
			};
		};
		return fmt;
	}
	return "";
}
