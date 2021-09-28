import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule, MatIconModule, MatProgressSpinnerModule} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {MatRippleModule} from '@angular/material/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import * as fromGuards from './store/guards';
import {CoordenadorComponent} from './coordenador.component';
import {CommonModule} from '@angular/common';
import {CoordenadorMainSidebarComponent} from './sidebars/main/main-sidebar.component';
import {CoordenadorStoreModule} from './store/store.module';
import {ModeloService} from '@cdk/services/modelo.service';
import {UsuarioService} from '@cdk/services/usuario.service';
import {SetorService} from '@cdk/services/setor.service';
import {ModalidadeOrgaoCentralService} from '@cdk/services/modalidade-orgao-central.service';
import {modulesConfig} from 'modules/modules-config';
import {AvisoService} from '@cdk/services/aviso.service';

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
                path       : ':entidadeHandle/etiquetas',
                loadChildren: () => import('./etiquetas/etiquetas.module').then(m => m.EtiquetasModule)
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
            },
            {
                path       : ':entidadeHandle/avisos',
                loadChildren: () => import('./avisos/aviso.module').then(m => m.AvisoModule)
            },
            {
                path       : ':entidadeHandle/contas-email',
                loadChildren: () => import('./contas-email/contas-email.module').then(m => m.ContasEmailModule)
            }
        ],
        canActivate: [fromGuards.ResolveGuard]
    },
    {
        path: '**',
        redirectTo: 'default'
    }
];

const path = 'app/main/apps/coordenador';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

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
        AvisoService,
        ModalidadeOrgaoCentralService,
        fromGuards.ResolveGuard
    ]
})
export class CoordenadorModule
{
}
