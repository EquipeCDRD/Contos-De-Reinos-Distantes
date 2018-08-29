/**
 * Autor: kalyl henings
 * Data de criação: 2018-21-08
 * Desc: Arquivo contendo as funções relativas às servlets do jogador
 */

//Main
$(document).ready(function(){

    /**
     * armazena os dados do usuário logado
     */
    var usuarioLogado;
    
    /**
     * especifica o caminho a ser trilhado pela função até a chamada da mesma
     * na raiz do projeto
     */
    var PATH = "../../";
    
    /*--------------------------------------Geral-----------------------------------------*/
	
	verificaUsuario = function(){
		$.ajax({
			type: "POST",
			url: PATH + "ValidarSessao",
			data: "p=1",
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
	/**
     * chama a função afim de checar se o usuário está logado corretamente
     */
	verificaUsuario();

    /*--------------------------------------InseriPontuacao-----------------------------------------*/

    /**
     * função ajax que chama a servlet de inserção de pontuações 
     */
    inserirPontuaca0 = function(){
        
        /**
         * variável que contem a última pontuação atingida pelo jogador que será enviada ao servidor
         */
        usuarioLogado.pontuacao = $("text[id=inputPontuacaoTemp]");
        
        $.ajax({
        
            type: "POST",
            url: PATH + "inserirPontuacao",
        
            data: "usuarioid="+usuarioLogado.id+
                  /**
                   * o identificador serve para dizer ao servidor que tipo de busca realizar.
                   * nesse caso, o identificador é pessoal pq é preciso checar as pontuações de um
                   * jogador em específico
                   */
                  "&txtidentificador=pessoal"+
                  "&hidid=null"+
                  "&txtpontuacao="+usuarioLogado.pontuacao,
            
            
            success: function (response) {
                

                
            }
        });
    }
    
    //Cai fora fdp!
    sair = function(){
		alert("oi!");
	}
});