import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatProgressSpinnerModule, MatTooltipModule
} from '@cdk/angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';

import * as fromGuards from 'app/main/apps/oficios/store/guards/index';
import { ProcessosStoreModule } from 'app/main/apps/oficios/store/store.module';
import { FolderService } from '@cdk/services/folder.service';
import { ProcessoService } from '@cdk/services/processo.service';
import { SetorService } from '@cdk/services/setor.service';
import { UsuarioService } from '@cdk/services/usuario.service';
import { PipesModule } from '@cdk/pipes/pipes.module';
import { ResizableModule } from 'angular-resizable-element';
import { CdkDocumentoAvulsoListModule } from '@cdk/components/documento-avulso/cdk-documento-avulso-list/cdk-documento-avulso-list.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CdkEtiquetaChipsModule } from '@cdk/components/etiqueta/cdk-etiqueta-chips/cdk-etiqueta-chips.module';
import { DndModule } from 'ngx-drag-drop';
import { LoginService } from '../../auth/login/login.service';
import { OficiosComponent } from './oficios.component';
import { DocumentoAvulsoMainSidebarComponent } from './sidebars/main/main-sidebar.component';
import {DocumentoAvulsoService} from '../../../../@cdk/services/documento-avulso.service';
import {OficioDetailModule} from './oficio-detail/oficio-detail.module';

const routes: Routes = [
    {
        path: '',
        component: OficiosComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./oficio-empty/oficio-empty.module').then(m => m.OficioEmptyModule)
            },
            {
                path: 'documento-avulso',
                loadChildren: () => import('./oficio-detail/oficio-detail.module').then(m => m.OficioDetailModule),
                // canActivate: [fromGuards.ResolveGuard]
            },
        ]
        /*canActivate: [fromGuards.ResolveGuard]*/
    },
    {
        path: '**',
        redirectTo: 'entrada'
    }
];

@NgModule({
    declarations: [
        OficiosComponent,
        DocumentoAvulsoMainSidebarComponent,
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSelectModule,
        MatToolbarModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatTooltipModule,

        DndModule,

        CdkEtiquetaChipsModule,
        CdkDocumentoAvulsoListModule,

        TranslateModule,

        ResizableModule,

        PipesModule,

        InfiniteScrollModule,

        FuseSharedModule,
        FuseSidebarModule,

        ProcessosStoreModule,
        OficioDetailModule
    ],
    providers: [
        FolderService,
        ProcessoService,
        DocumentoAvulsoService,

        SetorService,
        UsuarioService,
        LoginService,

    ]
})
export class OficiosModule {
}
