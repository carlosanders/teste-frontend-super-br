import {schema} from '@cdk/normalizr-src';
import {modalidadeTemplate} from './modalidade-template.schema';
import {tipoDocumento} from './tipo-documento.schema';
import {documento} from './documento.schema';
import {usuario} from './usuario.schema';

export const template = new schema.Entity('template', {
    modalidadeTemplate: modalidadeTemplate,
    tipoDocumento: tipoDocumento,
    documento: documento,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
