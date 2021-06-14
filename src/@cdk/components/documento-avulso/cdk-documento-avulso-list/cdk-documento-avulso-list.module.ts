import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSortModule,
    MatTooltipModule
} from '@cdk/angular/material';

import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkDocumentoAvulsoListComponent} from './cdk-documento-avulso-list.component';
import {CdkDocumentoAvulsoListItemComponent} from './cdk-documento-avulso-list-item/cdk-documento-avulso-list-item.component';
import {TranslateModule} from '@ngx-translate/core';
import {PipesModule} from '@cdk/pipes/pipes.module';
import {CdkSidebarModule} from '@cdk/components/index';
import {ProcessoService} from '@cdk/services/processo.service';
import {CdkProcessoAutocompleteModule} from '@cdk/components/processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {CdkSetorAutocompleteModule} from '@cdk/components/setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {DndModule} from 'ngx-drag-drop';
import {SetorService} from '../../../services/setor.service';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {CdkDocumentoAvulsoFilterModule} from '../sidebars/cdk-documento-avulso-filter/cdk-documento-avulso-filter.module';

@NgModule({
    declarations: [
        CdkDocumentoAvulsoListComponent,
        CdkDocumentoAvulsoListItemComponent,
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
        MatDatepickerModule,
        MatTooltipModule,

        DndModule,

        CdkProcessoAutocompleteModule,
        CdkSetorAutocompleteModule,

        TranslateModule,

        PipesModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatRippleModule,
        MatDatetimepickerModule,
        MatNativeDatetimeModule,
        MatMomentDatetimeModule,
        MatRadioModule,
        InfiniteScrollModule,
        CdkDocumentoAvulsoFilterModule
    ],
    providers: [
        ProcessoService,
        SetorService
    ],
    exports: [
        CdkDocumentoAvulsoListComponent
    ]
})
export class CdkDocumentoAvulsoListModule {
}
