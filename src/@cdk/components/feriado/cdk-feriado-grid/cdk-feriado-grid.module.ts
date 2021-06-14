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
import {FeriadoService} from '@cdk/services/feriado.service';
import {CdkFeriadoGridComponent} from './cdk-feriado-grid.component';
import {CdkFeriadoAutocompleteModule} from '@cdk/components/feriado/cdk-feriado-autocomplete/cdk-feriado-autocomplete.module';
import {CdkFeriadoFilterModule} from '../sidebars/cdk-feriado-filter/cdk-feriado-filter.module';

@NgModule({
    declarations: [
        CdkFeriadoGridComponent,
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

        CdkFeriadoAutocompleteModule,
        CdkFeriadoFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        FeriadoService,
    ],
    exports: [
        CdkFeriadoGridComponent
    ]
})
export class CdkFeriadoGridModule {
}
