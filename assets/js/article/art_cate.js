$(function () {
    initArtCateList()
    // 1.文章类别展示函数
    function initArtCateList() {
        $.ajax({
            mathod: "GET",
            url: '/my/article/cates',
            success: function (res) {
                var str = template('tpl-art-cate', res);
                $('tbody').html(str);

            }
        })
    }
    // 2.显示添加文章分类类表
    var layer = layui.layer
    $("#btnAdd").on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '260px'],
            content: $('#dailog-add').html(),
        })
    })
    // 3.提交文章分类添加(事件委托)
    var indexAdd = null;
    $("body").on("submit", "#form-add", function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('添加失败！')
                }
                initArtCateList();
                layer.msg('文章类别添加成功！');
                layer.close(indexAdd);
            }
        })
    })
    // 4.修改-展示表单
    var form = layui.form;
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function () {
        // 弹出一个修改文章分类信息的层
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })

        // 4.2获取id，发送ajax获取数据，渲染页面
        var id = $(this).attr('data-id')
        // 发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        })
    })
    // // 5.更新文章分类数据
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('更新分类数据成功！')
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })
    //6.删除文章
    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id')
        // 提示用户是否要删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
          $.ajax({
            method: 'GET',
            url: '/my/article/deletecate/' + id,
            success: function(res) {
              if (res.status !== 0) {
                return layer.msg('删除分类失败！')
              }
              layer.msg('删除分类成功！')
              layer.close(index)
              initArtCateList()
            }
          })
        })
    })
})