$(function () {
    getBanner()
    getActicityInfo()
    $('#clockBtn').on('click', tapToClock) //点击签到
    $('#cover').on('click', changeCover) //点击遮罩层关闭
})

/**
 * 获取活动信息
 */
const getActicityInfo = function () {
    let openid = localStorage.getItem("openid")
    ajaxPromise({
        url: Common.URL + "/event?openid=" + openid,
        type: "GET",
    }).then(res => {
        let {
            aypniaSum,
            date,
            signList,
            is_signed,
            count
        } = res.data
        let shareInfo = {
            title: "已经失眠" + count + "天了，希望明天睡个好觉……",
            desc: "失眠保险",
            img: "http://adventure.baidingyouji.com/ap/web/images/shareImg2.jpg",
            link: "http://adventure.baidingyouji.com/ap/web/page/sahrePage.html"
        }
        getWxConfig(shareInfo)
        let rank = res.data.rank || ''
        if (rank !== '') {
            let reward = res.data.reward
            window.location.href = `./result.html?rank=${rank}&reward=${reward}&count=${count}&aypniaSum=${aypniaSum}`
        }
        $(".date-tip").text(date)
        $("#lateTime").text(aypniaSum)
        signList.forEach(item => {
            $(`#date${item}`).addClass("clock")
        })
        if (is_signed == 1) {
            changeCover()
            $("#clockBtn").text("已签到")
            $('#clockBtn').off('click')
            $('#clockBtn').on('click', changeCover) //再次点击签到
        }
    }, err => {
        weuiAlert("温馨提示", err.msg)
    })
}
/**
 * 点击签到
 */
const tapToClock = function () {
    let openid = localStorage.getItem("openid")
    weuiLoading()
    ajaxPromise({
        url: Common.URL + "/event?openid=" + openid,
        type: "POST",
    }).then(res => {
        setTimeout(() => {
            weuiHideLoading()
            weuiToast("签到成功!")
        }, 500);
        setTimeout(() => {
            getActicityInfo()
        }, 1200);
    }, err => {
        setTimeout(() => {
            weuiHideLoading()
            if (err.code == 40001 || err.code == 40003) {
                window.location.href = "./error.html"
            } else {
                weuiAlert("温馨提示", err.msg)
            }
        }, 500);
    })
}
/**
 * 获取推荐图
 */
const getBanner = function () {
    ajaxPromise({
        url: Common.URL + "/banner",
        type: "GET",
    }).then(res => {
        let banner = res.data[0]
        $("#banner").css('background', "url(" + banner.img + ")");
        $("#banner").css('background-repeat', 'no-repeat');
        $("#banner").css('background-size', '100%');
        $("#banner").on('click', function () {
            window.location.href = banner.url
        })
    }, err => {
        weuiAlert("温馨提示", err.msg)
    })
}
/**
 * 控制遮罩层显隐
 */
const changeCover = function () {
    $("#cover").toggle()
}