package br.com.contos.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import br.com.contos.classes.Usuario;
import br.com.contos.jdbcinterfaces.UsuarioDAO;
import br.com.contos.classes.Criptografia;

public class JDBCUsuarioDAO implements UsuarioDAO{

	private Connection conexao;

	public JDBCUsuarioDAO(Connection conexao) {
		this.conexao = conexao;
	}
	
	public boolean inserir(Usuario usuario) {
		String comando = "INSERT INTO usuarios (usuario, senha, email, nome, data_nascimento, data_criacao, permissao) VALUES (?,?,?,?,?,NOW(),?)";
		PreparedStatement p;
		try {
			p = this.conexao.prepareStatement(comando);
			p.setString(1, usuario.getLogin());
			p.setString(2, usuario.getSenha());
			p.setString(3, usuario.getEmail());
			p.setString(4, usuario.getNome());
			p.setString(5, usuario.getNascimento());
			p.setString(6, usuario.getPermissao());
			p.execute();
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public boolean buscarPorLogin(String busca) {
		String comando = "SELECT  FROM usuarios"
			+ " WHERE login = '" + busca + "'";
		try {
			java.sql.Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);
			while (rs.next()) {
				String login  = rs.getString("login");
				if(busca==login) {
					return true;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	public Usuario buscarPorId(String id) {
		String comando = "SELECT * FROM usuarios"
			+ " WHERE id = '" + id + "'";
		Usuario usuario = new Usuario();
		try {
			java.sql.Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);
			while (rs.next()) {
				String login = rs.getString("login");
				String senha = rs.getString("senha");
				String email = rs.getString("email");
				String nome = rs.getString("nome");
				String nascimento = rs.getString("data_nascimento");
				String dataCriacao = rs.getString("data_criacao");
				String permissao = rs.getString("permissao");
				
		        usuario.setLogin(login);
		        usuario.setSenha(senha);
		        usuario.setEmail(email);
		        usuario.setNome(nome);
		        usuario.setNascimento(nascimento);
		        usuario.setDataCriacao(dataCriacao);
		        usuario.setPermissao(permissao);
				
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	return usuario;
	}

	public boolean atualizar(Usuario usuario) {
		String comando = "UPDATE usuarios SET"
				+ " login=?,"
				+ " senha=?,"
				+ " nome=?,"
				+ " nascimento=?,"
				+ " email=?"
				+ " WHERE id=?";
		PreparedStatement p;
		try {
			p = this.conexao.prepareStatement(comando);
			p.setString(3, usuario.getLogin());
			p.setString(2, Criptografia.criptografaSenha(usuario.getSenha()));
			p.setString(3, usuario.getNome());
			p.setString(4, usuario.getNascimento());
			p.setString(5, usuario.getEmail());
			p.setString(6, usuario.getId());
			p.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public boolean deletar(String id) {
		String comando = "DELETE FROM usuarios"
				+ " WHERE id = '" + id +"'";
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
	
	public List<Usuario> buscar(String nivel, String busca) {
		String comando = "SELECT * FROM usuarios ";
		if (!nivel.equals("2") || !busca.equals("")) {
			comando += "WHERE ";
		}
		if(!nivel.equals("2")) {
			comando += "permissao = " + nivel + "";
			if(!busca.equals("")) {
				comando += " AND ";
			}
		}
		if(!busca.equals("")) {
			comando += "(nome LIKE '%" + busca + "%' OR login LIKE '%" + busca + "%' OR email = '" + busca + "%' OR id = '" + busca + "')";
		}
		List<Usuario> listUsuario = new ArrayList<Usuario>();
		Usuario usuario = null;
		try {
			Statement stmt = conexao.createStatement(); 
			ResultSet rs = stmt.executeQuery(comando);
			while (rs.next()) {
				String login = rs.getString("login");
				String senha = rs.getString("senha");
				String email = rs.getString("email");
				String nome = rs.getString("nome");
				String nascimento = rs.getString("data_nascimento");
				String dataCriacao = rs.getString("data_criacao");
				String permissao = rs.getString("permissao");
				
		        usuario.setLogin(login);
		        usuario.setSenha(senha);
		        usuario.setEmail(email);
		        usuario.setNome(nome);
		        usuario.setNascimento(nascimento);
		        usuario.setDataCriacao(dataCriacao);
		        usuario.setPermissao(permissao);
								
				listUsuario.add(usuario);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return listUsuario;
	}
	

}
