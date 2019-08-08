$(document).ready(function () {
  $.ajax({
    //验证用户名
    url: "http://127.0.0.1:3000/user/cart",
    type: "get",
    data: {},
    xhrFields: {
      withCredentials: true
    },
    dataType: "json",
    success: function (result) {
      console.log(result);
      if (result.code == -1) {
        alert("请登录");
        location.href = "index.html";
      }

      var html = "";
      var zj = 0;
      var zs = 0;
      var msg = result.msg;
      for (var item of msg) {
        item.cb = true;
      }
      console.log(msg);

      //function long() {
      html = "";
      zj = 0;
      zs = 0;
      for (const res of msg) {
        html += `
        <div class="cart-item" data-id="${res.id}">
          <div class="leftImgText">
           <input type="checkbox" ${res.cb ? "checked" : ""} data-id="${
          res.id
        }" class="select">
           <img src="${res.img_url}">
           <div class="price">${res.title}</div>
          <div class="sl">
            <button class="sub" data-id="${
              res.id
            }">-</button><input type ="text" data-id="${res.id}" value="${
          res.count
        }">
            <button class="add" data-id="${res.id}">+</button></div>
           <div class="price">单价：${res.price}</div> 
           <div>小计：<span data-id="${res.id}">${res.price * res.count}</span></div>
          </div>
          <button class="layui-btn layui-btn-danger del" data-id="${
            res.id
          }">删除</button>
        </div>
        `;
        if (res.cb == true) {
          zj += res.price * res.count;
          zs += res.count;
        }
      }
      $("#pics").html(html);
      $("#zpris").html(zj);
      $("#zs").html(zs);
      //}
      //long();
      $("#selectALL").change(function (e) {
        //全选
        var cb = e.target.checked;
        console.log(cb);
        for (var item of msg) {
          item.cb = cb;
        }
        if (cb) {
          $(".select").prop("checked", true);
        } else {
          $(".select").removeAttr("checked");
        }
        zj = 0;
        zs = 0;
        for (const m of msg) {
          if (m.cb == true) {
            zj += m.price * m.count;
            zs += m.count;
          }
        }
        $("#zpris").html(zj);
        $("#zs").html(zs);
        console.log(msg);
      });
      $(".select").change(function (e) {
        //单选
        e.stopPropagation();
        var cb = e.target.checked;
        var msgid = $(e.target).attr("data-id");
        console.log(msgid);
        console.log(cb);
        for (let i = 0; i < msg.length; i++) {
          if (msg[i].id == msgid) {
            msg[i].cb = cb;
          }
        }
        console.log(msg);
        var n = 0;
        for (let j = 0; j < msg.length; j++) {
          if (msg[j].cb == false) {
            $("#selectALL").removeAttr("checked");
          } else {
            n++;
          }
        }
        console.log(n);
        if (n == msg.length) {
          //$("#selectALL").attr("checked", true);
          $("#selectALL").prop("checked", true);
        }
        zj = 0;
        zs = 0;
        for (const m of msg) {
          if (m.cb == true) {
            zj += m.price * m.count;
            zs += m.count;
          }
        }
        $("#zpris").html(zj);
        $("#zs").html(zs);
        console.log(msg);
      });

      $(".layui-btn.layui-btn-danger.del").click(function (e) {
        //单删
        e.stopPropagation();
        var msgid = $(e.target).attr("data-id");
        console.log(msgid);
        console.log(msg);
        for (let i = 0; i < msg.length; i++) {
          if (msg[i].id == msgid) msg.splice(i, 1);
        }
        //long();
        $(`.cart-item[data-id=${msgid}]`).remove();
        zj = 0;
        zs = 0;
        for (const m of msg) {
          if (m.cb == true) {
            zj += m.price * m.count;
            zs += m.count;
          }
        }
        $("#zpris").html(zj);
        $("#zs").html(zs);
        console.log(msg);
      });
      $(".delall").click(function () {
        //多删
        var str = ""; //创建变量保存删除商品id
        for (let i = 0; i < msg.length; i++) {
          if (msg[i].cb) {
            $(`.cart-item[data-id=${msg[i].id}]`).remove();
            str += msg[i].id + ","
            msg.splice(i, 1, "");
          }
        }
        var arr = []
        for (let i = 0; i < msg.length; i++) {
          if (!msg[i] == "") {
            arr.push(msg[i])
          }
        }
        msg = arr
        console.log(str)
        $("#zpris").html(0);
        $("#zs").html(0);
        console.log(msg);
      });
      $(".sub").click(function (e) {
        //减
        var msgid = $(e.target).attr("data-id");
        console.log(msgid);
        for (let i = 0; i < msg.length; i++) {
          if (msg[i].id == msgid) {
            if (msg[i].count == 1) {
              return;
            } else {
              msg[i].count--;
              $(`input[data-id=${msgid}]`).val(msg[i].count);
              $(`span[data-id=${msgid}]`).html(msg[i].count * msg[i].price);
            }
          }
        }
        zj = 0;
        zs = 0;
        for (const m of msg) {
          if (m.cb == true) {
            zj += m.price * m.count;
            zs += m.count;
          }
        }
        $("#zpris").html(zj);
        $("#zs").html(zs);
        console.log(msg);
      });
      $(".add").click(function (e) {
        //加
        var msgid = $(e.target).attr("data-id");
        console.log(msgid);
        for (let i = 0; i < msg.length; i++) {
          if (msg[i].id == msgid) {
            msg[i].count++;
            $(`input[data-id=${msgid}]`).val(msg[i].count);
            $(`span[data-id=${msgid}]`).html(msg[i].count * msg[i].price);
          }
        }
        zj = 0;
        zs = 0;
        for (const m of msg) {
          if (m.cb == true) {
            zj += m.price * m.count;
            zs += m.count;
          }
        }
        $("#zpris").html(zj);
        $("#zs").html(zs);
        console.log(msg);
      });
    }
  });
});