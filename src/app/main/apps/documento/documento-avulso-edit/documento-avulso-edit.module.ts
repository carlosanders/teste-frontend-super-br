import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FuseSharedModule} from '@fuse/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {DocumentoAvulsoEditComponent} from './documento-avulso-edit.component';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {DocumentoStoreModule} from '../store/store.module';
import {CdkDocumentoAvulsoFormModule} from '@cdk/components/documento-avulso/cdk-documento-avulso-form/cdk-documento-avulso-form.module';
import {MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatSlideToggleModule, MatTooltipModule} from '@angular/material';

const routes: Routes = [
    {
        path: '',
        component: DocumentoAvulsoEditComponent,
        children: [
            {
                path       : 'componente-digital',
                loadChildren: '../componente-digital/componente-digital.module#ComponenteDigitalModule'
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
        FuseSharedModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule,
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
