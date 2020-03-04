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
import {EnderecosComponent} from './enderecos.component';
import {EnderecoService} from '@cdk/services/endereco.service';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: EnderecosComponent,
        children: [
            {
                path       : 'listar',
                loadChildren: () => import('./endereco-list/endereco-list.module').then(m => m.EnderecoListModule),
            },
            {
                path       : 'editar',
                loadChildren: () => import('./endereco-edit/endereco-edit.module').then(m => m.EnderecoEditModule),
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
        EnderecosComponent
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
        EnderecoService
    ],
    exports: [
        EnderecosComponent
    ]
})
export class EnderecosModule {
}
