package br.com.contos.interfaces;

import java.util.List;
import br.com.contos.classes.Pontuacao;

public interface PontuacaoDAO {
	public boolean inserirPontuacao(Pontuacao pontuacao);
	public boolean alterarPontuacao(Pontuacao pontuacao);
	public List<Pontuacao> buscarPontuacao(String usarioId, String identificador);
	public boolean deletarPontuacao(int pontuacao, int usuarioId);
}
