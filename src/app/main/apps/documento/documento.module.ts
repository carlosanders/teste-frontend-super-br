import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {DocumentoComponent} from './documento.component';
import {DocumentoService} from '@cdk/services/documento.service';
import {RouterModule, Routes} from '@angular/router';
import {DocumentoStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {DocumentoEditModule} from './documento-edit/documento-edit.module';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {FuseSidebarModule} from '@fuse/components';
import {CdkDocumentoCardListModule} from '@cdk/components/documento/cdk-documento-card-list/cdk-documento-card-list.module';

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

        FuseSidebarModule
    ],
    providers: [
        DocumentoService,
        DocumentoAvulsoService,
        fromGuards.ResolveGuard
    ],
    exports: [
        DocumentoComponent
    ]
})
export class DocumentoModule {
}
