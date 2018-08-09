package br.com.contos.jdbcinterfaces;

import java.util.List;

import br.com.contos.classes.LogDeAcesso;	

public interface LogDeAcessoDAO {

	public boolean inserir(LogDeAcesso log);
	public boolean deletar(LogDeAcesso log);
	public List<LogDeAcesso> buscar(String busca);
}
