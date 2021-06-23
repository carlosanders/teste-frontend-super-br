import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {MatIconModule} from '@cdk/angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {DocumentoEditDadosBasicosComponent} from './documento-edit-dados-basicos.component';
import {DocumentoEditDadosBasicosStoreModule} from './store/store.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {CdkDocumentoFormModule} from '@cdk/components/documento/cdk-documento-form/cdk-documento-form.module';
import {DocumentoService} from '@cdk/services/documento.service';

const routes: Routes = [
    {
        path: '',
        component: DocumentoEditDadosBasicosComponent
    }
];

@NgModule({
    declarations: [
        DocumentoEditDadosBasicosComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,
        MatMenuModule,

        DocumentoEditDadosBasicosStoreModule,

        TranslateModule,
        CdkSharedModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule,
        CdkDocumentoFormModule,
    ],
    providers: [
        DocumentoService,
    ],
    exports: [
        DocumentoEditDadosBasicosComponent
    ]
})
export class DocumentoEditDadosBasicosModule {
}
