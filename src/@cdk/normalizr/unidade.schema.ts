import {usuario} from './base.schema';
import {modalidadeOrgaoCentral} from './base.schema';
import {municipio} from './base.schema';
import {generoSetor} from './base.schema';
import {unidade as unidadeSchema} from './base.schema';

unidadeSchema.define({
    municipio: municipio,
    generoSetor: generoSetor,
    modalidadeOrgaoCentral: modalidadeOrgaoCentral,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const unidade = unidadeSchema;
