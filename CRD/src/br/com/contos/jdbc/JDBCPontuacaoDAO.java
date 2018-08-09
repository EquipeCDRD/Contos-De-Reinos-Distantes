package br.com.contos.jdbc;

import java.util.ArrayList;
import java.util.List;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

import br.com.contos.classes.Pontuacao;
import br.com.contos.conexao.Conexao;
import br.com.contos.interfaces.PontuacaoDAO;

public class JDBCPontuacaoDAO implements PontuacaoDAO{
	
	private Connection conexao;
	
	public JDBCPontuacaoDAO(Connection conexao) {
		this.conexao = conexao;
	}
	public boolean inserirPontuacao(Pontuacao pontuacao) {
		
		List<Pontuacao> listaDePontuacoes = buscarPontuacao(pontuacao.getUsuarioId(),pontuacao.getIdentificadorTabela());
	}
	
	public List<Pontuacao> buscarPontuacao(String usuarioId, String identificadorTabela){
		
		String sqlQuery = "SELECT * FROM pontuacoes";
		
		List<Pontuacao> listaDePontuacoes = new ArrayList<Pontuacao>();
		Pontuacao pontuacao = null;
		
		if(identificadorTabela.equals("pessoal")) {
			sqlQuery += "WHERE usuariosId=?";
			try {
				
				Statement statement = conexao.createStatement();
				ResultSet result = statement.executeQuery(sqlQuery);
				
				while(result.next()) {
					
					pontuacao = new Pontuacao();
					
				}
			}
		}
		
	}
}
