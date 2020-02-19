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
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {DocumentoAvulsoListComponent} from './documento-avulso-list.component';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {RouterModule, Routes} from '@angular/router';
import {DocumentoAvulsoListStoreModule} from 'app/main/apps/processo/processo-edit/documentos-avulsos/documento-avulso-list/store/store.module';
import {EspecieDocumentoAvulsoService} from '@cdk/services/especie-documento-avulso.service';
import * as fromGuards from 'app/main/apps/processo/processo-edit/documentos-avulsos/documento-avulso-list/store/guards';
import {CdkDocumentoAvulsoGridModule} from '@cdk/components/documento-avulso/cdk-documento-avulso-grid/cdk-documento-avulso-grid.module';

const routes: Routes = [
    {
        path: '',
        component: DocumentoAvulsoListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        DocumentoAvulsoListComponent
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

        TranslateModule,

        FuseSharedModule,

        CdkDocumentoAvulsoGridModule,

        DocumentoAvulsoListStoreModule,
    ],
    providers: [
        DocumentoAvulsoService,
        EspecieDocumentoAvulsoService,
        fromGuards.ResolveGuard
    ],
    exports: [
        DocumentoAvulsoListComponent
    ]
})
export class ProcessoDocumentoAvulsoListModule {
}
