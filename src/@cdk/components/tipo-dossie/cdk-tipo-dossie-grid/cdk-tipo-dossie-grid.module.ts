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
import {CdkTipoDossieGridComponent} from './cdk-tipo-dossie-grid.component';
import {CdkTipoDossieFilterModule} from '../sidebars/cdk-tipo-dossie-filter/cdk-tipo-dossie-filter.module';
import {TipoDossieService} from "../../../services/tipo-dossie.service";
import {CdkTipoDossieAutocompleteModule} from '../cdk-tipo-dossie-autocomplete/cdk-tipo-dossie-autocomplete.module';

@NgModule({
    declarations: [
        CdkTipoDossieGridComponent,
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

        CdkTipoDossieAutocompleteModule,
        CdkTipoDossieFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        TipoDossieService,
    ],
    exports: [
        CdkTipoDossieGridComponent
    ]
})
export class CdkTipoDossieGridModule {
}
