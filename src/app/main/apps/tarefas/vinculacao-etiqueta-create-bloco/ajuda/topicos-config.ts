import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Etiquetando tarefas em bloco';
topico.descricao = 'Como etiquetar tarefas em bloco';
topico.module = () => import('app/main/apps/tarefas/vinculacao-etiqueta-create-bloco/ajuda/ajuda-vinculacao-etiqueta-create-bloco.module').then(m => m.AjudaVinculacaoEtiquetaCreateBlocoModule);

export const topicosConfig =
    [
        topico
    ];
