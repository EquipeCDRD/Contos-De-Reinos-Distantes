/*
 * Autor: Equipe CDRD
 * Descrição: Arquivo de js contendo funções AJAX relativas às servlets de index.html(raiz do projeto). 
 * 			  Contem funções de chamada de servlets, assim como para lidar com as respostas do servidor após o 
 * 			  processamento da requisição.
 */

function login(){
	var login = $("input[name=txtlogin]").val();
	var senha = $("input[name=pwdsenha]").val();
	if((login=="")||(senha=="")){
		alert("Preencha tudo aí, meu!");
	} else {
		$.ajax({
			type: "POST",
			url: "Login",
			data: "login="+login+"&senha="+senha,
			success: function (msg) {
				if (msg.msg!=null)
					alert(msg.msg);
				else
					window.location.href = msg.url;
			},
			error: function (info) {
				alert("Erro ao tentar login: "+ info.status + " - " + info.statusText);		   
			}
		});
	}
}

function cadastra(){
	if (validaCadastroJgr()){
		$.ajax({
			type: "POST",
			url: "InserirUsuario",
			data: $("#cadastrarJogador").serialize()+"&p=1",
			success: function (msg) {
				alert(msg.msg);
				location.reload();
			},
			error: function (info) {
				alert("Erro ao cadastrar um novo jogador: "+ info.status + " - " + info.statusText);
			}
		});
	}
}  
