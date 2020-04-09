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
    MatSelectModule, MatTooltipModule,
} from '@cdk/angular/material';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {DistribuicaoService} from '@cdk/services/distribuicao.service';
import {CdkDistribuicaoGridComponent} from './cdk-distribuicao-grid.component';
import {CdkDistribuicaoAutocompleteModule} from '@cdk/components/distribuicao/cdk-distribuicao-autocomplete/cdk-distribuicao-autocomplete.module';
import {CdkDistribuicaoGridFilterModule} from '../sidebars/cdk-distribuicao-grid-filter/cdk-distribuicao-grid-filter.module';
import {CdkDistribuicaoMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkDistribuicaoGridComponent,
        CdkDistribuicaoMainSidebarComponent,
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
        CdkDistribuicaoGridFilterModule,
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
