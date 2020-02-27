import {modalidadeTemplate} from './base.schema';
import {tipoDocumento} from './base.schema';
import {documento} from './base.schema';
import {usuario} from './base.schema';
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
