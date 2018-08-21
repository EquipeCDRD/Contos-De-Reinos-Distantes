package br.com.contos.jdbc;

import java.util.ArrayList;
import java.util.List;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import br.com.contos.classes.Pontuacao;
import br.com.contos.interfaces.PontuacaoDAO;
import java.sql.SQLException;

public class JDBCPontuacaoDAO implements PontuacaoDAO {

    private final Connection conexao;

    public JDBCPontuacaoDAO(Connection conexao) {
        this.conexao = conexao;
    }
    
    /*=============================================inserirPontuacao()=======================================================*/
    
    //Método responsável pela inserção de novas pontuações
    @Override
    public boolean inserirPontuacao(Pontuacao pontuacao) {
        
		//Query de inserção
    	String sqlQuery = "INSERT INTO pontuacoes (pontuacao, data_criacao, usuarios_id)"
    					+ "VALUES (?, ?, ?)";
    	//para evitar injeções de sql
    	PreparedStatement statement;
    	
    	try {
    		
    		//inserção dos dados no banco
    		statement = conexao.prepareStatement(sqlQuery);	
    		statement.setString(1, pontuacao.getScore());
    		statement.setString(2, pontuacao.getDataCriacao());
    		statement.setString(3, pontuacao.getUsuarioId());
    		statement.execute();
    		
    	}catch(SQLException e){
    		//se der caca...
    		e.printStackTrace();
    		return false;
    	}
    	
    	//senão...
    	return true;
    }
    
    /*=============================================inserirPontuacao()=======================================================*/
    
    //Método responsável pela deleção de pontuações já salvas no banco
    @Override
	public boolean deletarPontuacao(String  usuarioId) {
    	
    	//query para deleção de TODAS as pontuações de determinado jogador
    	String sqlQuery = "DELETE * FROM pontuacoes WHERE usuarios_id=?";
    	//preparedstatement p/ evitar sql injection
    	PreparedStatement statement;
    	
    	try {
    		statement = this.conexao.prepareStatement(sqlQuery);
    		statement.executeQuery();
    	}catch(SQLException e) {
    		//se der merda...
    		e.printStackTrace();
    		return false;
    	}
    	
    	//se der tudo certo...
    	return true;
    }
    
    /*=============================================buscarPontuacao()=======================================================*/
    
    //Método responsável pela realização da busca de pontuações salvas no banco
    @Override
    public List<Pontuacao> buscarPontuacao(String usuarioId, String identificadorTabela) {

        //Criação da lista de pontuações que será retornada
        List<Pontuacao> listaDePontuacoes = new ArrayList<Pontuacao>();
        
        //Instanciamento de Pontuacao e Usuario e nulifica��o das mesmas
        Pontuacao pontuacao = null;
        
        /*
                No if abaixo é checado o parâmetro de identificação da tabela,
                para então prosseguir mediante ao valor do mesmo
         */
        if (identificadorTabela.equals("pessoal")) {
        	
        	//Criação da query que será executada para carregamento da lista de scores pessoais
        	String sqlQuery = "SELECT * FROM pontuacoes "
    						+ "WHERE usuarios_id=? "
    						+ "ORDER BY pontuacao DESC";//ordena os resultados da pesquisa em ordem decrescente
			         
            try {
               
                //validação da query (serve para evitar SQL Injections(^-^))
                PreparedStatement statement = conexao.prepareStatement(sqlQuery);
                statement.setString(1, usuarioId);
                ResultSet result = statement.executeQuery(sqlQuery);

                //enquanto houver pontuações com a id do usuario...
                while (result.next()) {

                    //Se estiver maior que cinco vai dizer que deu merda
                    if (listaDePontuacoes.size() > 4) {
                        throw new SQLException("Deu merda no tamnho da lista."
                                + "Mais de 5 itens numa lista cujo maximo É 5");
                    }
                    
                    /*
                     	Nova instancia de Pontuacao, que ira armazenar os dados individuais de cada
                        score (data de criação, a pontuação em si, etc) conforme necessário no loop.
                        Vale destacar que se a lista estiver com mais de 5 itens é pq deu merda em 
                        algum lugar
                     */
                    pontuacao = new Pontuacao();
                    
                    //aquisição dos dados...
                    String id = result.getString("id");
                    String score = result.getString("pontuacao");
                    String dataCriacao = pontuacao.dataParaFrontEnd(result.getString("data_criacao"));
                    
                    //foge dos padrões somente porque já há uma variável com esse nome
                    String posicaoRanking;
                    
                    //chamada do método que encontra a posição do carinha no ranking
                    posicaoRanking = encontraPosicao();
                    
                    //salvamento dos dados no objeto...
                    pontuacao.setId(id);
                    pontuacao.setScore(score);
                    pontuacao.setDataCriacao(dataCriacao);
                    pontuacao.setPosicaoRanking(posicaoRanking);
                    pontuacao.setUsuarioId(usuarioId);

                    //adição do objeto recém criado à lista de pontuações
                    listaDePontuacoes.add(pontuacao);
                }
            
            } catch (SQLException e) {
                //Printa o stack no console do eblipse
            	e.printStackTrace();
                //Se der caca a lista volta nula
                listaDePontuacoes = null;
            }
        //Se o identificador for para o ranking global...
        }else if(identificadorTabela.equals("ranking")) {
        	  	
        	try {
        		
        		//Se estiver maior que cinco vai dizer que deu merda
                if (listaDePontuacoes.size() > 4) {
                    throw new SQLException("Deu merda no tamnho da lista."
                            + "Mais de 5 itens numa lista cujo maximo É 5");
                }
        		
        		//query que seleciona a maior pontuação   
        		String sqlQuery = "SELECT id, usuarios_id, data_criacao,"
        				 + "MAX(pontuacao) AS pontuacao_ranking FROM pontuacoes"
        				 + "GROUP BY usuarios_id"
        				 + "ORDER BY pontuacao_ranking DESC";
        		PreparedStatement statement = conexao.prepareStatement(sqlQuery);
        		ResultSet result = statement.executeQuery(sqlQuery);
        		
        		while(result.next()) {
        		
        			pontuacao = new Pontuacao();
        			
        			//aquisição dos dados...
                    String id = result.getString("id");
                    String score = result.getString("pontuacao");
                    String dataCriacao = pontuacao.dataParaFrontEnd(result.getString("data_criacao"));
                    //foge dos padrões somente porque já há uma variável com esse nome
                    String idUser = result.getString("usuarios_id");
                    String posicaoRanking;
                    
                    //chamada do método que encontra a posição do carinha no ranking
                    posicaoRanking = encontraPosicao();
                    
                    //salvamento dos dados no objeto...
                    pontuacao.setId(id);
                    pontuacao.setScore(score);
                    pontuacao.setDataCriacao(dataCriacao);
                    pontuacao.setPosicaoRanking(posicaoRanking);
                    pontuacao.setUsuarioId(idUser);

                    //adição do objeto recém criado à lista de pontuações
                    listaDePontuacoes.add(pontuacao);
        		
        		}
        	}catch(SQLException e) {
        		e.printStackTrace();
        		//se der caca retorna a lista nula
        		listaDePontuacoes = null;
        	}
        }
        
       //devolve a lista de pontuações ao método que fez a chamada ( UMA LISTA != DE null )
        return listaDePontuacoes;
    }
    
    /*=============================================inserirPontuacao()=======================================================*/
    
    //Método responsável pela alteração dos scores do jogador
	@Override
	public boolean alterarPontuacao(Pontuacao pontuacao, List<Pontuacao> listaDePontuacoes) {
		
		/*
		 *	Loop onde serão verificadas as pontuações recebidas como parâmetro novamente, substituindo a pontuação
		 *	ultrapassada pela nova 
		 */
		
		for(int i=0; i>4; i++) {
			
			//checa qual pontuação deve ser substituída
			if(Integer.parseInt(pontuacao.getScore())>Integer.parseInt(listaDePontuacoes.get(i).getScore())) {
				
				try {
					
					//criação da query de atualização da pontuação 
					String sqlQuery = "UPDATE pontuacoes SET pontuacao=?, "
									+ "data_criacao=?, usuarios_id=? WHERE id=?";
					
					PreparedStatement statement = conexao.prepareStatement(sqlQuery);
					
					statement.setString(1, pontuacao.getScore());
					statement.setString(2, pontuacao.getDataCriacao());
					statement.setString(2, pontuacao.getUsuarioId());
					//id da linha que deve ser alterada
					statement.setString(4, listaDePontuacoes.get(i).getId());
					statement.executeUpdate();
					
				}catch(SQLException e) {
					e.printStackTrace();
					//se der algum problema volta falso
					return false;
				}
			}
		}
		
		//e se foi tudo de buenas, volta true
		return true;
		
	}
	
    /*=============================================encontraPosicao()=======================================================*/
    
    //Método utilizado para encontrar a posição do carinha no ranking
    private String encontraPosicao() {
    	
    	//Query para pegar todos as pontuações do banco
    	String sqlQuery = "SELECT MAX(pontuacao) AS pontuacao_ranking FROM pontuacoes "
    					+ "GROUP BY usuarios_id"
    					+ "ORDER BY pontuacao_ranking DESC";
    	
    	//String onde a posição do jogador no ranking será salva
    	String posicaoRanking = "";
    	
    	//indice do array
    	int index=0;
    	
    	//Var onde será salva a maior pontução do carinha, que então poderá se usada para determinar sua posição no ranking
    	int[] maiorPontuacao = new int[index];
    	
    	List<Pontuacao> listaDePontuacoes = new ArrayList<Pontuacao>();
		try {
        
	    	PreparedStatement statement = conexao.prepareStatement(sqlQuery);
	        ResultSet result = statement.executeQuery(sqlQuery);
	        
	        
	        //Enquanto tiver pontuações...
	        while (result.next()) {
	        	
	        	Pontuacao pontuacao = new Pontuacao();
	        	
	        	//aquisição dos dados...
                String id = result.getString("id");
                String score = result.getString("pontuacao");
                String idUser = result.getString("usuarios_id");
                
                //salvamento dos dados no objeto...
                pontuacao.setId(id);
                pontuacao.setScore(score);
                pontuacao.setUsuarioId(idUser);
                
                //adiciona o objeto à listaDePontuacoes
                listaDePontuacoes.add(pontuacao);
                
                //salva a pontuacao num array que servirá como referencial
                maiorPontuacao[index] = Integer.parseInt(score);
                index++;
	        }
	        
	        /*
	         * 	Loop onde são checadas as pontuações do jogador comparando as mesmas com o
	         * 	array de referência
	         */
	        
	        //condição para o loop abaixo 
	        Boolean condition = true;
	        //index da lista
	        int iLista = 0;
	        
	        //enquanto for verdadeiro 
	        while(condition) {
	        	
	        	//para cada item da lista de pontuação
	        	for(int i=0; i>listaDePontuacoes.size();i++) {
		        	/*
	        		 * 	comparação de todas as pontuações do array de referência 
	        		 * 	com a do objeto de pontuação em questão. Se a pontuação do
	        		 * 	objeto for a mesma do array de referência, a contadora do for
	        		 * 	é usada para indicar a posição do feladapota no ranking   
	        		 */
		        	if(maiorPontuacao[i]==(Integer.parseInt(listaDePontuacoes.get(iLista).getScore()))){
		        		posicaoRanking = String.valueOf(i+1);
		        		condition = false;
		        	}else {
		        		iLista++;
		        	}
		        	
		        }
	        }
	        
	        
		} catch(SQLException e) {
        	e.printStackTrace();
        }
        return posicaoRanking;
   }

	
}
