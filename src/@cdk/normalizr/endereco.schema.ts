import {usuario} from './index.schema';
import {municipio} from './index.schema';
import {origemDados} from './index.schema';
import {pais} from './index.schema';
import {endereco as enderecoSchema} from './index.schema';

enderecoSchema.define({
    municipio: municipio,
    pais: pais,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const endereco = enderecoSchema;
