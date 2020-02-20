import {cargo as cargoSchema, usuario} from './base.schema';

cargoSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const cargo = cargoSchema;
