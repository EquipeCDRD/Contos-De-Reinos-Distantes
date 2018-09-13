package br.com.contos.jdbcinterfaces;

import java.util.List;

import br.com.contos.classes.Notificacao;

public interface NotificacaoDAO {
	
	public boolean inserir(Notificacao notificacao);
	public boolean alterar(Notificacao notificacao);
	public boolean deletar(String notificacao);
	public List<Notificacao> buscar();
}
