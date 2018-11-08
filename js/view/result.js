$(function () {
    $("#introduce").attr("href", "http://www.baidu.com")    //奖励介绍
    getRankInfo()
})
/**
 * 获取奖励信息
 */
const getRankInfo = function () {
    let userInfo = JSON.parse(localStorage.getItem("userInfo")) || ""
    let count = getUrlParam("count")
    let aypniaSum = getUrlParam("aypniaSum")
    let rank = getUrlParam("rank")
    let reward = getUrlParam("reward")
    $("#name").text(userInfo.name)
    $("#count").text(count)
    $("#aypniaSum").text(aypniaSum)
    $("#rank").text(rank)
    $("#reward").text(reward)
    let rewardDetail = ""
    let rewardLink = ""
    switch (reward) {
        case "重度失眠":
            rewardDetail = "全年免费面膜的DK会员<br /> + 50元三只松鼠零食礼包"
            rewardLink = "./reward.html?type=2"
            break;
        case "中度失眠":
            rewardDetail = "DK补水保湿面膜5贴"
            rewardLink = "http://www.baidu.com"
            break;
        case "轻度失眠":
            rewardDetail = "DK补水面膜会员购买机会"
            rewardLink = "./reward.html?type=0"
    }
    $("#rewardDetail").html(rewardDetail)
    $("#rewardBtn").on('click', function(){
        window.location.href = rewardLink
    })
}