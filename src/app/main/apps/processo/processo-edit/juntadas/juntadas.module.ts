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
                loadChildren: () => import('./juntada-list/juntada-list.module').then(m => m.JuntadaListModule),
            },
            {
                path       : 'desentranhar',
                loadChildren: () => import('./desentranhamento-create-bloco/desentranhamento-create-bloco.module').then(m => m.DesentranhamentoCreateBlocoModule),
            },
            {
                path       : 'copiar',
                loadChildren: () => import('./documento-copia-create-bloco/documento-copia-create-bloco.module').then(m => m.DocumentoCopiaCreateBlocoModule),
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
