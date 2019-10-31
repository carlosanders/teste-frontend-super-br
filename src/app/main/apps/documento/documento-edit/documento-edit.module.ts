import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FuseSharedModule} from '@fuse/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {DocumentoEditComponent} from './documento-edit.component';
import {DocumentoService} from '@cdk/services/documento.service';
import {CdkDocumentoFormModule} from '@cdk/components/documento/cdk-documento-form/cdk-documento-form.module';
import {DocumentoStoreModule} from '../store/store.module';
import {MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule} from '@angular/material';
import {CdkComponenteDigitalCardListModule} from '@cdk/components/componente-digital/cdk-componente-digital-card-list/cdk-componente-digital-card-list.module';
import {CdkDocumentoCardListModule} from '@cdk/components/documento/cdk-documento-card-list/cdk-documento-card-list.module';
import {CdkUploadModule} from '@cdk/components/upload/cdk-upload.module';
import {CdkRepositorioGridModule} from '@cdk/components/repositorio/cdk-repositorio-grid/cdk-repositorio-grid.module';
import {CdkAtividadeFormModule} from '@cdk/components/atividade/cdk-atividade-form/cdk-atividade-form.module';
import {CdkVisibilidadeListModule} from '@cdk/components/visibilidade/cdk-visibilidade-list/cdk-visibilidade-list.module';
import {CdkVisibilidadeFormModule} from '@cdk/components/visibilidade/cdk-visibilidade-form/cdk-visibilidade-form.module';
import {FavoritoService} from '@cdk/services/favorito.service';

const routes: Routes = [
    {
        path: '',
        component: DocumentoEditComponent,
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
        DocumentoEditComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        CdkDocumentoFormModule,

        MatIconModule,
        MatButtonModule,
        MatMenuModule,

        DocumentoStoreModule,

        CdkComponenteDigitalCardListModule,
        CdkDocumentoCardListModule,
        CdkUploadModule,

        TranslateModule,
        FuseSharedModule,
        MatTooltipModule,
        CdkRepositorioGridModule,
        CdkAtividadeFormModule,
        CdkVisibilidadeListModule,
        CdkVisibilidadeFormModule,
    ],
    providers: [
        DocumentoService,
        FavoritoService
    ],
    exports: [
        DocumentoEditComponent
    ]
})
export class DocumentoEditModule {
}
