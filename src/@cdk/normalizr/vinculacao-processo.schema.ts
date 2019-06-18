import {schema} from '@cdk/normalizr-src';
import {processo} from './processo.schema';
import {modalidadeVinculacaoProcesso} from './modalidade-vinculacao-processo.schema';
import {usuario} from './usuario.schema';

export const vinculacaoProcesso = new schema.Entity('vinculacaoProcesso', {
    processoVinculado: processo,
    modalidadeVinculacaoProcesso: modalidadeVinculacaoProcesso,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});
