import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {modulesConfig} from 'modules/modules-config';
import {MatIconModule} from '@cdk/angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {DocumentoAvulsoEditDadosBasicosComponent} from './documento-avulso-edit-dados-basicos.component';
import {DocumentoAvulsoEditDadosBasicosStoreModule} from './store/store.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {CdkDocumentoAvulsoFormModule} from '@cdk/components/documento-avulso/cdk-documento-avulso-form/cdk-documento-avulso-form.module';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {CdkConfirmDialogModule} from '@cdk/components';
import {MatInputModule} from '@angular/material/input';
import {
    CdkDocumentoCardListModule
} from '@cdk/components/documento/cdk-documento-card-list/cdk-documento-card-list.module';
import {
    CdkComponenteDigitalCardListModule
} from '@cdk/components/componente-digital/cdk-componente-digital-card-list/cdk-componente-digital-card-list.module';
import * as fromGuards from './store/guards';
import {VinculacaoDocumentoService} from '@cdk/services/vinculacao-documento.service';
import {
    CdkMinutasAtividadeCardListModule
} from '@cdk/components/documento/cdk-minutas-atividade-card-list/cdk-minutas-atividade-card-list.module';

const routes: Routes = [
    {
        path: '',
        component: DocumentoAvulsoEditDadosBasicosComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/documento/documento-avulso-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        DocumentoAvulsoEditDadosBasicosComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,
        MatMenuModule,

        DocumentoAvulsoEditDadosBasicosStoreModule,

        TranslateModule,
        CdkSharedModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule,
        CdkDocumentoAvulsoFormModule,
        CdkConfirmDialogModule,
        MatInputModule,
        CdkDocumentoCardListModule,
        CdkComponenteDigitalCardListModule,
        CdkMinutasAtividadeCardListModule
    ],
    providers: [
        DocumentoAvulsoService,
        fromGuards.ResolveGuard,
        VinculacaoDocumentoService
    ],
    exports: [
        DocumentoAvulsoEditDadosBasicosComponent
    ]
})
export class DocumentoAvulsoEditDadosBasicosModule {
}
