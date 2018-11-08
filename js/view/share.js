$(function () {
    let shareInfo = {
        title: "大学里每隔一段时间就想杀室友怎么办？",
        desc: "失眠保险",
        img: "http://adventure.baidingyouji.com/ap/web/images/shareImg1.jpg",
        link: "http://adventure.baidingyouji.com/ap/web/page/webView.html"
    }
    getWxConfig(shareInfo, signUp)
    $('#shareBtn').on('click', function () { //点击分享
        $("#cover").show()
    })
    $('#cover').on('click', function () { //点击遮罩层关闭
        $("#cover").hide()
    })
})

/**
 * 报名
 */
const signUp = function () {
    let openid = localStorage.getItem("openid")
    let userInfo = JSON.parse(localStorage.getItem("userInfo"))
    let name = userInfo.name
    let weixin = userInfo.weixin
    let phone = userInfo.phone
    let sex = parseInt(userInfo.sex)
    let age = parseInt(userInfo.age)
    let school = userInfo.school
    weuiLoading()
    ajaxPromise({
        url: `${Common.URL}/user?age=${age}&gender=${sex}&nickname=${name}&openid=${openid}&phone=${phone}&school=${school}&weixin=${weixin}`,
        type: "POST",
    }).then(res => {
        localStorage.setItem("signUpState", "true")
        setTimeout(() => {
            weuiHideLoading()
            weuiToast("报名成功!")
        }, 500);
        setTimeout(() => {
            window.location.href = "../page/signOk.html?time=" + res.data.date
        }, 1200);
    }, err => {
        weuiAlert("温馨提示", err.msg)
    })
}