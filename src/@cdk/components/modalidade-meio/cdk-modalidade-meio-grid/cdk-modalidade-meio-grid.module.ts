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
import { ModalidadeMeioService } from '@cdk/services/modalidade-meio.service';
import { CdkModalidadeMeioGridComponent} from './cdk-modalidade-meio-grid.component';
import { CdkModalidadeMeioGridFilterComponent } from './cdk-modalidade-meio-grid-filter/cdk-modalidade-meio-grid-filter.component';
import { CdkModalidadeMeioAutocompleteModule } from '@cdk/components/modalidade-meio/cdk-modalidade-meio-autocomplete/cdk-modalidade-meio-autocomplete.module';

@NgModule({
    declarations: [
        CdkModalidadeMeioGridComponent,
        CdkModalidadeMeioGridFilterComponent
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

        CdkModalidadeMeioAutocompleteModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeMeioService,
    ],
    exports: [
        CdkModalidadeMeioGridComponent
    ]
})
export class CdkModalidadeMeioGridModule {
}
