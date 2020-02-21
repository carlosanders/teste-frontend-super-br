import {usuario} from './base.schema';
import {documento} from './base.schema';
import {modalidadeMeio} from './base.schema';
import {template} from './base.schema';
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
