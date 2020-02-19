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
import {MunicipioService} from '@cdk/services/municipio.service';
import {CdkMunicipioAutocompleteModule} from '@cdk/components/municipio/cdk-municipio-autocomplete/cdk-municipio-autocomplete.module';
import {CdkEnderecoGridComponent} from './cdk-endereco-grid.component';
import {CdkEnderecoGridFilterModule} from './cdk-endereco-grid-filter/cdk-endereco-grid-filter.module';
import {CdkEnderecoMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkEnderecoGridComponent,
        CdkEnderecoMainSidebarComponent,
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

        CdkMunicipioAutocompleteModule,
        CdkEnderecoGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        MunicipioService,
    ],
    exports: [
        CdkEnderecoGridComponent
    ]
})
export class CdkEnderecoGridModule {
}
