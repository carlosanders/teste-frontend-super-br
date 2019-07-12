import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule,
    MatIconModule
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';

import { PessoaEditMainSidebarComponent } from './sidebars/main/main-sidebar.component';
import { PessoaEditComponent } from './pessoa-edit.component';
import { CommonModule } from '@angular/common';
import * as fromGuards from './dados-pessoa-edit/store/guards';
import {PessoaService} from '@cdk/services/pessoa.service';


const routes: Routes = [
    {
        path: ':pessoaHandle',
        component: PessoaEditComponent,
        children: [
            {
                path       : 'dados-pessoa',
                loadChildren: './dados-pessoa-edit/dados-pessoa-edit.module#DadosPessoaEditModule',
                canActivate: [fromGuards.ResolveGuard]
            },
            {
                path       : 'documentos',
                loadChildren: './documento-identificador/documento-identificador.module#DocumentoIdentificadorModule',
                canActivate: [fromGuards.ResolveGuard]
            },
            {
                path       : 'enderecos',
                loadChildren: './enderecos/enderecos.module#EnderecosModule',
                canActivate: [fromGuards.ResolveGuard]
            },
            {
                path       : 'relacionamentos',
                loadChildren: './relacionamentos/relacionamento.module#RelacionamentoModule',
                canActivate: [fromGuards.ResolveGuard]
            },
            {
                path       : 'nomes',
                loadChildren: './nomes/nomes.module#NomesModule',
                canActivate: [fromGuards.ResolveGuard]
            },
            {
                path       : '**',
                redirectTo: 'dados-pessoa'
            }
        ]
    }
];

@NgModule({
    declarations   : [
        PessoaEditComponent,
        PessoaEditMainSidebarComponent
    ],
    imports        : [
        CommonModule,
        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,

        TranslateModule,

        FuseSharedModule,
        FuseSidebarModule
    ],
    providers      : [
        PessoaService,
        fromGuards.ResolveGuard
    ]
})
export class PessoaEditModule
{
}
