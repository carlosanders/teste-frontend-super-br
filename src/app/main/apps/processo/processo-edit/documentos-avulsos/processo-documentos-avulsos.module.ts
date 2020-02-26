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
    MatExpansionModule, MatTooltipModule
} from '@cdk/angular/material';
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
                loadChildren: () => import('./documento-avulso-list/processo-documento-avulso-list.module').then(m => m.ProcessoDocumentoAvulsoListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./documento-avulso-edit/processo-documento-avulso-edit.module').then(m => m.ProcessoDocumentoAvulsoEditModule),
            },
            {
                path       : 'responder',
                loadChildren: () => import('./upload-bloco/documento-avulso-upload-bloco.module').then(m => m.DocumentoAvulsoUploadBlocoModule),
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
        MatTooltipModule,
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
