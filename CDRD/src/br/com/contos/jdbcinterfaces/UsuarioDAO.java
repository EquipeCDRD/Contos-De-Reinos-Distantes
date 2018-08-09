package br.com.contos.jdbcinterfaces;

import java.util.List;

import br.com.contos.classes.Usuario;

public interface UsuarioDAO {

	public boolean inserir(Usuario usuario);
	public Usuario buscarPorId(String id);
	public boolean atualizar(Usuario usuario);
	public boolean deletar(String usuario);
	public List<Usuario> buscar(String nivel, String busca);

}
