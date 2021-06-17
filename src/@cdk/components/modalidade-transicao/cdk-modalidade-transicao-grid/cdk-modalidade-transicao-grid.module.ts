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
import {ModalidadeTransicaoService} from '@cdk/services/modalidade-transicao.service';
import {CdkModalidadeTransicaoGridComponent} from './cdk-modalidade-transicao-grid.component';
import {CdkModalidadeTransicaoAutocompleteModule} from '@cdk/components/modalidade-transicao/cdk-modalidade-transicao-autocomplete/cdk-modalidade-transicao-autocomplete.module';
import {CdkModalidadeTransicaoFilterModule} from '../sidebars/cdk-modalidade-transicao-filter/cdk-modalidade-transicao-filter.module';

@NgModule({
    declarations: [
        CdkModalidadeTransicaoGridComponent,
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

        CdkModalidadeTransicaoAutocompleteModule,
        CdkModalidadeTransicaoFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        ModalidadeTransicaoService,
    ],
    exports: [
        CdkModalidadeTransicaoGridComponent
    ]
})
export class CdkModalidadeTransicaoGridModule {
}
