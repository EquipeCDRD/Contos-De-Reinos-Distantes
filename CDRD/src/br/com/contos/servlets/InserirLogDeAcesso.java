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

import br.com.contos.classes.LogDeAcesso;
import br.com.contos.jdbc.JDBCLogDeAcessoDAO;
import br.com.contos.conexao.Conexao;

@WebServlet("/InserirLogDeAcesso")
public class InserirLogDeAcesso extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public InserirLogDeAcesso() {
        super();
    }

    private void process(HttpServletRequest request, HttpServletResponse response)
    		throws ServletException, IOException{
    	
    	LogDeAcesso logDeAcesso = new LogDeAcesso();
    	
    	try	{
    		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");  
    		LocalDateTime now = LocalDateTime.now();  
    		logDeAcesso.setDataCriacao(dtf.format(now));
    		logDeAcesso.setUsuarioId(request.getParameter("usuario_id"));
    		Conexao conec = new Conexao();
    		Connection conexao = conec.abrirConexao();
    		JDBCLogDeAcessoDAO jdbcLogDeAcesso = new JDBCLogDeAcessoDAO(conexao);
    		Map<String, String> msg = new HashMap<String, String>();
    		boolean retorno = jdbcLogDeAcesso.inserir(logDeAcesso);
    		if(retorno){
    			msg.put("msg", "Log de acesso da sessão de administrador salvo.");
    		}else{
    			msg.put("msg", "Ocorreu um erro ao salvar o log de acesso");
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
