package br.com.contos.classes;

import java.io.Serializable;

public class LogDeAcesso implements Serializable{
	
private static final long serialVersionUID = 1L;
	
	private String id;
	private String dataCriacao;
	private String usuarioId;
	
	public String getId(){
		return id;
	}
	public void setId(String id){
		this.id = id;
	}

	public String getDataCriacao() {
		return dataCriacao;
	}
	public void setDataCriacao(String dataCriacao) {
		this.dataCriacao = dataCriacao;
	}
	
	public String getUsuarioId() {
		return usuarioId;
	}
	public void setUsuarioId(String usuarioId) {
		this.usuarioId = usuarioId;
	}
	
	public String converteNascimentoParaBD() {
		String[] nascimentoDividido = dataCriacao.split("/");
		String nascimentoConvertido = nascimentoDividido[2] + "-" + nascimentoDividido[1] + "-" + nascimentoDividido[0];
		return nascimentoConvertido;
	}
	
	public String converteNascimentoParaFrontend(String datacriacao) {
		String[] nascimentoDividido = datacriacao.split("-");
		String nascimentoConvertido = nascimentoDividido[2] + "/" + nascimentoDividido[1] + "/" + nascimentoDividido[0];
		return nascimentoConvertido;
	}
	
}
