import {cargo, colaborador as colaboradorSchema, modalidadeColaborador, usuario} from './base.schema';

colaboradorSchema.define({
    cargo: cargo,
    modalidadeColaborador: modalidadeColaborador,
    usuario: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const colaborador = colaboradorSchema;
