package br.com.contos.servlets;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.sql.Connection;
import java.util.Map;
import java.util.HashMap;

import br.com.contos.conexao.Conexao;
import br.com.contos.jdbc.JDBCLogDeAcessoDAO;

import com.google.gson.Gson;

/**
 * Servlet implementation class DeletarLogDeAcesso
 */
@WebServlet("/DeletarLogDeAcesso")
public class DeletarLogDeAcesso extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DeletarLogDeAcesso() {
        super();
        // TODO Auto-generated constructor stub
    }

    private void process(HttpServletRequest request, HttpServletResponse response)
    		throws ServletException, IOException{
    	String dataCriacao = request.getParameter("data_criacao");
    	Conexao conec = new Conexao();
    	Connection conexao = conec.abrirConexao();
    	JDBCLogDeAcessoDAO jdbcLogDeAcesso = new JDBCLogDeAcessoDAO(conexao);
    	boolean retorno = jdbcLogDeAcesso.deletar(dataCriacao);
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
