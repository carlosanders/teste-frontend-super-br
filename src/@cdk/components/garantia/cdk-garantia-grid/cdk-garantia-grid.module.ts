import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
} from '@cdk/angular/material';

import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeGarantiaService} from '@cdk/services/modalidade-garantia.service';
import {CdkModalidadeGarantiaAutocompleteModule} from '@cdk/components/modalidade-garantia/cdk-modalidade-garantia-autocomplete/cdk-modalidade-garantia-autocomplete.module';
import {CdkGarantiaGridComponent} from './cdk-garantia-grid.component';
import {CdkGarantiaFilterModule} from '../sidebars/cdk-garantia-filter/cdk-garantia-filter.module';

@NgModule({
    declarations: [
        CdkGarantiaGridComponent,
    ],
    imports: [
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatTooltipModule,

        CdkModalidadeGarantiaAutocompleteModule,
        CdkGarantiaFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        ModalidadeGarantiaService,
    ],
    exports: [
        CdkGarantiaGridComponent
    ]
})
export class CdkGarantiaGridModule {
}
