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
} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkConfiguracaoNupGridComponent} from './cdk-configuracao-nup-grid.component';
import {CdkConfiguracaoNupFilterModule} from '../sidebars/cdk-configuracao-nup-filter/cdk-configuracao-nup-filter.module';
import {CdkConfiguracaoNupAutocompleteModule} from '@cdk/components/configuracao-nup/cdk-configuracao-nup-autocomplete/cdk-configuracao-nup-autocomplete.module';
import {ConfiguracaoNupService} from '@cdk/services/configuracao-nup.service';

// @ts-ignore
@NgModule({
    declarations: [
        CdkConfiguracaoNupGridComponent,
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

        CdkConfiguracaoNupAutocompleteModule,
        CdkConfiguracaoNupFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        ConfiguracaoNupService,
    ],
    exports: [
        CdkConfiguracaoNupGridComponent
    ]
})
export class CdkConfiguracaoNupGridModule {
}
