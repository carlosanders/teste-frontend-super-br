import {usuario} from './usuario.schema';
import {documento} from './documento.schema';
import {modalidadeMeio} from './modalidade-meio.schema';
import {template} from './template.schema';
import {modelo as modeloSchema} from './base.schema';

modeloSchema.define({
    modalidadeModelo: modalidadeMeio,
    template: template,
    documento: documento,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modelo = modeloSchema;
