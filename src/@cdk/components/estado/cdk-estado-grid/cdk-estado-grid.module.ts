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
import {EstadoService} from '@cdk/services/estado.service';
import {CdkEstadoGridComponent} from './cdk-estado-grid.component';
import {CdkEstadoAutocompleteModule} from '@cdk/components/estado/cdk-estado-autocomplete/cdk-estado-autocomplete.module';
import {CdkEstadoFilterModule} from '../sidebars/cdk-estado-filter/cdk-estado-filter.module';
import {CdkEstadoMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkEstadoGridComponent,
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

        CdkEstadoAutocompleteModule,
        CdkEstadoFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        EstadoService,
    ],
    exports: [
        CdkEstadoGridComponent
    ]
})
export class CdkEstadoGridModule {
}
