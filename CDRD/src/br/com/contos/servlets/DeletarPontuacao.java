package br.com.contos.servlets;

/*==================Libs do java==================*/
import java.io.IOException;
import java.sql.Connection;
import java.util.HashMap;
import java.util.Map;

/*==================Libs para servlets==================*/
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/*==================Pacotes==================*/
import br.com.contos.conexao.Conexao;
import br.com.contos.jdbc.JDBCPontuacaoDAO;

/*==================Lib do Google que convert um objeto p/ Json==================*/
import com.google.gson.Gson;

@WebServlet("/deletarPontuacao")
public class DeletarPontuacao {
	
	//método construtor
	public DeletarPontuacao() {}
	
	/*==================doPost e doGet==================*/
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		process(request, response);
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		process(request, response);
	}
	
	/*==================process==================*/
	private void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
	
		//recolhimento da id do usuario cujas pontuações serão deletadas
		String usuarioId = request.getParameter("txtusuarioid");
		
		//abertura da conexao com o banco
		Conexao con = new Conexao();
		Connection conexao = con.abrirConexao();
		
		//nova instância do jdbc de pontuações
		JDBCPontuacaoDAO jdbcPontuacao = new JDBCPontuacaoDAO(conexao);
		
		//Declaração da variável que armazenará o resultado da operação de deleção
		Boolean retorno = jdbcPontuacao.deletarPontuacao(usuarioId);
		
		//criação da mensagem que será enviada a front
		Map<String,String> msg = new HashMap<String,String>();
		
		//Análise do resultado da operação 
		if(retorno) {
			msg.put("msg", "Pontuações deletadas com sucesso");
		}else {
			msg.put("msg", "Deu merda e não foi possível deletar as pontuações");
		}
		
		//Criação da string json que irá conter a mensagem de resposta
		String json = new Gson().toJson(msg);
		
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(json);
		
	}
}
