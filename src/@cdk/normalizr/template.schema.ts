import {modalidadeTemplate} from './index.schema';
import {tipoDocumento} from './index.schema';
import {documento} from './index.schema';
import {usuario} from './index.schema';
import {template as templateSchema} from './index.schema';

templateSchema.define({
    modalidadeTemplate: modalidadeTemplate,
    tipoDocumento: tipoDocumento,
    documento: documento,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const template = templateSchema;
