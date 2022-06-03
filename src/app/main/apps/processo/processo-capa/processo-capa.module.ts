import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';
import {ProcessoCapaComponent} from './processo-capa.component';
import {ProcessoService} from '@cdk/services/processo.service';
import {ProcessoCapaStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {CdkSetorGridModule} from '@cdk/components/setor/cdk-setor-grid/cdk-setor-grid.module';
import {CdkLocalizadorGridModule} from '@cdk/components/localizador/cdk-localizador-grid/cdk-localizador-grid.module';
import {CdkAssuntoGridModule} from '@cdk/components/assunto/cdk-assunto-grid/cdk-assunto-grid.module';
import {CdkDocumentoGridModule} from '@cdk/components/documento/cdk-documento-grid/cdk-documento-grid.module';
import {CdkInteressadoGridModule} from '@cdk/components/interessado/cdk-interessado-grid/cdk-interessado-grid.module';
import {MatGridListModule} from '@angular/material/grid-list';
import {CdkJuntadaGridModule} from '@cdk/components/juntada/cdk-juntada-grid/cdk-juntada-grid.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {CdkVinculacaoProcessoGridModule} from '@cdk/components/vinculacao-processo/cdk-vinculacao-processo-grid/cdk-vinculacao-processo-grid.module';
import {MatCardModule} from '@angular/material/card';
import {AcompanhamentoService} from '@cdk/services/acompanhamento.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {StatusBarramentoService} from '@cdk/services/status-barramento';
import {
    CdkVinculacaoProcessoTreeListModule
} from '@cdk/components/vinculacao-processo/cdk-vinculacao-processo-tree-list/cdk-vinculacao-processo-tree-list.module';

const routes: Routes = [
    {
        path: '',
        component: ProcessoCapaComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        ProcessoCapaComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatMenuModule,
        MatTooltipModule,

        TranslateModule,

        ProcessoCapaStoreModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatRippleModule,
        CdkSetorGridModule,
        CdkLocalizadorGridModule,
        CdkAssuntoGridModule,
        CdkDocumentoGridModule,
        CdkInteressadoGridModule,
        MatGridListModule,
        CdkJuntadaGridModule,
        MatCheckboxModule,
        CdkVinculacaoProcessoGridModule,
        MatCardModule,
        MatSlideToggleModule,
        CdkVinculacaoProcessoTreeListModule,
    ],
    providers: [
        ProcessoService,
        AcompanhamentoService,
        StatusBarramentoService,
        fromGuards.ResolveGuard
    ]
})
export class ProcessoCapaModule {
}
