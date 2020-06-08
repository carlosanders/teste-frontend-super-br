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

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkTipoRelatorioListComponent} from './cdk-tipo-relatorio-list.component';
import {CdkTipoRelatorioListItemComponent} from './cdk-tipo-relatorio-list-item/cdk-tipo-relatorio-list-item.component';
import {TranslateModule} from '@ngx-translate/core';
import {PipesModule} from '@cdk/pipes/pipes.module';
import {CdkSidebarModule} from '../..';
import {CdkEspecieRelatorioAutocompleteModule} from '@cdk/components/especie-relatorio/cdk-especie-relatorio-autocomplete/cdk-especie-relatorio-autocomplete.module';
import {EspecieRelatorioService} from '@cdk/services/especie-relatorio.service';
import {DndModule} from 'ngx-drag-drop';
import {MatTooltipModule} from '@angular/material/tooltip';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
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
        EspecieRelatorioService
    ],
    exports: [
        CdkTipoRelatorioListComponent
    ]
})
export class CdkTipoRelatorioListModule {
}
