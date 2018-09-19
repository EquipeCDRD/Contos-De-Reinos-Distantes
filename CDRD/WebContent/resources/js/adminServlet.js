	$(document).ready(function(){	
	var usuarioLogado;
	var PATH = "../../";
	
/*--------------------------------------Geral-----------------------------------------*/
	
//inicialização de funções AJAX

	//validar sessão
	$(function (){
		$.ajax({
			type: "POST",
			url: PATH + "ValidarSessao",
			data: "p=0",
			success: function (usuario) {
				if (usuario.login!=null){
					usuarioLogado = new Object();
					usuarioLogado.id = usuario.id;
					usuarioLogado.login = usuario.login;
					usuarioLogado.email = usuario.email;
					usuarioLogado.nome = usuario.nome;
					usuarioLogado.nascimento = usuario.nascimento;
					buscaAdmParaEditar(usuarioLogado.id);
				} else {
					sair();
				}	
			},
			error: function (info) {
				sair();
			}
		});
	});
	
	//buscar usuarios para lista
	$(function listaAdmin(){
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

	$(function listaUsuario(){
		var html;
		$.ajax({
			type: "POST",
			url: PATH + "BuscarUsuariosParaLista",
			data: "permissao=1&valorBusca=",
			success: function(dados){
				html = listaUsr(dados);
				$("#listaUsr").html(html);
			},
			error: function(info){
				alert("Erro ao consultar os contatos: "+ info.status + " - " + info.statusText);
			}
		});
		
	});

	
	sair = function(){
		$.ajax({
			type: "POST",
			url: PATH + "Logout",
			success: function (data) {
				window.location.href = (PATH+"index.html");	
			},
			error: function (info) {
				alert("Erro ao tentar encerrar sua sessão: "+ info.status + " - " + info.statusText);	
			}
		});
	}
	
/*------------------------Notificação------------------------------------*/
	
	$(function buscaNotificacao(){
		var html = "<table class='tabelaNotificacoes'>" +
		"<tr>" +
		"<th>Data - Horário:</th>" +
		"<th class='colMeio'>Mensagem:</th>" +
		"<th>Opções</th>" +
		"</tr>";
		
		$.ajax({
			type: "POST",
			url: PATH + "BuscarNotificacao",
			data: null,
			success: function(dados){
				html += geraTabelaNotificacao(dados);
				html += "</table>";
				$("#listNotificacao").html(html);
			},
			error: function(info){
				alert("Erro ao carregar as tabelas: "+ info.status + " - " + info.statusText);
			}
		})
	});
	
	geraTabelaNotificacao = function(listNotificacao){
		var dados = "";
		if (listNotificacao != undefined && listNotificacao.length > 0){
			for (var i=0; i<listNotificacao.length; i++){
				dados += "<tr>" +
						"<td><span>"+listNotificacao[i].dataCriacao+"</span></td>" +
						"<td class='colMeio'><span>" +listNotificacao[i].notificacao+"</span></td>" +
						"<td>" +
						"<button value=" + listNotificacao[i].id + " onclick='enviaIdNotificacao($(this).val())'>Editar</button>" +
						"<button value=" + listNotificacao[i].id + " onclick='deletaNotificacao($(this).val())' Excluir</button>" +
						"</td>" +
						"</tr>"
			}
		} else if (listNotificacao == ""){
			dados += "<tr><td colspan='3'>Nenhum registro encontrado</td></tr>";
		}
		return dados;
	}
	
	insereNotificacao = function(){
		var notificacao = $("textarea[name=txacompnotificacao]").val();
		$.ajax({
			type: "POST",
			url: PATH + "InserirNotificacao",
			data: "notificacao="+notificacao+"&usuario_id="+usuarioLogado.id,
			success: function (msg) {
				alert(msg.msg);
			},
			error: function (info) {
				alert("Erro ao cadastrar uma nova notificação: "+ info.status + " - " + info.statusText);		   
			}
		});
	}
	
	deletaNotificacao = function(id){
		$.ajax({
			type:"POST",
			url: PATH + "DeletarNotificacao",
			data: "id="+id,
			success: function(msg){
				alert(msg.msg);
			},
			error: function(info){
			alert("Erro ao deletar notificação "+ info.status + " - " + info.statusText);
			}
		});
	};
	
	enviaIdNotificacao = function(id){
		$(".divComporNotificacoes").hide();
		$("#divEditarNotificacoes").show();
		$("input[name=idnotificacao]").val(id);
	}
	
	alteraNotificacao = function(){
		var notificacao = $("textarea[name=txaeditnotificacao]").val();
		var id = $("input[name=idnotificacao]").val();
		$.ajax({
			type:"POST",
			url: PATH + "AlterarNotificacao",
			data: "idnotificacao="+id+"&txaeditnotificacao="+notificacao,
			success: function(msg){
				alert(msg.msg);
			},
			error: function(info){
			alert("Erro ao alterar notificação "+ info.status + " - " + info.statusText);
			}
		});
	}
	
/*------------------------Log de acesso--------------------------------*/
	
	insereLogDeAcesso = function(){
		var usuarioId = 1;//usuarioLogado.id;
		$.ajax({
			type: "POST",
			url: PATH + "InserirLogDeAcesso",
			data: "usuario_id="+usuarioId,
			success: function (msg) {
				alert(msg.msg);
			},
			error: function (info) {
				alert("Erro ao cadastrar uma nova notificação: "+ info.status + " - " + info.statusText);		   
			}
		});
	}
	
	$(function buscaLogDeAcesso(){
		var html = "<table class='tabelaGeral'>" +
		"<tr>" +
		"<th>Usuário:</th>" +
		"<th>Data - Horário</th>" +
		"</tr>";
		
		$.ajax({
			type: "POST",
			url: PATH + "BuscarLogDeAcesso",
			data: null,
			success: function(dados){
				html += geraTabelaLogDeAcesso(dados);
				html += "</table>";
				$("#listLogDeAcesso").html(html);
			},
			error: function(info){
				alert("Erro ao carregar as tabelas: "+ info.status + " - " + info.statusText);
			}
		})
	});
	
	geraTabelaLogDeAcesso = function(listLog){
		var dados = "";
		if (listLog != undefined && listLog.length > 0){
			for (var i=0; i<listLog.length; i++){
				dados += "<tr>" +
						"<td><span>"+listLog[i].usuarioId+"</span></td>" +
						"<td><span>"+listLog[i].dataCriacao+"</span></td>" +
						"</tr>"
			}
		} else if (listNotificacao == ""){
			dados += "<tr><td colspan='2'>Nenhum registro encontrado</td></tr>";
		}
		return dados;
	}

/*------------------------Gerenciar ADM--------------------------------*/

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

	//lista usuarios de uma lista
	listaAdm = function(lista) {
		var dados="";
		if (lista==""){
			dados = "<h2>Nada por aqui.</h2>";
		}else{
			dados += "<ul class='listaContas' id='listaAdmins'>";
			if (lista != undefined && lista.length > 0){
				for (var i=0; i<lista.length; i++){
					dados +="<li name='txtadm"+lista[i].login+" value='"+lista[i].id+"'>"+lista[i].login+"</li>";
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
				data: $("#cadastrarAdmin").serialize()+"&p=0",
				success: function (msg) {
					alert(msg.msg);
				},
				error: function (info) {
					alert("Erro ao cadastrar um novo jogador: "+ info.status + " - " + info.statusText);		   
				}
			});
		}
	}
	
	//consulta
	buscaAdmParaEditar = function(id){
		if(id==undefined){
			id = $("#altId").val();
		}
		$.ajax({
			type: "POST",
			url: PATH + "BuscarUsuario",
			data: "id="+id,
			success: function(usuario){
				$("#altId").val(usuario.id);
				$("#altNome").val(usuario.nome);
				$("#altEmail").val(usuario.email);
				$("#altNascimento").val(usuario.nascimento);
				$("#altLogger").val(usuario.login);
				$("#altVelhaSenha").val("");
				$("#altNovaSenha").val("");
				$("#altConfSenha").val("");
			},
			  error: function(rest){
				  alert("Erro ao encontrar o usuário a ser alterado.");
			  }
			  });
	};
	
	$(function escolherAdmin(){
	    $("#listaAdm").on('click','li',function (){//Função para passar o nome da lista de usuários para o campo de deletar usuário.
	            $("input[name=txtadmin]").val($(this).text());
	        
	    })
	});
	
	$(function escolherUsuario(){
	    $("#listaUsr").on('click','li',function (){//Função para passar o nome da lista de usuários para o campo de deletar usuário.
	            $("input[name=txtusuario]").val($(this).text());
	        
	    })
	});
/*------------------------Gerenciar Contas--------------------------------*/
	
	//deixausuario alterado
	alteraUsuario = function(){
		if(validaMinhaConta()){
			$.ajax({
				type: "POST",
				url: PATH + "AlterarUsuario",
				data: $("#editarConta").serialize(),
				success: function (msg) {
					alert(msg.msg);
				},
				error: function (info) {
					alert("Erro ao alterar os dados: "+ info.status + " - " + info.statusText);		   
				}
			});
		}
  };

})


//coisa nova

//usa a servlet BuscaUsuariosParaLista para fazer bem isso	buscaUsr = function(){
	buscaUsr = function(){
		var valorBusca = $("input[name=txtbuscausr]").val();
		var html;
		$.ajax({
			type: "POST",
			url: PATH + "BuscarUsuariosParaLista",
			data: "permissao=1&valorBusca="+valorBusca,
			success: function(dados){
				html = listaUsr(dados);
				$("#listaUsr").html(html);
			},
			error: function(info){
				alert("Erro ao consultar os contatos: "+ info.status + " - " + info.statusText);
			}
		});
		};

	//lista usuarios de uma lista
	listaUsr = function(lista) {
		var dados="";
		if (lista==""){
			dados = "<h2>Nada por aqui.</h2>";
		}else{
			dados += "<ul class='listaContas' id='listaUsuarios'>";
			if (lista != undefined && lista.length > 0){
				for (var i=0; i<lista.length; i++){
					dados +="<li name='txtusr"+lista[i].login+" value='"+lista[i].id+"'>"+lista[i].login+"</li>";
				}
			}
			dados+="</ul>";
		}
		return dados;
	};
