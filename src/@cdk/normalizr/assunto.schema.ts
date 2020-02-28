import {assunto as assuntoSchema} from './index.schema';
import {assuntoAdministrativo} from './index.schema';
import {origemDados} from './index.schema';
import {usuario} from './index.schema';
import {processo} from './index.schema';

assuntoSchema.define({
    assuntoAdministrativo: assuntoAdministrativo,
    processo: processo,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const assunto = assuntoSchema;
