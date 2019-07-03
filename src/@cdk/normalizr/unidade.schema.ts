import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';
import {modalidadeOrgaoCentral} from './modalidade-orgao-central.schema';
import {municipio} from './municipio.schema';
import {especieSetor} from './especie-setor.schema';
import {generoSetor} from './genero-setor.schema';

export const unidade = new schema.Entity('unidade', {
    municipio: municipio,
    generoSetor: generoSetor,
    modalidadeOrgaoCentral: modalidadeOrgaoCentral,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
