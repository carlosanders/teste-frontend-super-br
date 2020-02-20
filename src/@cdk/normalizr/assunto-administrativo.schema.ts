import {assuntoAdministrativo as assuntoAdministrativoSchema} from './base.schema';
import {usuario} from './usuario.schema';

assuntoAdministrativoSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const assuntoAdministrativo = assuntoAdministrativoSchema;
