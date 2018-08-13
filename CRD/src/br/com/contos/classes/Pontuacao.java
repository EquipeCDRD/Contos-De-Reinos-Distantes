package br.com.contos.classes;

import java.io.Serializable;

public class Pontuacao implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	//atributos que representam as colunas da tabela de pontuacoes
	private String id;
	private String score;
	private String dataCriacao;
	private String usuarioId;
	/*
	 * O identificador irá indicar para qual formulário a pontuação deverá ser enviada 
	 * (um set completo das melhores pontuações dos melhores usuario e/ou o score pessoal,
	 * composto de 5 puntuações recorde do jogador
	 * 	
	 * Os possíveis valores são:
	 * 	
	 * 	pessoal - carrega os 5 maiores escores PESSOAIS do jogador, no quarto da teverna
	 * 
	 * 	ranking - carrega o MELHOR escore dentre os 5 scores pessoais do jogador,
	 * 	e repete a operação para TODOS os jogadores cadastrados
	 */
	private String identificadorTabela;
	/*
	 * A posicaoRanking irá armazenar a posição do carinha no ranking
	 */
	private String posicaoRanking;
	
	/*===================== getters =====================*/
	public String getId() {
		return id;
	}
	public String getScore() {
		return score;
	}
	
	public String getDataCriacao() {
		return dataCriacao;
	}
	
	public String getUsuarioId() {
		return usuarioId;
	}
	
	public String getIdentificadorTabela() {
		return identificadorTabela;
	}
	/*===================== setters =====================*/
	public void setId(String id) {
		this.id = id;
	}
	
	public void setScore(String Sscore) {
		this.score = score;
	}
	
	public void setDataCriacao(String dataCriacao) {
		this.dataCriacao = dataCriacao;
	}
	
	public void setUsuarioId(String usuarioId) {
		this.usuarioId = usuarioId;
	}
	
	public void setIdentificadorTabela(String identificadorTabela) {
		this.identificadorTabela = identificadorTabela;
	}
	
	/*===================== convers�o de datas =====================*/
	public String dataParaDB(String dataCriacao){
		String[] dataDividida = dataCriacao.split("/");
		String dataParaDB = dataDividida[2]+"-"+dataDividida[1]+"-"+dataDividida[0];
		return dataParaDB;
	}
	
	public String dataParaFrontEnd(String dataCriacao) {
		String[] dataDividida = dataCriacao.split("-");
		String dataParaFrontEnd = dataDividida[2]+"/"+dataDividida[1]+"/"+dataDividida[0];
		return dataParaFrontEnd;
	}
	
}
