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
import {NomeService} from '@cdk/services/nome.service';
import {CdkNomeGridComponent} from './cdk-nome-grid.component';
import {CdkNomeAutocompleteModule} from '@cdk/components/nome/cdk-nome-autocomplete/cdk-nome-autocomplete.module';
import {CdkNomeGridFilterModule} from './cdk-nome-grid-filter/cdk-nome-grid-filter.module';
import {CdkNomeMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkNomeGridComponent,
        CdkNomeMainSidebarComponent,
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

        CdkNomeAutocompleteModule,
        CdkNomeGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        NomeService,
    ],
    exports: [
        CdkNomeGridComponent
    ]
})
export class CdkNomeGridModule {
}
