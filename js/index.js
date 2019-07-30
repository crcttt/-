window.onload = function () {

  var lbrb = document.getElementsByClassName("lbr-bottom");
  bdown.onclick = function () {
    lbrb[0].style.height = "283px";
  }
  bup.onclick = function () {
    lbrb[0].style.height = 0;
  }

  var hlb = document.querySelectorAll(".help-left-botton>div")
  var hlt = document.querySelectorAll(".help-left-top>ul>li");
  for (let i = 0; i < hlt.length; i++) {
    //悬停改变样式与显示
    hlt[i].onmouseover = function () {
      for (let j = 0; j < hlb.length; j++) {
        if (j == i) {
          hlb[j].style.display = "block";
          hlt[j].className = "sty-1";
        } else {
          hlb[j].style.display = "none";
          hlt[j].className = "sty-2";
        }
      }
    }
  }
  var ct = document.querySelectorAll(".cen-top>li");
  var cta = document.querySelectorAll(".cen-top>li>a");
  var cenb = document.querySelectorAll(".cen-bottom>div");

  for (let i = 0; i < ct.length; i++) {
    if (i % 5 == 0 || i == 0) {
      cenb[i].style.display = "block";
      cta[i].className = "li1";
    } else {
      cenb[i].style.display = "none";
      cta[i].className = "li2";
    }
  }

  /* 传入j值进函数内3种
  for (var j=0;j<ct.length;j++){    
    ct[j].onmouseover=(function(j){
        return function(){add(j)}
      }
    )(j)
  }    
  for (var j=0;j<ct.length;j++){
    ct.index=j    
    ct[j].onmouseover=function(){
       var j=this.index;
      }   
  }  */
  for (let j = 0; j < ct.length; j++) {
    ct[j].onmouseover = function () {
      var n = parseInt(j / 5);
      var und = document.querySelectorAll(".cen-top>div");
      var w = und[n].offsetWidth;
      //获取左边距
      var m = getComputedStyle(und[n]).marginLeft;
      m = parseInt(m);
      und[n].style.left = `${j%5*(w+m*2)}px`
      if (j % 5 == 0 || j == 0) {
        cenb[j].style.display = "block";
        cenb[j + 1].style.display = "none";
        cenb[j + 2].style.display = "none";
        cenb[j + 3].style.display = "none";
        cenb[j + 4].style.display = "none";
        cta[j].className = "li1";
        cta[j + 1].className = "li2";
        cta[j + 2].className = "li2";
        cta[j + 3].className = "li2";
        cta[j + 4].className = "li2";
      }
      if (j % 5 == 1 || j == 1) {
        cenb[j].style.display = "block";
        cenb[j + 1].style.display = "none";
        cenb[j + 2].style.display = "none";
        cenb[j + 3].style.display = "none";
        cenb[j - 1].style.display = "none";
        cta[j].className = "li1";
        cta[j + 1].className = "li2";
        cta[j + 2].className = "li2";
        cta[j + 3].className = "li2";
        cta[j - 1].className = "li2";
      }
      if (j % 5 == 2 || j == 2) {
        cenb[j].style.display = "block";
        cenb[j + 1].style.display = "none";
        cenb[j + 2].style.display = "none";
        cenb[j - 2].style.display = "none";
        cenb[j - 1].style.display = "none";
        cta[j].className = "li1";
        cta[j + 1].className = "li2";
        cta[j + 2].className = "li2";
        cta[j - 2].className = "li2";
        cta[j - 1].className = "li2";
      }
      if (j % 5 == 3 || j == 3) {
        cenb[j].style.display = "block";
        cenb[j + 1].style.display = "none";
        cenb[j - 3].style.display = "none";
        cenb[j - 2].style.display = "none";
        cenb[j - 1].style.display = "none";
        cta[j].className = "li1";
        cta[j + 1].className = "li2";
        cta[j - 3].className = "li2";
        cta[j - 2].className = "li2";
        cta[j - 1].className = "li2";
      }
      if (j % 5 == 4 || j == 4) {
        cenb[j].style.display = "block";
        cenb[j - 4].style.display = "none";
        cenb[j - 3].style.display = "none";
        cenb[j - 2].style.display = "none";
        cenb[j - 1].style.display = "none";
        cta[j].className = "li1";
        cta[j - 4].className = "li2";
        cta[j - 3].className = "li2";
        cta[j - 2].className = "li2";
        cta[j - 1].className = "li2";
      }
    }
  }

}

$(function () {

  if (location.search == "") {
    $.ajax({ //轮播图
      url: "http://127.0.0.1:3000/index/carousel",
      type: "get",
      data: {},
      dataType: "json",
      success: function (result) {
        //console.log(result)
        var html = ""
        for (var c of result) {
          html += `<div><a href="http://127.0.0.1:3000/${c.href}"><img src="${c.img}" alt=""></a></div>`
          //html+=`<div><img src="${c.img}" alt=""></div>`
        }
        console.log(html)
        $("#lb>div:first-child").html(html)
        //轮播控制
        layui.use('carousel', function () {
          var carousel = layui.carousel;
          //建造实例
          carousel.render({
            elem: '#lb',
            width: '100%' //设置容器宽度
              ,
            height: '100%',
            interval: '5000',
            arrow: 'always' //始终显示箭头
              ,
            anim: 'default' //切换动画方式
          });
        });

      }
    })

    $.ajax({ //帮你挑
      url: "http://127.0.0.1:3000/index/producttj",
      type: "get",
      data: {},
      dataType: "json",
      success: function (result) {
        console.log(result);
        var html = "";
        for (var s of result.songli) {
          html += `
          <div>
            <a href="${s.href}">
              <img class = "maf" src="http://127.0.0.1:3000/${s.img_url}">
              <p> ${s.title}</p>
              <p>￥${s.price}</p>
            </a>
          </div>
          `
        }
        $("#songli").html(html);
        var html = "";
        for (var s of result.ziyin) {
          html += `
          <div>
            <a href="${s.href}">
              <img class = "maf" src="http://127.0.0.1:3000/${s.img_url}">
              <p> ${s.title}</p>
              <p>￥${s.price}</p>
            </a>
          </div>
          `
        }
        $("#ziyin").html(html)
        var html = "";
        for (var s of result.qinpeng) {
          html += `
          <div>
            <a href="${s.href}">
              <img class = "maf" src="http://127.0.0.1:3000/${s.img_url}">
              <p> ${s.title}</p>
              <p>￥${s.price}</p>
            </a>
          </div>
          `
        }
        $("#qinpeng").html(html)
        var html = "";
        for (var s of result.qinglv) {
          html += `
          <div>
            <a href="${s.href}">
              <img class = "maf" src="http://127.0.0.1:3000/${s.img_url}">
              <p> ${s.title}</p>
              <p>￥${s.price}</p>
            </a>
          </div>
          `
        }
        $("#qinglv").html(html)
        var html = "";
        for (var s of result.yanqing) {
          html += `
          <div>
            <a href="${s.href}">
              <img class = "maf" src="http://127.0.0.1:3000/${s.img_url}">
              <p> ${s.title}</p>
              <p>￥${s.price}</p>
            </a>
          </div>
          `
        }
        $("#yanqing").html(html)
      }
    })
  }


})