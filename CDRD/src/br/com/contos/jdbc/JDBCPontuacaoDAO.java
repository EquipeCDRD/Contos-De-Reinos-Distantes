package br.com.contos.jdbc;

import java.util.ArrayList;
import java.util.List;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Arrays;
import java.util.Collection;

import br.com.contos.classes.Pontuacao;
import br.com.contos.classes.Usuario;
import br.com.contos.conexao.Conexao;
import br.com.contos.interfaces.PontuacaoDAO;
import java.sql.SQLException;
import static java.util.Collections.reverseOrder;

public class JDBCPontuacaoDAO implements PontuacaoDAO {

    private final Connection conexao;

    public JDBCPontuacaoDAO(Connection conexao) {
        this.conexao = conexao;
    }
    
    /*=============================================inserirPontuacao()=======================================================*/
    
    //Método responsável pela inserção de novas pontuações
    @Override
    public boolean inserirPontuacao(Pontuacao pontuacao, List<Pontuacao> listaDePontuacoes) {
        
    	/*
    	 * 	Loop onde as pontuações da lista serão checadas novamente as potuações recebidas,
    	 * 	e um if é responsável pela identificação da posição onde pontuacao==0, e então a mesma
    	 * 	será sobescrita 
    	 */
    	for(int i=0; i>4; i++) {
    		
    		//Insere a nova pontuação onde o campo de pontuações é == 0
        	if((Integer.parseInt(listaDePontuacoes.get(i).getScore()))==0){
        		
        		//Criação da query de inserção
        		String sqlQuery = "INSERT * INTO pontuacoes (pontuacao, data_criacao, usuarios_id)"
        						+ "VALUES (?,?,?) WHERE id=?";
        		
        		try {
        		
        			PreparedStatement statement = conexao.prepareStatement(sqlQuery);
            		statement.setString(1,pontuacao.getScore());
            		statement.setString(2,pontuacao.getDataCriacao());
            		statement.setString(3,pontuacao.getUsuarioId());
            		//pega a id da pontuação achada, especificando o local para substituição
            		statement.setString(1,listaDePontuacoes.get(i).getId());
            		
            		ResultSet result = statement.executeQuery(sqlQuery);
        		
        		}catch(SQLException e) {
        		
        			e.printStackTrace();
        			return false;
        		
        		}
        	}
    	}
    	
    	
    }
    
    /*=============================================inserirPontuacao()=======================================================*/
    
    //Método responsável pela deleção de pontuações já salvas no banco
    @Override
	public boolean deletarPontuacao(int pontuacao, int usuarioId) {
		
		return false;
	}
    
    /*=============================================buscarPontuacao()=======================================================*/
    
    //Método responsável pela realização da busca de pontuações salvas no banco (FEITO)
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
        	 
        	 //Query que cria o ranking
        	 String sqlQuery = "SELECT MAX(pontuacao) AS posicao_jogador, usuarios_id, data_criacao"
        	 				 + "GROUP BY pontuacao ORDER BY pontuacao DESC";
        	 
        	 try{
        	 
        	 PreparedStatement statement = conexao.prepareStatement(sqlQuery);
             statement.setString(1, usuarioId);
             ResultSet result = statement.executeQuery(sqlQuery);
        	 
        	 while(result.next()){
        	 
        	 	String posicaoRanking = result.getString("posicao_jogador");
        	 	String loginUsuario = result.getString("usuarios_id");
        	 	String dataCriacao = result.getString("data_criacao");	
        	 	
        	 }
        	 
        	 }catch(SQLException e){
        	 
        	 e.printStackTrace();
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
					String sqlQuery = "UPDATE pontuacoes SET pontuacao=?, data_criacao=?, usuarios_id=? WHERE id=?";
					
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
    	String sqlQuery = "SELECT * FROM pontuacoes";
    	
    	//String onde a posição do jogador no ranking será salva
    	String posicaoRanking = "";
    	
    	//String onde será salva a maior pontução do carinha, que então poderá se usada para determinar sua posição no ranking
    	int maiorPontuacao = 0;
    	
    	//Array int com as maiores pontuações e seu index 
    	int index = 0;
    	Integer[] arrayMaioresPontuacoes = new Integer[index];
    
    	try {
            
        	PreparedStatement statement = conexao.prepareStatement(sqlQuery);
            ResultSet result = statement.executeQuery(sqlQuery);
            
            
            //Enquanto tiver pontuações...
            while (result.next()) {
            	
	            /*
	        		Neste array serão salvas as pontuações, que irão, posteriormente, 
	        		serem organizadas em ordem decrescente, permitindo assim que seja possível
	        		identificar a maior pontuação do jogador em questão e atribuí-la ao placar
	            */
	            Integer[] arrayPontuacoes = new Integer[4];
	            
                //for onde são salvas as 5 pontuações
                for (int i = 0; i < 4; i++) {
                    arrayPontuacoes[i] = Integer.parseInt(result.getString("pontuacao"));
                }
                
                //sorting que irá organizar o array em ordem decrescente (portanto, a maior pontuação estará na posição 0)
                Arrays.sort(arrayPontuacoes,reverseOrder());
                
                //passagem da maior pontuacao para variável
                maiorPontuacao = arrayPontuacoes[0];
                
                /*
                 * Atribuição da maior pontuação do jogador ao array de maiores pontuações, assim como 
                 * a sua organição em ordem decrescente e incremento de seu index 
                 */
                arrayMaioresPontuacoes[index] = maiorPontuacao;
                Arrays.sort(arrayMaioresPontuacoes,reverseOrder());
                index++;
            }
            
            //loop para checagem da posição do player
            Boolean condition = true;
            while(condition){
            	if(maiorPontuacao>arrayMaioresPontuacoes[index]) {
            		posicaoRanking = String.valueOf(index+1);//pq arrays começam em zero
            		 condition = true;
            	}else {
            		index++;
            		condition = false;
            	}
            }
            
        } catch(SQLException e) {
        	e.printStackTrace();
        }
        return posicaoRanking;
   }

	
}
