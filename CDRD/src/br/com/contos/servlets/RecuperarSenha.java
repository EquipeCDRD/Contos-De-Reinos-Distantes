package br.com.contos.servlets;

import java.io.IOException;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import br.com.contos.classes.Usuario;
import br.com.contos.conexao.Conexao;
import br.com.contos.classes.Criptografia;
import br.com.contos.classes.Email;
import br.com.contos.jdbc.JDBCUsuarioDAO;

@WebServlet("/RecuperarSenha")
public class RecuperarSenha extends HttpServlet {
    private static final long serialVersionUID = 1L;
       
    public RecuperarSenha() {
        super();
    }
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		process(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		process(request, response);
	}
    
	private void process(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException{
                
        try {
            Conexao conec = new Conexao();
            String senha = ""+Math.random();                            //Primeiro passo: número aleatório;
            String senha2 = Criptografia.criptografaSenha(senha);        //Segundo passo: criptografa o número;
            String senha3 = senha2.substring(0,7);                        //Terceiro passo: encurta pra 8 dígitos;
            String senha4 = Criptografia.criptografaSenha(senha3);        //Quarto passo: criptografa esse também
            
            System.out.println("senha enviada: "+senha3);
            System.out.println("senha salva (criptografada): "+senha4);
            
            Connection conexao = conec.abrirConexao();
            
            Email enviar = new Email();
            
            String email = request.getParameter("txtmail");
            JDBCUsuarioDAO jdbcUsuario = new JDBCUsuarioDAO(conexao);
            Usuario usuario = jdbcUsuario.buscarPorValor(email, "email");
            
            usuario.setSenha(senha4);
            jdbcUsuario.atualizar(usuario);
            
            String corpo = "Foi requerida uma nova senha para este usuário. Sua nova senha de acesso é: "+ senha3 +""
                    + "\n Lembre-se de alterá-la no seu quarto na taverna o quanto antes,"
                    + "pois essa deve ser apenas temporária.";
            
            enviar.enviarEmail(usuario.getEmail(),"Contos de Reinos Distantes - Recuperar Senha", corpo);
        }catch (Exception e) {
            e.printStackTrace();
    }
    return;
    }
}
