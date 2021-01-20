// 测试环境
var bsaeURl = 'http://api-breakingnews-web.itheima.net';
// 开发环境
// var bsaeURl = 'http://api-breakingnews-web.itheima.net';
// 生产环境
// var bsaeURl = 'http://api-breakingnews-web.itheima.net';
// 不需要入口函数
$.ajaxPrefilter(function (paeams) {
    paeams.url = bsaeURl + paeams.url;
    // alert(paeams.url);
    // 身份认证
    if (paeams.url.indexOf('/my/') !== -1) {
        paeams.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 3.拦截所有相应，判断身份
    paeams.complete = function (res) {
        // console.log(res.responseJSON);
        var obj = res.responseJSON;
        if (obj.status == 1 && obj.message == '身份认证失败！') {
            // 清空本地缓存
            localStorage.removeItem('token')
            // 跳转页面
            location.href = "/login.html";

        }

    }
})