//Scripts para as pgs de admin do Contos de Reinos Distantes.
//Autor: João Guilherme Oliveira Porto Nunes

//------------------------------Geral--------------------------

//Função para fazer as tabs do jQuery UI
$( function() {
    $( "#admPaginas" ).tabs();
  } );
var usuarioLogado;
var PATH = "../../"
  
  //se os campos estao preenchidos pede confirmação, se sim, envia.
deletarUsuario = function (tipouser){//Parâmetro para ver se foi chamado por gerenciar contas ou adm.
    var conf = false;
    var usuario = ($("input[name=txtadmin]").val());
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
    			url: PATH + "DeletarUsuario",
    			data: "usuario="+usuario,
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
        url: PATH + "BuscarUsuariosParaLista",
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
        url: PATH + "BuscarUsuariosParaLista",
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

function deletaAdm(id){
	$.ajax({
		type:"POST",
		url: PATH + "DeletarUsuario",
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
			url: PATH + "InserirUsuario",
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
    if($("input[name=txtaltnome]").val()!=""){
        if($("input[name=txtaltemail]").val()!=""){
            if($("input[name=dtealtnascimento]").val()!=""){
                if($("input[name=txtaltapelido]").val()!=""){
                    if($("input[name=pwdaltsenhaantiga]").val()!=""){
                        if($("input[name=pwdaltsenhanova]").val()!=""){
                            if($("input[name=pwdaltconfsenhanova]").val()!=""){
                                if($("input[name=pwdaltsenhanova]").val()==$("input[name=pwdaltconfsenhanova]").val()){
                                    conf = confirm("Tem certeza que deseja alterar informações de sua conta?");
                                }else{
                                    alert("As senhas não coincidem.");
                                }
                            }else{
                                alert("Preencha a confirmação de senha.");
                                $("input[name=pwdaltconfsenhanova]").focus();
                            }
                        }else{
                            alert("Preencha a senha nova.");
                            $("input[name=pwdaltsenhanova]").focus();
                        }
                    }else{
                        alert("Preencha a senha antiga.");
                        $("input[name=pwdaltsenhavelha]").focus();
                    }
                }else{
                    alert("Preencha o nome de usuário.");
                    $("input[name=txtaltapelido]").focus();
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

  //consulta
  buscaAdmParaEditar = function(id){
	  $.ajax({
		  type: "POST",
		  url: PATH + "BuscarUsuarioPorValor",
		  data: "valor="+id+"&tipo=id",
		  success: function(nome){
			  $("#altNome").val(contato.nome);
			  $("#altEmail").val(contato.email);
			  $("#altNascimento").val(contato.nascimento);
			  $("#altApelido").val(contato.login);
			  $("#altVelhaSenha").val("");
			  $("#altNovaSenha").val("");
			  $("#altConfSenha").val("");
		  },
			error: function(rest){
				alert("Erro ao encontrar o usuário a ser alterado.");
			}
			});
  };
  
  //deixausuario alterado
  alteraUsuario = function(){
		var nome = document.frmadminedit.txtaltnome.value;
		var email = document.frmadminedit.txtaltemail.value;
		var nascimento = document.frmadminedit.dtealtnascimento.value;
		var login = document.frmadminedit.txtaltlogin.value;
		var senhaatual = document.frmadminedit.pwdaltsenhaantiga.value;
		var novasenha = document.frmadminedit.pwdaltnovasenha.value;
		var confsenha = document.frmadminedit.pwdaltconfsenha.value;
		if((senhaatual=="")||(novasenha=="")||(nome=="")||(email=="")||(nascimento=="")){
			alert("Não deixa nada vazio, meu!");
		} else if (novasenha!=confsenha){ 
			alert("Repete as duas senhas, né, meu!");
		} else {
			$.ajax({
				type: "POST",
				url: PATH + "AlterarUsuario",
				data: $("#editarConta").serialize(),
				success: function (msg) {
					alert(msg.msg);
					if(!msg.erro)
						carregaPagina();
				},
				error: function (info) {
					alert("Erro ao alterar os dados: "+ info.status + " - " + info.statusText);		   
				}
			});
		}
  };

  


