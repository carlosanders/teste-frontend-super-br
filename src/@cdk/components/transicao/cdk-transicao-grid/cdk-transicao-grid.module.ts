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
import {TransicaoService} from '@cdk/services/transicao.service';
import {CdkTransicaoGridComponent} from './cdk-transicao-grid.component';
import {CdkTransicaoAutocompleteModule} from '@cdk/components/transicao/cdk-transicao-autocomplete/cdk-transicao-autocomplete.module';
import {CdkTransicaoFilterModule} from '../sidebars/cdk-transicao-filter/cdk-transicao-filter.module';
import {CdkTransicaoMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkTransicaoGridComponent,
        CdkTransicaoMainSidebarComponent,
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
