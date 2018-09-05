package br.com.contos.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.sql.Connection;
import java.util.Map;
import java.util.HashMap;

import com.google.gson.Gson;

import br.com.contos.jdbc.JDBCNotificacaoDAO;
import br.com.contos.conexao.Conexao;


/**
 * Servlet implementation class DeletaNotificacao
 */
@WebServlet("/DeletarNotificacao")
public class DeletarNotificacao extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DeletarNotificacao() {
        super();
        // TODO Auto-generated constructor stub
    }

    private void process(HttpServletRequest request, HttpServletResponse response)
    		throws ServletException, IOException{
    	String id = request.getParameter("id");
    	Conexao conec = new Conexao();
    	Connection conexao = conec.abrirConexao();
    	JDBCNotificacaoDAO jdbcNotificacao = new JDBCNotificacaoDAO(conexao);
    	boolean retorno = jdbcNotificacao.deletar(id);
    	conec.fecharConexao();
    	
    	Map<String, String> msg = new HashMap<String, String>();
    	if (retorno) {
    		msg.put("msg", "Notificação deletada com sucesso.");
    	} else {
    		msg.put("msg", "Não foi possível deletar a no.");
    	}
    	String json = new Gson().toJson(msg);
    	response.setContentType("application/json");
    	response.setCharacterEncoding("UTF-8");
    	response.getWriter().write(json);
    	
    }
    
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		process(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		process(request, response);
	}

}
