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
import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeMeioService} from '@cdk/services/modalidade-meio.service';
import {CdkModalidadeMeioGridComponent} from './cdk-modalidade-meio-grid.component';
import {CdkModalidadeMeioAutocompleteModule} from '@cdk/components/modalidade-meio/cdk-modalidade-meio-autocomplete/cdk-modalidade-meio-autocomplete.module';
import {CdkModalidadeMeioFilterModule} from '../sidebars/cdk-modalidade-meio-filter/cdk-modalidade-meio-filter.module';
import {CdkSidebarModule} from '@cdk/components/index';

@NgModule({
    declarations: [
        CdkModalidadeMeioGridComponent,
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

        CdkModalidadeMeioAutocompleteModule,
        CdkModalidadeMeioFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        ModalidadeMeioService,
    ],
    exports: [
        CdkModalidadeMeioGridComponent
    ]
})
export class CdkModalidadeMeioGridModule {
}
