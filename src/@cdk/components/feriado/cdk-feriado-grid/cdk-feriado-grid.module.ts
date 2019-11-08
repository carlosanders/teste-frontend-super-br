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
} from '@angular/material';

import {FuseSidebarModule} from '@fuse/components';
import {FuseSharedModule} from '@fuse/shared.module';
import {FeriadoService} from '@cdk/services/feriado.service';
import {CdkFeriadoGridComponent} from './cdk-feriado-grid.component';
import {CdkFeriadoAutocompleteModule} from '@cdk/components/feriado/cdk-feriado-autocomplete/cdk-feriado-autocomplete.module';
import {CdkFeriadoGridFilterModule} from './cdk-feriado-grid-filter/cdk-feriado-grid-filter.module';
import {CdkFeriadoMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkFeriadoGridComponent,
        CdkFeriadoMainSidebarComponent,
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
        CdkFeriadoGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
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
