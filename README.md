
# Projeto Back-End GeraçãoTech

Este é um projeto back-end da Geração Tech desenvolvido utilizando o Node.Js e ferramentas como o framework Express para manipulação e criação de rotas, e o Sequelize que é um ORM para banco de dados. Esse projeto trata-se da criação de uma API para realizar uma operação de CRUD para gerenciamento de produtos, além da implementação de filtros a parti de parâmetros URL


## Documentação

[Documentação](https://github.com/digitalcollegebr/projeto-backend/)


## Ferramentas Utilizadas

- __Node.js__: para fornecer a possibilidade de executar JS em um servidor.
- __Express.js__: para criar rotas de api.
- __Dotenv__: para criarmos configurações com mais facilidade e segurança.
- __Nodemon__: para termos mais produtividade em nosso ambiente de desenvolvimento.
- __MySQL__: banco de dados relacional
- __Sequelize__: para termos mais produtividade ao lidar com o banco de dados.
- __JWT__: para adicionar segurança e limitar o acesso nas rotas de API.
- __bcrypt__ : Para criar hash das senhas dos usuários.


## Instalação

1. **Clone do Repositório**

```bash
  git clone https://github.com/Marcos-Levy/projeto_back-end_GT.git
```
> Após clonar, entre no diretório do projeto
2. **Instale as Dependências**

```bash
  npm install 
```
3. **Configuração do arquivo `config\database.js` para comunicação com o banco de dados**
## Sincronização com o banco de dados

Após configurar o `config\database.js` com as informações para acesso ao banco de dados , vamos sincronizar o projeto para criação das tabelas e relacionamentos.

```bash
  node syncDB.js
```
> Ao sincronizar, será criado um usuário com email:**`admin@admin.com`** e password:**`admin`**. Esse usuário nos permitira requisitar na rota de login o nosso token, já que inicialmente não temos nenhum usuário cadastrado.

## Executar Projeto
Agora com tudo configurado e sincronizado, vamos executar o projeto.

```
  npm start
```


## Rotas
### Rota Login(Token)
  - Method : **POST**
  - URL : `/api/login/`
  - Body:
  ```json
  {
    "email":"marcos.levy@gmail.com",
    "password": "ma123"
  }
  ```
> Os valores repassados do body devem ser iguais ao usuário cadastrado no banco de dados
> Essa requisição vai retornar um token que será usado no cabeçalho das demais rotas.
### Rotas Usuário
#### 1. Listar Usuários
  - Method : **GET**
  - URL : `/api/users/`
  - Query Params : 
    - `fields`
      - Query string para limitar quais campos serão retornados

#### 2. Listar Usuário pelo ID
  - Method : **GET**
  - URL : `/api/users/:id`

#### 3. Criar Usuário
  - Method : **POST**
  - URL : `/api/users/`
  > Por questões de segurança, no cabeçalho da requisição deve conter o token para que a ação seja realizada.
  - Body:
  ```json
  {
	"firstname": "Marcos",
	"surname":"Araujo",
	"email":"marcos@gmail.com",
	"password":"ma123",
	"confirmPassword": "ma123"
  }
  ```
#### 4. Atualizar Usuário
  - Method : **PUT** 
  - URL : `/api/users/:id`
  > Por questões de segurança, no cabeçalho da requisição deve conter o token para que a ação seja realizada.
  - Body:
  ```json
  {
	"firstname": "Marcos",
	"surname":"Levy",
	"email":"marcos.levy@gmail.com",
  }
  ```
#### 5. Deletar Usuário

  - Method : **DELETE**
  - URL : `/api/users/:id`
  > Por questões de segurança, no cabeçalho da requisição deve conter o token para que a ação seja realizada.

###
### Rotas Categorias
#### 1. Listar Categorias
  - Method : **GET**
  - URL : `/api/categories/`
  - Query Params : 
    - `limit=-1`: 
      - Query string para definir o limit de itens por página
      - Use -1 como valor para buscar todos os itens
    - `page=1`
      - Query string para definir a paginação dos dados retornados
      - Quando limit receber -1 a opção de page não tem nenhum efeito no resultado da busca 
      - Padrão: 1
    - `fields=name,slug`
      - Query string para limitar quais campos serão retornados
    - `use_in_menu=true`
      - Query string para filtrar apenas as categorias que podem aparecer no menu

#### 2. Listar Categoria pelo ID
  - Method : **GET**
  - URL : `/api/categories/:id`

#### 3. Criar Categoria
  - Method : **POST**
  - URL : `/api/categories/`
  > Por questões de segurança, no cabeçalho da requisição deve conter o token para que a ação seja realizada.
  - Body:
  ```json
  {
	"name": "Glasses", 
    "slug": "glasses", 
    "use_in_menu": true
  }
  ```
#### 4. Atualizar Categoria
  - Method : **PUT** 
  - URL : `/api/categories/:id`
  > Por questões de segurança, no cabeçalho da requisição deve conter o token para que a ação seja realizada.
  - Body:
  ```json
  {
	"name": "Cap",
	"slug":"cap",
	
  }
  ```
#### 5. Deletar Categoria

  - Method : **DELETE**
  - URL : `/api/categories/:id`
  > Por questões de segurança, no cabeçalho da requisição deve conter o token para que a ação seja realizada.
###

### Rotas Produtos
#### 1. Listar Produtos
  - Method : **GET**
  - URL : `/api/products/`
  - Query Params : 
    - `limit=30`
      - Query string para definir o limit de itens por página
      - Use `-1` como valor para buscar todos os itens
    - `page`
      - Query string para definir a paginação dos dados retornados
      - Quando `limit` receber `-1` a opção de `page` não tem nenhum efeito no resultado da busca 
      - Padrão: 1
    - `fields=name,images,price`
      - Query string para limitar quais campos serão retornados
    - `match=Tênis`
      - Query string usada para filtrar o resultado de produtos por um termo que combine com o nome ou descrição do produto
    - `category_ids=15,24`
      - Query string usada para filtrar o resultado de produtos pelo ID das categorias
    - `price-range=100-200`
      - Query string para filtrar o resultado de produtos por uma determinada "janela" de preços 
    - `option=GG,PP`
      - Query string para filtrar o resultado de produtos pelo valor das opções disponíveis

#### 2. Listar Categoria pelo ID
  - Method : **GET**
  - URL : `/api/products/:id`

#### 3. Criar Categoria
  - Method : **POST**
  - URL : `/api/products/`
  > Por questões de segurança, no cabeçalho da requisição deve conter o token para que a ação seja realizada.
  - Body:
  ```json
  {
   {
    "enabled": true,
    "name": "Produto 01",
    "slug": "produto-01",
    "stock": 10,
    "description": "Descrição do produto 01",
    "price": 200.00,
    "price_with_discount": 150.00,
	"categories":[1,3,5],
    "images": [ 
      {
        "enable": true,
        "path": "caminho imagem 1"
      },
      {
        "enable": true,
        "path": "caminho imagem 1"
      }
    ],
    "options": [
      {
        "title": "Tamanho",
        "shape": "square",
        "radius": 4,
        "type": "text",
        "values": ["PP", "GG", "M", "P", "G"]
      },
      {
        "title": "Cor",
        "shape": "circle",
        "type": "color",
        "values": ["#000", "#333"]
      }
    ]
  }
  }
  ```
  
     
#### 4. Atualizar Categoria
  - Method : **PUT** 
  - URL : `/api/products/:id`
  > Por questões de segurança, no cabeçalho da requisição deve conter o token para que a ação seja realizada.
  - Body:
  ```json
  {
	  "enable": false,
		"name": "Produto 01",
		"slug": "produto-01",
		"use_in_menu": true,
		"stock": 15,
		"description": "Descrição do produto 01",
		"price": 119.9,
		"price_with_discount": 99.9,
    
  }
  ```
  - **`images`** :
    - Editar imagens de Produtos
    > Para editar deve pegar o `id` gerado da imagem
     ```json
     
       {
	    "images":[
        {
           "id":2,
	       "path": "caminho imagem 1"
        }
      ]
      
     }
    
    ```
    - Deletar imagens de Produtos
    > Para deletar deve pegar o `id` gerado da imagem
     ```json
    
     {
	    "images":[
        {
          "id":2,
          "deleted":true
        }
      ]
      
     }
     
    ```
    - Criar imagens de Produtos
    > Para criar só basta indicar o `path`
     ```json
    
     {
	    "images":[
        {
          	"path":"caminho imagem 2"
        }
      ]
      
     }
    
    ```

  - **`options`**:
    - Editar options de Produtos
    > Para editar deve pegar o `id` gerado da opção
     ```json
       
     {
	    "options":[
        {
           "id":1,
           "radius": 5
           "values":["P", "GG"]
        }
      ]
      
     }
    
    ```
    - Deletar options de Produtos
    > Para deletar deve pegar o `id` gerado da opção
     ```json
    
     {
	    "options":[
        {
          "id":1,
          "deleted":true
        }
      ]
      
     }
    
    ```
    - Criar options de Produtos
    > Para criar só basta indicar os valores
     ```json
     
     {
	    "options":[
        {  
  				"title": "Cor",
				"shape": "circle",
				"radius": 0,
				"type": "color",
				"values": ["#000","#333"]
        }
      ]
      
     }
     
    ```
- **`Categories`** :
    - Inserir categorias em Produtos
    > Para inserir basta informar o id da categoria
     ```json 
    {
	"Categories":[
		{
		"category_id":1
		}
	]	
  }
    
    ```
    - Deletar categorias de Produtos
    > Para deletar deve pegar o `id` gerado da categoria
    ```json
    {
	  "Categories":[
	  {
            "id":1,
            "deleted":true
      }
     ]
    }
    ```
   

#### 5. Deletar Categoria

  - Method : **DELETE**
  - URL : `/api/products/:id`
  > Por questões de segurança, no cabeçalho da requisição deve conter o token para que a ação seja realizada.
###


      
## Suporte

Para suporte, mande um email para marcoslevy99@gmail.com

