import {usuario} from './index.schema';
import {setor} from './index.schema';
import {tarefa} from './index.schema';
import {documento} from './index.schema';
import {distribuicao as distribuicaoSchema} from './index.schema';

distribuicaoSchema.define({
    tarefa: tarefa,
    documentoAvulso: documento,
    usuarioAnterior: usuario,
    usuarioPosterior: usuario,
    setorAnterior: setor,
    setorPosterior: setor,
    criadoPor: usuario,
    atualizadoPor: usuario,
    apagadoPor: usuario
});

export const distribuicao = distribuicaoSchema;
