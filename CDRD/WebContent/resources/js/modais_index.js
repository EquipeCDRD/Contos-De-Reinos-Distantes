$(document).ready(carregaModais());
  
function carregaModais(){
  
  /* Sair */
  $(".sairBtn").click(function(){
    $("#intPerso").hide();
    $("#guard_1").hide();
    $("#login").hide();
    $("#registrar").hide();
    $("#login_redes").hide();
    $("#esqueci_senha").hide();
    $("#containerModaisIndex").hide();
 
  });

/* Login */
  $("#login").hide();
  $(".loginBtn").click(function(){
    $("#guard_1").hide();
    $("#login_redes").hide();
    $("#registrar").hide();
    $("#esqueci_senha").hide();
    $("#login").show();
  });

/*Redes Sociais*/
  $("#login_redes").hide();
  $(".redesBtn").click(function(){
    $("#guard_1").hide();
    $("#login").hide();
    $("#login_redes").show();
  });

/* Registrar */
  $("#registrar").hide();
  $(".registrarBtn").click(function(){
    $("#guard_1").hide();
    $("#login").hide();
    $("#registrar").show();
  })

/* Esqueci Senha */
  $("#esqueci_senha").hide();
  $(".esqueciBtn").click(function(){
    $("#login").hide();
    $("#esqueci_senha").show();
  });
}


function validaLogin(){
  var confirm = false;
  if($("input[name=txtuser]").val()!=""){
    if($("input[name=pwdpassword]").val()!=""){
      confirm = true;
    }else{
      alert('Preencha o campo "Senha"');
      $("input[name=pwdpassword]").focus();
    }
  }else{
    alert('Preencha o campo "Usuário"');
    $("input[name=txtuser]").focus();
  }
  return confirm;
}
function validaCadastro(){
  var confirm = false;
  if($("input[name=txtname]").val()!=""){
    if($("input[name=txtemail]").val()!=""){
      if($("input[name=dtedate]").val()!=""){
        if($("input[name=txtusuario]").val()!=""){
          if($("input[name=pwdsenha]").val()!=""){
            if($("input[name=pwdconfsenha]").val()!=""){
              if($("input[name=pwdsenha]").val()==$("input[name=pwdconfsenha]").val()){
                confirm = true;
              }else{
                alert('O campo "Confirmar Senha" deve ser igual ao campo "Senha"');
                $("input[name=pwdconfsenha]").focus();
              }
            }else{
              alert('Preencha o campo "Confirmar Senha"');
              $("input[name=pwdconfsenha]").focus();
            }
          }else{
            alert('Preencha o campo "Senha"');
            $("input[name=pwdsenha]").focus();
          }
        }else{
          alert('Preencha o campo "Usuário"');
          $("input[name=txtusuario]").focus();
        }
      }else{
        alert('Preencha o campo "Data de Nascimento"');
        $("input[name=dtedate]").focus();
      }
    }else{
      alert('Preencha o campo "E-mail"');
      $("input[name=txtemail]").focus();
    }
  }else{
    alert('Preencha o campo "Nome');
    $("input[name=txtname]").focus();
  }
  return confirm;
}

function validaEsqueciSenha(){
  var confirm = false;
  if($("input[name=txtmail]").val()!=""){
    confirm = true;
  }else{
    alert('Preencha o campo "Endereço de E-mail"');
    $("input[name=txtmail]").focus();
  }
  return confirm;
}

function validaRecuperarSenha(){
  var confirm = false;
  if($("input[name=pwdnova]").val()!=""){
    if($("input[name=pwdnova]").val()==$("input[name=pwdnovaconf]").val()){
      confirm = true;
    }else{
      alert("As senhas não coincidem");
      $("input[name=pwdnovaconf]").focus();
    }
  }else{
    alert("Preencha o campo com a nova senha");
    $("input[name=pwdnova]").focus();
  } 

  return confirm;
}