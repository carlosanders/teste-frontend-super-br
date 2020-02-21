import {usuario} from './base.schema';
import {origemDados} from './base.schema';
import {componenteDigital as componenteDigitalSchema} from './base.schema';

componenteDigitalSchema.define({
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const componenteDigital = componenteDigitalSchema;
