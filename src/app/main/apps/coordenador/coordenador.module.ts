import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule,
    MatIconModule, MatProgressSpinnerModule
} from '@cdk/angular/material';
import { TranslateModule } from '@ngx-translate/core';
import {MatRippleModule} from '@angular/material/core';

import { CdkSharedModule } from '@cdk/shared.module';
import { CdkSidebarModule } from '@cdk/components';

import * as fromGuards from './store/guards';
import { CoordenadorComponent } from './coordenador.component';
import { CommonModule } from '@angular/common';
import {CoordenadorMainSidebarComponent} from './sidebars/main/main-sidebar.component';
import {CoordenadorStoreModule} from './store/store.module';
import {ModeloService} from '@cdk/services/modelo.service';
import {UsuarioService} from '@cdk/services/usuario.service';
import {SetorService} from '@cdk/services/setor.service';
import {ModalidadeOrgaoCentralService} from "../../../../@cdk/services/modalidade-orgao-central.service";

const routes: Routes = [
    {
        path       : ':generoHandle',
        component: CoordenadorComponent,
        children: [
            {
                path       : ':entidadeHandle/modelos',
                loadChildren: () => import('./modelos/modelos.module').then(m => m.ModelosModule)
            },
            {
                path       : ':entidadeHandle/repositorios',
                loadChildren: () => import('./repositorios/repositorios.module').then(m => m.RepositoriosModule)
            },
            {
                path       : ':entidadeHandle/usuarios',
                loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule)
            },
            {
                path       : ':entidadeHandle/unidades',
                loadChildren: () => import('./unidades/unidades.module').then(m => m.UnidadesModule)
            },
            {
                path       : ':entidadeHandle/numeros-unicos-documentos',
                loadChildren: () => import('./numero-unico-documento/numero-unico-documento.module').then(m => m.NumeroUnicoDocumentoModule),
            },
            {
                path       : ':entidadeHandle/setor',
                loadChildren: () => import('./setor/setor.module').then(m => m.SetorModule)
            }
        ],
        canActivate: [fromGuards.ResolveGuard]
    },
    {
        path: '**',
        redirectTo: 'default'
    }
];

@NgModule({
    declarations   : [
        CoordenadorComponent,
        CoordenadorMainSidebarComponent
    ],
    imports        : [
        CommonModule,
        RouterModule.forChild(routes),
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        TranslateModule,
        CoordenadorStoreModule,
        CdkSharedModule,
        CdkSidebarModule,
        MatRippleModule
    ],
    providers      : [
        ModeloService,
        SetorService,
        UsuarioService,
        ModalidadeOrgaoCentralService,
        fromGuards.ResolveGuard
    ]
})
export class CoordenadorModule
{
}
