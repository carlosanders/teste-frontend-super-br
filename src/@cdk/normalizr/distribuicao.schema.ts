import {usuario} from './usuario.schema';
import {setor} from './setor.schema';
import {tarefa} from './tarefa.schema';
import {documento} from './documento.schema';
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
