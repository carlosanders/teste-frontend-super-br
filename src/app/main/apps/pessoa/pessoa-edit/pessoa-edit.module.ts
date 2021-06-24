import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule, MatIconModule} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import {PessoaEditMainSidebarComponent} from './sidebars/main/main-sidebar.component';
import {PessoaEditComponent} from './pessoa-edit.component';
import {CommonModule} from '@angular/common';
import * as fromGuards from './dados-pessoa-edit/store/guards';
import {PessoaService} from '@cdk/services/pessoa.service';
import {modulesConfig} from 'modules/modules-config';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatRippleModule} from '@angular/material/core';

const routes: Routes = [
    {
        path: ':pessoaHandle',
        component: PessoaEditComponent,
        children: [
            {
                path       : 'dados-pessoa',
                loadChildren: () => import('./dados-pessoa-edit/dados-pessoa-edit.module').then(m => m.DadosPessoaEditModule),
                canActivate: [fromGuards.ResolveGuard]
            },
            {
                path       : 'documentos',
                loadChildren: () => import('./documento-identificador/documento-identificador.module').then(m => m.DocumentoIdentificadorModule),
                canActivate: [fromGuards.ResolveGuard]
            },
            {
                path       : 'enderecos',
                loadChildren: () => import('./enderecos/enderecos.module').then(m => m.EnderecosModule),
                canActivate: [fromGuards.ResolveGuard]
            },
            {
                path       : 'relacionamentos',
                loadChildren: () => import('./relacionamentos/relacionamento.module').then(m => m.RelacionamentoModule),
                canActivate: [fromGuards.ResolveGuard]
            },
            {
                path       : 'nomes',
                loadChildren: () => import('./nomes/nomes.module').then(m => m.NomesModule),
                canActivate: [fromGuards.ResolveGuard]
            },
            {
                path: 'vinculacao-pessoa-barramento',
                loadChildren: () => import(
                    './vinculacao-pessoa-barramento/vinculacao-pessoa-barramento.module'
                    ).then(m => m.VinculacaoPessoaBarramentoModule)
            }
        ]
    }
];

const path = 'app/main/apps/pessoa/pessoa-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

routes[0].children.push({
    path: '**',
    redirectTo: 'dados-pessoa'
});

@NgModule({
    declarations   : [
        PessoaEditComponent,
        PessoaEditMainSidebarComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
        MatRippleModule
    ],
    providers      : [
        PessoaService,
        fromGuards.ResolveGuard
    ]
})
export class PessoaEditModule
{}
