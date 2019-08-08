$(function () {
  //用户信息
  var un = sessionStorage.getItem("uname");
  if (un) {
    var str = `
      <li class="dinglan-left myscheng"><a href="javascript:;">${un}</a></li>
      <li class="dinglan-left myscheng1"><a href="javascript:loginout();">退出</a></li>
      <li class="dinglan-left myscheng2"><a href="javascript:;" >我的商城</a></li> `;
    $("#msg").html(str);
  } else {
    var str = `
      <li class="dinglan-left myscheng"><a href="login.html">您好，请登录</a></li>
      <li class="dinglan-left myscheng1"><a href="login.html">注册</a></li >
      <li class="dinglan-left myscheng2"><a href="javascript:;">我的商城</a></li>`;
    $("#msg").html(str);
  }
  $("#doSearch").click(function () {
    var search = $("#search").val()
    location.href = "products.html?search=" + search
  })

});

function loginout() {
  sessionStorage.removeItem("uname");
  setInterval(function () {
    location.href = "index.html";
  }, 500);
}