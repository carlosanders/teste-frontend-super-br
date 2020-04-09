import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatSelectModule,
} from '@cdk/angular/material';

import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeGarantiaService} from '@cdk/services/modalidade-garantia.service';
import {CdkModalidadeGarantiaAutocompleteModule} from '@cdk/components/modalidade-garantia/cdk-modalidade-garantia-autocomplete/cdk-modalidade-garantia-autocomplete.module';
import {CdkGarantiaGridComponent} from './cdk-garantia-grid.component';
import {CdkGarantiaFilterModule} from '../sidebars/cdk-garantia-filter/cdk-garantia-filter.module';
import {CdkGarantiaMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkGarantiaGridComponent,
        CdkGarantiaMainSidebarComponent,
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
