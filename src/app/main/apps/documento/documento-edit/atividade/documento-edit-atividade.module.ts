import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {MatIconModule} from '@cdk/angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {DocumentoEditAtividadeComponent} from './documento-edit-atividade.component';
import {DocumentoEditAtividadeStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {AtividadeService} from '@cdk/services/atividade.service';
import {CdkAtividadeFormModule} from '@cdk/components/atividade/cdk-atividade-form/cdk-atividade-form.module';
import {CdkMinutasAtividadeCardListModule} from '@cdk/components/documento/cdk-minutas-atividade-card-list/cdk-minutas-atividade-card-list.module';
import {DocumentoService} from '@cdk/services/documento.service';

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
    ],
    providers: [
        AtividadeService,
        DocumentoService,
        fromGuards.ResolveGuard
    ],
    exports: [
        DocumentoEditAtividadeComponent
    ]
})
export class DocumentoEditAtividadeModule {
}
