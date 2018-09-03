package br.com.contos.servlets;

/*==================Libs do java==================*/
import java.io.IOException;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.time.format.DateTimeFormatter;
import java.time.LocalDate;
import java.time.LocalDateTime;    

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
@WebServlet("/InserirPontuacao")
public class InserirPontuacao extends HttpServlet{
	
	public static final long serialVersionUID = 1L;
	
	//método construtor
	public InserirPontuacao() {}
	
	/*==================doPost e doGet==================*/
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		process(request, response);
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		process(request, response);
	}
	
	/*==================process==================*/
	private void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		
		//Instanciamento de Pontuacao e usuario
		Pontuacao pontuacao = new Pontuacao();
		
		try {
			
			//recolhimento dos dados da frontend
			pontuacao.setId(request.getParameter("hdid"));
			pontuacao.setScore(request.getParameter("txtpontuacao"));
			pontuacao.setIdentificadorTabela(request.getParameter("hdidentificador"));
			pontuacao.setUsuarioId(request.getParameter("usuarioid"));
			
			System.out.println("Tipo de identificador da tabela: "+pontuacao.getIdentificadorTabela());
			//recolhimento da data de criação da pontuação
			DateTimeFormatter formatoData = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
			LocalDateTime dataCriacao = LocalDateTime.now();
			
			//passagem da data a um objeto de pontuacao
			pontuacao.setDataCriacao(formatoData.format(dataCriacao));
			
			System.out.println("Data da pontuação: "+pontuacao.getDataCriacao());
			//instanciamento de Conexao abertura da conexao com o banco
			Conexao con = new Conexao();
			Connection conexao = con.abrirConexao();
			
			//instanciamento de JDBCPontuacaoDAO
			JDBCPontuacaoDAO jdbcPontuacao = new JDBCPontuacaoDAO(conexao);
			
			/*
			 * Chamada do m�todo buscar pontuacao, que ira retornar uma lista de pontua��es (derp, esperava o que? )
			 * que ser� atribuida a var listaDePontuacoes
			 */
			List<Pontuacao> listaDePontuacoes = new ArrayList<Pontuacao>();
			listaDePontuacoes = jdbcPontuacao.buscarPontuacao(pontuacao.getUsuarioId(),pontuacao.getIdentificadorTabela());
			
			//Criação da mensagem de retorno 
			Map<String, String> msg = new HashMap<String, String>();
			
			//Se a lista voltar nula, significa que deu merda em algum ponto
			if(listaDePontuacoes == null) {
				
				//Atualização da msg dizendo que deu merda
				msg.put("msg","Deu caca na hora de buscar nossos registros. Lamentamos pelo inconveniente");
			
			//Se não tiver dado problema até aqui...
			}else {
				
				//Essa variável irá dizer se os processos realizados pelo JDBC deram certo ou não
				Boolean retorno = null;
				
				//Se não tiver pontuação salva
				System.out.println("Tamanho da lista de pontuações do feladapota: " + listaDePontuacoes.size());
				if((listaDePontuacoes.size() < 5)||(listaDePontuacoes.isEmpty())) {//Problema com número de pontuações 
					
					//Chama o método para inserção da nova pontuação
					retorno = jdbcPontuacao.inserirPontuacao(pontuacao);
				
				//e se tiver alguma
				}else{ 
					
					//Chama método para alterar pontuação
					retorno = jdbcPontuacao.alterarPontuacao(pontuacao, listaDePontuacoes);
					 
				}
				
				/*
				 * 	Checa se os processos do JDBC foram de boas ou falharam. Se estiver true,
				 * 	tudo ocorreu bem, e se estiver falso, deu merda em algum ponto
				 */
				if(retorno) {
					msg.put("msg","Sua pontuação foi atualizada!");
				}else {
					msg.put("msg", "Não atualizou a pontuação não fion...");
				}
				
				//fechamento da conexao com o banco
				con.fecharConexao();	
				//Criação da string json que irá conter a mensagem de resposta
				String json = new Gson().toJson(msg);
				
				response.setContentType("application/json");
				response.setCharacterEncoding("UTF-8");
				response.getWriter().write(json);
			}
			
		}catch(IOException e) {
			e.printStackTrace();
		}
	}

}
