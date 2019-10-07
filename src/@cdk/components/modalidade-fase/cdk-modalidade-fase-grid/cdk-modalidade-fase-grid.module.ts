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

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeFaseService } from '@cdk/services/modalidade-fase.service';
import { CdkModalidadeFaseGridComponent} from './cdk-modalidade-fase-grid.component';
import { CdkModalidadeFaseAutocompleteModule } from '@cdk/components/modalidade-fase/cdk-modalidade-fase-autocomplete/cdk-modalidade-fase-autocomplete.module';
import {CdkModalidadeFaseGridFilterModule} from './cdk-modalidade-fase-grid-filter/cdk-modalidade-fase-grid-filter.module';

@NgModule({
    declarations: [
        CdkModalidadeFaseGridComponent
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

        CdkModalidadeFaseAutocompleteModule,
        CdkModalidadeFaseGridFilterModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeFaseService,
    ],
    exports: [
        CdkModalidadeFaseGridComponent
    ]
})
export class CdkModalidadeFaseGridModule {
}
