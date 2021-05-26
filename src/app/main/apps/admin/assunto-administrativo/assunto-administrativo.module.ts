import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AssuntoAdministrativoComponent} from './assunto-administrativo.component';
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
        component: AssuntoAdministrativoComponent,
        children: [
            {
                path: 'listar',
                loadChildren: () => import('./assunto-administrativo-list/assunto-administrativo-list.module').then(m => m.AssuntoAdministrativoListModule),
            },
            {
                path: 'editar',
                loadChildren: () => import('./assunto-administrativo-edit/assunto-administrativo-edit.module').then(m => m.AssuntoAdministrativoEditModule),
            },
            {
                path: 'arvore',
                loadChildren: () => import('./assunto-administrativo-tree-list/assunto-administrativo-tree-list.module').then(m => m.AssuntoAdministrativoTreeListModule),
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
        AssuntoAdministrativoComponent
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
export class AssuntoAdministrativoModule {
}
