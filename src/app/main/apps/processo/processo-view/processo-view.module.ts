import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';
import {DndModule} from 'ngx-drag-drop';
import {ProcessoViewComponent} from './processo-view.component';
import {JuntadaService} from '@cdk/services/juntada.service';
import {VinculacaoDocumentoService} from '@cdk/services/vinculacao-documento.service';
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
import {MatDialogModule} from '@angular/material/dialog';
import {CdkAssinaturaEletronicaPluginComponent} from '@cdk/components/componente-digital/cdk-componente-digital-ckeditor/cdk-plugins/cdk-assinatura-eletronica-plugin/cdk-assinatura-eletronica-plugin.component';
import {CdkAssinaturaEletronicaPluginModule} from '@cdk/components/componente-digital/cdk-componente-digital-ckeditor/cdk-plugins/cdk-assinatura-eletronica-plugin/cdk-assinatura-eletronica-plugin.module';
import {MatCardModule} from '@angular/material/card';
import {CdkUploadDialogModule} from '@cdk/components/documento/cdk-upload-dialog/cdk-upload-dialog.module';
import {CdkUsuarioAutocompleteModule} from '../../../../../@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkSetorAutocompleteModule} from '../../../../../@cdk/components/setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {MatSelectModule} from '@angular/material/select';
import {NgxExtendedPdfViewerModule, NgxExtendedPdfViewerService} from 'ngx-extended-pdf-viewer';
import {CdkBookmarkEditDialogModule} from '@cdk/components/bookmark/cdk-bookmark-edit-dialog/cdk-bookmark-edit-dialog.module';
import {BookmarkService} from '@cdk/services/bookmark.service';

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
                loadChildren: () => import('app/main/apps/modelos/modelos.module').then(m => m.ModelosModule)
            },
            {
                path       : 'vincular',
                loadChildren: () => import('./vinculacao-documento/vinculacao-documento.module').then(m => m.VinculacaoDocumentoModule)
            },
            {
                path       : 'desentranhar',
                loadChildren: () => import('./desentranhamento/desentranhamento.module').then(m => m.DesentranhamentoModule)
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
        DndModule,

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
        CdkUploadDialogModule,
        CdkComponenteDigitalCardListModule,
        CdkTipoDocumentoAutocompleteModule,
        MatProgressBarModule,
        MatExpansionModule,
        MatChipsModule,
        MatCardModule,
        CdkUsuarioAutocompleteModule,
        CdkSetorAutocompleteModule,
        MatSelectModule,
        NgxExtendedPdfViewerModule,
        CdkBookmarkEditDialogModule
    ],
    providers: [
        JuntadaService,
        VinculacaoDocumentoService,
        fromGuards.ResolveGuard,
        NgxExtendedPdfViewerService,
        BookmarkService
    ],
    entryComponents: [
        CdkAssinaturaEletronicaPluginComponent
    ]
})
export class ProcessoViewModule {
}
