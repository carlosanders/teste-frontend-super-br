import {documento} from './documento.schema';
import {usuario} from './usuario.schema';
import {areaTrabalho as areaTrabalhoSchema} from './base.schema';

areaTrabalhoSchema.define({
    documento: documento,
    usuario: usuario,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const areaTrabalho = areaTrabalhoSchema;
