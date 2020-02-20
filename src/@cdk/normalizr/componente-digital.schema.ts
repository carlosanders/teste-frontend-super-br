import {usuario} from './usuario.schema';
import {origemDados} from './origem-dados.schema';
import {componenteDigital as componenteDigitalSchema} from './base.schema';

componenteDigitalSchema.define({
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const componenteDigital = componenteDigitalSchema;
