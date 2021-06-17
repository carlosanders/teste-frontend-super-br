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
    MatTooltipModule,
} from '@cdk/angular/material';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {SigiloService} from '@cdk/services/sigilo.service';
import {CdkSigiloGridComponent} from './cdk-sigilo-grid.component';
import {CdkSigiloAutocompleteModule} from '@cdk/components/sigilo/cdk-sigilo-autocomplete/cdk-sigilo-autocomplete.module';
import {CdkSigiloFilterModule} from '../sidebars/cdk-sigilo-filter/cdk-sigilo-filter.module';

@NgModule({
    declarations: [
        CdkSigiloGridComponent,
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

        CdkSigiloAutocompleteModule,
        CdkSigiloFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        SigiloService,
    ],
    exports: [
        CdkSigiloGridComponent
    ]
})
export class CdkSigiloGridModule {
}
