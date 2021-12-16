# Aplicação Super/Supp (supp-frontend-administrativo)

## Versionamento
O ciclo de versionamento da aplicação segue a convenção abaixo. A versão é definida no ``composer.json`` e será utilizada para build e provisionamento dos artefatos pelas pipelines de CI/CD.

| Fase                            | Versão            | Exemplo   |
|---------------------------------|-------------------|-----------|
| Desenvolvimento (``develop``)       | ``<version>-dev`` | 1.6.13-dev |
| Homologação (``staging``)           | ``<version>-rc``  | 1.6.12-rc  |
| Executando em produção (``master``) | ``<version>``     | 1.6.11    |


1. Enquanto a aplicação está no ciclo de desenvolvimento (brancho develop/feature/issues...) dentro a versão deve ser mantida com o sufixo ``dev``. As branchs de features, issues e similares devem ao final serem mergeadas na develop.

2. Quando a versão for fechada e liberada para avaliação do PO, deve-se mudar para o sufixo ``rc`` e aplicar o merge da develop para a branch staging. Após o merge, é importante incrementar a versão e voltar a versão para ``dev`` na branch develop. Sempre deixar a develop com a próxima release "aberta".

3. Quando for gerada uma nova versão para produção, deve-se ``remover o sufixo``, aplicar o merge na branch master e **criar a tag** correspondente à versão ``vX.Y.Z ou X.Y.Z``. Um boa prática é sempre deixar a develop como "próxima release em aberto". Por exemplo, se acabou de liberar a versão 1.6.12-rc em staging, já deixa a versão 1.6.13-dev em develop aberta versionada. 

Pode acontecer de uma versão ``rc`` não ser aprovada pelo PO. Neste caso deve-se continuar incrementando a versão. Não "voltar" a versão para dev.


## Instalação do ambiente dev no docker

****** Instalação no ubuntu 20.04 **************

- git clone https://gitlab.agu.gov.br/supp-core/supp-frontend-administrativo.git

- sudo apt-get update
- sudo apt-get install docker.io
- sudo apt-get install docker-compose

Dentro do diretorio supp-frontend-administrativo:

1) sudo docker-compose up angular-dev

2) Server disponível em localhost:4200

3) Usuário de login: joao.admin@teste.com:Agu123456 ou 00000000004:Agu123456 (Demais usuários veja ```LoadUsuarioData.php``` do https://gitlab.agu.gov.br/supp-core/supp-backend-administrativo.git)


*Para rodar os testes:* 

docker-compose exec angular-dev npm test

Server de teste disponivel em localhost:9876


# CI/CD deste módulo

## O que mudou para coloca-lo na esteira?
1) Criado o arquivo Jenkinsfile que descreve os passos da esteira
2) Adicionado sufixo DEV ou RC na versão para informar que é uma versão não fechada, passando a ser 1.7.1-dev (develop) ou 1.7.0-rc (staging) por exemplo, no ``package.json``
3) Alterado o arquivo ```environment.prod.ts``` para se adaptar às nova convenção de URLs com namespace... sapiens-int, sapien-homol...
4) Atualizado os scripts de build do ```package.json```, ajustando para --configuration production
