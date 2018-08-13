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
import br.com.contos.conexao.Conexao;
import br.com.contos.interfaces.PontuacaoDAO;
import java.sql.SQLException;
import static java.util.Collections.reverseOrder;

public class JDBCPontuacaoDAO implements PontuacaoDAO {

    private final Connection conexao;

    public JDBCPontuacaoDAO(Connection conexao) {
        this.conexao = conexao;
    }
    
    /*============================================= inserir pontuacao =======================================================*/
    
    @Override
    public boolean inserirPontuacao(Pontuacao pontuacao) {
        List<Pontuacao> listaDePontuacoes = buscarPontuacao(pontuacao.getUsuarioId(), pontuacao.getIdentificadorTabela());
    }
    
    /*============================================= bucar pontuacao =======================================================*/
    
    //Método responsável pela realização da busca de pontuações salvas no banco
    @Override
    public List<Pontuacao> buscarPontuacao(String usuarioId, String identificadorTabela) {

        //Criação da query que será executada
        String sqlQuery = "SELECT * FROM pontuacoes";

        //Criação da lista de pontuações que será retornada
        List<Pontuacao> listaDePontuacoes = new ArrayList<Pontuacao>();
        //Instanciamento de Pontuacao e nulificação da mesma
        Pontuacao pontuacao = null;

        /*
                No if abaixo é checado o parâmetro de identificação da tabela,
                para então prosseguir mediante ao valor do mesmo
         */
        if (identificadorTabela.equals("pessoal")) {

            //Continuação da query para carregamento da lista de scores pessoais
            sqlQuery += "WHERE usuarios_id=?";

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
                    String idUser = result.getString("usuarios_id");
                    String posicaoRanking;
                    
                    //chamada do método que encontra a posição do carinha no ranking
                    posicaoRanking = encontraPosicao();
                    
                    //salvamento dos dados no objeto...
                    pontuacao.setId(id);
                    pontuacao.setScore(score);
                    pontuacao.setDataCriacao(dataCriacao);
                    pontuacao.setUsuarioId(idUser);
                    pontuacao.setPosicaoRanking(posicaoRanking);

                    //adição do objeto recém criado à lista de pontuações
                    listaDePontuacoes.add(pontuacao);
                }
            
            } catch (SQLException e) {
                e.printStackTrace();
                listaDePontuacoes = null;
            }
        }else if(identificadorTabela.equals("ranking")) {
        	 
        	//declaração da varável que conterá o maior score do jogador, isto é, aqule que irá para o ranking
        	
        	try {
                 //validação da query (serve para evitar SQL Injections(^-^))
                 PreparedStatement statement = conexao.prepareStatement(sqlQuery);
                 statement.setString(1, usuarioId);
                 ResultSet result = statement.executeQuery(sqlQuery);

                 //enquanto houver pontuações...
                 while (result.next()) {
                	 
                     //Se estiver maior que cinco vai dizer que deu merda
                     if (listaDePontuacoes.size() > 4) {
                         throw new SQLException("Deu merda no tamnho da lista."
                                 + "Mais de 5 itens numa lista cujo maximo É 5");
                     }
                   //Yep, eu copiei de econtraPosicao(). Dont u fuging dare judgin me(^-^)
                     /*
 	        		Neste array serão salvas as pontuações, que irão, posteriormente, 
 	        		serem organizadas em ordem decrescente, permitindo assim que seja possível
 	        		identificar a maior pontuação do jogador em questão e atribuí-la ao placar
	 	            */
	 	            Integer[] arrayPontuacoes = new Integer[4]; 
	                     
                     /*
                     Nova instancia de Pontuacao, que ira armazenar os dados individuais de cada
                     score (data de criação, a pontuação em si, etc) conforme necessário no loop.
                     Vale destacar que se a lista estiver com mais de 5 itens é pq deu merda em 
                     algum lugar
                     */
                     pontuacao = new Pontuacao();

                     //aquisição dos dados...
                     String id = result.getString("id");
                     String dataCriacao = pontuacao.dataParaFrontEnd(result.getString("data_criacao"));
                     //foge dos padrões somente porque já há uma variável com esse nome
                     String idUser = result.getString("usuarios_id");
                     String posicaoRanking;
                     String maiorPontuacao;
                     
                     //Yep, eu copiei a copia onde eu falei que havia copado de econtraPosicao(). Dont u fuging dare judgin me, again(^-^)
                     //for onde são salvas as 5 pontuações
                     for (int i = 0; i < 4; i++) {
                         arrayPontuacoes[i] = Integer.parseInt(result.getString("pontuacao"));
                     }
                     
                     //sorting que irá organizar o array em ordem decrescente (portanto, a maior pontuação estará na posição 0)
                     Arrays.sort(arrayPontuacoes,reverseOrder());
                     
                     //passagem da maior pontuacao para variável
                     maiorPontuacao = String.valueOf(arrayPontuacoes[0]);
                     
                     //chamada do método que encontra a posição do carinha no ranking
                     posicaoRanking = encontraPosicao();
                     
                     //passagem dos dados obtidos a um objeto de Pontuacoes
                     pontuacao.setId(id);
                     
                     pontuacao.setScore(maiorPontuacao);//note que está sendo usada a maior pontuação do feladapota
                     
                     pontuacao.setDataCriacao(dataCriacao);
                     pontuacao.setUsuarioId(idUser);//E SE A OPERAÇÂO FOR COM O MESMO CARA? CONDICIONAL P/ NÃO FAZER NADA SE FOR MESMA ID ANTIGA?
                     pontuacao.setPosicaoRanking(posicaoRanking);
                     
                     //adição do objeto recém criado à lista de pontuações
                     listaDePontuacoes.add(pontuacao);
                 }
        
        	}catch(SQLException e) {
        		e.printStackTrace();
        		listaDePontuacoes = null;//NÂO DEVERIA ENVIAR TAMBÉM UM IDENTIFICADOR QUE DEU ERRADO?
        	}
        }
        
       //devolve a lista de pontuações ao método que fez a chamada
        return listaDePontuacoes;
    }
    
    /*=============================================encontraPosicao()=======================================================*/
    
    //Método utilizado para encontrar a posição do carinha no ranking 

    
    private String encontraPosicao() {
    	
    	//Query para pegar todos as pontuações do banco
    	String sqlQuery = "SELECT * FROM pontuacoes";
    	
    	//Nova instância de Pontuação()
    	Pontuacao pontuacao = null;
    	
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
	            
                //Criação de nova instância
                pontuacao = new Pontuacao();

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
            do {
            	if(maiorPontuacao>arrayMaioresPontuacoes[index]) {
            		posicaoRanking = String.valueOf(index+1);
            		 condition = true;
            	}else {
            		index++;
            		condition = false;
            	}
            }while(condition);
            
        } catch(SQLException e) {
        	e.printStackTrace();
        }
        return posicaoRanking;
   }
}
