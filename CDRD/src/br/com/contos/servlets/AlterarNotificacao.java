package br.com.contos.servlets;

import java.io.IOException;
import java.sql.Connection;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import br.com.contos.classes.Notificacao;
import br.com.contos.jdbc.JDBCNotificacaoDAO;
import br.com.contos.conexao.Conexao;

import com.google.gson.Gson;

/**
 * Servlet implementation class AtualizarNotificacao
 */
@WebServlet("/AlterarNotificacao")
public class AlterarNotificacao extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AlterarNotificacao() {
        super();
        // TODO Auto-generated constructor stub
    }

    private void process(HttpServletRequest request, HttpServletResponse response) 
    		throws ServletException, IOException {
    	try {		
    		Conexao conec = new Conexao();
    		Connection conexao = conec.abrirConexao();
    		JDBCNotificacaoDAO jdbcNotificacao = new JDBCNotificacaoDAO(conexao);
    		Map<String, String> msg = new HashMap<String, String>();
    		Notificacao notificacao = new Notificacao();
    		notificacao.setNotificacao(request.getParameter("txaeditnotificacao"));
    	    notificacao.setId(request.getParameter("idnotificacao"));
    	    boolean retorno = jdbcNotificacao.alterar(notificacao);
    		conec.fecharConexao();    	
    			if (retorno) {
    				msg.put("msg", "Notificação editada com sucesso.");
    		    } else {
    		    	msg.put("msg", "Não foi possível editar a notificação.");
    		    	msg.put("erro", "true");
    		    }
    		conec.fecharConexao();
    		
    		response.setContentType("application/json");
    	   	response.setCharacterEncoding("UTF-8");
    	   	response.getWriter().write(new Gson().toJson(msg));
    	} catch (IOException e) {
    		e.printStackTrace();
    	}
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
