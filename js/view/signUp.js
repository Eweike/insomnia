var name = "" //笔名
var wnum = ''; //微信号
var pnum = ''; //手机号
var sex = ''; //性别
var age = ''; //年龄
var school = ''; //学校id
$(function () {
    let signUpState = localStorage.getItem("signUpState") || "false"
    if(signUpState == "true"){
        window.location.href = '../page/signOk.html'
    }
    let openid = localStorage.getItem("openid") || ""
    if (openid == '') {
        getUserId()
    }
    $('#sex').on('click', function () { //点击性别龄选择器
        sexPicker()
    })
    $('#picker').on('click', function () { //点击年龄选择器
        agePicker()
    });
    $("#introduce").attr("href", Common.shareUrl);
    $('.btn').on('click', function () {
        signUp()
    })
})

/**
 * 通过code获取userId
 */
var getUserId = function () {
    var code = getUrlParam("code");
    ajaxPromise({
        url: Common.URL + "/user?code=" + code,
        type: "GET"
    }).then(res => {
        let openid = res.data
        localStorage.setItem('openid', openid)
    }, err => {
        weuiAlert("温馨提示", err.msg)
    })
}

/**
 * 点击提交
 */
const signUp = function () {
    var phoneReg = /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/;
    name = $('#nickname').val() || ""
    wnum = $('#wnum').val() || ""
    pnum = $('#num').val() || ""
    school = $('#school').val() || ""
    if (name == "") {
        weuiTopTip("请填写姓名，可以让人更容易记住你哟~")
    } else if (wnum == "") {
        weuiTopTip("请填写微信号，收到信的小哥哥小姐姐说不定会加你微信哦~")
    } else if (pnum == "") {
        weuiTopTip("请填写手机号，如果有重要通知，我们会通过短信通知的哟~")
    } else if (sex == "") {
        weuiTopTip("请选择性别，嗯！这个很重要~")
    } else if (age == "") {
        weuiTopTip("选择年龄，嗯！这个还蛮重要的呢~")
    } else if (school == "") {
        weuiTopTip("请选择所在学校")
    } else if (!phoneReg.test($('#num').val())) {
        weuiTopTip('填写正确的手机号哦，手机号不对，可能接收不到重要通知呢！')
    } else {
        let userInfo = {
            name: name,
            weixin: wnum,
            phone: pnum,
            sex: sex,
            age: age,
            school: school
        }
        localStorage.setItem("userInfo", JSON.stringify(userInfo))
        window.location.href = "./share.html"
    }
}

/**
 * 性别选择器
 */
const sexPicker = function () {
    weui.picker([{
        label: '男生',
        value: '0'
    }, {
        label: '女生',
        value: '1'
    }], {
        onChange: function (result) {
            // console.log(result);
        },
        onConfirm: function (result) {
            sex = result[0].value
            $('#sex').text(result[0].label);
        }
    })
}
/**
 * 年龄选择器
 */
const agePicker = function () {
    weui.picker([{
        label: '16岁',
        value: 16
    }, {
        label: '17岁',
        value: 17
    }, {
        label: '18岁',
        value: 18
    }, {
        label: '19岁',

        value: 19
    }, {
        label: '20岁',
        value: 20
    }, {
        label: '21岁',
        value: 21
    }, {
        label: '22岁',
        value: 22
    }, {
        label: '23岁',
        value: 23
    }, {
        label: '24岁',
        value: 24
    }, {
        label: '25岁',
        value: 25
    }], {
        onChange: function (result) {
            // console.log(result);
        },
        onConfirm: function (result) {
            age = result[0].value
            $('#picker').text(result[0].label)
        },
    });
}