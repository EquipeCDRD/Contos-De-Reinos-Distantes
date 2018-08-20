package br.com.contos.jdbcinterfaces;

import java.util.List;
import br.com.contos.classes.Pontuacao;

public interface PontuacaoDAO {
	public boolean inserirPontuacao(Pontuacao pontuacao, List<Pontuacao> listaDePontuacao);
	public List<Pontuacao> buscarPontuacao(String usarioId, String identificador);
	public boolean deletarPontuacao(int pontuacao, int usuarioId);
	boolean alterarPontuacao(Pontuacao pontuacao, List<Pontuacao> listaDePontuacoes);
}
