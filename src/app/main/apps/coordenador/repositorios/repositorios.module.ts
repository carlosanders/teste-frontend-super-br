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
import {CdkSharedModule} from '@cdk/shared.module';
import {RepositoriosComponent} from './repositorios.component';
import {RepositorioService} from '@cdk/services/repositorio.service';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: RepositoriosComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./repositorios-list/repositorios-list.module').then(m => m.RepositoriosListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./repositorios-edit/repositorios-edit.module').then(m => m.RepositoriosEditModule),
            },
            {
                path       : ':repositorioHandle/especie-setor',
                loadChildren: () => import('./repositorios-especie-setor/repositorios-especie-setor.module').then(m => m.RepositoriosEspecieSetorModule),
            },
            {
                path: '**',
                redirectTo: 'listar'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'listar'
    }
];

@NgModule({
    declarations: [
        RepositoriosComponent
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
        CdkSharedModule,
    ],
    providers: [
        RepositorioService
    ],
    exports: [
        RepositoriosComponent
    ]
})
export class RepositoriosModule {
}
