import {usuario} from './usuario.schema';
import {municipio} from './municipio.schema';
import {origemDados} from './origem-dados.schema';
import {pais} from './pais.schema';
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
