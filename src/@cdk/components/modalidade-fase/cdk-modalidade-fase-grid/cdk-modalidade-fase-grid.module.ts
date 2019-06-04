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
import { ModalidadeFaseService } from '@cdk/services/modalidade-fase.service';
import { CdkModalidadeFaseGridComponent} from './cdk-modalidade-fase-grid.component';
import { CdkModalidadeFaseGridFilterComponent } from './cdk-modalidade-fase-grid-filter/cdk-modalidade-fase-grid-filter.component';
import { CdkModalidadeFaseAutocompleteModule } from '@cdk/components/modalidade-fase/cdk-modalidade-fase-autocomplete/cdk-modalidade-fase-autocomplete.module';

@NgModule({
    declarations: [
        CdkModalidadeFaseGridComponent,
        CdkModalidadeFaseGridFilterComponent
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

        CdkModalidadeFaseAutocompleteModule,

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
