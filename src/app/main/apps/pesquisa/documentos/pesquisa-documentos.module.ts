import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    MatExpansionModule
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {DocumentoService} from '@cdk/services/documento.service';
import {RouterModule, Routes} from '@angular/router';
import {CdkDocumentoGridModule} from '@cdk/components/documento/cdk-documento-grid/cdk-documento-grid.module';
import {DocumentosComponent} from './documentos.component';
import {DocumentosStoreModule} from './store/store.module';

const routes: Routes = [
    {
        path: '',
        component: DocumentosComponent
    }
];

@NgModule({
    declarations: [
        DocumentosComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatExpansionModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,

        DocumentosStoreModule,

        TranslateModule,

        FuseSharedModule,

        CdkDocumentoGridModule
    ],
    providers: [
        DocumentoService
    ],
    exports: [
        DocumentosComponent
    ]
})
export class PesquisaDocumentosModule {
}
