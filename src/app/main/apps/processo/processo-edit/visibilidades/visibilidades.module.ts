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
import {VisibilidadesComponent} from './visibilidades.component';
import {ProcessoService} from '@cdk/services/processo.service';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: VisibilidadesComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: './visibilidade-list/visibilidade-list.module#VisibilidadeListModule',
            },
            {
                path       : 'editar',
                loadChildren: './visibilidade-edit/visibilidade-edit.module#VisibilidadeEditModule',
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
        VisibilidadesComponent
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
        ProcessoService
    ],
    exports: [
        VisibilidadesComponent
    ]
})
export class VisibilidadesModule {
}
