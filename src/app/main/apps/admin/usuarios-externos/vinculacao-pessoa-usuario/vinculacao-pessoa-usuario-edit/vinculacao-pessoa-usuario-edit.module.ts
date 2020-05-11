import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VinculacaoPessoaUsuarioEditComponent} from './vinculacao-pessoa-usuario-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {VinculacaoPessoaUsuarioEditStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {VinculacaoPessoaUsuarioService} from '@cdk/services/vinculacao-pessoa-usuario.service';
import {CdkVinculacaoPessoaUsuarioFormModule} from '../../../../../../../@cdk/components/vinculacao-pessoa-usuario/cdk-vinculacao-pessoa-usuario-form/cdk-vinculacao-pessoa-usuario-form.module';

const routes: Routes = [
    {
        path: '',
        component: VinculacaoPessoaUsuarioEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];


@NgModule({
    declarations: [VinculacaoPessoaUsuarioEditComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        VinculacaoPessoaUsuarioEditStoreModule,
        CdkVinculacaoPessoaUsuarioFormModule
    ],
    providers: [
        fromGuards.ResolveGuard,
        VinculacaoPessoaUsuarioService
    ]
})
export class VinculacaoPessoaUsuarioEditModule {
}
