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

1.1.4

* Corrigindo defeito no componente de filtro de datas no filtro de data exata para campos sem data e hora

1.1.5

* Correção de comportamento incorreto da aplicação ao recarregar componente de documentos
