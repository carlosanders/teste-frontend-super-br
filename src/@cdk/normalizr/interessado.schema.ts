import {usuario} from './base.schema';
import {modalidadeInteressado} from './base.schema';
import {pessoa} from './base.schema';
import {processo} from './base.schema';
import {origemDados} from './base.schema';
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
