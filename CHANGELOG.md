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
* Correçao adicionando sigla da unidade aos setores na sidebar da listagem de tarefas
* Melhoria implementação de possiblidade de edição de observação das tarefas dentro da listagem
* Correção bloco de processo criação de ofícios
* Correção botão cancelar ao editar tarefa
* Correção para o scroll de listas em dispositivos móveis
* Correção no carregamento de listas de rolagem infinita (tarefas, processos, juntadas)
* Correção para exibir o filtro de etiquetas e o hamburgues de ações na tarefa em dispositivo mobile
* Correção uma barra de rolagem aparece por cima de minuta da tarefa #370
* Correção tarefas, lista de documentos juntados, barra de rolagem impede acesso aos menus de ação dos documentos #361
* Melhoria Implementação de mensagem de confirmação ao fechar o editor com mudanças não salvas
* Correção erro ao apagar em lote as regras de uma etiqueta #126
* Correção colunas do Modelo Nacional não são exibidas #119
* Correção filtros de classificação por datas 'Criado em', 'Atualizado em', 'Apagado em' falhando #110
* Correção inconsistência no campo de filtro de assuntos no cadastro de processo #146
* Correção não é possível editar processo pela pesquisa #206
* Correção assinatura digital com token dentro do editor de textos
* Correção filtrar por "Criado em" de Volumes do Processo pede data/hora #218
* Correção campos padrões da espécie de processo não estão sendo preenchidos automaticamente #260
* Correção assessor, com permissão de 'Criar ofício' marcada, não consegue criar ofício na tarefa do outro usuário #284
* Correção assessor com perfil normal de Usuário não vê o menu de Tarefas #289
* Correção assinaturas, remover assinatura deixa a tela carregando e não completa #362
* Correção editor, alterações somente de aparência/formatação não são reconhecidas pelo editor #374
* Correção erro ao incluir lotação em usuário: sistema não permite a digitação da Unidade #438
* Correção erro ao vincular/apensar processos #393
* Correção erro ao tentar fechar um alerta #388
* Correção campo adicionar etiqueta permite usuários criarem inúmeras tarefas com mesmo nome #306
* Correção o botão Cancelar ao editar tarefa não faz nada #304
* Correção colunas "Setor Responsável" e "Unidade" vazios na listagem de processos para vinculação #189
* Correção erro ao fazer Download de um processo em ZIP/PDF #248
* Correção de filtro aplicado em página de usuário não é desfeito ao sair #255
* Correção depois que é clicado em "Criar Tarefa" de uma tarefa não é possível abrir o formulário de "Criar Tarefa" novamente #333
* Correção favoritos não funciona corretamente no na página de redistribuição da tarefa #296
* Correção erro ao usar bloco de processos para criar ofício de uma tarefa #338
* Correção no widget de historico do painel
* Melhoria para deixar opção de login mais amigável
* Correção ao criar tarefas em bloco de responsáveis dá erro mas finaliza a criação #390
* Correção ao criar tarefas com bloco de processos dá erro mas finaliza a criação #391
* Correção quebra de linhas muito extensas no feeds
* Correção filtro de modelos por nome
* Correção filtro de teses
* Correção validar fechamento de tarefa com oficio não remetido
* Melhoria Botao editar minuta em outra aba
* Melhoria confirmar fechamento do editor para salvar alterações
* Melhoria edição de observacao simplificada na tarefa
* Melhoria atalho para acompanhar e retirar acompanhamento de processo na movimentação.
* Melhoria tornar etiqueta de minuta clicavel
* Melhoria Abrir tarefa em outra aba se clicar com o ctrl apertado
* Melhoria Colocar zoom no processo-view para o documento em HTML
* Melhoria Notificação, snack, marcar todas lidas, clicar para ir
* Melhoria novo botão de atalho para abrir minuta em nova aba
* Melhoria novo botão de atalho para abrir juntada em nova aba
* Melhoria Botao de editar processo tarefa-list
* Melhoria edicao simplificada do tipo de documento no grid de juntadas
* Correção erro ao adicionar unidades em bloco a partir do botão favoritos #302
* Correção erro ao exibir espécies de tarefas ao movimentar uma tarefa em um workflow #440
* Correção erro no passo 2 do workflow Elaboração de Ato Normativo #441
* Correção erro no passo 3 do workflow Elaboração de ato administrativo #442
* Melhoria melhorar a gestão do compartilhamento
* Correção bug ao editar juntada
* Melhoria atualizar a etiqueta de oficio remetido
* Melhoria tornar lixeira área de drag and drop

1.4.1

* Correção após movimentar Processo encerrando a tarefa, o sistema retorna para uma tela de edição da tarefa encerrada #451
* Melhoria estilização da tela de encaminhando pós encerramento de tarefa
* Correção refresh de token para não perder a sessão com frequencia
* Correção filtros de classificação por datas 'Criado em', 'Atualizado em', 'Apagado em' falhando #110
* Correção não aparece os botões de Salvar/Cancelar ao editar vinculação de processo #240
* Correção erro ao fazer download de um processo em ZIP/PDF #248
* Correção após movimentar processo encerrando a tarefa, o sistema retorna para uma tela de edição da tarefa encerrada #451
* Correção falha na Atribuição de Espécie de Setor aos Modelos Nacionais #452
* Correção falha na Atribuição de Espécies de Setor para um Modelo de Unidade #453  
* Correção erro no filtro de Modelos (recuperando modelos de outros setores e unidades) #369
* Correção para autocomplete de setores
* Correção para processos vinculados que não estão listados
* Correção grid de usuários afastados ou não disponíveis
* Correção estilos dos grids (firefox e nova versão do chrome)
* Melhoria assinar minutas na lista de tarefas
* Correção exibir etiquetas das tarefas em modo mobile
* Melhoria para contador de tarefas na lixeira
* Correção para não usar ferramenta acompanhar processo na capa
* Melhoria ícone para copiar o numero do NUP para o clipboard
* Melhoria chat experimental
* Correção erro na atribuição de espécie de processo ao workflow #461
* Correção listagem de transições do workflow apresentando linhas vazias ao inserir novo item #462
* Correção transições de workflow estão sendo apresentadas de forma errada no sistema #463

1.4.2

* Melhoria para exibir ou não registros inativos em um grid (configurações, admin e coordenador)
* Correçao erro na seleção de espécies de tarefas em processos com workflow #467
* Correção erro ao exibir espécies de tarefas ao movimentar uma tarefa em um workflow #440
* Correção regras/ações das etiquetas
* Correção validações/ações do workflows
* Correçao erro ao recarregar a lista de Regras de uma etiqueta #436 
* Correção tarefas, criar Pasta gerando erro de 'campo não pode ser nulo' #432
* Correçao ao criar tarefas como "Participar de Reunião" deveria criar um evento no calendário? #330
* Correção calculo do prazo da tarefa
* Correçao modulo do usuario externo na pesquisa de processos e validaçao de assinatura digital 
* Correção erro na remoção de assintura de outra pessoa, que causava loop
* Correção de erro ao tentar abrir o componente de protocolo-externo
* Implementada tela de encaminhamento de processos em bloco após uma movimentação que encerra as tarefas
* Implementado componente separado para vincular juntadas a outras juntadas

1.5.0

* Importação do Módulo do Barramento para o core administrativo
* Melhoria do filtro da pessoa na remessa para processos do barramento
* Melhoria encaminhamento em bloco de processos após encerramento em bloco de tarefas
* Correção setor de origem tarefa de acordo com o setor responsável do processo no stepper
* Correção tecla enter chamando grid de configuração nup processo
* Correção setor de origem selecionando setor da lotação principal
* Correçao de alteraçao do tipo de documentos de anexos
* Correção do editor de texto que interrompia o salvamento em alguns cenários
* Correção na gestão das minutas no movimentar em bloco
* Correção nos filtros em sidebar com componente tristate para booleanos
* Correção nos filtros da lista de tarefas
* Outras correções relevantes

1.5.1

* Correção para reconectar ao chat ao dar F5 
* Correção na assinatura dentro do grid de juntadas
* Correção na exibição de tarefas e atividades do workflow
* Correção nos filtros da lista de tarefas
* Correção na colocação em bloco de etiquetas
* Correção para correta exibição do módulo do usuário externo validado
* Outras correções relevantes

1.5.2

* Correção no setor origem na distribuição do processo em passos

1.5.3

* Melhoria painel de visualização do painel de tarefas em kanban
* Melhoria Implementado componente de histórico de processos na tela de edição
* Melhoria Adicionada opção no angular.json para possibilitar instalação de módulos no frontend através de links simbólicos
* Correção nas pesquisas de processo e de componente digital
* Correção de nome do componente no css de classificacao-gridsearch
* Correção de gridsearch de municipio para trazer o estado no grid
* Correção na assinatura de método save do parent generic service para possibilitar envio de atributo populate para o backend
* Correção na visualização dos documentos do protocolo eletrônico
* Correção para exibir o zoom corretamente na visualização de html em processos
* Correção mensagem de confirmação ao editar sigilos de documentos
* Correção campo de pesquisa de assuntos de processos (autocomplete)
* Correção campos de pesquisa de documentos por autor, redator e destinatário (textual) 
* Correção de erro no estado da aplicação ao salvar dados básicos de documento
* Correção na liberação da pesquisa de processos e documentos
* Correção para omitir configurações de aparência ainda não homologados

1.6.0

* Melhoria criado componente de autocomplete de lotações
* Melhoria criado componente gridsearch de lotações
* Melhoria criado botão no formulário de tarefas para consultar lotações
* Melhoria criado método para preencher unidade, setor e usuário da tarefa de acordo com a lotação selecionada no autocomplete/gridsearch
* Melhoria criada ação para limpar a mensagem mais recente do Mercure
* Melhoria alerta informativo ao usuário quando processo recebeu nova(s) juntada(s)
* Melhoria botão de reload de juntadas na listagem do processo-view
* Melhoria vinculação de juntadas ao arrastar uma juntada para outra juntada na visão de processo
* Melhoria para visualizar lista de processos e localizador módulo arquivista
* Correção de mensagens desaparecidas nos dialogs de confirmação
* Corrigido erro em notificações sem contexto preenchido
* Corrigida não exibição de mensagem ao abrir relatório com erro de geração
* Corrigidas consultas de relatórios de query para get em visualização e detalhe de relatório
* Renomeadas ações com nomes em duplicidade
* Corrigidos comportamentos indevidos nos campos do formulário de criação de relatórios ao alterar tipo/espécie de relatório
* Melhoria adicionado zoom aos relatórios html
* Corrigindo problemas no css de relatórios
* Correção em mensagem no dialog de informação de nova versão
* Correção de bug quando realizado logout estando dentro de alguma tela de detalhamento (tarefa, processo, relatório, ofício etc)
* Correção de erro no console ao deslogar de dentro de listagens (tarefa, arquivo, relatórios, ofícios, protocolo-externo etc)
* Correção padronização nas entidades no normalizr
* Correção filtro de tarefas por assunto
* Melhoria geração de relatório completo do processo
* Correção ao efetuar logoff de usuários externos
* Correção de erro ao excluir ações do workflow
* Correção de erro ao desentranhar juntadas
* Correção bug ao salvar tarefa no menu de processo
* Correção bug carregamento assunto e interessados

1.6.1

* Correção de bug na escolha da especie de atividade ao movimentar o processo

1.6.2

* Upgrade angular

1.6.3

* Sem mudanças

1.6.4

* Correção do label opcional para portugues nos steppers
* Correção quebra de linhas nas juntados da visualização do processo
* Ajuste layout do formulario de nota de rodapé no editor de textos
* Correção de erro no lançamento de bloco de atividades
* Correção de erro carregamento de favoritos em bloco de tarefas
* Correção no ordenamento de versões de documentos
* Correção no upload de fotos no perfil
* Correção vinculação de documentos

1.6.5

* Correção quebra de linhas nas juntados da visualização do processo quando ja anexos e multiplos componentes digitais
* Correção comportamento de filtros de criação de relatórios
* Correção css de filtros de criação de relatórios
* Correção ao trocar tipo de relatório, filtros anteriores continuavam sendo exibidos
* Correção ao digitar nos campos de autocomplete, formulário era liberado para envio
* Melhoria recebendo status do relatório do backend e do mercure
* Melhoria para exibir informação que um componente digital não html/pdf teve o download realizado no visualizador do processo
* Melhoria para logar no backend erros ocorridos no frontend
* Correção na assinatura de minutas em bloco
* Correção na pesquisa de outro numero processo
* Melhoria fazer o download não html/pdf no processo view por demanda do usuário
* Correção no roteamento de movimentacao de processos com uso de plugins
* Correção no form de parâmetros dos Relatórios
* Correçao carregamento gridsearch especie-tarefa no tarefa form
* Correçao de bug ao salvar form de usuario externo
* Correçao form de vinculaçao pessoa-barramento
* Correçao carregamento de repositorios no form pessoa-barramento
* Correção para permitir apenas modelos "em branco" na automatização do workflow e das etiquetas
* Correção para permitir apagar anexos da minuta
* Correção apagar anexos dentro do editor de minuta
* Correção apagar anexos dentro do editor de ofício
* Correção assinatura de anexos dentro de editor de minuta
* Correção assinatura de anexos dentro de editor de ofício
* Correção apagar anexos em bloco dentro de editor de minuta
* Correção apagar anexos em bloco dentro de editor de ofício
* Correção remover assinatura de anexos dentro de editor de minuta
* Correção remover assinatura de anexos dentro de editor de ofício
* Melhoria possibilitar seleção de minutas que serão destinadas ao criar atividade sem encerrar tarefa
* Melhoria clareza ao usuário que todas as minutas serão destinadas ao criar atividade encerrando tarefa
* Melhoria exibir todas as minutas da tarefa no editor, na sidebar de atividade, e possibilitar navegação entre elas
* Correção atualizar minuta na listagem ao fechar dialog de upload de anexos diretamente do processo-view
* Correção css de listagem de documentos em atividades
* Correção em código de componente de atividades em bloco
* Correção em loadings de remoção de documentos em atividades em bloco
* Correção de modularização do componente de operações em bloco para movimentação de tarefas
* Correção na largura máxima de imagens e tabelas no editor de textos
* Melhoria minutas da tarefa iniciam todas selecionadas ao criar atividade
* Melhoria Ocultando o checkbox de selecionar todas as minutas caso Encerrar Tarefa estiver marcado
* Melhoria no componente de desfazer operação em segundo plano (ação de fechar)
* Correção bugs no comportamento do componente de desfazer operações em segundo plano
* Correção CSS dos botões de voltar/avançar no componente de processo-view

1.6.6

* Melhoria para resincronizar os componentes digitais de processo do barramento
* Correção para inclusão de nova pessoa com vinculação da pessoa com barramento
* Correção na pesquisa de estrutura e repositorio através do barramento
* Correção abrir juntada em outra aba
* Correção movimentar tarefas em bloco
* Correção criar tarefas em bloco
* Correção no desarquivamento de processos em fase intermediária
* Correção carregamento de anexos ao editar

1.6.7

* Correção ao tentar remover uma transição no workflow #585
* Correção ao desativar um localizador de um setor da unidade #158
* Correção checkbox de espécie de setor do Modelo Nacional e da Tese Nacional some #120
* Correção ao desativar um Modelo Nacional e uma Tese Nacional #118
* Correção ao alterar o tipo de documento do ofício nada muda aparentemente #348
* Correção Coluna F da tabela de relatórios de tarefas não tem cabeçalho #328
* Correção campo "Criado Por" em branco nas Juntadas do Processo #430
* Correção colunas desordenadas na tela da listagem de pessoas cadastradas #540 
* Correção criação de tarefa para Unidade fechada por protocolo.
* Correção do encaminhamento em bloco de tarefas
* Correção salvar sigilo legal com categoria #243
* Correção ao criar nova tarefa vinculada ao workflow #602

1.6.8

* Correção Compartilhar Tarefas, ajustes nos filtros de data e histórico de modificações #323
* Correção destinação de minutas desentranhadas
* Correção Garantias, não esta deixando colocar centavos no campo valor #196
* Correção redistribuição de tarefa em lote
* Correção desarquivamento de processo
* Correção de erro na exibição da tela de processo módulo arquivista
* Correção exibição de modelos
* Correção no acompanhamento de processos
* Correção busca search-bar outroNumero
* Correção 'Recarregar' sigilos no editor #617
* Correção nos services do sistema, tipando os retornos de métodos de any para Observable<any> para evitar problemas na troca da annotation @Effect para o método createEffect
* Removidos arquivos fantasmas de service de role e data-source de role
* Correção em instâncias de ElementQueries para elementQueries em todos os grids do sistema, para eliminar erros de eslint
* Correção em erros de eslint de ordenação de atributos em diversos locais do sistema
* Melhoria alteração em todos os effects do sistema para substituir a anotação @Effect(), depreciada, pelo método createEffect()
* Melhoria alteração em todos os locais do sistema onde havia o seletor getRouterState, removendo uma condicional desnecessária e trocando pelo operador filter
* Melhoria adicionado o operador takeUntil e limpeza dos subscribers em diversos componentes do sistema
* Correção em diversos componentes onde o método ngOnDestroy existia, mas o componente não implementava o OnDestroy
* Correção nos reducers em diversos componentes de list do sistema, nos quais as ações de DELETE, DELETE_SUCCESS e DELETE_FAILED não utilizavam o payload corretamente para atualizar o estado da aplicação
* Correção em diversos componentes do sistema onde a chamada à action Operacao() ocorria incorretamente, resultando em erros no estado da aplicação ou na aplicação por completo
* Correção nas mensagens de conteúdo de diversas operações em segundo plano - Operacao()
* Melhoria alteradas, em todos os locais do sistema, as chamadas ao método depreciado Resultado(), substituindo pelas chamadas corretas ao método Operacao()
* Correção de diversos problemas de eslint detectados em inspeção
* Melhoria implementar delete do Coordenador para o Admin
* Melhoria filtros para Juntada
* Melhoria tooltip de componente digital mostrando o seu nome

1.6.9

* Melhoria usuário, setor e unidade responsável na juntada
* Melhoria número do documento principal do interessado aparecendo na capa do processo
* Correção bug ao tentar remeter ofício assinado
* Correção para selecionar o barramento na criação de ofício
* Melhoria adicionado ícone à barra de pesquisa no topo do sistema para identificar que existem opções avançadas de busca
* Correção em effects e componentes de ações em bloco, para exibir somente os resultados das operações que dizem respeito àquele submit específico de bloco
* Melhoria criado componente para pesquisa de etiquetas, que permite customização de pesquisa em campos diferentes da etiqueta da entidade
* Melhoria utilizado componente citado acima para pesquisar tarefas por etiquetas do processo
* Correção comportamentos incorretos de botões que afetam campos desabilitados estando habilitados no formulário de criação de tarefa
* Correção implementado método que verifica alteração do toggle blocoProcessos para desabilitar/habilitar corretamente o campo espécie tarefa
* Correção ao criar tarefas para bloco de processos/responsáveis, a informação do lote é passada ao componente para tratar corretamente o bloco de resultados da operação
* Correção em bug em que o cdk do formulário de criação de tarefas era removido do DOM, fazendo com que algumas das tarefas do bloco não fossem criadas corretamente
* Correção replicada para todas as telas de blocos
* Melhoria para busca de modelos pelo ID
* Correção do carregamento de modelos nas configurações do usuário
* Melhoria listagem de atividades por tarefa no processo edit
* Correção retirada de menções de sapiens, supp, agu
* Correção painel de tarefas exibição do coordenador

1.6.10

* Melhoria ordenação de listagens agora informa melhor ao usuário qual o campo da ordenação e qual a ordem aplicada no momento
* Melhoria prazos na edição de tarefas são desabilitados caso tarefa tenha sido criada sem prazo final (intimação de integração)
* Correção botão cancelar na tela de download de processo
* Melhoria adicionado cadeado para informar prazo fechado em grid de tarefas quando não há prazo final para a tarefa
* Correção removidos atalhos fxFlex de html de ações em bloco
* Melhoria botão de voltar em telas de resultados de operações em bloco
* Correção da url de edição em bloco de tarefas para português
* Correção comportamento de redistribuição em bloco de tarefas causando um reload na listagem
* Correção redistribuição de tarefas possivelmente removendo relacionamentos do objeto da tarefa no estado da aplicação
* Correção bug na edição em bloco da tarefa não atualizando todo o objeto tarefa de acordo com o retorno do backend
* Correção na mensagem de erro no upload #188
* Correção prazo de tarefa edit sempre desabilitado
* Correção alinhamento de botão de copiar NUP para clipboard
* Melhoria filtros de setor responsável/setor origem desabilitados até que unidade responsável/unidade origem sejam preenchidas
* Correção filtro de juntadas na sidebar do processo-view para se comportar da forma correta
* Melhoria filtro de juntadas na sidebar do processo-view adicionado filtro origem
* Correção css filtro de juntadas na sidebar do processo-view para corrigir aparência do botão de filtrar
* Melhoria form para vinculação de roles estáticas
* Correção filtro de setor origem na sidebar de tarefas estava verificando o campo unidade responsável para ser exibido, em vez de unidade origem
* Melhoria exibindo mensagens de erro de algumas operações em processos e tarefas na snackbar de erro
* Correção resolvidos alguns problemas de eslint
* Melhoria exibindo o Outro Número de processo caso seja este o campo selecionado na busca avançada da search-bar de processo
* Melhoria permitindo modularização de componente de login para substituição completa da camada de login do frontend através de módulos externos
* Correção de css em algumas telas de resultado de bloco
* Correção bug módulo do arquivista edit
* Correção bug mudança de menus módulo arquivista
* Correção visualização de processo módulo arquivista
* Correção visualização de processos restritos módulo arquivista
* Melhoria filtro de Modelos por ID

1.6.11

* Nova funcionalidade de visualização de contas de email
* Correção unidade responsável no form tarefa pegando lotação principal
* Correção bug visualização de minutas tarefa-list
* Correção para salvar modelos,etiquetas,repositórios no módulo do coordenador
* Correção para adicionar botões no list do aviso
* Correção para salvar avisos no módulo do coordenador
* Correção nos autocompletes do sistema, limpando a lista de resultados após fechado o modal de autocomplete
* Melhoria implementado contador de componentes digitais das juntadas, e exibindo na lista de juntadas do processo-view, para possibilitar ao usuário referenciar componentes digitais específicos no seu processo de trabalho
* Melhoria implementado botão de adição de Coordenadores para Coordenador de Órgão Central e Coordenador de Unidade
* Correção coluna indevida no grid de Tarefas
* Correção removido reload incorreto de juntadas ao abrir/fechar o editor de documentos de dentro da visão de processo
* Correção de erro ao tentar visualizar uma juntada que não foi ainda carregada dentro dos índices da visão de processo
* Correção css de busca na tela de anexar documento por cópia no editor de documentos
* Melhoria exibindo NUP do processo que está sendo visualizado na tela de anexar documento por cópia no editor de documentos
* Correção exibição de campos do grid de tarefas
* Correção criação de minutas em bloco de tarefas
* Melhoria para adicionar restrição de acesso para tipos de relatórios
* Correção alinhamento 3 pontinhos da juntada
* Melhoria de escolha de metadados para o Imprimir Relatório
* Correção filtro de juntadas
* Melhoria inclusão do ID das juntadas no Processo View
* Correção exibição de erro no cópia documento juntada
* Correção logentry localizador form documento
* Correção de tamanho mínimo para sigla em setor
* Correção removendo botão de movimentar quando visualizando anexo de uma minuta no editor
* Correção no editor de documentos de menu lateral sendo exibido ao visualizar detalhes do processo
* Correção remoção do botão movimentar na tela de anexar por cópia
* Correção alertando ao usuário quando alterações serão perdidas no documento editado em várias novas ações no editor
* Correção removendo exibição do botão cancelar em formulários do editor de documento que causavam problemas de navegação indevida
* Correção upload de anexos dentro do editor/no dialog de upload passam a ser lineares
* Correção ao transformar um usuário externo em um usuário interno #652
* Correção de erro no editor ao clicar em anexo com alterações no conteúdo do editor (loop de confirmação)
* Correção de erro de inconsistência grave no editor ao salvar

1.6.12

* Correção populateAll tarefa-grid
* Melhoria inclusão do ID das juntadas no Processo View
* Correção no editor para não exibir botões de troca de modelo/troca de versão de documentos que já se encontram assinados
* Correção no editor para exibir alerta ao usuário informando que ele perderá o conteúdo atual do documento ao alterar o seu modelo
* Correção no editor para exibir alerta ao usuário informando que ele perderá o conteúdo atual do documento ao reverter sua versão
* Correção em bug onde troca de foco em formulários abria o painel lateral do chat
* Correção de bug no form de criação de usuários
* Correção de bug no form criar cópia
* Correção na criação de Tarefas em Bloco no grid de Tarefas do Processo e no Stepper de Processo
* Correção de rota do widget de Tarefas para o módulo arquivista
* Melhoria inclusão do termo encerrado em processos com idades diferentes de "corrente"
* Correção de bug ao adicionar etiqueta no painel de tarefa já criar vinculação
* Melhoria inclusão do editar tarefa concluída para checagem do histórico
* Sistema só está enviando a tarefa de um processo apenas para o último adicionado na lista de 'Bloco de Responsáveis'. #668
* Sistema não está permitindo concluir um processo utilizando a função de 'Bloco de Responsáveis'. #661
* Melhoria inserindo paginação no componente cdk-documento-card-list e permitindo requisitar os 10 registros seguintes caso haja mais de 10 no total do paginador
* Melhoria implementados em todos os locais que utilizam o componente acima as lógicas necessárias para solicitar mais registros paginados de documentos
* Correção em comportamento do autocomplete de usuário, que em determinadas condições, quebrava e passava a pesquisar somente por username
* Correção em componente de detalhes de ofício para usuário externo, onde o componente de responder não possuía guarda de rota próprio e quebrava em situações específicas
* Melhoria inserindo paginação no dialog de documentos vinculados a uma minuta no processo-view
* Melhoria para exibir a hora nos campos de data dos grids
* Correção erro ao carregar outro componente digital em editor já aberto
* Correção removido reload de juntadas ao vincular duas juntadas em visualização de processo
* Correção erro de estado da aplicação ao desvincular juntadas
* Melhoria alerta ao usuário quando clica em Desvincular juntadas
* Melhoria alinhamento dos botões na lista de juntadas
* Correção ao alterar tipo de documento anexo
* Correção tarefa aberta em nova aba através do painel de tarefas ou do kanban funciona corretamente #662

1.7.0

* Correção removido filtro por origem dados de todos os locais do sistema, por se tratar de tabela massiva
* Correção em loading infinito ao cancelar alteração de modelo no editor
* Correção em css de sidebars de navegação (pessoa e ofício)
* Correção em erro inesperado ao tentar abrir uma juntada sem documentos/sem componentes digitais no visualizador de processo
* Corrigido erro ao tentar identificar a juntada selecionada no visualizador de processo
* Correção ao acessar url incompleta do editor diretamente
* Correção ocultando botões de ação em anexos de juntadas quando dentro do editor
* Correção ocultando botão de exclusão de componente digital de juntadas dentro do editor
* Correção removendo do estado da aplicação anexos de documento ao fechar o editor
* Correção rota incorreta ao tentar excluir restrição de acesso de documentos no editor
* Correção em url do editor devido a um bug no escape de caracteres especiais do angular
* Melhoria iniciando processo de remoção de populate desnecessário de juntadaAtual na visualização de processo
* Correção ao editar tarefa, distribuição automática virá desmarcada

1.8.0

* Melhoria implementado painel para gerenciar minutas de tarefas selecionadas
* Correção em erro ao alterar visualização do editor de documentos avulsos para processo, e depois retornar para visualização do conteúdo do documento avulso
* Correção de erro ao fechar editor de minutas em uma determinada rota da aplicação
* Melhoria para realizar preloading nas listas de tarefas e juntadas
* Melhoria para consta primeira e ultima paginas nas paginacoes
* Correção Sistema está permitindo selecionar e salvar um usuário com nível de acesso negativo #690
* Melhoria inclusão do menu histórico nas Configurações do usuário
* Correção adicionada importação de OnInit ao cdk-aviso-form
* Melhoria adicionado evento StartedUpload que é disparado quando componente de upload inicia o envio dos arquivos
* Melhoria botão "Desvincular" dentro de anexos do editor quando for juntada com vinculação
* Melhoria na ux do painel de minutas, agora agrupado por NUPs
* Correção excluir documento(s) de dentro do painel de minutas atualiza as etiquetas da(s) tarefa(s) relacionada(s) na listagem
* Correção adicionar minutas em bloco (por upload ou por modelo) atualiza as etiquetas das tarefas relacionadas na listagem
* Correção adicionada paginação individual por NUP ao painel de minutas
* Correção na aparência do badge que exibe a numeração original de uma juntada anexada a outra no processo-view 
* Correção no Compartilhamento de Tarefas em Bloco
* Correção validação do Form Alterar Tipo de Documento Minuta antes de habilitar o salvamento
* Correção nas rotas das ações no Painel de Tarefas
* Correção na Edição de Usuário inativos por parte de Coordenadores de Unidade
* Correção erro de inconsistência grave detectada ao tentar restaurar um ofício apagado #717
* Melhoria inclusão do botão para Habilitar a Consulta Público de Processos ao Cidadão
* Correção componentes digitais grid para utilizar a classe correta de css nos métodos que utilizavam um seletor
* Melhoria painel de minutas corrigido agrupamento, agora agrupando por tarefas dentro do agrupamento por processo
* Melhoria grid de modelos agora também utiliza corretamente o modo search, que deixa a sidebar lockedOpen
* Correção componente de editor de minuta com base em modelo agora é aberto no contexto da edição de tarefa, e não da visualização do processo
* Correção na rota utilizada para abrir o editor de minutas de dentro do componente de modelos
* Melhoria alterada forma utilizada para atualizar as etiquetas das tarefas após exclusão de minuta(s)
* Melhoria criação de minutas em bloco com base em modelos agora também permite pesquisar modelos ou componentes digitais, seguindo o que já ocorria para tarefa individual
* Correção na rota de abertura de editor após criação de minuta com base em modelo
* Melhoria assinatura, assinatura eletrônica e remover assinatura passam a ocorrer através de um evento global e único no sistema
* Melhoria implementadas ações sobre minutas diretamente do painel de tarefas
* Refatoramento em todo o sistema e módulos para padronização e utilização dos eventos globais de assinaturas
* Correção de problema no dialog de uploads sendo aberto em uma minuta sem anexos
* Melhoria implementada função de assinar em bloco todas as minutas das tarefas selecionadas
* Correção em paginação do dialog de uploads após conclusão de um upload
* Correção nos guardas de rota de movimentar/movimentar em bloco, que agora traz todos os documentos da(s) tarefa(s)
* Melhoria garantindo sincronia entre etiqueta da tarefa e minuta após ações nos paineis de movimentação de tarefa
* Melhoria implementada lixeira de minutas no painel de minutas 
* Correção em problemas de sincronia entre as etiquetas de minutas no painel de tarefas e as minutas propriamente ditas
* Correções no funcionamento do acervo de minutas
* Correção na assinatura de minutas por dentro do editor de minutas
* Correção na assinatura de minutas de tarefas em bloco
* Correção em bugs na lixeira do painel de minutas
* Melhoria barra de pesquisa rápida superior sempre aberta
* Correção na abertura do editor de juntadas quando acessado de dentro do processo-edit
* Correção na lixeira de minutas dentro do painel de minutas
* Correção na exibição de conteúdo de uma juntada desentranhada por dentro do visualizador de processo
* Melhoria na barra lateral de processos, exibindo o botão editar como um botão colapsável com todas as opções de edição do processo
* Correção ao remover anexo de documentos no editor, o botão carregar mais aparece incorretamente
* Correção de falha grave no editor ao assinar um anexo de dentro do editor de documentos
* Correção ao remover um componente digital dentro do editor de documentos, ocorre erro 404 do backend
* Correção ao adicionar componente digital, editor se comportava de forma incorreta
* Correção ao remover componente digital que estava sendo exibido, editor não redirecionava a tela e tentava abrir componente inexistente
* Correção no botão de próximo componente digital do editor, que em algumas situações pulava um componente digital
* Correção no botão de componente digital anterior do editor, que não verificava se havia mudanças no editor antes de trocar de componente
* Correção de css no formulário de novas tramitações em edição de processo
* Correção de comportamento de árvore do setor responsável no formulário de criação de tarefa
* Correção em css de painel de coordenação relacionado a unidade/setores
* Correção adicionado listener para eventos de assinatura dentro do editor, para atualizar o conteúdo do documento após assinatura com sucesso
* Correção resposta de erro do backend de componente digital mata navegação da aplicação em definitivo
* Correção trazendo de volta opção para criar etiquetas diretamente do local onde se adiciona etiquetas às tarefas conforme ux antiga
* Correção em componente digital com erro de codificação quando componente era convertido de HTML para PDF por motivos de segurança
* Correção acima também aplicada para anexos de documento e de documento-avulso
* Correção adicionando ícone diferente para minutas editáveis e PDF
* Correção de desaparecimento de mensagens de erros de upload poucos instantes após erro aparecer
* Melhoria criação de marcadores de páginas para pdfs (bookmarks)
* Correção para exibição de pds e arquivos para download dentro do editor

1.8.1 

* Correção de erro de navegação na ação visualizar processo do editor de ofícios
* Correção de erro ao salvar dados básicos de ofício e alterar visualização do editor, onde ao retornar para o formulário de dados básicos, os dados do ofício não estavam atualizados
* Correção em bug no editor causado pelo novo componente de visualização de PDF, em que a opção de visualizar processo não era capaz de exibir o conteúdo das juntadas dentro do editor
* Melhoria na visualização de juntadas do processo, passando a carregar documentos vinculados após a carga inicial de juntadas ser concluída, somente para juntadas que possuem anexos
* Correção de erro ao vincular juntadas
* Correção de erro ao realizar reload enquanto estiver visualizando componente digital vinculado em alguma juntada 
* Correção de erro de concorrência ao tentar atualizar índice de juntadas com documentos vinculados
* Correção de erro ao montar url da aplicação em casos específicos para juntadas com documentos vinculados
* Correção de carregamento de vinculações de documentos de juntadas, que estava limitando a apenas 25 registros (hotfix)
* Correção no carregamento de vinculações de documentos de juntadas, que não atualizava a tela ao término do carregamento (hotfix)
* Correção de ordenação em vinculações de juntadas
* Correção de ordenação de componentes digitais de juntadas em diversos locais do sistema
* Melhoria no download de componentes digitais na tela de visualização de processo, agora ocorrendo em simultâneo com o carregamento da lista das juntadas
* Correção no método que realizava o carregamento posterior das vinculações de documentos de juntadas, que não estava levando em consideração o offset da consulta ao tentar atualizar o index de juntadas da aplicação (hotfix)
* Correção na ordenação da consulta (hotfix)
* Correção histórico agora não permite mais full table scan, necessitando obrigatoriamente de um processo para agilizar a consulta (hotfix)
* Correção de download de último componente digital entrando em loop quando ocorre dentro da listagem de tarefas

1.8.2

* Melhoria alterado o componente de visualização de pdf, possibilitando abrir várias instâncias do componente na mesma tela sem efeitos colaterais 
* Correção em bug no carregamento de último componente digital de processo se comportando de forma errática
* Correção em navegação de juntadas desentranhadas e em carregamento múltiplo de componente digital de processo-view
* Correção de visualizador de PDF que não era exibido em momentos que deveria aparecer
* Correção de bugs em movimentação de tarefas, que não removia etiquetas de minutas juntadas ao processo
* Correção em desaparecimento de botão de bookmark em processo-view
* Correção em defeito que ocorre ao trocar rapidamente de tarefas com requisições de documentos vinculados a juntadas ocorrendo no background e quebrando a aplicação

1.8.3

* Correção css chat
* Correção erro painel do chat
* Correção abrir Minuta em outra aba
* Correção em loading infinito de vinculações de juntadas
* Correção em numeração sequencial dos anexos de documentos de juntadas
* Correção em substituição de informações de processos populadas por módulos em algumas chamadas e populates do sistema
* Correção para evitar que sistema busque vinculações de documentos para juntadas já desentranhadas
* Correção em erro que evitava que etiquetas de minutas fossem retiradas das tarefas na funcionalidade de movimentar bloco de tarefas
* Correção para inserir loading das minutas na tela de movimentar tarefas em lote
* Correção para passar o módulo na consulta de GetTarefa do tarefa-detail, evitando sobrescrever valores que são necessários aos módulos
* Correção em erro de javascript ao acessar a tela de movimentar tarefa e recarregar a aplicação 
* Melhoria inclusão de botão Ver Compartilhamentos no grid de Tarefas
* Melhoria permitindo ordenar tarefas por data da última atualização
* Melhoria para possibilitar que menus de tarefas de módulos já apareçam de forma expandida
* Correção em movimentação de tarefas de dentro do editor, que não encaminhava para o local correto no momento de fechar o editor
* Correção no css da tela de dados básicos de ofício no editor, que quebrava a barra de rolagem lateral
* Correção de erro que abria o filtro de tarefas da listagem ao tentar filtrar o grid de tarefas do processo na funcionalidade de edição de processos quando se encontra dentro da listagem de tarefas
* Correção na exclusão de ofícios para passar a limpar as etiquetas de ofício em elaboração
* Correção na funcionalidade de anexar por cópia, que não abria corretamente em casos específicos
* Correção no botão cancelar da tela de dados básicos de ofício, que não realizava nenhuma ação
* Melhoria removendo código antigo da sidebar do processo-view, eliminando o trecho relativo a minutas da tarefa
* Correção em comportamentos incorretos do visualizador de processo, que quebrava dentro do editor em ações específicas de documentos avulsos ou de minutas
* Correção em visualizador de PDF, que não era capaz de recarregar a juntada em situações específicas quando dentro do editor
* Correção em mensagem de erro de SetCurrentStep dispatching null no console da aplicação, que matava a navegação do sistema
* Melhoria removendo código legado de assinatura de alguns componentes
* Correção exibindo o botão para acessar ofícios de uma tarefa no menu superior do componente de tarefas
* Melhoria disponibilizado link para acessar o NUP à partir do histórico
* Correção erro crítico em grids de modo search, que permitia somente clicar no header de ordenação, passando consultas sem where ao backend
* Correção erro grave no componente de histórico do usuário, que permitia enviar requisição sem where ao backend clicando no botão recarregar
* Melhoria alterado funcionamento de filtro de histórico de usuário, possibilitando pesquisar por processo ou por janela de tempo de criação do histórico
* Correção no componente de histórico de usuário, impedindo alterar o campo 'criadoPor' caso esteja no modo search
* Melhoria no componente de filtro de datas, permitindo informar um intervalo de tempo e, caso informado, alterando o comportamento do mesmo e validando que um período ou data exata foram informados

1.8.4

* Correção no historico completo
* Correção nos acompanhamentos
* Melhoria implementado carregamento parcial das juntadas, carregando os componentes digitais posteriormente, para melhoria de performance
* Correção em chamadas de query ao backend que poderiam ser getOne, para melhoria de performance

1.8.5

* Correção para buscar o provider de processo com 15 dígitos
* Melhoria inclusão do Copiar Bookmark para clipboard
* Melhoria inclusão do Copiar número do documento juntado para o clipboard

1.8.6

* Melhoria Compartilhar Tarefa para Setor e Grupo de Contato
* Correção ordenação das últimas operações
* Correção erro ao complementar resposta ofício usuário externo - #786
* Melhoria exibir tarefas abertas no título do processo
* Correção de bug ao clicar na lupa do snackbar após download processo
* Correção de bug ao editar tarefa inativa módulo do coordenador
* Melhoria abrir Documentos em outra Aba com CTRL
* Correção ordenação de componentes digitais no momento do upload linear para ser por ordem alfabética de arquivos, como no sapiens 1
* Melhoria filtro por interessado na listagem de tarefas deixa de ser autocomplete
* Correção em erro de não atualização de etiquetas ao remeter ofícios
* Correção em erro ao carregar ofícios tentando popular a tarefaOrigem em ofícios com tarefa origem removida
* Correção em erro ao tentar carregar componentes digitais quando componentes digitais já se encontram carregados
* Correção em lentidão de carregamento de componentes digitais detectado em produção
* Correção upload de minutas em componente de atividade passa a ser linear
* Correção de erro de validação em formulário no momento de editar tarefas em bloco
* Correção de erro de css na tela do visualizador de processos
* Melhoria refatoramento completo do carregamento de juntadas no componente de visualização de processo
* Melhoria alteração na url para que a mesma seja imutável
* Melhoria carregamento de juntada default é ativada antes mesmo de chamar as juntadas
* Melhoria filtrando juntadas para trazer apenas a informada na url caso processo tenha mais de 10 juntadas
* Correção comportamento de ordenação/filtro de juntadas agora redireciona para a primeira da lista
* Melhoria redução na complexidade do componente
* Correção em comportamento incorreto dos loadings na sidebar de juntadas do processo-view
* Correção em falha do componente de pesquisa de processos no topo do sistema quando acessando o mesmo processo aberto atualmente no visualizador de processos
* Correção em erro de loading infinito em guarda de rota de processo-view
* Correção em erro de acesso negado preso no estado da aplicação ao tentar acessar um processo com restrição de acesso, o que bloqueava acesso a processos sem restrição de acesso
* Correção em botão cancelar do formulário de desentranhamento de juntada dentro do processo-view
* Correção em botão cancelar do formulário de desentranhamento em bloco de juntadas dentro do processo-edit
* Melhoria rollback da funcionalidade de multistep/lazy loading de componentes digitais, vinculações documentos e etiquetas em juntadas e etiquetas em tarefas, em virtude da sobrecarga do servidor web do backend
* Correção passando a ordenação dos componentes digitais de juntadas a ser atribuição do backend
* Correção em erro de javascript quando juntadas e index não estão carregados ao tentar verificar se alguma juntada é o último ou o primeiro passo do index
* Melhoria alteração na forma de filtrar modelos para exibir um radio com as opções disponíveis
* Melhoria ao alterar a modalidade de modelo, realizar consulta
* Correção em tela de histórico, onde não havia filtro selecionado por padrão
* Melhoria alteração na forma de filtrar modelos para exibir um radio com as opções disponíveis
* Melhoria ao alterar a modalidade de modelo, realizar consulta
* Correção em tela de histórico, onde não havia filtro selecionado por padrão
* Correção de bug na tela de protocolo ao desistir de cadastrar um processo
* Correção de componente de date filter
* Melhoria permitindo badge nos menus collapsable de tarefas de módulos
* Melhoria implementada contagem totalizadora de todos os filhos de um menu collapsable que tenha badge
* Correção de ordenação de menus na sidebar do painel administrativo
* Correção de erros de console no painel de tarefas
* Melhoria para permitir clicar para abrir documentos diferentes na tela de atividade-edit do editor mesmo com encerrar tarefa marcado
* Melhoria Botão de impressão no topo do conteúdo de juntadas não PDF dentro do processo-view
* Melhoria Botão de impressão no topo do conteúdo de documentos não PDF e não editáveis dentro do documento-edit
* Melhoria Botão de zoom conforme o processo-view dentro do documento-view
* Correção Exibir componente digital corretamente após assinatura da juntada
* Correção no comportamento do botão salvar ao tentar alterar o tipo de um documento na listagem de tarefas
* Melhoria trocadas todas as navegações de pasta para ocorrer por id da pasta no lugar do nome
* Correção de erro crítico de loop infinito de redirects quebrando a aplicação
* Melhoria assinatura de minutas dentro do painel de atividades do editor
* Melhoria alterar tipo de documentos dentro do painel de atividades do editor
* Correção fechamento automático da barra lateral de juntadas no modo mobile
* Correção em navegação de processo-view em modo mobile pelo botão voltar
* Correção em bug na abertura de documento/ofício em processos sem juntadas
* Correção de loop de guarda de rota em casos específicos de tarefas abertas diretamente pela etiqueta da minuta
* Melhoria botão para excluir todas as restrições de acesso das juntadas selecionadas na tela de listagem de juntadas
* Correção bug em navegação do botão back dentro de processo-view no modo mobile
* Melhoria implementada versão separada do processo-view apenas com propósito de anexar-copia, simplificada e sem compartilhamento de estado da aplicação
* Melhoria removida lógica relacionada ao anexar-copia de dentro do processo-view, simplificando assim a lógica do componente
* Correção removido botão de listar assinaturas de dentro do componente de visualização de componentes digitais
* Melhoria implementada lógica de poder selecionar um campo em modo data, mas enviar a seleção ao backend em formato dateTime
* Correção de bug de chamada múltipla no guarda de rotas de processo
* Correção removida chamada a getProcesso do guarda de rota de tarefas
* Correção em bug onde as juntadas desapareciam ao tentar abrir a mesma tarefa/uma outra tarefa do mesmo processo
* Correção em bug de chamadas múltiplas ao GetProcessoCapa no guarda de rota
* Correção em guarda de rota de processo component travando a funcionalidade de protocolo
* Correção nas telas de modelos dentro do painel de coordenador
* Correção nas telas de modelos individuais dentro do painel de configuração do perfil do usuário
* Correção em que clique no botão de mais ações de uma minuta dentro do editor, além de abrir o menu, alterava a minuta
* Melhoria borda vermelha ao redor da minuta atualmente exibida no editor
* Melhoria removido a sidebar de anexos do editor de minutas, exibindo anexos na sidebar de movimentação
* Correção em redirecionamento incorreto dentro do componente de movimentar do administrativo
* Correção na navegação de juntadas por sidebar, para ser capaz de navegar corretamente para juntadas sem componentes digitais
* Correção em bug envolvendo processos cuja juntada mais recente não possui componentes digitais
* Correção de erro no console na navegação em processos sem juntadas
* Correção para exibir mensagem sobre ausência de componentes digitais corretamente em tela no caso em questão
* Correção na navegação de juntadas pelas setas de anterior/próximo quando existem juntadas sem componentes digitais no processo
* Correção nas navegações do componente de anexar-copia em casos com juntadas sem componentes digitais

1.8.7

* Correção para lançamento de atividades dos módulos
* Correção de css para edição de documento e lançamento de minutas
* Melhorias de css para minutas
* Melhoria criação de visualização das tarefas em grid
* Melhoria para exibição de dados em grids redimensionáveis e ordenaveis
* Correção abertura de minutas por dentro do editor
* Correção de bug para anexar cópia de documentos
* Correção de erro para exibição de processo com acesso negado
* Correção da rota de retorno ao enviar por email documento
* Correção erro de exibição de arquivo após upload
* Correção de validação tarefa form
* Correção erro de upload por cópia dentro do ofício exigindo store de documento-edit
* Correção onde sistema não abre ofício automaticamente após criar ofício
* Melhoria no editor para apenas salvar quando usuário tentar trocar a tela sem salvar dados alterados do editor
* Correção no desentranhamento do processo-view, que atualiza informações da juntada sem precisar de ação do usuário
* Correção de bug onde era possível visualizar componente digital de juntada desentranhada na tela do processo
* Correção para redirecionamento após desentranhamento de juntada não incluir o id do componente digital de juntada recém desentranhada
* Correção de erro ao tentar abrir minuta ou ofício criados a partir de modelo posteriormente excluído
* Correção de comportamento onde era possível excluir uma assinatura de minuta e editor não atualizava para modo de edição
* Correção para atualizar etiqueta da minuta no painel de tarefas ao assinar/remover assinatura
* Correção para atualizar ícones das minutas/ofícios na listagem de tarefas para informar da existência de uploads sempre que um anexo for adicionado/removido
* Melhoria implementada em editor de ofícios para permitir alternar entre outros ofícios da tarefa diretamente da aba de dados básicos
* Correção para trazer todas as minutas/ofícios da tarefa, não limitando somente às 10 mais recentes

1.8.8

* Correções de bug de upgrade de dependencias

1.8.9

* Correções de bug de upgrade de dependencias

1.8.10

* Correções de bug de upgrade de dependencias

1.8.11

* Correções de bug de upgrade de dependencias
* Não é possível apagar um modelo, apenas inativá-lo

1.8.12

* Correções de bug de upgrade de dependencias

1.8.13

* Widget com o gráfico da distribuição de tarefas das 4 ultimas semanas
* Correção para exibir as setas de alteração de ano em alguns datepickers
* Ajuste visual nos subsmenus do processo

1.9.0

* Refatoramento completo do componente de visualização de processo, visando reduzir a complexidade do código e melhorar o desempenho para processos grandes
* Eliminada a dependência de um index montado no backend
* Volta do uso de requisição ao back que faz o download do componente digital mais recente de um processo
* Alterada rota padrão do visualizar processo de 'default' para 'latest'
* Correção de erro enviando requisições repetidas ao GetVolumes para o backend
* Corrigido comportamento incorreto navegando pelas setas por juntadas desentranhadas
* Removendo juntadas vinculadas do estado da aplicação corretamente ao vincular juntadas
* Trazendo de volta ao estado da aplicação a juntada desvinculada
* Implementada mensagem de erro em tela quando o mesmo fosse retornado pelo guarda de rota
* Alterações e correções de bug em componente de anexar por cópia
* Removidas dependências de index montado pelo backend em componente de anexar cópia
* Correção de erro em CSS quando aberto componente de anexar por cópia sem que o processo-view tenha entrado no estado da aplicação
* Implementado componente simplificado de visualização de processo dentro do editor de minutas
* Implementar visualização de bookmarks no componente de visualização simplificada de processo
* Implementar visualização de capa do processo no componente de visualização simplificada de processo
* Alterado componente de bookmarks para não alterar a url da aplicação
* Correção de bug em capa de processo no método que abria juntadas em nova aba
* Implementado corretamente acesso negado em anexar-copia e visualizar processo simplificado
* Ocultando o ícone de criação de bookmark ao visualizar um bookmark no visualizar processo
* Correção de chamada duplicada para getTarefas no backend ao abrir detalhamento de uma tarefa
* Correção de erro impossibilitando de arrastar e soltar para vincular juntadas de processo em algumas rotas
* Correção em uma das causas de loop infinito ao alternar entre minutas de tarefas diferentes
* Correção de erro ao pesquisar processo na barra superior enquanto visualiza o detalhamento de outro processo
* Correção de bug que impedia processo de ser exibido corretamente ao fechar modal de documento
* Correção de erro de console do angular que causava comportamentos indesejados na aplicação
* Correção de erro ao criar minuta com base em modelo em uma única tarefa, e posteriormente tentar criar minuta com base em modelo em múltiplas tarefas
* Melhoria para aumentar desempenho levemente da listagem de tarefas
* Melhoria na listagem de tarefas visando um aumento de desempenho do lado do frontend, especialmente quando há várias tarefas na lista
* Correção de erro no downloadLatest para usuários externos
* Correção de erro de loop infinito de downloadLatest ao criar minuta baseada em modelo dentro de tarefa cujo processo não tem juntadas
* Correção de erro ao trocar entre diversas minutas e, posteriormente, tomar alguma ação sobre o componente digital mais recente
* Correção de bug de barra de rolagem se manter no final da listagem de tarefas ao trocar de pasta/gênero/tipo de tarefa
* Correção de bug no formulário da tarefa para permitir evento com inicio e fim no mesmo dia
* Nova funcionalidade para permitir ao usuário externo conveniado juntar uma petição em um NUP existente
* Nova visão do processo na forma de fluxo de trabalho
* Configuração de cronjobs no módulo de administração
* Funcionalidade para agrupar a ordenação da lista de tarefas em datas, processos e espécies de tarefas
* Funcionalidade para exibir no calendário de taredas não apenas os eventos, mas todas as tarefas
* Correção em erro no painel de ofícios do usuário externo que limitava a quantidade máxima de ofícios na listagem a 100
* Correção de erros de navegação e roteamento na aplicação quando ocorria vinculação ou desentranhamento de juntadas de processos na rota latest
* Melhoria em telas onde são exibidas diversas minutas em cards, que passa a exibir também um índice numérico para diferenciar entre as minutas
* Melhoria em código de rastreamento de alterações no DOM aplicado nas listagens de arquivista, ofícios, protocolo-externo e relatórios
* Correção na numeração das minutas para iniciar em 1
* Melhoria adicionada numeração de minutas na listagem de tarefas e no grid de tarefas
* Correção para garantir ordenação correta das minutas
* Correção para remover console.log de download de componente digital
* Correção bug que não exibia tela de encaminhamento após encerramento de tarefas em determinada rota da aplicação
* Melhoria removida requisição desnecessária de GetTarefa ao backend ao abrir detalhamento de tarefa que já consta no normalizr da aplicação
* Melhoria para remover lentidão no guarda de rota de processo-view, liberando a tela antes do fim do download
* Melhoria implementado componente vazio de tarefa, dentro do tarefa-detail, para ser novo contexto do retorno do editor, redirecionando em seguida para o processo-view
* Correção de erro de loop infinito de downloadLatest caso editor seja aberto diretamente pela url em um processo sem componentes digitais/sem juntadas
* Correção em pequeno delay na exibição de um componente digital já baixado na tela de visualização de processo
* Correção em ordenação de minutas em telas do sistema onde minutas são exibidas em cards
* Correção implementando contador nas minutas exibidas quando tarefa é aberta em nova aba
* Correção na ação de clique em minutas de dentro da tarefa exibida em nova aba
* Correção de erro na tela de detalhamento de tarefa que impossibilitava alterar tipo de documento das minutas
* Correção de erro no protocolo ao clicar no link do protocolo sem finalizar o cadastro de um processo

1.9.1

* Correções de bug de upgrade de dependencias

1.9.2

* Correções de bug de upgrade de dependencias
* Correção de erros relacionados a restrição de acesso a processo e a juntada de processo
* Correção de erro exibido pelo front ao tentar baixar componente digital sem passar um id
* Correção em erro do backend ao criar atividades em bloco de tarefas do mesmo processo
* Correção em tela de atividades em bloco que mantinha a informação de destinação em tela mesmo sem minutas selecionadas
* Correção em erro em ambientes de banco postgres após exibir ofícios remetidos de dentro do painel inicial do sistema, e fechar o editor
* Correção de erro em painel de listagem de tarefas ao editar em bloco data de fim de prazo de tarefas de outro responsável (coordenador)
* Correção de bug que retirava do normalizr o conteúdo do componente digital exibido no editor ao listar os componentes digitais dentro do editor
* Melhoria ocultando da barra lateral a pasta selecionada ao filtrar as tarefas pesquisando em todas as pastas
* Correção de bug que não filtrava corretamente ao trocar modo de exibição das tarefas de grid para lista e vice-versa
* Correção em bug ao trocar a pasta enquanto tarefas se encontram filtradas
* Correção em bug onde mais de uma requisição de assinatura era enviada ao backend, resultando em duplicação de assinaturas de minuta
* Correção em outro local onde a assinatura poderia ocorrer de forma duplicada
* Correção de erros na lista de tarefas após implementação dos filtros de buscar todas
* Melhoria possibilitando clicar na pasta do atual targetHandle para remover o filtro de todas da pesquisa na lista de tarefas
* Correção de erro ao remeter ofícios em diversas rotas do painel de tarefas
* Correção de erro em que criação de ofícios em bloco não atualizava a tela com o resultado das operações
* Correção de erro em que criação de ofícios em bloco não atualizava etiquetas das tarefas
* Correção de erro em que criação de ofícios em bloco não exibia na lista de tarefas as tarefas onde ofícios eram criados
* Correção de erro ao tentar encaminhar processos em bloco criando novas tarefas, que em determinadas situações parava de exibir o formulário
* Correção de erro que não retirava os processos salvos do estado da aplicação
* Correção de dependência em internacionalização de MatPaginator em todo o sistema, para se adequar a novas regras do Angular 15
* Melhoria implementada funcionalidade, na visualização de processo, para desvincular juntadas individualmente
* Correção de erros na consulta de modelos enviada ao backend em algumas situações no gridsearch de modelos
* Correção no dialog de confirmação de registro de extravio de documentos/processos no módulo de arquivista
* Correção de mensagem no dialog de confirmação de relatório excel de tarefas

1.11.0

* Ícones de edição e remoção da capa do processo, nas seções de 'Assuntos' e 'Interessados', não estão funcionais. #953
* Filtro de assinaturas de um documento juntado não está funcionando. #954
* Na edição de departamento ("Unidade") no campo e-mail não aparece um feedback descritivo para o usuário #971
* Botão de 'Salvar' encontra-se desabilitado na tela de criação de 'Relatórios'. #921
* Códigos da árvore de classificações encontram-se desordenados na tela de criação de processo. #928
* Correções de bug de upgrade de dependencias
