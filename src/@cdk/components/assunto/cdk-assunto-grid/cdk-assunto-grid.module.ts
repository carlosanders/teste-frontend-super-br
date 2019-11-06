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
    MatTooltipModule,
    MatSelectModule,
} from '@angular/material';

import {FuseSidebarModule} from '@fuse/components';
import {FuseSharedModule} from '@fuse/shared.module';
import {AssuntoAdministrativoService} from '@cdk/services/assunto-administrativo.service';
import {CdkAssuntoAdministrativoAutocompleteModule} from '@cdk/components/assunto-administrativo/cdk-assunto-administrativo-autocomplete/cdk-assunto-administrativo-autocomplete.module';
import {CdkAssuntoGridComponent} from './cdk-assunto-grid.component';
import {CdkAssuntoGridFilterModule} from './cdk-assunto-grid-filter/cdk-assunto-grid-filter.module';
import {CdkAssuntoMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkAssuntoGridComponent,
        CdkAssuntoMainSidebarComponent,
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

        CdkAssuntoAdministrativoAutocompleteModule,
        CdkAssuntoGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        AssuntoAdministrativoService,
    ],
    exports: [
        CdkAssuntoGridComponent
    ]
})
export class CdkAssuntoGridModule {
}
