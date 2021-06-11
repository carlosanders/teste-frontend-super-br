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
import {ModalidadeRelacionamentoPessoalService} from '@cdk/services/modalidade-relacionamento-pessoal.service';
import {CdkModalidadeRelacionamentoPessoalGridComponent} from './cdk-modalidade-relacionamento-pessoal-grid.component';
import {CdkModalidadeRelacionamentoPessoalAutocompleteModule} from '@cdk/components/modalidade-relacionamento-pessoal/cdk-modalidade-relacionamento-pessoal-autocomplete/cdk-modalidade-relacionamento-pessoal-autocomplete.module';
import {CdkModalidadeRelacionamentoPessoalFilterModule} from '../sidebars/cdk-modalidade-relacionamento-pessoal-filter/cdk-modalidade-relacionamento-pessoal-filter.module';

@NgModule({
    declarations: [
        CdkModalidadeRelacionamentoPessoalGridComponent,
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

        CdkModalidadeRelacionamentoPessoalAutocompleteModule,
        CdkModalidadeRelacionamentoPessoalFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        ModalidadeRelacionamentoPessoalService,
    ],
    exports: [
        CdkModalidadeRelacionamentoPessoalGridComponent
    ]
})
export class CdkModalidadeRelacionamentoPessoalGridModule {
}
