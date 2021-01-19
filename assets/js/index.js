$(function () {
    getUserInfo()
    // 退出
    var layer = layui.layer;
    $('#btnLogout').on('click', function () {
        //eg1
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            (index);
            // 清空本地缓存
            localStorage.removeItem('token')
            // 跳转页面
            location.href = "/login.html";
            // 关闭弹出款
            layer.close(index);

        });
    })

});
// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers 就是请求头配置对象
        //   headers: {
        //     Authorization: localStorage.getItem('token') || ''
        //   },
        success: function (res) {
            //   console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        }
    })
}
function renderAvatar(user) {
    //   渲染名称nickname优先没有用 username
    var name = user.nickname || user.username;
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
    //   2.渲染用户的头像
    if (user.user_pic !== null) {
        //有头像
        $('.layui-nav-img').attr("src", user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        //没有头像
        $(".layui-nav-img").hide()
        // 获取到第一个数值
        var text = name[0].toUpperCase();
        $(".text-avatar").show().html(text)
    }

}