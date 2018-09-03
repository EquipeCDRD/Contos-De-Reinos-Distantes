$(document).ready(function(){
	var usuarioLogado;
	var PATH = "../../";
	
/*--------------------------------------Geral-----------------------------------------*/
	
	verificaUsuario = function(){
		$.ajax({
			type: "POST",
			url: PATH + "ValidarSessao",
			data: "p=0",
			success: function (usuario) {
				if (usuario.login!=null){
					usuarioLogado = new Object();
					usuarioLogado.id= usuario.id;
					usuarioLogado.login = usuario.login;
					usuarioLogado.email = usuario.email;
					usuarioLogado.nome = usuario.nome;
					usuarioLogado.nascimento = usuario.nascimento;
					carregaPagina();
				} else {
					sair();
				}	
			},
			error: function (info) {
				sair();
			}
		});
	}
	
	verificaUsuario();
	
	sair = function(){
		alert("oi!");
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
		var usuarioId = 1;//usuarioLogado.id;
		$.ajax({
			type: "POST",
			url: PATH + "InserirNotificacao",
			data: "notificacao="+notificacao+"&usuario_id="+usuarioId,
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
	
})
