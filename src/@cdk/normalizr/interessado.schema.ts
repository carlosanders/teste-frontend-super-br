import {usuario} from './usuario.schema';
import {modalidadeInteressado} from './modalidade-interessado.schema';
import {pessoa} from './pessoa.schema';
import {processo} from './processo.schema';
import {origemDados} from './origem-dados.schema';
import {interessado as interessadoSchema} from './base.schema';

interessadoSchema.define({
    processo: processo,
    pessoa: pessoa,
    modalidadeInteressado: modalidadeInteressado,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const interessado = interessadoSchema;
