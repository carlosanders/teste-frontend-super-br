import {assuntoAdministrativo as assuntoAdministrativoSchema} from './index.schema';
import {usuario} from './index.schema';

assuntoAdministrativoSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const assuntoAdministrativo = assuntoAdministrativoSchema;
