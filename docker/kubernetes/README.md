# AMBIENTE KUBERNETES

Instalação do ambiente PROD rancher-kubernetes

Se estiver subindo o prod em ambiente local, para testes:

adicionar a entrada no /etc/hosts
127.0.0.1       suppfrontend

No ambiente real, será necessário editar o arquivo src/environments/enviroment.prod.ts

e trocar http://suppbackend:8000/ pelo endereço real do backend

O backend estará disponível em http://suppfront:4200

1) ANTES DE INICIAR CONSTRUA AS IMAGENS DE PROD:

 - sudo docker-compose build angular-prod

** O supp-base irá conter toda instalação de ferramentas e arquivos estáticos
** O supp-prod utiliza a imagem supp-base para complementar a imagem com a aplicação
** e configurações de ambiente
 
2) CRIE UM REGISTRY LOCAL PARA AS IMAGENS CONSTRUÍDAS:

 - sudo docker run -d -p 5000:5000 --name registry registry
 
 PS. se precisar deletar o registro:
 
 sudo docker container stop registry && sudo docker container rm -v registry
 
3) SUBA PARA O REGISTRY AS IMAGENS CONSTRUÍDAS A PARTIR DE DOCKERFILES:

 - sudo docker tag supp-administrativo-frontend_angular-prod:latest localhost:5000/angular-prod
 
 - sudo docker push localhost:5000/angular-prod
 
--- OS PASSOS A SEGUIR APENAS SE NÃO TIVER SIDO FEITO PARA O BACKEND AINDA ---

4) SUBA O RANCHER:
     ** Necessário a instalação do kubectl para os próximos passos
  
 - sudo docker run -d --restart=unless-stopped -p 8080:80 -p 8443:443 rancher/rancher

5) ACESSE O RANCHER https://localhost:8443

6) ADICIONE UM CLUSTER
    Cluster Custom
    Selecione: *etcd *control plane *worker
    
 - Execute o comando proposto no terminal, o rancher irá construir todo cluster Kubernetes    

7) APÓS O PROVISIONAMENTO DO CLUSTER PELO RANCHER NA TELA DO DASHBOARD CLIQUE EM KUBECONFIG FILE

8) COPIE O CONTEÚDO PARA ~/.kube/config

9) CRIA O AMBIENTE

kubectl apply -f docker/kubernetes/angular-prod.yaml --namespace=angular-nginx