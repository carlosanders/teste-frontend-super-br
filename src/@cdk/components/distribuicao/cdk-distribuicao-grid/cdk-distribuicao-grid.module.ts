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
import {DistribuicaoService} from '@cdk/services/distribuicao.service';
import {CdkDistribuicaoGridComponent} from './cdk-distribuicao-grid.component';
import {CdkDistribuicaoAutocompleteModule} from '@cdk/components/distribuicao/cdk-distribuicao-autocomplete/cdk-distribuicao-autocomplete.module';
import {CdkDistribuicaoFilterModule} from '../sidebars/cdk-distribuicao-filter/cdk-distribuicao-filter.module';

@NgModule({
    declarations: [
        CdkDistribuicaoGridComponent,
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

        CdkSharedModule,
        CdkSidebarModule,

        CdkDistribuicaoAutocompleteModule,
        CdkDistribuicaoFilterModule,
    ],
    providers: [
        DistribuicaoService,
    ],
    exports: [
        CdkDistribuicaoGridComponent
    ]
})
export class CdkDistribuicaoGridModule {
}
