import {setor, usuario, modalidadeOrgaoCentral} from './index.schema';
import {coordenador as coordenadorSchema} from './index.schema';

coordenadorSchema.define({
    orgaoCentral: modalidadeOrgaoCentral,
    setor: setor,
    usuario: usuario,
    unidade: setor,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const coordenador = coordenadorSchema;
