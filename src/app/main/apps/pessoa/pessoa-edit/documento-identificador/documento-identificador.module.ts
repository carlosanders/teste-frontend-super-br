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
import {DocumentoIdentificadorComponent} from './documento-identificador.component';
import {DocumentoIdentificadorService} from '@cdk/services/documento-identificador.service';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: DocumentoIdentificadorComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: './documento-identificador-list/documento-identificador-list.module#DocumentoIdentificadorListModule',
            },
            {
                path       : 'editar',
                loadChildren: './documento-identificador-edit/documento-identificador-edit.module#DocumentoIdentificadorEditModule',
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
        DocumentoIdentificadorComponent
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
        DocumentoIdentificadorService
    ],
    exports: [
        DocumentoIdentificadorComponent
    ]
})
export class DocumentoIdentificadorModule {
}
