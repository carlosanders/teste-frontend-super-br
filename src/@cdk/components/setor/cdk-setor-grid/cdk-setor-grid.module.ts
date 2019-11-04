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
import {SetorService} from '@cdk/services/setor.service';
import {CdkSetorGridComponent} from './cdk-setor-grid.component';
import {CdkSetorAutocompleteModule} from '@cdk/components/setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {CdkSetorGridFilterModule} from './cdk-setor-grid-filter/cdk-setor-grid-filter.module';
import {CdkSetorMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkSetorGridComponent,
        CdkSetorMainSidebarComponent,
    ],
    imports: [
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatSelectModule,

        CdkSetorAutocompleteModule,
        CdkSetorGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        SetorService,
    ],
    exports: [
        CdkSetorGridComponent
    ]
})
export class CdkSetorGridModule {
}
