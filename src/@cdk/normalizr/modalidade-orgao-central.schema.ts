import {usuario} from './index.schema';
import {modalidadeOrgaoCentral as modalidadeOrgaoCentralSchema} from './index.schema';

modalidadeOrgaoCentralSchema.define({
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const modalidadeOrgaoCentral = modalidadeOrgaoCentralSchema;
