import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Etiquetando processos em bloco';
topico.descricao = 'Como etiquetar processos em bloco';
topico.module = () => import('app/main/apps/protocolo-externo/vinculacao-etiqueta-create-bloco/ajuda/ajuda-vinculacao-etiqueta-create-bloco.module').then(m => ({module: m.AjudaVinculacaoEtiquetaCreateBlocoModule, componentIndex: 0}));

export const topicosConfig =
    [
        topico
    ];
