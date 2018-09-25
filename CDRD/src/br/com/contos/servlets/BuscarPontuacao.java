package br.com.contos.servlets;

/*==================Libs do java==================*/
import java.io.IOException;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;

/*==================Libs para servlets==================*/
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/*==================Pacotes==================*/
import br.com.contos.classes.Pontuacao;
import br.com.contos.conexao.Conexao;
import br.com.contos.jdbc.JDBCPontuacaoDAO;

/*==================Lib do Google que convert um objeto p/ Json==================*/
import com.google.gson.Gson;

@WebServlet("/BuscarPontuacao")
public class BuscarPontuacao extends HttpServlet{

	private static final long serialVersionUID = 1L;

	//método construtor
	public BuscarPontuacao() {}
	
	/*==================doPost e doGet==================*/
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		process(request, response);
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		process(request, response);
	}
	
	/*==================process==================*/
	private void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		
		/*
		 * 	Criação da lista que conterá as pontuações do jogador, caso se trate
		 * 	do score pessoal, ou dos jogadores, caso se trate do ranking
		 */
		List<Pontuacao> listaDePontuacoes = new ArrayList<Pontuacao>();
		try {
			
			//abertura da conexao com o banco
			Conexao con = new Conexao();
			Connection conexao = con.abrirConexao();
			
			//instanciamento do jdbc de pontuações e envio da conexao como parâmetro
			JDBCPontuacaoDAO jdbcPontuacao = new JDBCPontuacaoDAO(conexao);
			
			//Chamada do método de busca de pontuação do jdbc
			listaDePontuacoes = jdbcPontuacao.buscarPontuacao(request.getParameter("usuarioid"), 
															  request.getParameter("identificador"));
			
			//fechamento da conexao
			con.fecharConexao();
			
			//Se a lista voltar nula, significa que deu merda em algum ponto
			if(listaDePontuacoes == null) {
				
				throw new IOException("Não foi possível carregar os dados, lista nula");
			
			//Se não tiver dado problema até aqui...
			}else {
				
				//Criação da string json que irá conter a mensagem de resposta
				String json = new Gson().toJson(listaDePontuacoes);
				System.out.println(json);
				response.setContentType("application/json");
				response.setCharacterEncoding("UTF-8");
				response.getWriter().write(json);
				
			}
		}catch(IOException e) {
			e.printStackTrace();
		}
	}
}
