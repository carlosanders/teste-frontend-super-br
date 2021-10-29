import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClassificacaoComponent} from './classificacao.component';
import {RouterModule, Routes} from '@angular/router';
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
import {MatRippleModule} from '@angular/material/core';
import {CdkSidebarModule} from '@cdk/components';
import {MatTabsModule} from '@angular/material/tabs';

const routes: Routes = [
    {
        path: '',
        component: ClassificacaoComponent,
        children: [
            {
                path: 'listar',
                loadChildren: () => import('./classificacao-list/classificacao-list.module').then(m => m.ClassificacaoListModule),
            },
            {
                path: 'editar',
                loadChildren: () => import('./classificacao-edit/classificacao-edit.module').then(m => m.ClassificacaoEditModule),
            },
            {
                path: 'arvore',
                loadChildren: () => import('./classificacao-tree-list/classificacao-tree-list.module').then(m => m.ClassificacaoTreeListModule),
            },
            {
                path: ':classificacaoHandle/acessos',
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
    declarations: [
        ClassificacaoComponent
    ],
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
        MatRippleModule,
        CdkSidebarModule,
        MatTabsModule,
    ]
})
export class ClassificacaoModule {
}
