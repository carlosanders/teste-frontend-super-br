import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Configurações';
topico.descricao = 'Configuracoes pessoais';
topico.module = () => import('app/main/apps/configuracoes/ajuda/ajuda-configuracoes.module').then(m => m.AjudaConfiguracoesModule);

export const topicosConfig =
    [
        topico
    ];
