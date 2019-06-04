import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';
import {documento} from './documento.schema';
import {modalidadeMeio} from './modalidade-meio.schema';
import {template} from './template.schema';

export const modelo = new schema.Entity('modelo', {
    modalidadeModelo: modalidadeMeio,
    template: template,
    documento: documento,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
