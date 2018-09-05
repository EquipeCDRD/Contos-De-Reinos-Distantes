package br.com.contos.servlets;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;

import br.com.contos.classes.LogDeAcesso;
import br.com.contos.jdbc.JDBCLogDeAcessoDAO;
import br.com.contos.conexao.Conexao;
/**
 * Servlet implementation class BuscarLogDeAcesso
 */
@WebServlet("/BuscarLogDeAcesso")
public class BuscarLogDeAcesso extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public BuscarLogDeAcesso() {
        super();
        // TODO Auto-generated constructor stub
    }

    private void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	List<LogDeAcesso> logsDeAcesso = new ArrayList<LogDeAcesso>();
    	Conexao conec = new Conexao();
    	Connection conexao = conec.abrirConexao();
    	JDBCLogDeAcessoDAO jdbcLogDeAcesso = new JDBCLogDeAcessoDAO(conexao);
    	logsDeAcesso = jdbcLogDeAcesso.buscar();
    	conec.fecharConexao();
    	String json = new Gson().toJson(logsDeAcesso);
    	try {
    		response.setContentType("application/json");
    		response.setCharacterEncoding("UTF-8");
    		response.getWriter().write(json);
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
