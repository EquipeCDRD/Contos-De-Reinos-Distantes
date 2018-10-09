package br.com.contos.jdbc;

/*==================Libs do java==================*/
import java.util.ArrayList;
import java.util.List;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

/*==================Pacotes==================*/
import br.com.contos.classes.Pontuacao;
import br.com.contos.jdbcinterfaces.PontuacaoDAO;

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
	public boolean deletarPontuacao(String usuarioId) {
    	
    	//query para deleção de TODAS as pontuações de determinado jogador
    	String sqlQuery = "DELETE FROM pontuacoes WHERE usuarios_id=?";
    	
    	try {
    		PreparedStatement statement = conexao.prepareStatement(sqlQuery);
    		statement.setString(1, usuarioId);
    		statement.execute();
    		
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
    	
    	System.out.println("Tipo de pesquisa de pontuação: "+ identificadorTabela);
    	
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
        	String sqlQuery = "SELECT "+ 
									"pontuacoes.id, "+
									"pontuacoes.data_criacao, "+ 
									"pontuacoes.pontuacao "+ 
								"FROM pontuacoes " + 	
								"WHERE usuarios_id= "+usuarioId+" "+
								"ORDER BY pontuacoes.pontuacao DESC";
			
        	try {
               
                //validação da query (serve para evitar SQL Injections(^-^))
            	Statement statement = conexao.createStatement();
        		ResultSet result = statement.executeQuery(sqlQuery);
               
            	//enquanto houver pontuações com a id do usuario...
                while (result.next()) {

                    //Se estiver maior que cinco vai dizer que deu merda
                    if (listaDePontuacoes.size() > 4) {
                    	//se tiver maior que devia estar, zera todas as pontuações (pode dar ruin? CLARO QUE SIM POURA!)
                    	deletarPontuacao(usuarioId);
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
                    String dataCriacao = result.getString("data_criacao");
                    String posicaoRanking;
                    
                    //chamada do método que encontra a posição do carinha no ranking
                    posicaoRanking = encontraPosicao(usuarioId);
                    
                    //salvamento dos dados no objeto...
                    pontuacao.setId(id);
                    pontuacao.setScore(score);
                    pontuacao.setDataCriacao(dataCriacao);
                    pontuacao.setPosicaoRanking(posicaoRanking);
                    
//                    //Para testes
//        			System.out.println("============pontuacao PESSOAL==========");
//                    System.out.println("\nid: " + pontuacao.getId());
//                    System.out.println("\nscore: " + pontuacao.getScore());
//                    System.out.println("\ndata de criação: " + pontuacao.getDataCriacao());
//                    System.out.println("\nposição no ranking: " + pontuacao.getPosicaoRanking());
                    
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
        		String sqlQuery = "SELECT "+ 
                        "pontuacoes.id, "+ 
                        "usuarios.usuario, "+
                        "pontuacoes.data_criacao,"+ 
                        "pontuacoes.pontuacao "+ 
                    "FROM pontuacoes " +
                    "JOIN usuarios ON pontuacoes.usuarios_id = usuarios.id " + 
                    "GROUP BY pontuacoes.usuarios_id "+ 
                    "HAVING COUNT(pontuacoes.usuarios_id) >= 0 " +
                    "ORDER BY pontuacoes.pontuacao DESC";
        		
        		System.out.println(sqlQuery);
        		Statement statement = conexao.createStatement();
        		ResultSet result = statement.executeQuery(sqlQuery);
        		int i = 0;
        		while(result.next()) {
        			i++;
        			pontuacao = new Pontuacao();
        			
        			//aquisição dos dados...
					String id = result.getString("id");
					String nome = result.getString("usuario");
					String dataCriacao = result.getString("data_criacao");
				    String score = result.getString("pontuacao");
                    String posicaoRanking = ""+i;
                   
                    //salvamento dos dados no objeto...
                    pontuacao.setId(id);
                    pontuacao.setNomeDeUsuario(nome);
                    pontuacao.setDataCriacao(dataCriacao);
                    pontuacao.setScore(score);
                    pontuacao.setPosicaoRanking(posicaoRanking);
                    
                    
                 
//                    //Para testes
//        			System.out.println("============pontuacao==========\n");
//                    System.out.println("id: " + pontuacao.getId());
//                    System.out.println("score: " + pontuacao.getScore());
//                    System.out.println("data de criação: " + pontuacao.getDataCriacao());
//                    System.out.println("posição no ranking: " + pontuacao.getPosicaoRanking());
//                    System.out.println("id do usuário: " + pontuacao.getUsuarioId());
//                 
                   
                    //adição do objeto recém criado à lista de pontuações
                    listaDePontuacoes.add(pontuacao);
        		
        		}
        	}catch(SQLException e) {
        		e.printStackTrace();
        		//se der caca retorna a lista nula
        		listaDePontuacoes = null;
        	}
        }else {
			System.out.println("Deu ruin com o identificador da tabela");
			listaDePontuacoes = null;
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
    //Preciso refazer parte do código (ele não precisa ser tão fudido assim)
    
    private String encontraPosicao(String usuarioId) {
    	
    	//Query para pegar todos as maiores pontuações do banco
		String sqlQuery = "SELECT "+ 
							"pontuacoes.id, "+
							"pontuacoes.usuarios_id, "+ 
							"pontuacoes.pontuacao "+ 
						"FROM pontuacoes " + 	
						"GROUP BY pontuacoes.usuarios_id "+ 
						"ORDER BY pontuacoes.pontuacao DESC";
    	
    	//String onde a posição do jogador no ranking será salva
    	String posicaoRanking = "";
    	
    	try {
        
			PreparedStatement statement = conexao.prepareStatement(sqlQuery);
			statement.execute();
			ResultSet result = statement.executeQuery(sqlQuery);
	        int contador=0;
	        
	        //Enquanto tiver pontuações...
	        while (result.next()) {
	        	
	        	contador++;
	        	Pontuacao pontuacao = new Pontuacao();
	        	
	        	//aquisição dos dados...
				String id = result.getString("id");
                String idUser = result.getString("usuarios_id");
                String score = result.getString("pontuacao");
                
                System.out.println("encontraPosicao");
                System.out.println(" id da pontuação: "+id);
                System.out.println(" id do carinha: "+idUser);
                System.out.println(" pontuacao: "+score);
                
                //salvamento dos dados no objeto...
                pontuacao.setId(id);
                pontuacao.setScore(score);
                pontuacao.setUsuarioId(idUser);
  
                if(usuarioId.equals(idUser)) {
                	posicaoRanking = ""+contador;
                	System.out.println("posição do carinha no ranking: " +posicaoRanking);
                	return posicaoRanking;
                }
                
	        }
	      	        
		} catch(SQLException e) {
        	e.printStackTrace();
        }
    	posicaoRanking = null;
        return posicaoRanking;
   }
}
