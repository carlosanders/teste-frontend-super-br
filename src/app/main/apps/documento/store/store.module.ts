import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import {reducers} from './reducers';
import {effects} from './effects';
import {AtividadeService} from '@cdk/services/atividade.service';
import {RepositorioService} from '@cdk/services/repositorio.service';
import {AssinaturaService} from '@cdk/services/assinatura.service';
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';

@NgModule({
    imports: [
        StoreModule.forFeature('documento-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        AtividadeService,
        RepositorioService,
        AssinaturaService,
        VinculacaoEtiquetaService
    ]
})
export class DocumentoStoreModule {
}
