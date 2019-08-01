$(document).ready(function () {
  //锚点
  $('#pul>li:nth-child(3)').click(function () {
    $('html, body').animate({
      scrollTop: $('#pul3').offset().top
    }, 1000)
  })
  $('#pul>li:nth-child(4)').click(function () {
    $('html, body').animate({
      scrollTop: $('#pul4').offset().top
    }, 1000)
  })
  $('#pul>li:nth-child(2)').click(function () {
    $('html, body').animate({
      scrollTop: $('#pul').offset().top
    }, 1000)
  })

  var s = $('#s').val()
  console.log(s)
  $('#jia').click(function () {
    s++;
    $('#s').val(s)
  })
  $('#jian').click(function () {
    if (s == 1) {
      return
    }
    s--;
    $('#s').val(s)
  })


  //右图滚动
  var trtji = 0;
  var ha = $('#trtj>a:nth-child(1)').outerHeight();
  var ht = $('.look>div:nth-child(2)').height();
  console.log(ht, ha, ht / ha, trtji)
  $('#down').click(function () {
    if (trtji >= $('#trtj>a').length - ht / ha) {
      return
    }
    trtji++;
    $('#trtj').animate({
      marginTop: -ha * trtji
    }, 500)
  })
  $('#up').click(function () {
    if (trtji <= 0) {
      return
    }
    trtji--;
    $('#trtj').animate({
      marginTop: -ha * trtji
    }, 500)
  })

  if (location.search !== "") {
    var lid = location.search.split("=")[1]
    console.log(lid)
    $.ajax({
      url: "http://127.0.0.1:3000/details",
      type: "get",
      data: {
        lid
      }, //{lid:lid}  "lid"=lid
      dataType: "json",
      success: function (result) {
        console.log(result)
        var {
          product,
          specs,
          pics
        } = result;
        var {
          title,
          subtitle,
          price,
          promice
        } = product;
        $("#title").html(title);
        $("#subtitle").html(subtitle);
        $("#price").html(`￥${price.toFixed(2)}`);
        $("#promice").html(promice);
        //规格
        var html = "";
        for (var sp of specs) {
          html += `<a class="${product.lid==sp.lid?'active':''}" href="product_details.html?lid=${sp.lid}">${sp.guige}</a>`
        }
        $("#specs").html(html);

        var html = "";
        for (var p of pics) {
          html += `<li class="float-left p-1">
        <img src="http://127.0.0.1:3000/${p.sm}" data-md="http://127.0.0.1:3000/${p.md}" data-lg="http://127.0.0.1:3000/${p.lg}">
      </li>`
        }

        //小图
        var $ulImgs = $("#ul-imgs");
        var LIWIDTH = 54;
        $ulImgs.html(html).css("width", pics.length * LIWIDTH);
        var $mImg = $("#mimg");
        var $divlg = $("#div-lg")
        //先加载出一个中大图
        $mImg.attr("src", pics[0].md)
        $divlg.css(
          "background-image",
          `url(http://127.0.0.1:3000/${pics[0].lg})`
        )
        //左右移动
        var $btnLeft = $("#btn-left");
        var $btnRight = $("#btn-right");
        if (pics.length <= 4) {
          $btnRight.addClass("disabled")
        }
        var times = 0;
        $btnRight.click(function () {
          //没有禁用class，才能点
          if (!$btnRight.is(".disabled")) {
            times++;
            $ulImgs.css("margin-left", -times * LIWIDTH)
            //点击后把左边禁用class取消
            $btnLeft.removeClass("disabled")
            //到最后一张是加上禁用class
            if (times == pics.length - 4) {
              $btnRight.addClass("disabled")
            }
          }
        })
        $btnLeft.click(function () {
          //没有禁用class，才能点
          if (!$btnLeft.is(".disabled")) {
            times--;
            $ulImgs.css("margin-left", -times * LIWIDTH)
            //点击后把右边禁用class取消
            $btnRight.removeClass("disabled")
            //到第一张时加上禁用class
            if (times == 0) {
              $btnLeft.addClass("disabled")
            }
          }
        })
        //中图,同时大图一起加载
        $ulImgs.on("mouseenter", "li>img", function () {
          $mImg.attr("src", $(this).attr("data-md"));
          $divlg.css(
            "background-image",
            `url(${$(this).attr("data-lg")})`
          )
        })

        var $mask = $("#mask")
        var $smask = $("#super-mask")
        var MSIZE = $mask.width()
        var SMSIZE = $smask.width()
        //悬停时遮罩层-大图要一起显示
        $smask.hover(function () {
            $mask.toggleClass("d-none")
            $divlg.toggleClass("d-none")
          })
          //遮罩层移动
          .mousemove(function (e) {
            //正好为中间，上下移动距离=鼠标距父元素位置-遮罩层一半
            var top = e.offsetY - MSIZE / 2;
            var left = e.offsetX - MSIZE / 2;
            //移动遮罩层不能超出图片
            if (top < 0) {
              top = 0
            } else if (top > SMSIZE - MSIZE) {
              //最大距离隔离层(图)高度-遮罩层高度
              top = SMSIZE - MSIZE
            }
            if (left < 0) {
              left = 0
            } else if (left > SMSIZE - MSIZE) {
              left = SMSIZE - MSIZE
            }
            $mask.css({
              top: top + "px",
              left: left + "px"
            })
            //大图背景位置
            $divlg.css(
              "background-position",
              `${-left*16/7}px ${-top*16/7}px`
            )

          })
      }
    })
  }


});