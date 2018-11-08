$(function () {
    $('#detailBtn').on('click', function () { //查看活动详情
        window.location.href = Common.shareUrl
    })
    let time = getUrlParam("time")
    $("#time").text(time)
})