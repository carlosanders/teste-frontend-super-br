import {documento} from './index.schema';
import {usuario} from './index.schema';
import {areaTrabalho as areaTrabalhoSchema} from './index.schema';

areaTrabalhoSchema.define({
    documento: documento,
    usuario: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const areaTrabalho = areaTrabalhoSchema;
