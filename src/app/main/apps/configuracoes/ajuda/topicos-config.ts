import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Configurações';
topico.descricao = 'Configurações pessoais';
topico.module = () => import('app/main/apps/configuracoes/ajuda/ajuda-configuracoes.module').then(m => {
    return {module: m.AjudaConfiguracoesModule, componentIndex: 0};
});

export const topicosConfig =
    [
        topico
    ];
