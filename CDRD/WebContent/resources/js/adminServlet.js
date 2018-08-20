$(document).ready(function(){
	var usuarioLogado;
	
	insereNotificacao = function(){
		var notificacao = $("textarea[name=txacompnotificacao]").val();
		var dataCriacao = 1; //conseguir a data atual em string
		var usuarioId = usuarioLogado.id;
		$.ajax({
			type: "POST",
			url: PATH + "InsereNotificacao",
			data: $("form[name=frmcompornotificacoes]").serialize(),
			success: function (msg) {
				alert(msg.msg);
				carregaDados("admincrud");
			},
			error: function (info) {
				alert("Erro ao cadastrar um novo administrador: "+ info.status + " - " + info.statusText);		   
			}
		});
	}
})