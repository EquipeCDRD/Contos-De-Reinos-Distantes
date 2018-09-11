package br.com.contos.servlets;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import br.com.contos.classes.Usuario;
import br.com.contos.conexao.Conexao;
import br.com.contos.jdbc.JDBCUsuarioDAO;

@WebServlet("/BuscarUsuario")
public class BuscarUsuario extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public BuscarUsuario() {
        super();
    }

    private void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	Usuario usuario = new Usuario();
    	
    	Conexao conec = new Conexao();
    	Connection conexao = conec.abrirConexao();
    	JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO(conexao);
    	usuario = jdbcUsuario.buscarPorValor(request.getParameter("usuario"),"usuario");
    	conec.fecharConexao();
    	
    	String json = new Gson().toJson(usuario);
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
