import {afastamento as afastamentoSchema} from './index.schema';
import {modalidadeAfastamento} from './index.schema';
import {colaborador} from './index.schema';
import {usuario} from './index.schema';

afastamentoSchema.define({
    modalidadeAfastamento: modalidadeAfastamento,
    colaborador: colaborador,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const afastamento = afastamentoSchema;

