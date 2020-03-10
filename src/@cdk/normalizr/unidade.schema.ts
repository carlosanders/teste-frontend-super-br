import {usuario} from './index.schema';
import {modalidadeOrgaoCentral} from './index.schema';
import {municipio} from './index.schema';
import {generoSetor} from './index.schema';
import {unidade as unidadeSchema} from './index.schema';

unidadeSchema.define({
    municipio: municipio,
    generoSetor: generoSetor,
    modalidadeOrgaoCentral: modalidadeOrgaoCentral,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const unidade = unidadeSchema;
