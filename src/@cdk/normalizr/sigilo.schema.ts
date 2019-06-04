import {schema} from '@cdk/normalizr-src';
import {usuario} from './usuario.schema';
import {modalidadeCategoriaSigilo} from './modalidade-categoria-sigilo.schema';
import {processo} from './processo.schema';
import {documento} from './documento.schema';
import {origemDados} from './origem-dados.schema';
import {tipoSigilo} from './tipo-sigilo.schema';

export const sigilo = new schema.Entity('sigilo', {
    modalidadeCategoriaSigilo: modalidadeCategoriaSigilo,
    tipoSigilo: tipoSigilo,
    processo: processo,
    documento: documento,
    origemDados: origemDados,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
