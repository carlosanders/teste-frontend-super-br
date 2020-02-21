import {etiqueta} from './base.schema';
import {usuario} from './base.schema';
import {tarefa} from './base.schema';
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
