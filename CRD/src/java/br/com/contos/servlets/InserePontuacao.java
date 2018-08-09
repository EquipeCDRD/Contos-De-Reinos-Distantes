package br.com.contos.servlets;

/*==================Libs do java==================*/
import java.io.IOException;
import java.sql.Connection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

//Anotação que indica a URL da servlet
@WebServlet("/inserePontuacao")
public class InserePontuacao extends HttpServlet{
	
	//método construtor
	public static final long serialVersionUID = 1L;
	
	public InserePontuacao() {
		
	}
	
	/*==================doPost e doGet==================*/
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		process(request, response);
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		process(request, response);
	}
	
	/*==================process==================*/
	private void process(HttpServletRequest request, HttpServletResponse rersponse) throws ServletException, IOException{
		
		//Instanciamento de Pontuacao
		Pontuacao pontuacao = new Pontuacao();
		
		
		try {
			//recolhimento dos dados da frontend
			pontuacao.setScore(request.getParameter("score"));
			pontuacao.setDataCriacao(request.getParameter("dataCriacao"));
			pontuacao.setUsuarioId(request.getParameter("usuarioId"));
			pontuacao.setIdentificadorTabela(request.getParameter("identificador"));
			
			//instanciamento de Conexao abertura da conexao com o banco
			Conexao con = new Conexao();
			Connection conexao = con.abrirConexao();
			//instanciamento de JDBCPontuacaoDAO
			JDBCPontuacaoDAO jdbcPontuacao = new JDBCPontuacaoDAO(conexao);
			//chamada do método de inserção de pontuação
			jdbcPontuacao.inserirPontuacao(pontuacao);
			
		}
	}
}
