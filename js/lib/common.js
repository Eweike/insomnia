var Common = {
    URL: "http://adventure.baidingyouji.com/ap/v2",
    shareUrl: "https://mp.weixin.qq.com/s/t9hoSScv21ONZveFxrl70g"
}

var ajaxPromise = function ajaxPromise(param) {
    return new Promise(function (resovle, reject) {
        $.ajax({
            "type": param.type || "get",
            "async": param.async || true,
            "url": param.url,
            "data": param.data || "",
            "contentType": param.contentType || "application/x-www-form-urlencoded",
            headers: param.headers || "",
            "success": function(res) {
                console.log(res)
                if (res.code == 200) {
                    resovle(res);
                } else {
                    reject(res);
                }
            },
            "error": function(err) {
                console.log(err.responseText)
                reject(err);
            }
        });
    });
};

var judgeUserIdCommon = function () {
    // 判断是否openid，若不存在，则请求获取
    if (!sessionStorage.getItem('openid')) { //如果缓存中userId不存在，则重新发起请求
        // weuiAlert("温馨提示~","请通过白丁友记公众号书信漂流进行报名~")
        return false
    } else {
        return true
    }
};

/**
 * 获取页面地址参数
 * @param name(需要获取的参数名)
 * @returns {*}
 */
function getUrlParam(name) {
    var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
    var matcher = pattern.exec(window.location);
    var items = null;
    if (matcher != null) {
        try {
            items = decodeURIComponent(decodeURIComponent(matcher[1]));
        } catch (e) {
            try {
                items = decodeURIComponent(matcher[1]);
            } catch (e) {
                items = matcher[1];
            }
        }
    }
    return items;
}

/**
 * weui组件的弹窗功能
 */
function weuiAlert(showTitle, showText) {
    var showTitle = showTitle || '温馨提示~';
    var showText = showText || '请求错误';
    weui.alert(showText, function () {}, {
        title: showTitle
    });
}

/**
 * weui组件的topTip功能
 */
function weuiTopTip(showText) {
    var showText = showText || '请填写正确的字段';
    weui.topTips(showText, {
        duration: 1200,
        className: "custom-classname",
        callback: function callback() {}
    });
}
/**
 * weui组件的Toast功能
 */
function weuiToast(showText) {
    var showText = showText || '操作成功';
    weui.toast(showText, {
        duration: 1000,
        className: "bears"
    });
}
/**
 * weui组件的Loading功能
 */
function weuiLoading() {
    var loading = weui.loading('加载中..');
}
/**
 * weui组件的HideLoading功能
 */
function weuiHideLoading() {
    var loading = weui.loading('loading');
    loading.hide();
}
/**
 * weui组件的Confirm功能
 */
function weuiConfirm(showTitle, showText) {
    var showTitle = showTitle || '请求错误';
    var showText = showText || '请检查网络';
    weui.confirm(showText, function () {
        console.log('yes');
    }, function () {
        console.log('no');
    }, {
        title: showTitle
    });
}

/**
 * 获取微信配置
 */
const getWxConfig = function (shareInfo, callback) {
    $.ajax({
        url: `http://goal.baidingyouji.com/api/user/GetSinature/v1?url=${
            location.href.split("#")[0]
          }`,
        type: "GET",
        success: function (res) {
            wx.config({
                debug: false, // 开启调试模式,
                appId: "wx2c5593136f532d45", // 必填，企业号的唯一标识，此处填写企业号corpid
                timestamp: res.timespan, // 必填，生成签名的时间戳
                nonceStr: res.noncestr, // 必填，生成签名的随机串
                signature: res.sign, // 必填，签名，见附录1
                jsApiList: [
                    "onMenuShareTimeline",
                    "onMenuShareAppMessage",
                    "onMenuShareQQ",
                    "onMenuShareWeibo"
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(function () {
                //需在用户可能点击分享按钮前就先调用
                wx.onMenuShareTimeline({
                    title: shareInfo.title, // 分享标题
                    // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    link: shareInfo.link,
                    // link: Common.shareUrl,
                    imgUrl: shareInfo.img, // 分享图标，不能使png图片
                    success: function () {
                        if(callback instanceof Function)callback()
                    }
                });
                wx.onMenuShareAppMessage({
                    title: shareInfo.title, // 分享标题
                    desc: shareInfo.desc, // 分享描述
                    link: shareInfo.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    // link: Common.shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: shareInfo.img, // 分享图标
                    success: function () {
                        if(callback instanceof Function)callback()
                    }
                });
            });
        },
        error: function (err) {
            weuiAlert("温馨提示", "微信配置请求错误")
            console.log(err)
        }
    })
}