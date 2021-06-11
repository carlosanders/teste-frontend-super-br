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
import {TransicaoService} from '@cdk/services/transicao.service';
import {CdkTransicaoGridComponent} from './cdk-transicao-grid.component';
import {CdkTransicaoAutocompleteModule} from '@cdk/components/transicao/cdk-transicao-autocomplete/cdk-transicao-autocomplete.module';
import {CdkTransicaoFilterModule} from '../sidebars/cdk-transicao-filter/cdk-transicao-filter.module';

@NgModule({
    declarations: [
        CdkTransicaoGridComponent,
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

        CdkTransicaoAutocompleteModule,
        CdkTransicaoFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        TransicaoService,
    ],
    exports: [
        CdkTransicaoGridComponent
    ]
})
export class CdkTransicaoGridModule {
}
