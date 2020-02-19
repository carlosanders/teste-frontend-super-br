import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatProgressSpinnerModule, MatTooltipModule, MatListModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {FuseSidebarModule} from '@fuse/components';

import {DocumentoCopiaCreateBlocoComponent} from './documento-copia-create-bloco.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkDocumentoCopiaFormModule} from '@cdk/components/documento/cdk-documento-copia-form/cdk-documento-copia-form.module';
import {DocumentoCopiaCreateBlocoStoreModule} from './store/store.module';
import {DocumentoService} from '@cdk/services/documento.service';

const routes: Routes = [
    {
        path: '',
        component: DocumentoCopiaCreateBlocoComponent
    }
];

@NgModule({
    declarations: [
        DocumentoCopiaCreateBlocoComponent
    ],
    imports: [

        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSelectModule,
        MatToolbarModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatTooltipModule,
        MatListModule,

        CdkDocumentoCopiaFormModule,

        DocumentoCopiaCreateBlocoStoreModule,

        TranslateModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        DocumentoService
    ]
})
export class DocumentoCopiaCreateBlocoModule {
}
