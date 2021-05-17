import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VinculacaoPessoaUsuarioEditComponent} from './vinculacao-pessoa-usuario-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {VinculacaoPessoaUsuarioEditStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {VinculacaoPessoaUsuarioService} from '@cdk/services/vinculacao-pessoa-usuario.service';
import {CdkVinculacaoPessoaUsuarioFormModule} from '@cdk/components/vinculacao-pessoa-usuario/cdk-vinculacao-pessoa-usuario-form/cdk-vinculacao-pessoa-usuario-form.module';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: '',
        component: VinculacaoPessoaUsuarioEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/usuarios-externos/vinculacao-pessoa-usuario/vinculacao-pessoa-usuario-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [VinculacaoPessoaUsuarioEditComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        VinculacaoPessoaUsuarioEditStoreModule,
        CdkVinculacaoPessoaUsuarioFormModule,
        PathModule
    ],
    providers: [
        fromGuards.ResolveGuard,
        VinculacaoPessoaUsuarioService
    ]
})
export class VinculacaoPessoaUsuarioEditModule {
}
