import {usuario} from './index.schema';
import {origemDados} from './index.schema';
import {componenteDigital as componenteDigitalSchema} from './index.schema';

componenteDigitalSchema.define({
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const componenteDigital = componenteDigitalSchema;
