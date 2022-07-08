import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {VisualizarProcessoComponent} from './visualizar-processo.component';
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
import {VisualizarProcessoStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';

import {modulesConfig} from 'modules/modules-config';
import {CdkSearchBarModule, CdkSidebarModule} from '@cdk/components';
import {CdkProcessoSearchAutocompleteModule} from '@cdk/components/processo/cdk-processo-search-autocomplete/cdk-processo-search-autocomplete.module';
import {MatSelectModule} from '@angular/material/select';
import {ProcessoService} from '@cdk/services/processo.service';
import {VisualizarProcessoMainSidebarComponent} from './sidebars/main/main-sidebar.component';
import {PdfJsViewerModule} from 'ng2-pdfjs-viewer';
import {AssinaturaService} from '@cdk/services/assinatura.service';
import {
    CdkAssinaturaGridModule
} from '@cdk/components/assinatura/cdk-assinatura-grid/cdk-assinatura-grid.module';
import {BookmarkService} from '@cdk/services/bookmark.service';
import {CdkBookmarkEditDialogModule} from '@cdk/components/bookmark/cdk-bookmark-edit-dialog/cdk-bookmark-edit-dialog.module';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {CdkVolumeAutocompleteModule} from '@cdk/components/volume/cdk-volume-autocomplete/cdk-volume-autocomplete.module';
import {CdkTipoDocumentoAutocompleteModule} from '@cdk/components/tipo-documento/cdk-tipo-documento-autocomplete/cdk-tipo-documento-autocomplete.module';
import {CdkUsuarioAutocompleteModule} from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkSetorAutocompleteModule} from '@cdk/components/setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {JuntadaService} from '@cdk/services/juntada.service';
import {
    CdkVinculacaoProcessoTreeListModule
} from '@cdk/components/vinculacao-processo/cdk-vinculacao-processo-tree-list/cdk-vinculacao-processo-tree-list.module';
import {
    CdkInteressadoGridModule
} from '@cdk/components/interessado/cdk-interessado-grid/cdk-interessado-grid.module';
import {CdkAssuntoGridModule} from '@cdk/components/assunto/cdk-assunto-grid/cdk-assunto-grid.module';
import {CdkJuntadaGridModule} from '@cdk/components/juntada/cdk-juntada-grid/cdk-juntada-grid.module';
import {VinculacaoProcessoService} from '@cdk/services/vinculacao-processo.service';
import {StatusBarramentoService} from '@cdk/services/status-barramento';

const routes: Routes = [
    {
        path: ':processoViewHandle',
        component: VisualizarProcessoComponent,
        canActivate: [fromGuards.ResolveGuard],
        canDeactivate: [fromGuards.DeactivateGuard]
    }
];

const path = 'app/main/apps/documento/visualizar-processo';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        VisualizarProcessoComponent,
        VisualizarProcessoMainSidebarComponent
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

        VisualizarProcessoStoreModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatRippleModule,
        CdkVolumeAutocompleteModule,

        MatProgressSpinnerModule,
        CdkSearchBarModule,
        CdkProcessoSearchAutocompleteModule,
        CdkTipoDocumentoAutocompleteModule,
        MatProgressBarModule,
        MatExpansionModule,
        MatChipsModule,
        MatCardModule,
        CdkUsuarioAutocompleteModule,
        CdkSetorAutocompleteModule,
        MatSelectModule,
        CdkBookmarkEditDialogModule,
        PdfJsViewerModule,
        CdkAssinaturaGridModule,
        CdkVinculacaoProcessoTreeListModule,
        CdkInteressadoGridModule,
        CdkAssuntoGridModule,
        CdkJuntadaGridModule
    ],
    providers: [
        ProcessoService,
        JuntadaService,
        fromGuards.ResolveGuard,
        fromGuards.DeactivateGuard,
        BookmarkService,
        AssinaturaService,
        VinculacaoProcessoService,
        StatusBarramentoService,
    ],
    exports: [
        VisualizarProcessoComponent
    ]
})
export class VisualizarProcessoModule {
}
