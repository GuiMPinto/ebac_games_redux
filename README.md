# FAZENDO TESTES COM JEST e REDUX

## CONFIGURAÇÂO INICIAL 
Fazemos um Fork do projeto EBAC_GAMES_REDUX do Gian

* git fetch origin
Comando antes de baixar um commit ou branch do repositório

* git checkout com_redux
Usado logo apos do comando 'git fetch origin' baixa neste caso a branch 'com_redux'.

Começaremos criando um teste para o <HEAD></HEAD> que se encontra dentro da pasta 'components'.
Usualmente para fazer testes criamos no mesmo nível de herarquía uma pasta __tests__.
Escrito desta forma o VS Code cria um ícone caracteristico para indicar que esta pasta
se trata de teste(s).

Dentro da pasta __tests__ criamos o documento 'Head.test.tsx'. Detalhes deste documento,
consulte os comentários deste.

Dentro do arquivo de tetes, Head.test.tsx ao testar algo dentro da aplicação deve-se colocar
a tag <Provider store={store}></Provider>, dentro do escopo do render.

Para Jest test funcionar devemos criar um documento src/setupTests.ts, nele importaremos a
biblioteca de teste que lê o dom do html.

Em seguida verificamos se tem erro com o comando:
'npm run test'

Testaremos agora a tag<nav></nav> que possue o carrinho de compras. Verricaremos se o carrinho
esta preenchido para isso temos que manipular o documento store/reducers/carrinho.ts. Pois
vamos adicionar dois itens pois não tem nenhum de inicio. Criaremos uma pasta utils para fazer
alguns testes. A pasta utils é criada de forma convencional para abrigar funções que são
usadas recorrentes como funções de testes e de data e hora.

