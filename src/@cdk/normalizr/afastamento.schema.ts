import {afastamento as afastamentoSchema} from './base.schema';
import {modalidadeAfastamento} from './base.schema';
import {colaborador} from './base.schema';
import {usuario} from './base.schema';

afastamentoSchema.define({
    modalidadeAfastamento: modalidadeAfastamento,
    colaborador: colaborador,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const afastamento = afastamentoSchema;

