package br.com.contos.jdbcinterfaces;

import java.util.List;

import br.com.contos.classes.LogDeAcesso;	

public interface LogDeAcessoDAO {

	public boolean inserir(LogDeAcesso log);
	public boolean deletar(String data_criacao);
	public List<LogDeAcesso> buscar();
}
