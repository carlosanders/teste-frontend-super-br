import {usuario} from './base.schema';
import {municipio} from './base.schema';
import {origemDados} from './base.schema';
import {pais} from './base.schema';
import {endereco as enderecoSchema} from './base.schema';

enderecoSchema.define({
    municipio: municipio,
    pais: pais,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const endereco = enderecoSchema;
