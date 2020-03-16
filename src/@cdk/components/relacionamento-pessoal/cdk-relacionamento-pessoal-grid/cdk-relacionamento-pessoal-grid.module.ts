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
import {RelacionamentoPessoalService} from '@cdk/services/relacionamento-pessoal.service';
import {CdkRelacionamentoPessoalGridComponent} from './cdk-relacionamento-pessoal-grid.component';
import {CdkRelacionamentoPessoalAutocompleteModule} from '@cdk/components/relacionamento-pessoal/cdk-relacionamento-pessoal-autocomplete/cdk-relacionamento-pessoal-autocomplete.module';
import {CdkRelacionamentoPessoalGridFilterModule} from './cdk-relacionamento-pessoal-grid-filter/cdk-relacionamento-pessoal-grid-filter.module';
import {CdkRelacionamentoPessoalMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkRelacionamentoPessoalGridComponent,
        CdkRelacionamentoPessoalMainSidebarComponent,
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
        CdkRelacionamentoPessoalGridFilterModule,

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
