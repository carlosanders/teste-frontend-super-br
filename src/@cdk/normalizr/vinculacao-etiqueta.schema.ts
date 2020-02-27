import {etiqueta} from './etiqueta.schema';
import {usuario} from './usuario.schema';
import {tarefa} from './tarefa.schema';
import {vinculacaoEtiqueta as vinculacaoEtiquetaSchema} from './base.schema';

vinculacaoEtiquetaSchema.define({
    etiqueta: etiqueta,
    tarefa: tarefa,
    criadoPor: usuario,
    atualizadoPor: usuario,
    usuario: usuario,
    apagadoPor: usuario
});

export const vinculacaoEtiqueta = vinculacaoEtiquetaSchema;
