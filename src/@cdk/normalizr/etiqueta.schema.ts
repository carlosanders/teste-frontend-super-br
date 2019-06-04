import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';
import {modalidadeEtiqueta} from './modalidade-etiqueta.schema';
import {tarefa} from './tarefa.schema';

export const etiqueta = new schema.Entity('etiqueta', {
    modalidadeEtiqueta: modalidadeEtiqueta,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
