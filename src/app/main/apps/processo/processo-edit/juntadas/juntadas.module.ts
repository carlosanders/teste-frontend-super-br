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
import {JuntadasComponent} from './juntadas.component';
import {JuntadaService} from '@cdk/services/juntada.service';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: JuntadasComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: './juntada-list/juntada-list.module#JuntadaListModule',
            },
            {
                path       : 'desentranhar',
                loadChildren: './desentranhamento-create-bloco/desentranhamento-create-bloco.module#DesentranhamentoCreateBlocoModule',
            },
            {
                path       : 'copiar',
                loadChildren: './documento-copia-create-bloco/documento-copia-create-bloco.module#DocumentoCopiaCreateBlocoModule',
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
        JuntadasComponent
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
        JuntadaService
    ],
    exports: [
        JuntadasComponent
    ]
})
export class JuntadasModule {
}
