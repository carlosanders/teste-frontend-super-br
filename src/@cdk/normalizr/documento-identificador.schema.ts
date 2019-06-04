import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';
import {pessoa} from './pessoa.schema';
import {modalidadeDocumentoIdentificador} from './modalidade-documento-identificador.schema';
import {origemDados} from './origem-dados.schema';

export const documentoIdentificador = new schema.Entity('documentoIdentificador', {
    modalidadeDocumentoIdentificador: modalidadeDocumentoIdentificador,
    origemDados: origemDados,
    pessoa: pessoa,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
