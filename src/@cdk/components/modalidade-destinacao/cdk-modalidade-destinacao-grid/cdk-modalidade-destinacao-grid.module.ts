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

import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeDestinacaoService} from '@cdk/services/modalidade-destinacao.service';
import {CdkModalidadeDestinacaoGridComponent} from './cdk-modalidade-destinacao-grid.component';
import {CdkModalidadeDestinacaoAutocompleteModule} from '@cdk/components/modalidade-destinacao/cdk-modalidade-destinacao-autocomplete/cdk-modalidade-destinacao-autocomplete.module';
import {CdkModalidadeDestinacaoFilterModule} from '../sidebars/cdk-modalidade-destinacao-filter/cdk-modalidade-destinacao-filter.module';
import {CdkModalidadeDestinacaoMainSidebarComponent} from './sidebars/main/main.component';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
    declarations: [
        CdkModalidadeDestinacaoGridComponent,
        CdkModalidadeDestinacaoMainSidebarComponent,
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

        CdkModalidadeDestinacaoAutocompleteModule,
        CdkModalidadeDestinacaoFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        ModalidadeDestinacaoService,
    ],
    exports: [
        CdkModalidadeDestinacaoGridComponent
    ]
})
export class CdkModalidadeDestinacaoGridModule {
}
