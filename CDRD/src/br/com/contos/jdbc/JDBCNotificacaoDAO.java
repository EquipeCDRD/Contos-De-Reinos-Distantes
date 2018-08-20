<<<<<<< HEAD
package br.com.contos.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import br.com.contos.classes.Notificacao;
import br.com.contos.jdbcinterfaces.NotificacaoDAO;

public class JDBCNotificacaoDAO implements NotificacaoDAO{
	
	private Connection conexao;

	public JDBCNotificacaoDAO(Connection conexao) {
		this.conexao = conexao;
	}
	
	public boolean inserir(Notificacao notificacao){
		String comando = "INSERT INTO notificacacoes (notificacao, data_criacao, usuario_id) VALUES (?,?,?)";
		PreparedStatement p;
		try{
			p = this.conexao.prepareStatement(comando);
			p.setString(1, notificacao.getNotificacao());
			p.setString(2, notificacao.getDataCriacao());
			p.setString(3, notificacao.getUsuarioId());
			p.execute();
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
		}
	
	public boolean atualizar(Notificacao notificacao){
		String comando = "UPDATE notificacoes SET notificacao=?";
		comando += " WHERE id=?";
		PreparedStatement p;
		try {
			p = this.conexao.prepareStatement(comando);
			p.setString(1, notificacao.getNotificacao());
			p.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	public boolean deletar(Notificacao notificacao) {
		String comando = "DELETE FROM notificacoes WHERE notificacao = '" + notificacao +"'";
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
	
	public List<Notificacao> buscar(String busca) {
		String comando = "SELECT * FROM notificacoes";
		System.out.println(comando);
		List<Notificacao> listNotificacao = new ArrayList<Notificacao>();
		Notificacao notificacao = null;
		try {
			Statement stmt = conexao.createStatement(); 
			ResultSet rs = stmt.executeQuery(comando);
			while (rs.next()) {
				notificacao = new Notificacao();
				String notif = rs.getString("notificacao");
				String datacriacao = notificacao.converteNascimentoParaFrontend(rs.getString("dataCriacao"));
				String usuarioid = rs.getString("usuarioId");				
				notificacao.setNotificacao(notif);
				notificacao.setDataCriacao(datacriacao);
				notificacao.setUsuarioId(usuarioid);
				listNotificacao.add(notificacao);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return listNotificacao;
	}
	
}
=======
package br.com.contos.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import br.com.contos.classes.Notificacao;
import br.com.contos.jdbcinterfaces.NotificacaoDAO;

public class JDBCNotificacaoDAO implements NotificacaoDAO{
	
	private Connection conexao;

	public JDBCNotificacaoDAO(Connection conexao) {
		this.conexao = conexao;
	}
	
	public boolean inserir(Notificacao notificacao){
		String comando = "INSERT INTO notificacacoes (notificacao, data_criacao, usuario_id) VALUES (?,?,?)";
		PreparedStatement p;
		try{
			p = this.conexao.prepareStatement(comando);
			p.setString(1, notificacao.getNotificacao());
			p.setString(2, notificacao.getDataCriacao());
			p.setString(3, notificacao.getUsuarioId());
			p.execute();
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
		}
	
	public boolean atualizar(Notificacao notificacao){
		String comando = "UPDATE notificacoes SET notificacao=?";
		comando += " WHERE id=?";
		PreparedStatement p;
		try {
			p = this.conexao.prepareStatement(comando);
			p.setString(1, notificacao.getNotificacao());
			p.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	public boolean deletar(Notificacao notificacao) {
		String comando = "DELETE FROM notificacoes WHERE notificacao = '" + notificacao +"'";
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
	
	public List<Notificacao> buscar(String busca) {
		String comando = "SELECT * FROM notificacoes";
		System.out.println(comando);
		List<Notificacao> listNotificacao = new ArrayList<Notificacao>();
		Notificacao notificacao = null;
		try {
			Statement stmt = conexao.createStatement(); 
			ResultSet rs = stmt.executeQuery(comando);
			while (rs.next()) {
				notificacao = new Notificacao();
				String notif = rs.getString("notificacao");
				String datacriacao = notificacao.converteNascimentoParaFrontend(rs.getString("dataCriacao"));
				String usuarioid = rs.getString("usuarioId");				
				notificacao.setNotificacao(notif);
				notificacao.setDataCriacao(datacriacao);
				notificacao.setUsuarioId(usuarioid);
				listNotificacao.add(notificacao);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return listNotificacao;
	}
	
}
>>>>>>> 013cc7f963ab361469ef0b167d6c79855f1ffb20
