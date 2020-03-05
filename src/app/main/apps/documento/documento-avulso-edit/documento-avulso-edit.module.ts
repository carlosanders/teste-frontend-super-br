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

const routes: Routes = [
    {
        path: '',
        component: DocumentoAvulsoEditComponent,
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
    }
];

@NgModule({
    declarations: [
        DocumentoAvulsoEditComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,
        CdkDocumentoAvulsoFormModule,

        DocumentoStoreModule,

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
