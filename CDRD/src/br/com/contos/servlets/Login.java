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
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;

import br.com.contos.classes.Criptografia;
import br.com.contos.classes.Usuario;
import br.com.contos.conexao.Conexao;
import br.com.contos.jdbc.JDBCUsuarioDAO;

/**
 * Servlet implementation class Login
 */
@WebServlet("/Login")
public class Login extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Login() {
        super();
        // TODO Auto-generated constructor stub
    }

    private void process(HttpServletRequest request, HttpServletResponse response) 
    		throws ServletException, IOException {
    	
    	try {
    		Conexao conec = new Conexao();
    		Connection conexao = conec.abrirConexao();
    		JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO(conexao);
    		Usuario usuario = jdbcUsuario.buscarPorValor(request.getParameter("login"),"usuario");
    		Map<String, String> msg = new HashMap<String, String>();
    		if (request.getParameter("login").equals(usuario.getLogin())) {
    			String senhaFormCript = Criptografia.criptografaSenha(request.getParameter("senha")); 
    			if (senhaFormCript.equals(usuario.getSenha())) {
    				HttpSession sessao = request.getSession();
    				sessao.setAttribute("login", usuario.getLogin());
    				sessao.setAttribute("permissao", usuario.getPermissao());
    				if(sessao.getAttribute("permissao").equals("0")) {
    					System.out.println("admin logando");
    					msg.put("url", "pages/admin/index.html");
    				} else {
    					System.out.println("player logando");
    					msg.put("url", "pages/player/index.html");
    				}
	    		} else {
	    			msg.put("msg", "Senha não corresponde com o cadastro.");
	    		}
    		} else {	
	    		msg.put("msg", "Usuário não encontrado.");
    		}	
    		conec.fecharConexao();
    		
    		String json = new Gson().toJson(msg);
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
