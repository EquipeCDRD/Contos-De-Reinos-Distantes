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

    @Override
    public boolean inserirPontuacao(Pontuacao pontuacao) {
        List<Pontuacao> listaDePontuacoes = buscarPontuacao(pontuacao.getUsuarioId(), pontuacao.getIdentificadorTabela());
    }

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
            sqlQuery += "WHERE usuariosId=?";

            try {
                //validação da query (serve para evitar SQL Injections(^-^))
                PreparedStatement statement = conexao.prepareStatement(sqlQuery);
                statement.setString(1, usuarioId);
                ResultSet result = statement.executeQuery(sqlQuery);

                //enquanto houver pontuações com a id do usuario...
                while (result.next()) {

                    //Se estiver maior que cinco vai dizer que deu merda
                    if (listaDePontuacoes.size() > 5) {
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
                    String score = result.getString("score");
                    String dataCriacao = pontuacao.dataParaFrontEnd(result.getString("dataCriacao"));
                    //foge dos padrões somente porque já há uma variável com esse nome
                    String idUser = result.getString("usuariosId");

                    //salvamento dos dados no objeto...
                    pontuacao.setId(id);
                    pontuacao.setScore(score);
                    pontuacao.setDataCriacao(dataCriacao);
                    pontuacao.setUsuarioId(idUser);

                    //adição do objeto recém criado à lista de pontuações
                    listaDePontuacoes.add(pontuacao);
                }
            } catch (SQLException e) {
                e.printStackTrace();
                listaDePontuacoes = null;
            }
        }
        if (usuarioId.equals("ranking")) {
            //parei por aqui. Falta um bocado de coisas ainda. 1:42 AM.
            try {
                PreparedStatement statement = conexao.prepareStatement(sqlQuery);
                ResultSet result = statement.executeQuery(sqlQuery);

                /*
                    
                 */
                //Enquanto tiver pontuações...
                while (result.next()) {

                    //Criação de nova instância
                    pontuacao = new Pontuacao();

                    /*
                        Neste array serão salvas as pontuações, que irão, posteriormente, 
                        serem organizadas em ordem decrescente, permitindo assim que seja possível
                        identificar a maior pontuação do jogador em questão e atribuíla ao placar
                     */
                    Integer[] arrayPontuacoes = null;
                    //string que permite identificar a qual usuário a pontuação pertence
                    String idUsuario = result.getString("Usuarios");

                    //for onde são salvas as 5 pontuações
                    for (int i = 0; i < 5; i++) {
                        arrayPontuacoes[i] = Integer.parseInt(result.getString("pontuacoes"));
                    }
                    
                    Arrays.sort(arrayPontuacoes,reverseOrder());

                }

            }
        }

        return listaDePontuacoes;
    }
}
