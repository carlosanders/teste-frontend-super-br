import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Administrador';
topico.descricao = 'Administrador do sistema';
topico.module = () => import('app/main/apps/admin/ajuda/ajuda-admin.module').then(m => {
    return {module: m.AjudaAdminModule, componentIndex: 0};
});

export const topicosConfig =
    [
        topico
    ];
