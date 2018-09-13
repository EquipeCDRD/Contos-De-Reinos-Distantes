package br.com.contos.jdbcinterfaces;

import java.util.List;

import br.com.contos.classes.Usuario;

public interface UsuarioDAO {

	public boolean inserir(Usuario usuario);
	public Usuario buscarPorValor(String valor, String tipo);
	public boolean atualizar(Usuario usuario);
	public boolean deletar(String usuario);
	public List<Usuario> buscar(String nivel, String busca);

}
