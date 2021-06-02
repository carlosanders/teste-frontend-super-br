import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Criar protocolo';
topico.descricao = 'Como criar um protocolo no SUPP';
topico.module = () => import('app/main/apps/protocolo-externo/protocolo-create/ajuda/ajuda-protocolo-create.module').then(m => ({module: m.AjudaProtocoloCreateModule, componentIndex: 0}));

export const topicosConfig =
    [
        topico
    ];
