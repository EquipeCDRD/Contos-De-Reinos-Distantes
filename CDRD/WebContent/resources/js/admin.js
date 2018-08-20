//Scripts para as pgs de admin do Contos de Reinos Distantes.
//Autor: João Guilherme Oliveira Porto Nunes

//------------------------------Geral--------------------------

//Função para fazer as tabs do jQuery UI
$( function() {
    $( "#admPaginas" ).tabs();
  } );


  
  //se os campos estao preenchidos pede confirmação, se sim, envia.
  function deletarUsuario(tipouser){//Parâmetro para ver se foi chamado por gerenciar contas ou adm.
    var conf = false;
    var id = ($("input[name=txt]").val());
    if(tipouser==1){
        if($("input[name=txtusuario").val()!=""){
            if($("textarea[name=txamotivo]").val()!=""){
                conf = confirm("Você tem certeza que deseja deletar o usuário?");
            }else{
              alert("Escreva o motivo para banimento.");
              $("textarea[name=txamotivo]").focus();
            }
        }else{
          alert("Selecione um usuário primeiro.");
          $("input[name=txtusuario").focus();
        }
    }else if(tipouser==0){
        if($("input[name=txtadmin").val()!=""){
            if($("textarea[name=txamotivoadm]").val()!=""){
                conf = confirm("Você tem certeza que deseja deletar o administrador?");
            }else{
              alert("Escreva o motivo para banimento.");
              $("textarea[name=txamotivoadm]").focus();
            }
        }else{
          alert("Selecione um administrador primeiro.");
          $("input[name=txtadmin").focus();
        }
    }
    if(conf){
    		$.ajax({
    			type:"POST",
    			url: PATH + "DeletaUsuario",
    			data: "id="+id,
    			success: function(msg){
    				alert(msg.msg);
    			},
    			error: function(info){
    				alert("Erro ao deletar contato: "+ info.status + " - " + info.statusText);
    			}
    		});
    
    };
}

  
//----------------------------------Notificacoes-------------------------------------

  $(function(){ //Esconde a div de editar notificacoes.
      $("#divEditarNotificacoes").hide();
  });
  //Função para quando o usuário clicar em editar, descarregar a div ComporNotificacoes e carregar
  //a div EditarNotificacoes no lugar.                
  function editarNotificacao(){
      $(".divComporNotificacoes").hide();
      $("#divEditarNotificacoes").show();
  }
  //Funcao para descarregar EditarNotificacoes e recarregar ComporNotificacoes quando clicar em cancelar
  function cancelarEdicao(){
      $(".divComporNotificacoes").show();
      $("#divEditarNotificacoes").hide();
  }



//--------------------------------Gerenciar Admins--------------------------------------------
//usa a servlet BuscaUsuariosParaLista para fazer bem isso
buscaAdm = function(){
    var valorBusca = $("input[name=txtbuscaadm]").val();
    var html;
    $.ajax({
        type: "POST",
        url: "../../BuscaUsuariosParaLista",
        data: "permissao=0&valorBusca="+valorBusca,
        success: function(dados){
            html = listaAdm(dados);
            $("#listaAdm").html(html);
        },
        error: function(info){
            alert("Erro ao consultar os contatos: "+ info.status + " - " + info.statusText);
        }
    });
    
};

$(function lista(){
    var html;
    $.ajax({
        type: "POST",
        url: "../../BuscaUsuariosParaLista",
        data: "permissao=0&valorBusca=",
        success: function(dados){
            html = listaAdm(dados);
            $("#listaAdm").html(html);
        },
        error: function(info){
            alert("Erro ao consultar os contatos: "+ info.status + " - " + info.statusText);
        }
    });
    
});

//lista usuarios de uma lista
listaAdm = function(lista) {
	var dados="";
	if (lista==""){
        dados = "<h2>Nada por aqui.</h2>";
    }else{
        dados += "<ul class='listaContas' id='listaAdmins'>";
        if (lista != undefined && lista.length > 0){
            for (var i=0; i<lista.length; i++){
                dados +="<li name='txt"+lista[i].login+" value='"+lista[i].id+"'>"+lista[i].login+"</li>";
            }
        }
        dados+="</ul>";
    }
    return dados;
};

deletaAdm = function(id){
	$.ajax({
		type:"POST",
		url: PATH + "DeletaUsuario",
		data: "id="+id,
		success: function(msg){
			alert(msg.msg);
		},
		error: function(info){
			alert("Erro ao deletar contato: "+ info.status + " - " + info.statusText);
		}
	});
};

//faz o cadastro
function cadastraAdm(){
	if (validaCadastroAdm()==true){
		$.ajax({
			type: "POST",
			url: "../../InsereUsuario",
			data: $("#cadastrarAdmin").serialize(),
			success: function (msg) {
				alert(msg.msg);
			},
			error: function (info) {
				alert("Erro ao cadastrar um novo jogador: "+ info.status + " - " + info.statusText);		   
			}
		});
	}
}  
//checa se ta tudo certo no cadastro
function validaCadastroAdm(){
    var conf = false;
    if($("input[name=txtnome]").val()!=""){
        if($("input[name=txtemail]").val()!=""){
            if($("input[name=dtenascimento]").val()!=""){
                if($("input[name=txtapelido]").val()!=""){
                    if($("input[name=pwdsenha]").val()!=""){
                        if($("input[name=pwdconfsenha]").val()!=""){
                            if($("input[name=pwdsenha]").val()==$("input[name=pwdconfsenha]").val()){
                                conf = confirm("Tem certeza que deseja cadastrar um novo administrador?");
                            }else{
                                alert("As senhas não coincidem.");
                            }
                        }else{
                            alert("Preencha a validação de senha.");
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

$(function escolherAdmin(){
    $("#listaAdm").on('click','li',function (){//Função para passar o nome da lista de usuários para o campo de deletar usuário.
    	if(!$(this).is(".carregarMais")){
            $("input[name=txtadmin]").val($(this).text());
        }
    })
});

//-------------------------------------Minha Conta------------------------------------------

function validaMinhaConta(){
    var conf = false;
    if($("input[name=txtnome]").val()!=""){
        if($("input[name=txtemail]").val()!=""){
            if($("input[name=dtenascimento]").val()!=""){
                if($("input[name=txtapelido]").val()!=""){
                    if($("input[name=pwdsenhaantiga]").val()!=""){
                        if($("input[name=pwdsenhanova]").val()!=""){
                            if($("input[name=pwdconfsenhanova]").val()!=""){
                                if($("input[name=pwdsenhanova]").val()==$("input[name=pwdconfsenhanova]").val()){
                                    conf = confirm("Tem certeza que deseja alterar informações de sua conta?");
                                }else{
                                    alert("As senhas não coincidem.");
                                }
                            }else{
                                alert("Preencha a confirmação de senha.");
                                $("input[name=pwdconfsenhanova]").focus();
                            }
                        }else{
                            alert("Preencha a senha nova.");
                            $("input[name=pwdsenhanova]").focus();
                        }
                    }else{
                        alert("Preencha a senha antiga.");
                        $("input[name=pwdsenhavelha]").focus();
                    }
                }else{
                    alert("Preencha o nome de usuário.");
                    $("input[name=txtapelido]").focus();
                }
            }else{
                alert("Preencha a data de nascimento.");
                $("input[name=dtenascimento]").focus();
            }
        }else{
            alert("Preencha o e-mail.");
            $("input[name=txtemail]").focus();
        }
    }else{
        alert("Preencha o nome.");
        $("input[name=txtnome]").focus();
    }
    return conf;
}
//Scripts para as pgs de admin do Contos de Reinos Distantes.
//Autor: João Guilherme Oliveira Porto Nunes

//-----------------------------Gerenciar Contas-----------------

  $(function escolherUsuario(){
      $(".listaContas").on('click','li',function (){//Função para passar o nome da lista de usuários para o campo de deletar usuário.
      if(!$(this).is(".carregarMais")){
          $("input[name=txtusuario]").val($(this).text());
      }
      });
  })
  

  
//----------------------------------Notificacoes-------------------------------------


  function validaNotificacao(compedit){//Recebe o parâmetro se o foi chamado pelo compor ou pelo editar.
    var conf = false;
    if(compedit==0){
        if($("textarea[name=txacompnotificacao]").val()!=""){
            conf = confirm("Você tem certeza que deseja postar uma notificação?");
        }else{
            alert("Escreva uma notificação.");
            $("textarea[name=txacompnotificacao]").focus();
        }
    }else if(compedit==1){
        if($("textarea[name=txaeditnotificacao]").val()!=""){
            conf = confirm("Você tem certeza que deseja editar uma notificação?");
        }else{
            alert("Escreva uma notificação.");
            $("textarea[name=txaeditnotificacao]").focus();
        }
    }
    return conf;   
}



