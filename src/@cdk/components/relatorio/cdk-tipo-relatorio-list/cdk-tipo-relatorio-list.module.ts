import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSortModule, MatMenuModule, MatAutocompleteModule, MatRippleModule,
    MatExpansionModule
} from '@cdk/angular/material';

import { CdkSharedModule } from '@cdk/shared.module';
import { CdkTipoRelatorioListComponent } from './cdk-tipo-relatorio-list.component';
import { CdkTipoRelatorioListItemComponent } from './cdk-tipo-relatorio-list-item/cdk-tipo-relatorio-list-item.component';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@cdk/pipes/pipes.module';
import { CdkSidebarModule } from '@cdk/components/index';
import { CdkEspecieRelatorioAutocompleteModule } from '@cdk/components/especie-relatorio/cdk-especie-relatorio-autocomplete/cdk-especie-relatorio-autocomplete.module';
import { EspecieRelatorioService } from '@cdk/services/especie-relatorio.service';
import { ProcessoService } from '@cdk/services/processo.service';
import {CdkProcessoAutocompleteModule} from '@cdk/components/processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import { DndModule } from 'ngx-drag-drop';
import {MatTooltipModule} from '@angular/material/tooltip';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { AssuntoService } from '@cdk/services/assunto.service';
import {CdkTipoRelatorioFilterModule} from '../sidebars/cdk-tipo-relatorio-filter/cdk-tipo-relatorio-filter.module';

@NgModule({
    declarations: [
        CdkTipoRelatorioListComponent,
        CdkTipoRelatorioListItemComponent
    ],
    imports: [

        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatMenuModule,
        MatAutocompleteModule,

        DndModule,

        CdkEspecieRelatorioAutocompleteModule,
        CdkProcessoAutocompleteModule,

        TranslateModule,

        PipesModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatRippleModule,
        MatTooltipModule,
        InfiniteScrollModule,
        MatExpansionModule,

        CdkTipoRelatorioFilterModule
    ],
    providers: [
        EspecieRelatorioService,
        ProcessoService,
        AssuntoService
    ],
    exports: [
        CdkTipoRelatorioListComponent
    ]
})
export class CdkTipoRelatorioListModule {
}
