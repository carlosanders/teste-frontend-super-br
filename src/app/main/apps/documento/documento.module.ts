import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {DocumentoComponent} from './documento.component';
import {DocumentoService} from '@cdk/services/documento.service';
import {RouterModule, Routes} from '@angular/router';
import {DocumentoStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {DocumentoEditModule} from './documento-edit/documento-edit.module';
import {MatButtonModule, MatIconModule, MatSlideToggleModule, MatTooltipModule} from '@cdk/angular/material';
import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {CdkSidebarModule} from '@cdk/components';
import {CdkDocumentoCardListModule} from '@cdk/components/documento/cdk-documento-card-list/cdk-documento-card-list.module';
import {ModeloService} from '@cdk/services/modelo.service';
import {RepositorioService} from '@cdk/services/repositorio.service';
import {MatTabsModule} from '@angular/material/tabs';
import {modulesConfig} from 'modules/modules-config';
import {DocumentoModeloEditModule} from './modelo-edit/documento-modelo-edit.module';
import {ComponenteDigitalModule} from './componente-digital/componente-digital.module';

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
                loadChildren: () => import('./modelo-edit/documento-modelo-edit.module').then(m => m.DocumentoModeloEditModule)
            },
            {
                path       : 'template',
                loadChildren: () => import('./template-edit/documento-template-edit.module').then(m => m.DocumentoTemplateEditModule),
            },
            {
                path       : 'repositorio',
                loadChildren: () => import('./repositorio-edit/documento-repositorio-edit.module').then(m => m.DocumentoRepositorioEditModule),
            },
        ],
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/documento';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        DocumentoComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,
        TranslateModule,
        CdkSharedModule,
        DocumentoEditModule,
        DocumentoStoreModule,
        ComponenteDigitalModule,

        CdkDocumentoCardListModule,

        CdkSidebarModule,
        MatTooltipModule,
        MatSlideToggleModule,
        MatTabsModule,

        DocumentoModeloEditModule
    ],
    providers: [
        DocumentoService,
        DocumentoAvulsoService,
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
