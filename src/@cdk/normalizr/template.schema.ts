import {modalidadeTemplate} from './modalidade-template.schema';
import {tipoDocumento} from './tipo-documento.schema';
import {documento} from './documento.schema';
import {usuario} from './usuario.schema';
import {template as templateSchema} from './base.schema';

templateSchema.define({
    modalidadeTemplate: modalidadeTemplate,
    tipoDocumento: tipoDocumento,
    documento: documento,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const template = templateSchema;
