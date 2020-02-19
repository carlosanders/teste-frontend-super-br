import {afastamento as afastamentoSchema} from './base.schema';
import {modalidadeAfastamento} from './modalidade-afastamento.schema';
import {colaborador} from './colaborador.schema';
import {usuario} from './usuario.schema';

afastamentoSchema.define({
    modalidadeAfastamento: modalidadeAfastamento,
    colaborador: colaborador,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const afastamento = afastamentoSchema;

