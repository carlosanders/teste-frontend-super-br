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
import {DocumentoIdentificadorListComponent} from './documento-identificador-list.component';
import {DocumentoIdentificadorService} from '@cdk/services/documento-identificador.service';
import {RouterModule, Routes} from '@angular/router';
import {DocumentoIdentificadorListStoreModule} from 'app/main/apps/pessoa/pessoa-edit/documento-identificador/documento-identificador-list/store/store.module';
import * as fromGuards from 'app/main/apps/pessoa/pessoa-edit/documento-identificador/documento-identificador-list/store/guards';
import {CdkDocumentoIdentificadorGridModule} from '@cdk/components/documento-identificador/cdk-documento-identificador-grid/cdk-documento-identificador-grid.module';

const routes: Routes = [
    {
        path: '',
        component: DocumentoIdentificadorListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        DocumentoIdentificadorListComponent
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

        CdkDocumentoIdentificadorGridModule,

        DocumentoIdentificadorListStoreModule,
    ],
    providers: [
        DocumentoIdentificadorService,
        fromGuards.ResolveGuard
    ],
    exports: [
        DocumentoIdentificadorListComponent
    ]
})
export class DocumentoIdentificadorListModule {
}
