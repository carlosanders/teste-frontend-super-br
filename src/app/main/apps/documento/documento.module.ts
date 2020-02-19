import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {DocumentoComponent} from './documento.component';
import {DocumentoService} from '@cdk/services/documento.service';
import {RouterModule, Routes} from '@angular/router';
import {DocumentoStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {DocumentoEditModule} from './documento-edit/documento-edit.module';
import {MatButtonModule, MatIconModule, MatSlideToggleModule, MatTooltipModule} from '@cdk/angular/material';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {FuseSidebarModule} from '@fuse/components';
import {CdkDocumentoCardListModule} from '@cdk/components/documento/cdk-documento-card-list/cdk-documento-card-list.module';
import {ModeloService} from '@cdk/services/modelo.service';
import {RepositorioService} from '@cdk/services/repositorio.service';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';

const routes: Routes = [
    {
        path: ':documentoHandle',
        component: DocumentoComponent,
        children: [
            {
                path       : 'editar',
                loadChildren: () => import('./documento-edit/documento-edit.module').then(m => m.DocumentoEditModule),
            },
            {
                path       : 'oficio',
                loadChildren: () => import('./documento-avulso-edit/documento-avulso-edit.module').then(m => m.DocumentoAvulsoEditModule),
            },
            {
                path       : 'modelo',
                loadChildren: () => import('./modelo-edit/documento-modelo-edit.module').then(m => m.DocumentoModeloEditModule),
            },
            {
                path       : 'repositorio',
                loadChildren: () => import('./repositorio-edit/documento-repositorio-edit.module').then(m => m.DocumentoRepositorioEditModule),
            },
            {
                path : '**',
                redirectTo: 'editar'
            }
        ],
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        DocumentoComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,
        TranslateModule,
        FuseSharedModule,
        DocumentoEditModule,
        DocumentoStoreModule,

        CdkDocumentoCardListModule,

        FuseSidebarModule,
        MatTooltipModule,
        MatSlideToggleModule
    ],
    providers: [
        DocumentoService,
        DocumentoAvulsoService,
        ComponenteDigitalService,
        ModeloService,
        RepositorioService,
        fromGuards.ResolveGuard
    ],
    exports: [
        DocumentoComponent
    ]
})
export class DocumentoModule {
}
