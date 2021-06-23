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
import {RelacionamentoPessoalService} from '@cdk/services/relacionamento-pessoal.service';
import {CdkRelacionamentoPessoalGridComponent} from './cdk-relacionamento-pessoal-grid.component';
import {CdkRelacionamentoPessoalAutocompleteModule} from '@cdk/components/relacionamento-pessoal/cdk-relacionamento-pessoal-autocomplete/cdk-relacionamento-pessoal-autocomplete.module';
import {CdkRelacionamentoPessoalFilterModule} from '../sidebars/cdk-relacionamento-pessoal-filter/cdk-relacionamento-pessoal-filter.module';

@NgModule({
    declarations: [
        CdkRelacionamentoPessoalGridComponent,
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

        CdkRelacionamentoPessoalAutocompleteModule,
        CdkRelacionamentoPessoalFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        RelacionamentoPessoalService,
    ],
    exports: [
        CdkRelacionamentoPessoalGridComponent
    ]
})
export class CdkRelacionamentoPessoalGridModule {
}
