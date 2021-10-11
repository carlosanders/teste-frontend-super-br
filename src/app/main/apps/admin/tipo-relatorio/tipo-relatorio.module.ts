import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {TipoRelatorioComponent} from './tipo-relatorio.component';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {LoginService} from '../../../auth/login/login.service';

const routes: Routes = [
    {
        path: '',
        component: TipoRelatorioComponent,
        children: [
            {
                path: 'listar',
                loadChildren: () => import('./tipo-relatorio-list/tipo-relatorio-list.module').then(m => m.TipoRelatorioListModule),
            },
            {
                path: 'editar',
                loadChildren: () => import('./tipo-relatorio-edit/tipo-relatorio-edit.module').then(m => m.TipoRelatorioEditModule),
            },
            {
                path: 'visibilidade',
                loadChildren: () => import('./visibilidades/visibilidades.module').then(m => m.VisibilidadesModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ],
    }
];


@NgModule({
    declarations: [TipoRelatorioComponent],
    imports: [
        CommonModule,
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
        CdkSharedModule,
    ],
    providers: [
        LoginService
    ]
})
export class TipoRelatorioModule {
}
