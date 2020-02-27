import {usuario} from './usuario.schema';
import {modalidadeOrgaoCentral} from './modalidade-orgao-central.schema';
import {municipio} from './municipio.schema';
import {generoSetor} from './genero-setor.schema';
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
