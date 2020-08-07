import {Topico} from 'ajuda/topico';

const topico = new Topico();
topico.titulo = 'Upload de minutas em bloco';
topico.descricao = 'Como efetuar um upload de minutas em bloco';
topico.module = () => import('app/main/apps/tarefas/upload-bloco/ajuda/ajuda-upload-bloco.module').then(m => m.AjudaUploadBlocoModule);

export const topicosConfig =
    [
        topico
    ];
