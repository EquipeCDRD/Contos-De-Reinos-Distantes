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

import br.com.contos.classes.Notificacao;
import br.com.contos.jdbc.JDBCNotificacaoDAO;
import br.com.contos.conexao.Conexao;

@WebServlet("/BuscarNotificacao")
public class BuscarNotificacao extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public BuscarNotificacao() {
        super();
    }
    
    private void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	List<Notificacao> notificacoes = new ArrayList<Notificacao>();
    	Conexao conec = new Conexao();
    	Connection conexao = conec.abrirConexao();
    	JDBCNotificacaoDAO jdbcNotificacao = new JDBCNotificacaoDAO(conexao);
    	notificacoes = jdbcNotificacao.buscar();
    	conec.fecharConexao();
    	String json = new Gson().toJson(notificacoes);
    	try {
    		response.setContentType("application/json");
    		response.setCharacterEncoding("UTF-8");
    		response.getWriter().write(json);
    	} catch (IOException e) {
    		e.printStackTrace();
    	}
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		process(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		process(request, response);
	}

}
