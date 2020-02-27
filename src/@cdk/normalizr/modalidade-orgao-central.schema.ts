import {usuario} from './base.schema';
import {modalidadeOrgaoCentral as modalidadeOrgaoCentralSchema} from './base.schema';

modalidadeOrgaoCentralSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeOrgaoCentral = modalidadeOrgaoCentralSchema;
