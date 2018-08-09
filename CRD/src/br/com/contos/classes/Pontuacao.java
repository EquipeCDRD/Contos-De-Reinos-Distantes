package br.com.contos.classes;

import java.io.Serializable;

public class Pontuacao implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private int pontuacao;
	private String dataCriacao;
	private int usuarioId;
	
	/*===================== getters =====================*/
	
	public int getPontuacao() {
		return pontuacao;
	}
	
	public String getDataCriacao() {
		return dataCriacao;
	}
	
	public int getUsuariosId() {
		return usuarioId;
	}
	
	/*===================== setters =====================*/
	
	public void setPontuacao(int pontuacao) {
		this.pontuacao = pontuacao;
	}
	
	public void setDataCriacao(String dataCriacao) {
		this.dataCriacao = dataCriacao;
	}
	
	public void setUsuarioId(int usuarioId) {
		this.usuarioId = usuarioId;
	}
	
	/*===================== conversão de datas =====================*/
	
	public String dataParaDB(){
		String[] dataDividida = dataCriacao.split("/");
		String dataParaDB = dataDividida[2]+"-"+dataDividida[1]+"-"+dataDividida[0];
		return dataParaDB;
	}
	
	public String dataParaFrontEnd() {
		String[] dataDividida = dataCriacao.split("-");
		String dataParaFrontEnd = dataDividida[2]+"/"+dataDividida[1]+"/"+dataDividida[0];
		return dataParaFrontEnd;
	}
}
