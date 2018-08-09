package br.com.contos.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import br.com.contos.classes.Usuario;
import br.com.contos.jdbcinterfaces.UsuarioDAO;

public class JDBCUsuarioDAO implements UsuarioDAO{

	private Connection conexao;

	public JDBCUsuarioDAO(Connection conexao) {
		this.conexao = conexao;
	}
	
	public boolean inserir(Usuario usuario) {
		String comando = "INSERT INTO usuarios (usuario, senha, email, nome, data_nascimento, data_criacao, permissao) VALUES (?,?,?,?,?,?,?)";
		PreparedStatement p;
		try {
			p = this.conexao.prepareStatement(comando);
			p.setString(1, usuario.getLogin());
			p.setString(2, usuario.getSenha());
			p.setString(3, usuario.getEmail());
			p.setString(4, usuario.getNome());
			p.setString(5, usuario.getNascimento());
			p.setString(6, LocalDate.now());
			p.setString(7, usuario.getPermissao());
			p.execute();
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public Usuario buscarPorLogin(String login) {
		// TODO Auto-generated method stub
		return null;
	}

	public boolean atualizar(Usuario usuario) {
		// TODO Auto-generated method stub
		return false;
	}

	public boolean deletar(String usuario) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public List<Usuario> buscar(String nivel, String busca) {
		// TODO Auto-generated method stub
		return null;
	}

}
