import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';
import {setor} from './setor.schema';
import {tarefa} from './tarefa.schema';
import {documento} from './documento.schema';

export const distribuicao = new schema.Entity('distribuicao', {
    tarefa: tarefa,
    documentoAvulso: documento,
    usuarioAnterior: usuario,
    usuarioPosterior: usuario,
    setorAnterior: setor,
    setorPosterior: setor,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
