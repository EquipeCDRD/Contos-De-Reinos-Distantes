package br.com.contos.classes;

import java.io.Serializable;

public class Notificacao implements Serializable {

private static final long serialVersionUID = 1L;
	
	private String id;
	private String notificacao;
	private String dataCriacao;
	private String usuarioId;
	
	public String getId(){
		return id;
	}
	
	public void setId(String id){
		this.id = id;
	}
	
	public String getNotificacao() {
		return notificacao;
	}
	public void setNotificacao(String notificacao) {
		this.notificacao = notificacao;
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
	
	
	public String converteCriacaoParaBD() {
		String[] criacaoDividida = dataCriacao.split("/");
		String criacaoConvertida = criacaoDividida[2] + "-" + criacaoDividida[1] + "-" + criacaoDividida[0];
		return criacaoConvertida;
	}
	
	public String converteCriacaoParaFrontend(String datacriacao) {
		String[] criacaoDividida = datacriacao.split("-");
		String criacaoConvertida = criacaoDividida[2] + "/" + criacaoDividida[1] + "/" + criacaoDividida[0];
		return criacaoConvertida;
	}
}
