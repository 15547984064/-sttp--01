// 入口函数
$(function(){
    $('#link_login').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_reg').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })
})