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

import {FuseSidebarModule} from '@fuse/components';
import {FuseSharedModule} from '@fuse/shared.module';
import {RepresentanteService} from '@cdk/services/representante.service';
import {CdkRepresentanteGridComponent} from './cdk-representante-grid.component';
import {CdkRepresentanteAutocompleteModule} from '@cdk/components/representante/cdk-representante-autocomplete/cdk-representante-autocomplete.module';
import {CdkRepresentanteGridFilterModule} from './cdk-representante-grid-filter/cdk-representante-grid-filter.module';
import {CdkRepresentanteMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkRepresentanteGridComponent,
        CdkRepresentanteMainSidebarComponent,
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

        CdkRepresentanteAutocompleteModule,
        CdkRepresentanteGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        RepresentanteService,
    ],
    exports: [
        CdkRepresentanteGridComponent
    ]
})
export class CdkRepresentanteGridModule {
}
