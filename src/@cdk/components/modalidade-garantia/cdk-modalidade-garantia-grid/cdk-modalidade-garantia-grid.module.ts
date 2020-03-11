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
    MatSelectModule,
} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeGarantiaService} from '@cdk/services/modalidade-garantia.service';
import {CdkModalidadeGarantiaGridComponent} from './cdk-modalidade-garantia-grid.component';
import {CdkModalidadeGarantiaAutocompleteModule} from '@cdk/components/modalidade-garantia/cdk-modalidade-garantia-autocomplete/cdk-modalidade-garantia-autocomplete.module';
import {CdkModalidadeGarantiaGridFilterModule} from './cdk-modalidade-garantia-grid-filter/cdk-modalidade-garantia-grid-filter.module';
import {CdkModalidadeGarantiaMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkModalidadeGarantiaGridComponent,
        CdkModalidadeGarantiaMainSidebarComponent,
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

        CdkModalidadeGarantiaAutocompleteModule,
        CdkModalidadeGarantiaGridFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        ModalidadeGarantiaService,
    ],
    exports: [
        CdkModalidadeGarantiaGridComponent
    ]
})
export class CdkModalidadeGarantiaGridModule {
}
