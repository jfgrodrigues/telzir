# Telzir

## Resumo:

Serviço WEB de consulta da tarifa de ligações utilizando (ou não) algum dos planos FaleMais da "Telzir", proposto como desafio. Desenvolvido usando a stack MEAN (MongoDB, Express, AngularJS e NodeJS).

## Instalação e testes

São pré-requisitos para instalar e rodar o serviço, ter no host instalado e rodando:

1. NodeJS com npm (https://nodejs.org/en/);

2. MongoDB (https://www.mongodb.com/download-center);

3. As collections 'planos' e 'tarifas' populadas.

Para este último, abra um terminal e use os cmandos na sequência abaixo:

```shell
mongo
use telzir

var tarifas = [{ "origem": "011", "destino": "016", "tarifa": 1.90 }, { "origem": "016", "destino": "011", "tarifa": 2.90 }, { "origem": "011", "destino": "017", "tarifa": 1.70 }, { "origem": "017", "destino": "011", "tarifa": 2.70 }, { "origem": "011", "destino": "018", "tarifa": 0.90 }, { "origem": "018", "destino": "011", "tarifa": 1.90 }]

var planos = [{ "plano" : 30 }, { "plano": 60 }, { "plano": 120 }]

db.tarifas.insertMany(tarifas)
db.planos.insertMany(planos)
```

Com os pré-requisitos atendidos, baixe e instale os pacotes da 'Telzir'.

### Instalação

Abra o console CLI (cmd no Windows) e faça o clone dos arquivos fonte:

```shell
git clone https://github.com/jfgrodrigues/telzir.git
```

Depois de baixar os arquivos fonte, vá para a pasta '/back' do pacote recém-baixado e rode o npm para instalar os pacotes do node:

```shell
cd telzir/back
npm install
```

Instale também os pacotes para fazer os teste, acesse a pasta '/unit_tests' e rode o npm:

```shell
cd unit_tests
npm install
```

### Testes

Para realizar os testes, é necessário iniciar o serviço de backend do 'Telzir', que precisa que o banco (mongodb) esteja rodando. Então, abra mais dois terminais, em um inicie o serviço 'mongod' e em outro o do 'Telzir'. 

(inicializar o banco - digite 'mongod' no terminal)
```shell
mongod
```

(inicializar o serviço do 'Telzir' - vá para a pasta 'telzir/back' e inicialize pelo npm)
```shell
cd telzir/back
npm start
```

Volte ao terminal onde instalou os pacotes de testes e digite o comando 'mocha'. O resultado deve ser parecido com abaixo:

```shell
mocha
```
Resultado:
```shell
√ requisicao origens (125ms)
√ requisicao destinos origem 011
√ requisicao destinos origem 016
√ requisicao destinos origem 017
√ requisicao destinos origem 018
√ requisicao planos
√ requisicao FaleMais mintos dentro do plano
√ requisicao FaleMais mintos excedendo plano
√ requisicao FaleMais - erro - origem inexistente
√ requisicao FaleMais - erro - destino inexistente
√ requisicao FaleMais - erro - plano inexistente
√ requisicao FaleMais - erro - minutos negativos
√ requisicao FaleMais - erro - falta de parametro para a busca

13 passing (309ms)
```

### Front-end

Para rodar o front-end, copie os arquivos da pasta 'front' para a pasta de referência do servidor web e digitar no browser 'localhost'.
