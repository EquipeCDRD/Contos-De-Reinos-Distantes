package br.com.contos.servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.sql.Connection;
import java.util.Map;
import java.util.HashMap;
import com.google.gson.Gson;

import java.time.format.DateTimeFormatter;  
import java.time.LocalDateTime;    

import br.com.contos.classes.Notificacao;
import br.com.contos.jdbc.JDBCNotificacaoDAO;
import br.com.contos.conexao.Conexao;

@WebServlet("/InserirNotificacao")
public class InserirNotificacao extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public InserirNotificacao() {
        super();
    }

    private void process(HttpServletRequest request, HttpServletResponse response)
    		throws ServletException, IOException{
    	
    	Notificacao notificacao = new Notificacao();
    	
    	try	{
    		notificacao.setNotificacao(request.getParameter("notificacao"));
    		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");  
    		LocalDateTime now = LocalDateTime.now();  
    		notificacao.setDataCriacao(dtf.format(now));
    		notificacao.setUsuarioId(request.getParameter("usuario_id"));
    		Conexao conec = new Conexao();
    		Connection conexao = conec.abrirConexao();
    		JDBCNotificacaoDAO jdbcNotificacao = new JDBCNotificacaoDAO(conexao);
    		Map<String, String> msg = new HashMap<String, String>();
    		boolean retorno = jdbcNotificacao.inserir(notificacao);
    		if(retorno){
    			msg.put("msg", "Notificação enviada com sucesso.");
    		}else{
    			msg.put("msg", "Não foi possível enviar a notificação.");
    		}
    		conec.fecharConexao();
	    	System.out.println(msg);
    		String json = new Gson().toJson(msg);
    		
    		response.setContentType("application/json");
    		response.setCharacterEncoding("UTF-8");
    		response.getWriter().write(json);
    	}catch (IOException e) {
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
