package br.com.contos.jdbcinterfaces;

import java.util.List;

import br.com.contos.classes.Notificacao;

public interface NotificacaoDAO {
	
	public boolean inserir(Notificacao notificacao);
	public boolean atualizar(Notificacao notificacao);
	public boolean deletar(Notificacao notificacao);
	public List<Notificacao> buscar(String busca);
}
