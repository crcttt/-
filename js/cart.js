$(document).ready(function () {
  $.ajax({ //验证用户名
    url: "http://127.0.0.1:3000/user/cart",
    type: "get",
    data: {},
    xhrFields: {
      withCredentials: true
    },
    dataType: "json",
    success: function (result) {
      console.log(result)
      if (result.code == -1) {
        alert("请登录")
        location.href = "index.html"
      }

      var html = "";
      var zj = 0;
      var msg = result.msg
      for (var item of msg) {
        item.cb = true
      }
      console.log(msg)

      function long() {
        for (const res of msg) {
          html += `
        <div class="cart-item" data-id="${res.id}">
          <div class="leftImgText">
           <input type="checkbox" ${res.cb?"checked":""} data-id="${res.id}" class="select">
           <img src="${res.img_url}">
           <div class="price">${res.title}</div>
          <div class="sl">
            <button>-</button><input type ="text" data-id="${res.id}" value="${res.count}">
            <button>+</button></div>
           <div class="price">单价：${res.price}</div> 
           <div>小计：${res.price*res.count}</div>
          </div>
          <button class="layui-btn layui-btn-danger del" data-id="${res.id}">删除</button>
        </div>
        `
          if (res.cb == true) {
            zj += res.price * res.count
          }
        }
        $("#pics").html(html)
        $("#zpris").html(zj)
        $("#zs").html(msg.length)
        html = ""
      }
      long()
      $("#selectALL").change(function (e) {
        var cb = e.target.checked;
        console.log(cb)
        for (var item of msg) {
          item.cb = cb
        }
        long()
      })
      $(".select").change(function (e) {
        var cb = e.target.checked;
        var i = $(e.target).attr("data-id");
        console.log(i)
        console.log(cb)

      })

      $(".del").click(function (e) {
        var i = $(e.target).attr("data-id");
        console.log(i)
        msg.splice(i - 1, 1);
        long()
      })

    }
  })

})