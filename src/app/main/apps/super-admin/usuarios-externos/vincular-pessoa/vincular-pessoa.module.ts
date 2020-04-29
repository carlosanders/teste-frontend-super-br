import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VincularPessoaComponent} from './vincular-pessoa.component';
import {RouterModule, Routes} from '@angular/router';
import {UsuariosExternosComponent} from '../usuarios-externos.component';
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
} from '../../../../../../@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '../../../../../../@cdk/shared.module';


const routes: Routes = [
    {
        path: ':usuariosExternosHandler',
        component: VincularPessoaComponent,
        children: [
            {
                path: 'listar',
                loadChildren: () => import('./vincular-pessoa-list/vincular-pessoa-list.module').then(m => m.VincularPessoaListModule),
            },
            // {
            //     path       : 'editar',
            //     loadChildren: () => import('./usuarios-externos-edit/usuarios-externos-edit.module').then(m => m.UsuariosExternosEditModule),
            // },
            //
            {
                path: '**',
                redirectTo: 'listar'
            }
        ],
    }
];

@NgModule({
    declarations: [VincularPessoaComponent],
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
    ]
})
export class VincularPessoaModule {
}
