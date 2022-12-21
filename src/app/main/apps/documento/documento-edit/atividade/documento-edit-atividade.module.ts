import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@cdk/angular/material';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {DocumentoEditAtividadeComponent} from './documento-edit-atividade.component';
import {DocumentoEditAtividadeStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {AtividadeService} from '@cdk/services/atividade.service';
import {CdkAtividadeFormModule} from '@cdk/components/atividade/cdk-atividade-form/cdk-atividade-form.module';
import {CdkMinutasAtividadeCardListModule} from '@cdk/components/documento/cdk-minutas-atividade-card-list/cdk-minutas-atividade-card-list.module';
import {DocumentoService} from '@cdk/services/documento.service';
import {
    CdkDocumentoCardListModule
} from '@cdk/components/documento/cdk-documento-card-list/cdk-documento-card-list.module';
import {
    CdkComponenteDigitalCardListModule
} from '@cdk/components/componente-digital/cdk-componente-digital-card-list/cdk-componente-digital-card-list.module';
import {
    CdkModeloAutocompleteModule
} from '@cdk/components/modelo/cdk-modelo-autocomplete/cdk-modelo-autocomplete.module';
import {VinculacaoDocumentoService} from '@cdk/services/vinculacao-documento.service';

const routes: Routes = [
    {
        path: '',
        component: DocumentoEditAtividadeComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        DocumentoEditAtividadeComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,
        MatMenuModule,

        DocumentoEditAtividadeStoreModule,

        TranslateModule,
        CdkSharedModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule,
        CdkAtividadeFormModule,
        CdkMinutasAtividadeCardListModule,
        CdkDocumentoCardListModule,
        CdkComponenteDigitalCardListModule,
        MatFormFieldModule,
        MatInputModule,
        CdkModeloAutocompleteModule,
        MatAutocompleteModule,
    ],
    providers: [
        AtividadeService,
        DocumentoService,
        VinculacaoDocumentoService,
        fromGuards.ResolveGuard
    ],
    exports: [
        DocumentoEditAtividadeComponent
    ]
})
export class DocumentoEditAtividadeModule {
}
