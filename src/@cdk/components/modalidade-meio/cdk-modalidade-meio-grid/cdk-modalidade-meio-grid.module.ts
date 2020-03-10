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
import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeMeioService} from '@cdk/services/modalidade-meio.service';
import {CdkModalidadeMeioGridComponent} from './cdk-modalidade-meio-grid.component';
import {CdkModalidadeMeioAutocompleteModule} from '@cdk/components/modalidade-meio/cdk-modalidade-meio-autocomplete/cdk-modalidade-meio-autocomplete.module';
import {CdkModalidadeMeioGridFilterModule} from './cdk-modalidade-meio-grid-filter/cdk-modalidade-meio-grid-filter.module';
import {CdkModalidadeMeioListMainSidebarComponent} from './sidebars/main/main.component';
import {CdkSidebarModule} from '@cdk/components/index';

@NgModule({
    declarations: [
        CdkModalidadeMeioGridComponent,
        CdkModalidadeMeioListMainSidebarComponent
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
        CdkModalidadeMeioGridFilterModule,

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
