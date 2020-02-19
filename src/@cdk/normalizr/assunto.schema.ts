import {assunto as assuntoSchema} from './base.schema';
import {assuntoAdministrativo} from './assunto-administrativo.schema';
import {origemDados} from './origem-dados.schema';
import {usuario} from './usuario.schema';
import {processo} from './processo.schema';

assuntoSchema.define({
    assuntoAdministrativo: assuntoAdministrativo,
    processo: processo,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const assunto = assuntoSchema;
