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

import br.com.contos.classes.Usuario;
import br.com.contos.conexao.Conexao;
import br.com.contos.jdbc.JDBCUsuarioDAO;

import com.google.gson.Gson;

/**
 * Servlet implementation class InsereUsuario
 */
@WebServlet("/InsereUsuario")
public class InsereUsuario extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public InsereUsuario() {
        // TODO Auto-generated constructor stub
    }
    
    private void process(HttpServletRequest request, HttpServletResponse response)
    		throws ServletException, IOException{
    	Usuario usuario = new Usuario();
    	
    	try {
    		usuario.setNome(request.getParameter("txtnome"));
    		usuario.setEmail(request.getParameter("txtemail"));
    		usuario.setNascimento(request.getParameter("dtenascimento"));
    		usuario.setLogin(request.getParameter("txtapelido"));
    		usuario.setSenha(request.getParameter("pwdsenha"));
    		usuario.setPermissao(request.getParameter("hdpermissao"));
    		Conexao conec = new Conexao();
    		Connection conexao = conec.abrirConexao();
    		JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO(conexao);
    		
    		Map<String, String> msg = new HashMap<String, String>();
    		if (jdbcUsuario.buscarPorLogin(usuario.getLogin())) {
    			msg.put("msg", "Esse login já existe.");
    		} else {	
	    		boolean retorno = jdbcUsuario.inserir(usuario);
	    		if (retorno) {
	    			msg.put("msg", "Usuário cadastrado com sucesso.");
	    		} else {
	    			msg.put("msg", "Não foi possível cadastrar o usuário.");
	    		}
    		}	
    		conec.fecharConexao();
    		String json = new Gson().toJson(msg);
    		
    		response.setContentType("application/json");
    		response.setCharacterEncoding("UTF-8");
    		response.getWriter().write(json);
    		
    	} catch(IOException e) {
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
