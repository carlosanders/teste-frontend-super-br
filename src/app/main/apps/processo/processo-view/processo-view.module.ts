import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
    MatAutocompleteModule,
    MatButtonModule, MatFormFieldModule,
    MatIconModule, MatInputModule, MatMenuModule, MatProgressSpinnerModule, MatRippleModule, MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import {ProcessoViewComponent} from './processo-view.component';
import {JuntadaService} from '@cdk/services/juntada.service';
import {VinculacaoDocumentoService} from '@cdk/services/vinculacao-documento.service';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {CdkUploadModule} from '@cdk/components/upload/cdk-upload.module';
import {ProcessoViewMainSidebarComponent} from './sidebars/main/main-sidebar.component';
import {ProcessoViewStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {CdkVolumeAutocompleteModule} from '@cdk/components/volume/cdk-volume-autocomplete/cdk-volume-autocomplete.module';
import {modulesConfig} from 'modules/modules-config';
import {CdkModeloAutocompleteModule} from '@cdk/components/modelo/cdk-modelo-autocomplete/cdk-modelo-autocomplete.module';
import {CdkComponenteDigitalCardListModule} from '@cdk/components/componente-digital/cdk-componente-digital-card-list/cdk-componente-digital-card-list.module';
import {CdkTipoDocumentoAutocompleteModule} from '@cdk/components/tipo-documento/cdk-tipo-documento-autocomplete/cdk-tipo-documento-autocomplete.module';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatExpansionModule} from '@cdk/angular/material';
import {MatChipsModule} from '@cdk/angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import {CdkAssinaturaEletronicaPluginComponent} from '@cdk/components/componente-digital/cdk-componente-digital-ckeditor/cdk-plugins/cdk-assinatura-eletronica-plugin/cdk-assinatura-eletronica-plugin.component';
import {CdkAssinaturaEletronicaPluginModule} from '@cdk/components/componente-digital/cdk-componente-digital-ckeditor/cdk-plugins/cdk-assinatura-eletronica-plugin/cdk-assinatura-eletronica-plugin.module';

const routes: Routes = [
    {
        path: ':stepHandle',
        component: ProcessoViewComponent,
        canActivate: [fromGuards.ResolveGuard],
        children: [
            {
                path       : 'mostrar',
                loadChildren: () => import('../processo-capa/processo-capa.module').then(m => m.ProcessoCapaModule)
            },
            {
                path       : 'documento',
                loadChildren: () => import('app/main/apps/documento/documento.module').then(m => m.DocumentoModule),
            },
            {
                path       : 'oficio',
                loadChildren: () => import('app/main/apps/documento-avulso/documento-avulso-create/documento-avulso-create.module')
                    .then(m => m.DocumentoAvulsoCreateModule)
            },
            {
                path       : 'modelos',
                loadChildren: () => import('app/main/apps/modelo/modelo.module').then(m => m.ModeloModule)
            },
            {
                path       : 'vincular',
                loadChildren: () => import('app/main/apps/processo/processo-edit/juntadas/vinculacao-documento-create/vinculacao-documento-create.module')
                    .then(m => m.VinculacaoDocumentoCreateModule)
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'default'
    }
];

const path = 'app/main/apps/processo/processo-view';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        ProcessoViewComponent,
        ProcessoViewMainSidebarComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatMenuModule,
        MatAutocompleteModule,
        MatInputModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatDialogModule,

        InfiniteScrollModule,

        TranslateModule,

        ProcessoViewStoreModule,
        CdkAssinaturaEletronicaPluginModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatRippleModule,
        CdkVolumeAutocompleteModule,
        CdkModeloAutocompleteModule,
        CdkUploadModule,
        CdkComponenteDigitalCardListModule,
        CdkTipoDocumentoAutocompleteModule,
        MatProgressBarModule,
        MatExpansionModule,
        MatChipsModule
    ],
    providers: [
        JuntadaService,
        VinculacaoDocumentoService,
        ComponenteDigitalService,
        fromGuards.ResolveGuard
    ],
    entryComponents: [
        CdkAssinaturaEletronicaPluginComponent
    ]
})
export class ProcessoViewModule {
}
