package br.com.contos.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.sql.Connection;

import com.google.gson.Gson;

import br.com.contos.classes.Usuario;
import br.com.contos.jdbc.JDBCUsuarioDAO;
import br.com.contos.conexao.Conexao;

@WebServlet("/ValidarSessao")
public class ValidarSessao extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public ValidarSessao() {
        super();
    }
    
    private void process(HttpServletRequest request, HttpServletResponse response) 
    		throws ServletException, IOException {
    	System.out.println("validando sessão");
    	try {
    		HttpSession sessao = request.getSession();
    		
    		if (request.getParameter("p").equals(sessao.getAttribute("permissao"))) {
    			System.out.println("sessão OK");
    			Conexao conec = new Conexao();
        		Connection conexao = conec.abrirConexao();
        		JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO(conexao); 
        		
        		Usuario usuario = jdbcUsuario.buscarPorValor(sessao.getAttribute("login").toString(),"usuario");
        		usuario.setSenha(null);
        		conec.fecharConexao();
        		
        		String json = new Gson().toJson(usuario);
            	response.setContentType("application/json");
            	response.setCharacterEncoding("UTF-8");
            	response.getWriter().write(json);
            	
    		} else {
    			System.out.println("página:"+request.getParameter("p")+" e sessão:"+sessao.getAttribute("permissao"));
    		}
    			

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
