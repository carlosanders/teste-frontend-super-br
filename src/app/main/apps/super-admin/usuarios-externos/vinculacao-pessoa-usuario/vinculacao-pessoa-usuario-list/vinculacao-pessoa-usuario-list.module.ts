import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VinculacaoPessoaUsuarioListComponent} from './vinculacao-pessoa-usuario-list.component';
import {RouterModule, Routes} from '@angular/router';
import {UsuariosExternosListComponent} from '../../usuarios-externos-list/usuarios-externos-list.component';
import * as fromGuards from './store/guards';
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
} from '../../../../../../../@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '../../../../../../../@cdk/shared.module';
import {CdkPessoaGridModule} from '../../../../../../../@cdk/components/pessoa/cdk-pessoa-grid/cdk-pessoa-grid.module';
import {CdkVinculacaoPessoaUsuarioGridModule} from '../../../../../../../@cdk/components/vinculacao-pessoa-usuario/cdk-vinculacao-pessoa-usuario-grid/cdk-vinculacao-pessoa-usuario-grid.module';
import {VinculacaoPessoaUsuarioService} from '../../../../../../../@cdk/services/vinculacao-pessoa-usuario.service';
import {VinculacaoPessoaUsuarioStoreModule} from './store/store.module';

const routes: Routes = [
    {
        path: '',
        component: VinculacaoPessoaUsuarioListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [VinculacaoPessoaUsuarioListComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        VinculacaoPessoaUsuarioStoreModule,

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
        CdkPessoaGridModule,
        CdkVinculacaoPessoaUsuarioGridModule,
    ],
    providers: [
        fromGuards.ResolveGuard,
        VinculacaoPessoaUsuarioService
    ]
})
export class VinculacaoPessoaUsuarioListModule {
}
