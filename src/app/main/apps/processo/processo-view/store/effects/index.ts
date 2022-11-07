import {AssinaturasEffects} from './assinaturas.effects';
import {BookmarkEffects} from './bookmark.effects';
import {ComponentesDigitaisEffects} from './componentes-digitais.effects';
import {DocumentosVinculadosEffects} from './documentos-vinculados.effects';
import {ProcessoViewDocumentosEffects} from './documentos.effects';
import {DownloadProcessoEffects} from './download-processo.effects';
import {ProcessoViewEffect} from './processo-view.effects';
import {VolumesEffects} from './volumes.effects';

export const effects = [
    ProcessoViewEffect,
    ProcessoViewDocumentosEffects,
    ComponentesDigitaisEffects,
    VolumesEffects,
    DocumentosVinculadosEffects,
    BookmarkEffects,
    AssinaturasEffects,
    DownloadProcessoEffects
];

export * from './processo-view.effects';
export * from './documentos.effects';
export * from './componentes-digitais.effects';
export * from './volumes.effects';
export * from './documentos-vinculados.effects';
export * from './bookmark.effects';
export * from './assinaturas.effects';
export * from './download-processo.effects';
