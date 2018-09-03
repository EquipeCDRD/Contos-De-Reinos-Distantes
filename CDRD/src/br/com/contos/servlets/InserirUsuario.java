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

import br.com.contos.classes.Criptografia;
import br.com.contos.classes.Usuario;
import br.com.contos.conexao.Conexao;
import br.com.contos.jdbc.JDBCUsuarioDAO;

import com.google.gson.Gson;

@WebServlet("/InserirUsuario")
public class InserirUsuario extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public InserirUsuario() {
    }
    
    private void process(HttpServletRequest request, HttpServletResponse response)
    		throws ServletException, IOException{
    	Usuario usuario = new Usuario();
    	
    	try {
    		usuario.setNome(request.getParameter("txtnome"));
    		usuario.setEmail(request.getParameter("txtemail"));
    		usuario.setNascimento(request.getParameter("dtenascimento"));
    		usuario.setLogin(request.getParameter("txtapelido"));
    		usuario.setSenha(Criptografia.criptografaSenha(request.getParameter("pwdsenha")));
    		usuario.setPermissao(request.getParameter("hdpermissao"));
    		Conexao conec = new Conexao();
    		Connection conexao = conec.abrirConexao();
    		JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO(conexao);
    		Usuario usuariobd=jdbcUsuario.buscarPorValor(usuario.getLogin(), "usuario");
    		String loginbd = usuariobd.getLogin();
    		Map<String, String> msg = new HashMap<String, String>();
    		if (usuario.getLogin().equals(loginbd)) {
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

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		process(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		process(request, response);
	}

}
