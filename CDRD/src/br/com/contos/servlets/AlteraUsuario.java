package br.com.contos.servlets;
//aserfeito

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
import br.com.contos.classes.Criptografia;
import br.com.contos.conexao.Conexao;
import br.com.contos.jdbc.JDBCUsuarioDAO;

import com.google.gson.Gson;

/**
 * Servlet implementation class AlterarUsuario
 */
@WebServlet("/AlteraUsuario")
public class AlteraUsuario extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AlteraUsuario() {
        super();
        // TODO Auto-generated constructor stub
    }
    
    private void process(HttpServletRequest request, HttpServletResponse response)
    		throws ServletException, IOException{
    	try {	
    		Conexao conec = new Conexao();
    		Connection conexao = conec.abrirConexao();
    		JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO(conexao);
    		Usuario usuariobd = jdbcUsuario.buscarPorId(request.getParameter("txtid"));
    		Map<String, String> msg = new HashMap<String, String>();
    		if (request.getParameter("txtlogin").equals(usuariobd.getLogin())) {
    			String senhaAtualCript = Criptografia.criptografaSenha(request.getParameter("txtsenhaatual")); 
    			if (senhaAtualCript.equals(usuariobd.getSenha())) {
    				Usuario usuario = new Usuario();
    	    		usuario.setLogin(request.getParameter("txtlogin"));
    	    		usuario.setSenha(request.getParameter("txtnovasenha"));
    	    		usuario.setPermissao(request.getParameter("hdpermissao"));
    	    		usuario.setNome(request.getParameter("txtnome"));
    	    		usuario.setNascimento(request.getParameter("txtnascimento"));
    	    		usuario.setEmail(request.getParameter("txtemail"));
    	    		boolean retorno = jdbcUsuario.atualizar(usuario);
    		    	conec.fecharConexao();
    		    	
    		    	if (retorno) {
    		    		msg.put("msg", "Usuário editado com sucesso.");
    		    	} else {
    		    		msg.put("msg", "Não foi possível editar o usuário.");
    		    		msg.put("erro", "true");
    		    	}
	    		} else {
	    			msg.put("msg", "Senha não corresponde com o cadastro.");
	    			msg.put("erro", "true");
	    		}
    		} else {	
	    		msg.put("msg", "Você não pode alterar seu usuário.");
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
