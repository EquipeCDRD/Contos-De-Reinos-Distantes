//Scripts para as pgs de admin do Contos de Reinos Distantes.
//Autor: João Guilherme Oliveira Porto Nunes

//------------------------------Geral--------------------------

//Função para fazer as tabs do jQuery UI
$( function() {
    $( "#admPaginas" ).tabs();
  } );

//-----------------------------Gerenciar Contas-----------------

  
	
	$(function escolherAdmin(){
	    $("#listaAdm").on('click','li',function (){//Função para passar o nome da lista de usuários para o campo de deletar usuário.
	            $("input[name=txtadmin]").val($(this).text());
	            $("input[type=hidden][name=hdadmin]").val($(this).val());
	    })
	});
	
	$(function escolherUsuario(){
	    $("#listaUsr").on('click','li',function (){//Função para passar o nome da lista de usuários para o campo de deletar usuário.
	            $("input[name=txtusuario]").val($(this).text());
	            $("input[type=hidden][name=hdusuario]").val($(this).val());
	    })
	});
  
  //se os campos estao preenchidos pede confirmação, se sim, envia.
  function deletarUsuario(tipouser){//Parâmetro para ver se foi chamado por gerenciar contas ou adm.
    var conf = false;
    if(tipouser==0){
        if($("input[name=txtusuario").val()!=""){
            if($("textarea[name=txamotivo]").val()!=""){
                conf = confirm("Você tem certeza que deseja deletar o usuário?");
            }else{
              alert("Escreva o motivo para banimento.")
              $("textarea[name=txamotivo]").focus();
            }
        }else{
          alert("Selecione um usuário primeiro.");
          $("input[name=txtusuario").focus();
        }
    }else if(tipouser==1){
        if($("input[name=txtadmin").val()!=""){
            if($("textarea[name=txamotivoadm]").val()!=""){
                conf = confirm("Você tem certeza que deseja deletar o administrador?");
            }else{
              alert("Escreva o motivo para banimento.")
              $("textarea[name=txamotivoadm]").focus();
            }
        }else{
          alert("Selecione um administrador primeiro.");
          $("input[name=txtadmin").focus();
        }
    }
    return conf;
}

  
//----------------------------------Notificacoes-------------------------------------

  $(function(){ //Esconde a div de editar notificacoes.
      $("#divEditarNotificacoes").hide();
  })
  //Função para quando o usuário clicar em editar, descarregar a div ComporNotificacoes e carregar
  //a div EditarNotificacoes no lugar.                
  /*function editarNotificacao(){
      $(".divComporNotificacoes").hide();
      $("#divEditarNotificacoes").show();	 ESTA FUNCAO AGORA ESTA NO ADMINSERVLET, NO MÉTODO alterarNotificacao
  }*/ 
  //Funcao para descarregar EditarNotificacoes e recarregar ComporNotificacoes quando clicar em cancelar
  function cancelarEdicao(){
      $(".divComporNotificacoes").show();
      $("#divEditarNotificacoes").hide();
  }

  function validaNotificacao(compedit){//Recebe o parâmetro se o foi chamado pelo compor ou pelo editar.
    var conf = false;
    if(compedit==0){
        if($("textarea[name=txacompnotificacao]").val()!=""){
            conf = confirm("Você tem certeza que deseja postar uma notificação?");
            if(conf==true){
            	insereNotificacao();
            }
        }else{
            alert("Escreva uma notificação.");
            $("textarea[name=txacompnotificacao]").focus();
        }
    }else if(compedit==1){
        if($("textarea[name=txaeditnotificacao]").val()!=""){
            conf = confirm("Você tem certeza que deseja editar uma notificação?");
            if(conf==true){
            	alteraNotificacao();
            }
        }else{
            alert("Escreva uma notificação.");
            $("textarea[name=txaeditnotificacao]").focus();
        }
    }
    //return conf;
}

//--------------------------------Gerenciar Admins--------------------------------------------

function validaCadastroAdm(){
    var conf = false;
    if($("input[name=txtnomeadm]").val()!=""){
        if($("input[name=txtemailadm]").val()!=""){
            if($("input[name=dtenascimentoadm]").val()!=""){
                if($("input[name=txtapelidoadm]").val()!=""){
                    if($("input[name=pwdsenhaadm]").val()!=""){
                        if($("input[name=pwdconfsenhaadm]").val()!=""){
                            if($("input[name=pwdsenhaadm]").val()==$("input[name=pwdconfsenhaadm]").val()){
                                conf = confirm("Tem certeza que deseja cadastrar um novo administrador?");
                            }else{
                                alert("As senhas não coincidem.");
                            }
                        }else{
                            alert("Preencha a confirmação de senha.");
                            $("input[name=pwdconfsenhaadm]").focus();
                        }
                    }else{
                        alert("Preencha a senha.");
                        $("input[name=pwdsenhaadm]").focus();
                    }
                }else{
                    alert("Preencha o nome de usuário do administrador.");
                    $("input[name=txtapelidoadm]").focus();
                }
            }else{
                alert("Preencha a data de nascimento.");
                $("input[name=dtenascimentoadm]").focus();
            }
        }else{
            alert("Preencha o e-mail.");
            $("input[name=txtemailadm]").focus();
        }
    }else{
        alert("Preencha o nome.");
        $("input[name=txtnomeadm]").focus();
    }
    return conf;
}    

//-------------------------------------Minha Conta------------------------------------------

function validaMinhaConta(){
    var conf = false;
    if($("input[name=txtaltnome]").val()!=""){
        if($("input[name=txtalteemail]").val()!=""){
            if($("input[name=dtealtnascimento]").val()!=""){
                if($("input[name=txtaltlogger]").val()!=""){
                    if($("input[name=pwdaltsenhaantiga]").val()!=""){
                        if($("input[name=pwdaltsenhanova]").val()!=""){
                            if($("input[name=pwdaltconfsenha]").val()!=""){
                                if($("input[name=pwdaltsenhanova]").val()==$("input[name=pwdaltconfsenha]").val()){
                                    conf = confirm("Tem certeza que deseja alterar informações de sua conta?");
                                }else{
                                    alert("As senhas não coincidem.");
                                }
                            }else{
                                alert("Preencha a confirmação de senha.");
                                $("input[name=pwdaltconfsenha]").focus();
                            }
                        }else{
                            alert("Preencha a senha nova.");
                            $("input[name=pwdaltsenhanova]").focus();
                        }
                    }else{
                        alert("Preencha a senha antiga.");
                        $("input[name=pwdaltsenhaantiga]").focus();
                    }
                }else{
                    alert("Preencha o nome de usuário.");
                    $("input[name=txtaltlogger]").focus();
                }
            }else{
                alert("Preencha a data de nascimento.");
                $("input[name=dtealtnascimento]").focus();
            }
        }else{
            alert("Preencha o e-mail.");
            $("input[name=txtaltemail]").focus();
        }
    }else{
        alert("Preencha o nome.");
        $("input[name=txtaltnome]").focus();
    }
    return conf;
}
