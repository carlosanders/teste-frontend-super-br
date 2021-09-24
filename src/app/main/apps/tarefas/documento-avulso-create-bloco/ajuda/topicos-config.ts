import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Criando ofícios em bloco';
topico.descricao = 'Como criar oficios em bloco';
topico.module = () => import('app/main/apps/tarefas/documento-avulso-create-bloco/ajuda/ajuda-documento-avulso-create-bloco.module').then(m => m.AjudaDocumentoAvulsoCreateBlocoModule);

export const topicosConfig =
    [
        topico
    ];
