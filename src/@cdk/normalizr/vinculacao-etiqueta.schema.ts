import {schema} from '@cdk/normalizr-src';
import {etiqueta} from './etiqueta.schema';
import {usuario} from './usuario.schema';
import {tarefa} from './tarefa.schema';

export const vinculacaoEtiqueta = new schema.Entity('vinculacaoEtiqueta', {
    etiqueta: etiqueta,
    tarefa: tarefa,
    criadoPor: usuario,
    atualizadoPor: usuario,
    usuario: usuario,
    apagadoPor: usuario
});
