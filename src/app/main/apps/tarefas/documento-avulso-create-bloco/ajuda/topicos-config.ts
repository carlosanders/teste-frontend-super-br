import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Criando ofícios em bloco';
topico.descricao = 'Como criar ofícios em bloco no SUPP';
topico.module = () => import('app/main/apps/tarefas/documento-avulso-create-bloco/ajuda/ajuda-documento-avulso-create-bloco.module').then(m => {
    return {module: m.AjudaDocumentoAvulsoCreateBlocoModule, componentIndex: 0};
});

export const topicosConfig =
    [
        topico
    ];
