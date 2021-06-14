import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSortModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkRelatorioListComponent} from './cdk-relatorio-list.component';
import {CdkRelatorioListItemComponent} from './cdk-relatorio-list-item/cdk-relatorio-list-item.component';
import {TranslateModule} from '@ngx-translate/core';
import {PipesModule} from '@cdk/pipes/pipes.module';
import {CdkSidebarModule} from '../..';
import {CdkEspecieRelatorioAutocompleteModule} from '@cdk/components/especie-relatorio/cdk-especie-relatorio-autocomplete/cdk-especie-relatorio-autocomplete.module';
import {EspecieRelatorioService} from '@cdk/services/especie-relatorio.service';
import {DndModule} from 'ngx-drag-drop';
import {MatTooltipModule} from '@angular/material/tooltip';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {CdkRelatorioFilterModule} from '../sidebars/cdk-relatorio-filter/cdk-relatorio-filter.module';

@NgModule({
    declarations: [
        CdkRelatorioListComponent,
        CdkRelatorioListItemComponent
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

        CdkRelatorioFilterModule
    ],
    providers: [
        EspecieRelatorioService
    ],
    exports: [
        CdkRelatorioListComponent
    ]
})
export class CdkRelatorioListModule {
}
