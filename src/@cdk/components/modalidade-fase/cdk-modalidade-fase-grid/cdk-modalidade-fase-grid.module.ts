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
import {ModalidadeFaseService} from '@cdk/services/modalidade-fase.service';
import {CdkModalidadeFaseGridComponent} from './cdk-modalidade-fase-grid.component';
import {CdkModalidadeFaseAutocompleteModule} from '@cdk/components/modalidade-fase/cdk-modalidade-fase-autocomplete/cdk-modalidade-fase-autocomplete.module';
import {CdkModalidadeFaseFilterModule} from '../sidebars/cdk-modalidade-fase-filter/cdk-modalidade-fase-filter.module';
import {CdkModalidadeFaseMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkModalidadeFaseGridComponent,
        CdkModalidadeFaseMainSidebarComponent,
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

        CdkModalidadeFaseAutocompleteModule,
        CdkModalidadeFaseFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        ModalidadeFaseService,
    ],
    exports: [
        CdkModalidadeFaseGridComponent
    ]
})
export class CdkModalidadeFaseGridModule {
}
