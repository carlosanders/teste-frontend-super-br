import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {DocumentoAvulsoEditComponent} from './documento-avulso-edit.component';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {DocumentoStoreModule} from '../store/store.module';
import {CdkDocumentoAvulsoFormModule} from '@cdk/components/documento-avulso/cdk-documento-avulso-form/cdk-documento-avulso-form.module';
import {MatButtonModule, MatIconModule, MatMenuModule, MatProgressSpinnerModule, MatSlideToggleModule, MatTooltipModule} from '@cdk/angular/material';
import {CdkDocumentoCardListModule} from '@cdk/components/documento/cdk-documento-card-list/cdk-documento-card-list.module';
import {CdkComponenteDigitalCardListModule} from '@cdk/components/componente-digital/cdk-componente-digital-card-list/cdk-componente-digital-card-list.module';
import {CdkRepositorioGridModule} from '@cdk/components/repositorio/cdk-repositorio-grid/cdk-repositorio-grid.module';
import {CdkUploadModule} from '@cdk/components/upload/cdk-upload.module';
import {modulesConfig} from 'modules/modules-config';
import {DocumentoAvulsoEditDadosBasicosModule} from './dados-basicos/documento-avulso-edit-dados-basicos.module';
import {DocumentoAvulsoEditAnexosModule} from './anexos/documento-avulso-edit-anexos.module';
import {DocumentoAvulsoInteligenciaModule} from './inteligencia/documento-avulso-inteligencia.module';
import {DocumentoAvulsoEditStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';

const routes: Routes = [
    {
        path: ':sidebarHandle',
        component: DocumentoAvulsoEditComponent,
        canActivate: [fromGuards.ResolveGuard],
        children: [
            {
                path       : 'componente-digital',
                loadChildren: () => import('../componente-digital/componente-digital.module').then(m => m.ComponenteDigitalModule)
            },
            {
                path       : 'anexar-copia',
                loadChildren: () => import('../anexar-copia/anexar-copia.module').then(m => m.AnexarCopiaModule)
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'anexos'
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
        DocumentoAvulsoEditComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,
        CdkDocumentoAvulsoFormModule,

        DocumentoAvulsoEditStoreModule,

        TranslateModule,
        CdkSharedModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule,
        MatMenuModule,
        CdkDocumentoCardListModule,
        CdkComponenteDigitalCardListModule,
        CdkRepositorioGridModule,
        CdkUploadModule,
        DocumentoAvulsoEditDadosBasicosModule,
        DocumentoAvulsoEditAnexosModule,
        DocumentoAvulsoInteligenciaModule,
    ],
    providers: [
        DocumentoAvulsoService,
        fromGuards.ResolveGuard
    ],
    exports: [
        DocumentoAvulsoEditComponent
    ]
})
export class DocumentoAvulsoEditModule {
}
