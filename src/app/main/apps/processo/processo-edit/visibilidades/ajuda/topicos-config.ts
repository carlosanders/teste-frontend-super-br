import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Restrições de acesso';
topico.descricao = 'Restringindo acessos em um processo';
topico.module = () => import('app/main/apps/processo/processo-edit/visibilidades/ajuda/ajuda-visibilidades.module').then(m => m.AjudaVisibilidadesModule);

export const topicosConfig =
    [
        topico
    ];
