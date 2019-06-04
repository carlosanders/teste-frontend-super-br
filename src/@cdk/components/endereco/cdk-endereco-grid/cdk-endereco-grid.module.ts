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
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { MunicipioService } from '@cdk/services/municipio.service';
import { CdkMunicipioAutocompleteModule } from '@cdk/components/municipio/cdk-municipio-autocomplete/cdk-municipio-autocomplete.module';
import { CdkEnderecoGridComponent} from './cdk-endereco-grid.component';
import { CdkEnderecoGridFilterModule } from './cdk-endereco-grid-filter/cdk-endereco-grid-filter.module';

@NgModule({
    declarations: [
        CdkEnderecoGridComponent
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

        CdkMunicipioAutocompleteModule,
        CdkEnderecoGridFilterModule,

        FuseSharedModule,
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
