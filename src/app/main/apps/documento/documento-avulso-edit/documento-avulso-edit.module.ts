import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {DocumentoAvulsoEditComponent} from './documento-avulso-edit.component';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {CdkDocumentoAvulsoFormModule} from '@cdk/components/documento-avulso/cdk-documento-avulso-form/cdk-documento-avulso-form.module';
import {
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {CdkDocumentoCardListModule} from '@cdk/components/documento/cdk-documento-card-list/cdk-documento-card-list.module';
import {CdkComponenteDigitalCardListModule} from '@cdk/components/componente-digital/cdk-componente-digital-card-list/cdk-componente-digital-card-list.module';
import {CdkRepositorioGridModule} from '@cdk/components/repositorio/cdk-repositorio-grid/cdk-repositorio-grid.module';
import {CdkUploadModule} from '@cdk/components/upload/cdk-upload.module';
import {modulesConfig} from 'modules/modules-config';
import {DocumentoAvulsoEditStoreModule} from './store/store.module';

const routes: Routes = [
    {
        path: '',
        component: DocumentoAvulsoEditComponent,
        children: [
            {
                path: 'dados-basicos',
                loadChildren: () => import('./dados-basicos/documento-avulso-edit-dados-basicos.module').then(m => m.DocumentoAvulsoEditDadosBasicosModule)
            },
            {
                path: 'inteligencia',
                loadChildren: () => import('./inteligencia/documento-avulso-inteligencia.module').then(m => m.DocumentoAvulsoInteligenciaModule)
            },
            {
                path: 'modelos',
                loadChildren: () => import('./modelos/documento-avulso-edit-modelos.module').then(m => m.DocumentoAvulsoEditModelosModule)
            },
            {
                path: 'versoes',
                loadChildren: () => import('./versoes/documento-avulso-edit-versoes.module').then(m => m.DocumentoAvulsoEditVersoesModule)
            }
        ]
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
    ],
    providers: [
        DocumentoAvulsoService
    ],
    exports: [
        DocumentoAvulsoEditComponent
    ]
})
export class DocumentoAvulsoEditModule {
}
