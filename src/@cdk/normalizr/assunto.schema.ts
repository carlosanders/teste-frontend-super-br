import {assunto as assuntoSchema} from './base.schema';
import {assuntoAdministrativo} from './base.schema';
import {origemDados} from './base.schema';
import {usuario} from './base.schema';
import {processo} from './base.schema';

assuntoSchema.define({
    assuntoAdministrativo: assuntoAdministrativo,
    processo: processo,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const assunto = assuntoSchema;
