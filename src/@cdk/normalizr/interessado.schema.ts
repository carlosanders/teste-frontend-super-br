import {usuario} from './index.schema';
import {modalidadeInteressado} from './index.schema';
import {pessoa} from './index.schema';
import {processo} from './index.schema';
import {origemDados} from './index.schema';
import {interessado as interessadoSchema} from './index.schema';

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
