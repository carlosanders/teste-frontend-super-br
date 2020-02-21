import {documento} from './base.schema';
import {usuario} from './base.schema';
import {areaTrabalho as areaTrabalhoSchema} from './base.schema';

areaTrabalhoSchema.define({
    documento: documento,
    usuario: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const areaTrabalho = areaTrabalhoSchema;
