1.0.1

* Correção na pesquisa de documentos, que estava exigindo o codigo de assinatura digital para usuarios internos
* Correção nas ferramentas que estão na lista de tarefas (editar, ciencia, etc), que quebravam o front
* Upgrade do angular, material, sass e ngrx e outras dependências
* Upgrade do node para 12.20.2 e npm fixado em 6.14.11
* Correção no módulo admin, nos grids que estavam quebrando ao exibir mais colunas
* Correção na módulo admin, criação de espécie de setor não estava funcionando

1.0.2

* Correção de bug no carregamento do processo no módulo do arquivista
* Correçao de bug no módulo do admin ao editar lotação que não permite acessar o atributo arquivista
* Correçao de bug na capa do processo que está sem nup formatado e sem sigla da unidade no setor atual
* Correçao de bug na transformação de textos para o formato titlecase (De, Para)
* Correçao de bug no módulo do admin que na árvore de classificacão não tem o código e não ordena pelo código
* Correçao de bug no módulo do admin que não tem o botão para apagar uma classificação
* Correçao de bug na capa do processo para colocar o código da classificação
* Correçao de bug para mostrar o código da classificação na lista de processos do módulo do arquivista
* Correção de bug para salvar o conteudo do componente digital antes de movimentar o processo com a atividade
* Correção de bug para salvar o conteudo do componente digital do modelo antes de salvar os dados basicos do modelo
* Correção de bug para salvar o conteudo do componente digital do repositorio antes de salvar os dados basicos do repositorio
* Correção de bug no autocomplete de classificação para exibir o código
* Correção de bug com ajustes no layout do form de classificacão
* Correção de bug na edição de processo
* Correção de bug no maximizar o processo no módulo do arquivista

1.1.0

* Feature etiquetas para o coordenador
* Feature destacar na interface quando estiver trabalhando no contexto de um workflow
* Feature suportar abstratamente outros formatos de NUP
* Feature para desfazer a conversão de componente digital html para pdf
* Feature para suportar novos inválidos de NUP gerados erroneamente por outros sistemas
* Feature para o autocomplete do processo suportar NUP e outro numero
* Feature para o autocomplete do setor suportar nome e sigla
* Feature para concluir a assinatura eletrônica clicando no enter
* Correção do botão salvar form unidade
* Correção filtro por observação painel de tarefa
* Correção filtro por processo painel de tarefa
* Correção da busca de processo com número do NUP formatado;
* Correção na alteração de processo na aba Dados básicos;
* Correção para não salvar mudanças no conteudo do componente digital se ele estiver assinado
* Correção na edição de documento avulso trazendo espécie de ofício
* Correção da url de retorno da pesquisa de documentos
* Correção de bug na visualização de processo entrando com a url
* Correção para otimizar a pesquisa de modelos
* Correção de bug na gestão de pessoas no módulo admin
* Correçao da validaçao das tarefas em bloco
* Correção da edição em bloco de tarefas para distribuiçao de tarefas

1.1.1

* Correção de bug na pesquisa de documentos
* Correção de bug na exibição dos contextos de workflow
* Correção de bug ao movimentar ao selecionar um modelo pela segunda vez na mesma sessão
* Correção de bug na edição de pessoa jurídica
* Correção de bug no layout do componente de upload
* Correção de bug para logar no console erros nos guardas de rotas

1.1.2

* Correção de bug no ícone da minuta
* Correção de bug para exibir o numero do documento na lista de juntadas do processo

1.1.3

* Correção de bugs no componente de filtros de datas ao clicar no campo texto
* Correção nos filtros que utilizavam o componente de datas, que abriam o modal ao apertar enter
* Correção na pesquisa de documentos para utilizar corretamente o componente de documentos
* Correção no componente de documentos para retornar para pesquisa corretamente
* Criado componente de sidebar vazio para componente de documento

1.2.0

* Correção a exibição de usuários disponíveis (não afastados) para recebimento de tarefas na criação de um processo na aba de distribuição
* Correção na reordenação de juntadas do processo
* Correção na tela de acompanhamento de processos na configuração
* Correção na redistribuição de tarefas
* Correção na validação de nup existente
* Correção de layout tela de reclassificação em bloco do módulo do arquivista
* Correção no widget do coordenador no painel
* Correção no recarregamento de templates no módulo do administrador
* Correção no módulo de protocolo externo
* Correção em erro no botão de maximizar editor de documentos
* Correção ao salvar uma espécie de setor no módulo do administrador
* Correção para exibir a coluna origem dados no grid de relacionamento pessoal
* Correção no tamanho máximo do campo CEP no formulario do endereço
* Correção no formulário de outros nomes da pessoa
* Correção na paginação das pessoas no modulo admin
* Correção no formulário de tipos de documentos para marcar os campos obrigatórios
* Correção para salvar o conteúdo do template ao salvar o template
* Correção no maximizar o processo quando troca a tela
* Correção na deleção em lote de endereços, documentos identificadores e relacionamento de pessoas
* Correção para exibir corretamente os erros no formulario do assunto no módulo do administrador
* Correção para exibir os erros no cadastro de usuário externo
* Melhoria para permitir a pré-visualização de repositórios antes da sua atualização
* Melhoria para gerar relatório em excel da listagem completa de tarefas de maneira simplificada, a partir da lista
* Melhoria para que o administrador possa transferir tarefas de usuário a ser inativado para coordenação e protocolo
* Melhoria para que o administrador possa transferir processos do setor a ser inativado para protocolo da unidade
* Melhoria para configurar a restrição acesso a processo restritos na distribuição/redistribuição de tarefas
* Melhoria nas pesquisas de processos e de documentos no módulo de pesquisa
* Correção em erro no botão de maximizar editor de documentos
* Correção para que botoes injetados nos form documento avulso e remessa apareçam
* Implementar possibilidade de pesquisar processo no momento de anexar por cópia
* Deletar múltiplos documentos vinculados não funciona em edição de minutas
* Deletar múltiplos documentos vinculados não funciona em edição de ofícios
* Corrigir problema no fechamento de modal de documentos
* Exibir todas as pessoas vinculadas no menu lateral do protocolo externo
* Protocolo-externo só deve aparecer se usuário for validado
* Correção da exibição de autocompletes posteriores na tela de criação de processo externo
* Correção de CSS de gridsearch de estados
* Correção de autocomplete de unidade na tela de protocolo-externo
* Clicar no card de um documento avulso não exibia o conteúdo do componente digital
* Responder ofício não movia o ofício para a caixa de saída
* Assinar uma juntada causava duplicação das juntadas na listagem
* Erro nas setas de navegação de juntadas quando há mais de um componente digital na juntada
* Possibilitar a navegação de múltiplos componentes digitais clicando no tipo de documento na listagem
* Correção de upload de resposta de ofício/complementação de ofício
* Correção de css utilizado na tela de documentos/complementar/responder
* Atualizar etiquetas da tarefa ao incluir minuta/ofício
* Atualizar etiquetas da tarefa ao excluir minuta/ofício
* Correção para exibir as colunas necessárias no grid de vinculacao de processos

1.2.1

* Correção para exibir os erros no salvamento de componente digital dentro do editor
* Correção para permitir a leitura da prefixo nup pelo coordenador e a escrita pelo admin
* Correção na edição no processo ao trocar o processo de trabalho [SUPERBR-203]
* Correção no formulário de criação de unidades [SUPERBR-201]
* Correção ao acessar os setores, lotações, unidades, competencias de uma unidade que foi desativada [SUPERBR-191]
* Correção na visualização dos documentos juntados ao adicionar a coluna "Volume" [SUPERBR-187]
* Correção para retirar a coluna sigla do grid de municipios [SUPERBR-187]
* Correção nos formularios das especies [SUPERBR-178]
* Correção não é possível desativar modelo da unidade e tese [SUPERBR-144]
* Correção colunas do Modelo da Unidade não são exibidos [SUPERBR-142]
* Correção Checkboxes dos itens da tabela Unidade somem [SUPERBR-140]
* Correção na tela de pesquisa de documentos
* Correção filtro de volumes de juntadas no componente processo-view
* Correção separador de volumes na listagem de juntadas do processo-view
* Correção modo linear de upload no componente-digital-card-list
* Correção ordenação de arquivos antes de upload no modo linear
* Correção modo de upload de componentes digitais em locais que necessitam de linearidade - juntadas
* Correção de erro em formulário de vinculação de processos
* Upload em modo linear inicia automaticamente quando houver apenas um arquivo
* Atualizar etiquetas da tarefa quando movimenta minuta sem encerrar tarefa
* Corrigido erro no componente de documento-card-list quando da exclusão de múltiplos documentos
