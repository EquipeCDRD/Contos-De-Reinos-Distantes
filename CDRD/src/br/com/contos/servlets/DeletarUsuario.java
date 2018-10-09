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

import com.google.gson.Gson;

import br.com.contos.conexao.Conexao;
import br.com.contos.jdbc.JDBCUsuarioDAO;
import br.com.contos.classes.Email;
import br.com.contos.classes.Usuario;



@WebServlet("/DeletarUsuario")
public class DeletarUsuario extends HttpServlet {
    private static final long serialVersionUID = 1L;
       
    public DeletarUsuario() {
        super();
    }

    private void process(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String id = request.getParameter("id");
        String motivo = request.getParameter("motivo");        
        Conexao conec = new Conexao();
        Connection conexao = conec.abrirConexao();
        
        JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO(conexao);
        Email enviar = new Email();
        
        Usuario usuario = jdbcUsuario.buscarPorValor(id, "id");
        boolean retorno = jdbcUsuario.deletar(id);
        conec.fecharConexao();
        enviar.enviarEmail(usuario.getEmail(), "Contos de Reinos Distantes - Conta Deletada", 
        				"Caro "+usuario.getNome()+", sua conta no jogo Contos de Reinos Distantes foi deletada, "
        				+ "e junto todos os seus dados em nossos registros. "
        				+ "\n O motivo da deleção foi: "+motivo);	
        Map<String, String> msg = new HashMap<String, String>();
        if (retorno) {
            msg.put("msg", "Usuário deletado com sucesso.");
        } else {
            msg.put("msg", "Não foi possível deletar o usuario.");
        }
        String json = new Gson().toJson(msg);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(json);
    }    

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        process(request, response);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        process(request, response);
    }

}