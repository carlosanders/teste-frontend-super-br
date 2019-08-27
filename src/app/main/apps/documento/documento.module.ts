import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {DocumentoComponent} from './documento.component';
import {DocumentoService} from '@cdk/services/documento.service';
import {RouterModule, Routes} from '@angular/router';
import {DocumentoStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {DocumentoEditModule} from './documento-edit/documento-edit.module';
import {MatButtonModule, MatIconModule, MatTooltipModule} from '@angular/material';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {FuseSidebarModule} from '@fuse/components';
import {CdkDocumentoCardListModule} from '@cdk/components/documento/cdk-documento-card-list/cdk-documento-card-list.module';
import {ModeloService} from '@cdk/services/modelo.service';
import {RepositorioService} from '@cdk/services/repositorio.service';
import {ComponenteDigitalService} from '../../../../@cdk/services/componente-digital.service';

const routes: Routes = [
    {
        path: ':documentoHandle',
        component: DocumentoComponent,
        children: [
            {
                path       : 'editar',
                loadChildren: './documento-edit/documento-edit.module#DocumentoEditModule',
            },
            {
                path       : 'oficio',
                loadChildren: './documento-avulso-edit/documento-avulso-edit.module#DocumentoAvulsoEditModule',
            },
            {
                path       : 'modelo',
                loadChildren: './modelo-edit/documento-modelo-edit.module#DocumentoModeloEditModule',
            },
            {
                path       : 'repositorio',
                loadChildren: './repositorio-edit/documento-repositorio-edit.module#DocumentoRepositorioEditModule',
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
        MatTooltipModule
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
