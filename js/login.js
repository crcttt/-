(function(){ 
  var uname_msg=login.querySelector("p:first-child>span")
  var upwd_msg=login.querySelector("p:nth-child(2)>span")
  var but=login.querySelector("button")
  
  uname.onfocus=function(){
    uname_msg.innerHTML='用户名6~10位';
  };
  uname.onblur=function(){
    if (!uname.value){
      uname_msg.innerHTML='用户名不能为空';
    };		
  };

  upwd.onfocus=function(){
    upwd_msg.innerHTML='密码6~10位';
  };
  upwd.onblur=function(){
    if (!uname.value){
      upwd_msg.innerHTML='密码不能为空';
    };		
  };

  but.onclick=function(){
    var u_name=uname.value;
    var u_pwd=upwd.value;
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
      if(xhr.readyState==4&&xhr.status==200){
        var result=xhr.responseText;
        alert(result);
      };
    };
    xhr.open("post","http://127.0.0.1:8080/user/login",true);
    var formdata="uname="+u_name+"&upwd="+u_pwd;
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.send(formdata);
  };
})()