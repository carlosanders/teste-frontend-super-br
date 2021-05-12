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
* Correção na árvore de seleção de setores
* Correção para melhorar o desempenho do carregamento de tarefas pela unificação dos eventos com a caixa de entrada
* Correção upload em modo linear inicia automaticamente quando houver apenas um arquivo
* Correção para atualizar etiquetas da tarefa quando movimenta minuta sem encerrar tarefa
* Correção de erro no componente de documento-card-list quando da exclusão de múltiplos documentos

1.2.2

* Correção para nova entrada de menu no módulo pessoa
* Correção para nova entrada de botão no módulo de listar remessas
* Correção para nova entrada de botão no módulo de listar ofícios

1.3.0

* Melhoria Feature criação do grupo de contatos
* Melhoria Feature criação de opção para alterar chave de acesso de processo
* Correção erro ao cadastrar uma tarefa com bloco de responsáveis - issue #268
* Correção de erro ao criar tarefa com bloco de processos - issues #267 #271
* Correção do form de tarefas para tratamento de setores com apenas distribuidor e afastamentos
* Correção form ofícios para salvar dados alterados - issue #266
* Correção para criação de tarefas administrativas para setor de Arquivo
* Correção para salvar dados do editor ao salvar form do documento avulso - issue #266
* Correção o formulário de tarefa não é limpo #270
* Correção download zip #248
* Correção O botão Cancelar ao editar tarefa não faz nada #304
* Correção erro bloco de responsáveis - issue #269
* Correção botão voltar form perfil - issue #263
* Correção erro no cadastramento de processos utilizando opção de "Informar Protocolo Existente" #261
* Correção Contador de caracteres do título contendo valores fixos #259
* Correção Não é possível desclassificar um sigilo de um processo #245
* Correção no componente de pessoas do módulo admin passando para o modo search
* Correção em sidebar de vinculação de pessoa com barramento sendo chamada somente de dentro do módulo admin
* Correção em bugs no dialog de assinatura eletrônica
* Correção de css de separador de volumes no processo-view para ficar igual ao cabeçalho das juntadas
* Correção de bug de não atualização de minutas ao remeter um ofício
* Melhoria Refactoring do login
* Melhoria Criação do cdk-login-form
* Melhoria Criados radio buttons para o tipo de login caso ldap esteja habilitado na configuração do sistema
* Melhoria Mudança de rótulos e títulos de botão caso seja selecionado login interno
* Melhoria Salvar tipo de login selecionado no localstorage
* Melhoria Ao fim do token, exibir um modal de login para que o usuário revalide o seu login sem perder o trabalho atual
* Correção de erro ao tentar selecionar a configuração nup pela lupa
* Correção Distribuidor não consegue distribuir tarefa automaticamente para outros colaboradores do setor #318
* Correção Edição de tarefa em lote não modifica dados do responsável #310
* Correção para exibir erros na criaçao de pastas para tarefas
* Correção a validar sequencial de download parcial zip e pdf #249 #250
* Correção não aparece os botões de salvar/cancelar ao editar vinculação de processo #240
* Correção no erro intermitente ao copiar documentos de um processo para outro #231
* Correção no erro intermitente ao anexar documentos em juntada do processo #229
* Correção ofícios, editar um ofício pela tela de Processos, o botão 'Responder ofício' não gera ação #225
* Correção Somente é possível executar a movimentação em lote 1 vez #317
* Correção Redistribuição de tarefas está mantendo a tarefa para o mesmo usuário no setor #295
* Correção Não é possível selecionar setores de unidades diferentes na distribuição em bloco #297
* Correção Campo Distribuição Automática sendo desmarcado automaticamente quando uma unidade é selecionada #293
* Correção tamanho máximo da Etiqueta #123
* Correção no delete dos critérios de regra de Etiqueta #150
* Correção no gerenciamento de Etiquetas individuais #183
* Correção nas colunas da página de Acompanhamento #185
* Correção nas colunas da página de Remessas #214
* Correção no alinhamento do form de login
* Correção em bug de login em caso de erro na requisição por configurações do sistema
* Correção no texto do Radio de login interno no formulário de login
* Correção Campos desabilitados na redistribuição de tarefas em lote #311
* Correção Erro SQL INSERT ao criar tarefas em bloco #308
* Correção Campo [Espécie de Tarefa] aparece desabilitado na criação de tarefas em bloco #307
* Correção Erro ao adicionar unidades em bloco a partir do botão favoritos #302
* Correção Configuração de setor para Apenas Permitir Distribuidor não está funcionando adequadamente #291
* Correção Erro ao criar tarefas em lote com processo em trâmite #334
* Correção Erro ao remeter um ofício de uma tarefa #344
* Correção Ao clicar em salvar o texto alterado de um ofício de uma tarefa não é salvo #341
* Correção Tarefas, não é possível acessar o menu de ações de uma tarefa após ter um ofício remetido #226
* Correção Ofícios, funcionalidade Remeter Ofício gerando 'Houve um erro indeterminado' #223
* Correção Erro ao selecionar as unidades para criação de ofícios em lote #309
* Correção Lixeira das tarefas, ao restaurar uma tarefa ela é duplicada indefinidamente na lista atual #321
* Correção A ordenação por prazo final não está priorizando aqueles com prazo a vencer #305
* Correção Assessor, esta permitindo 'Compartilhar Tarefa' sem ter esta permissão associada #286
* Correção Não é possível selecionar um setor pela árvore na distribuição quando este possui setores filhos #236
* Correção Remessas, coluna Setor de destino não parece ser parte dos metadados da tela #214
* Correção Coluna Assessor da aba Acompanhamento #185
* Correção Espécies de Relevâncias, não permite remover registros mais mostra as colunas de Apagado Por e Apagado Em #177
* Correção Espécies de Processo, não permite remover registros mais mostra as colunas de Apagado Por e Apagado Em #172
* Correção Erro na remoção de interessados do processo em lote #170
* Correção erro ao acrescentar lembretes em processos no Módulo Arquivista #274
* Correção de erro na paginação das listas de rolagem infinitas
* Correção ativar/desativar templates #97
* Correção erros nos modelos individuais #166
* Correção erro ao remover uma classificação #53
* Correção edição da lotação de um usuário de arquivo #117
* Correção assessores, acessando com perfil 'Administrador' é possível visualizar registros dos outros usuários #283

1.3.1

* Melhoria feature distribuição de tarefas por coordenador através de arrastar e soltar na listagem
* Melhoria no comportamento do arrastar e soltar de tarefas na listagem de tarefas
* Correção Ocultar Coordenação da barra lateral quando usuário possui role de coordenador e nenhum setor/unidade/órgão central
* Correção no CSS do ícone de carregando sobre o botão de operações em segundo plano
* Correção em guardas de rota para evitar múltiplas requisições ao backend nas listagens com scroll infinito
* Correção em componente de operações em segundo plano ao voltar de detalhamento de um lote
* Correção para adotação da fonte Calibri
* Correção nas notas de rodapé do editor de textos
* Correção para mostrar corretamente os contadores das pastas de tarefas
* Melhoria para trazer 2 interessados junto aos assuntos (e label 'e outros...' se houver mais do que 2)
* Melhoria para trazer Observação na lista de colunas configuráveis, ativada por default
* Melhoria para exibir observação de tarefa na listagem, caso exista e filtro esteja ativo
* Correção do CSS do desentranhamento em bloco
* Correção de comportamentos no Componente de autocomplete de modelo no processo-view
* Correção botão editar renomeado pra Criar minuta
* Correção filtro de modelos para o autocomplete no componente atividade-create do tarefa-detail
* Correção filtro aplicado em página de usuário não é desfeito ao sair #255
* Correção não é possível criar/editar/apagar um usuário do setor #159
* Correção inconsistência no campo de filtro de interessados no cadastro de processo #174
* Correção Erro intermitente na distribuição de tarefas em bloco para unidades #300
* Correção Erro ao cadastrar setor da unidade #154
* Correção autocomplete modalidade etiqueta módulo coordenador

1.3.2

* Melhoria na busca de modelos para criação de minuta, permitindo pré-visualização do conteúdo
* Melhoria no grid de modelos para criação de minuta, permitindo pré-visualização do conteúdo
* Refactor completo de módulo de arquivista
* Suportar logo, nome e sigla do sistema por ambiente
* Alteração da nomenclatura Fase e Modalidade da Fase para Idade [SUPERBR-400]

1.4.0

* Correção de bug em placeholder de drag and drop de tarefa perdendo sincronia
* Correçao Adicionando sigla da unidade aos setores na sidebar da listagem de tarefas
* Melhoria Implementação de possiblidade de edição de observação das tarefas dentro da listagem
* Correção bloco de processo criação de ofícios
* Correção botão cancelar ao editar tarefa
* Correção para o scroll de listas em dispositivos móveis
* Correção no carregamento de listas de rolagem infinita (tarefas, processos, juntadas)
* Correção para exibir o filtro de etiquetas e o hamburgues de ações na tarefa em dispositivo mobile
* Correção Uma barra de rolagem aparece por cima de minuta da tarefa #370
* Correção Tarefas, lista de documentos juntados, barra de rolagem impede acesso aos menus de ação dos documentos #361
* Melhoria Implementação de mensagem de confirmação ao fechar o editor com mudanças não salvas
* Correção erro ao apagar em lote as regras de uma etiqueta #126
* Correção colunas do Modelo Nacional não são exibidas #119
* Correção filtros de classificação por datas 'Criado em', 'Atualizado em', 'Apagado em' falhando #110
* Correção inconsistência no campo de filtro de assuntos no cadastro de processo #146
* Correção Não é possível editar processo pela pesquisa #206
* Correção assinatura digital com token dentro do editor de textos
