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
import {DocumentosAvulsosComponent} from './documentos-avulsos.component';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {RouterModule, Routes} from '@angular/router';
import {EspecieDocumentoAvulsoService} from '@cdk/services/especie-documento-avulso.service';

const routes: Routes = [
    {
        path: '',
        component: DocumentosAvulsosComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: './documento-avulso-list/processo-documento-avulso-list.module#ProcessoDocumentoAvulsoListModule',
            },
            {
                path       : 'editar',
                loadChildren: './documento-avulso-edit/processo-documento-avulso-edit.module#ProcessoDocumentoAvulsoEditModule',
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    }

];

@NgModule({
    declarations: [
        DocumentosAvulsosComponent
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
    ],
    providers: [
        DocumentoAvulsoService,
        EspecieDocumentoAvulsoService
    ],
    exports: [
        DocumentosAvulsosComponent
    ]
})
export class ProcessoDocumentosAvulsosModule {
}
