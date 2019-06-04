import {schema} from '@cdk/normalizr-src';
import {assuntoAdministrativo} from './assunto-administrativo.schema';
import {processo} from './processo.schema';
import {origemDados} from './origem-dados.schema';
import {usuario} from './usuario.schema';


export const assunto = new schema.Entity('assunto', {
    assuntoAdministrativo: assuntoAdministrativo,
    processo: processo,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

