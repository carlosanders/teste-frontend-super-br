import {usuario} from './base.schema';
import {setor} from './base.schema';
import {tarefa} from './base.schema';
import {documento} from './base.schema';
import {distribuicao as distribuicaoSchema} from './base.schema';

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
