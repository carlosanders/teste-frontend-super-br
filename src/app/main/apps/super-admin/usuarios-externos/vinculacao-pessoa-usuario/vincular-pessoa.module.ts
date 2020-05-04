import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VincularPessoaComponent} from './vincular-pessoa.component';
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
} from '../../../../../../@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '../../../../../../@cdk/shared.module';
import {VinculacaoPessoaUsuarioService} from '../../../../../../@cdk/services/vinculacao-pessoa-usuario.service';


const routes: Routes = [
    {
        path: '',
        component: VincularPessoaComponent,
        children: [
            {
                path: 'listar',
                loadChildren: () => import('./vinculacao-pessoa-usuario-list/vinculacao-pessoa-usuario-list.module').then(m => m.VinculacaoPessoaUsuarioListModule),
            },
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
    ],
    providers: [
    ]
})
export class VincularPessoaModule {
}
