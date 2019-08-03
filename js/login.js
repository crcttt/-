$(function () {

  $('#switch_qlogin').click(function () {
    $('#switch_login').removeClass("switch_btn_focus").addClass('switch_btn');
    $('#switch_qlogin').removeClass("switch_btn").addClass('switch_btn_focus');
    $('#switch_bottom').animate({
      left: '0px',
      width: '70px'
    });
    $('#qlogin').css('display', 'none');
    $('#web_qr_login').css('display', 'block');

  });
  $('#switch_login').click(function () {

    $('#switch_login').removeClass("switch_btn").addClass('switch_btn_focus');
    $('#switch_qlogin').removeClass("switch_btn_focus").addClass('switch_btn');
    $('#switch_bottom').animate({
      left: '154px',
      width: '70px'
    });

    $('#qlogin').css('display', 'block');
    $('#web_qr_login').css('display', 'none');
  });
  /*if (getParam("a") == '0') {
    $('#switch_login').trigger('click');
  }*/

});

/*
//根据参数名获得该参数 pname等于想要的参数名 
function getParam(pname) {
  var params = location.search.substr(1); // 获取参数 平且去掉？ 
  var ArrParam = params.split('&');
  if (ArrParam.length == 1) {
    //只有一个参数的情况 
    return params.split('=')[1];
  } else {
    //多个参数参数的情况 
    for (var i = 0; i < ArrParam.length; i++) {
      if (ArrParam[i].split('=')[0] == pname) {
        return ArrParam[i].split('=')[1];
      }
    }
  }
}*/


$(document).ready(function () {
  $('#user').blur(function () {
    if ($('#user').val() == "") {
      $('#userCue').html("<font color='red'><b>×用户名不能为空</b></font>");
    } else
    if ($('#user').val().length < 4 || $('#user').val().length > 16) {
      $('#userCue').html("<font color='red'><b>×用户名位4-16字符</b></font>");
    } else {

      $('#userCue').html("<font ><b>格式正确</b></font>");
      var uname = $('#user').val()

      $.ajax({ //验证用户名
        url: "http://127.0.0.1:3000/user/query_uname",
        type: "post",
        data: {
          uname
        },
        dataType: "json",
        success: function (result) {

          if (result.code < 0) {
            $('#userCue').html("<font color='red'><b>用户已存在</b></font>");
          } else {
            $('#userCue').html("<font ><b>可以使用</b></font>");
          }
        }
      })
    }

  })
  $('#passwd').blur(function () {
    if ($('#passwd').val().length < 6) {
      $('#passwd').focus();
      $('#userCue').html("<font color='red'><b>×密码不能小于" + 6 + "位</b></font>");

    } else {
      $('#userCue').html("<font ><b>格式正确</b></font>");
    }
  })
  $('#passwd2').blur(function () {
    if ($('#passwd2').val() != $('#passwd').val()) {
      $('#passwd2').focus();
      $('#userCue').html("<font color='red'><b>×两次密码不一致！</b></font>");

    } else {
      $('#userCue').html("<font ><b>格式正确</b></font>");
    }
  })


  $('#deng').click(function () {
    var uname = $('#u').val();
    var upwd = $('#p').val();
    $.ajax({ //验证用户名
      url: "http://127.0.0.1:3000/user/login",
      type: "post",
      xhrFields: {
        withCredentials: true
      },
      data: {
        uname,
        upwd
      },
      dataType: "json",
      success: function (result) {
        if (result.code != 1) {
          alert("账号或密码错误")
        } else {
          sessionStorage.setItem("uname", uname)
          alert("账号或密码正确,3秒跳转回首页")
          setInterval(function () {
            location.href = "index.html"
          }, 3000)
        }
      }
    })
  });

  $('#reg').click(function () {
    var uname = $('#user').val();
    var upwd = $('#passwd').val();
    $.ajax({ //验证用户名
      url: "http://127.0.0.1:3000/user/reg",
      type: "post",
      data: {
        uname,
        upwd
      },
      dataType: "json",
      success: function (result) {
        if (result.code != 1) {
          alert("注册失败")
        } else {
          alert("注册成功")
        }
      }
    })

  });



});