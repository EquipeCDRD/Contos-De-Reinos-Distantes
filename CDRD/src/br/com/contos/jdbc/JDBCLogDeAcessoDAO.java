package br.com.contos.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import br.com.contos.classes.LogDeAcesso;
import br.com.contos.jdbcinterfaces.LogDeAcessoDAO;

public class JDBCLogDeAcessoDAO implements LogDeAcessoDAO{

	private Connection conexao;

	public JDBCLogDeAcessoDAO(Connection conexao) {
		this.conexao = conexao;
	}
	
	public boolean inserir(LogDeAcesso logDeAcesso){
		String comando = "INSERT INTO logs_de_acesso (data_criacao, usuarios_id) VALUES (?,?)";
		PreparedStatement p;
		try{
			p = this.conexao.prepareStatement(comando);
			p.setString(1, logDeAcesso.getDataCriacao());
			p.setString(2, logDeAcesso.getUsuarioId());
			p.execute();
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
		}
	
	public boolean deletar(String data_criacao) {
		String comando = "DELETE FROM logs_de_acesso WHERE data_criacao = '" + 1/*Data?*/ +"'"; //deletar maior que 30 dias;
		Statement p;
		try {
			p = this.conexao.createStatement();
			p.execute(comando);
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	public List<LogDeAcesso> buscar(){
		String comando = "SELECT * FROM logs_de_acesso ORDER BY data_criacao DESC";
		System.out.println(comando);
		List<LogDeAcesso> listLog = new ArrayList<LogDeAcesso>();
		LogDeAcesso logDeAcesso = null;
		try {
			Statement stmt = conexao.createStatement(); 
			ResultSet rs = stmt.executeQuery(comando);
			while (rs.next()) {
				logDeAcesso = new LogDeAcesso();
				String datacriacao = rs.getString("data_criacao");
				String usuarioid = rs.getString("usuarios_id");				
				logDeAcesso.setDataCriacao(datacriacao);
				logDeAcesso.setUsuarioId(usuarioid);
				listLog.add(logDeAcesso);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return listLog;
	}
	
}
