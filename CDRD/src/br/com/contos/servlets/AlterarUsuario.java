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
import br.com.contos.classes.Criptografia;
import br.com.contos.conexao.Conexao;
import br.com.contos.jdbc.JDBCUsuarioDAO;

import com.google.gson.Gson;

@WebServlet("/AlterarUsuario")
public class AlterarUsuario extends HttpServlet {
	private static final long serialVersionUID = 1L;
    public AlterarUsuario() {
        super();
    }
    
    private void process(HttpServletRequest request, HttpServletResponse response)
    		throws ServletException, IOException{
    	try {	
    		Conexao conec = new Conexao();
    		Connection conexao = conec.abrirConexao();
    		JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO(conexao);
    		System.out.println(request.getParameter("txtaltlogger"));
    		Usuario usuariobd = jdbcUsuario.buscarPorValor(request.getParameter("txtaltlogger"), "usuario");
    		Map<String, String> msg = new HashMap<String, String>();
    		if (request.getParameter("txtaltlogger").equals(usuariobd.getLogin())) {
    			String senhaAtualCript = Criptografia.criptografaSenha(request.getParameter("pwdaltsenhaantiga")); 
    			if (senhaAtualCript.equals(usuariobd.getSenha())) {
    				Usuario usuario = new Usuario();
    	    		usuario.setLogin(request.getParameter("txtaltlogger"));
    	    		usuario.setSenha(request.getParameter("pwdaltsenhanova"));
    	    		usuario.setNome(request.getParameter("txtaltnome"));
    	    		usuario.setNascimento(request.getParameter("dtealtnascimento"));
    	    		usuario.setEmail(request.getParameter("txtaltemail"));
    	    		usuario.setId(request.getParameter("hdid"));
    	    		boolean retorno = jdbcUsuario.atualizar(usuario);
    		    	conec.fecharConexao();
    		    	
    		    	if (retorno==true) {
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
    

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		process(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		process(request, response);
	}

}
