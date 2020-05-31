import {etiqueta} from './index.schema';
import {usuario} from './index.schema';
import {tarefa} from './index.schema';
import {processo} from './index.schema';
import {documento} from './index.schema';
import {vinculacaoEtiqueta as vinculacaoEtiquetaSchema} from './index.schema';

vinculacaoEtiquetaSchema.define({
    etiqueta: etiqueta,
    tarefa: tarefa,
    processo: processo,
    documento: documento,
    criadoPor: usuario,
    atualizadoPor: usuario,
    usuario: usuario,
    apagadoPor: usuario
});

export const vinculacaoEtiqueta = vinculacaoEtiquetaSchema;
