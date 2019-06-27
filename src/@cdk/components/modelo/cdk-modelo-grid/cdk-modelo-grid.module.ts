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
import { ModeloService } from '@cdk/services/modelo.service';
import { CdkModeloGridComponent} from './cdk-modelo-grid.component';
import { CdkModeloAutocompleteModule } from '@cdk/components/modelo/cdk-modelo-autocomplete/cdk-modelo-autocomplete.module';
import {CdkModeloGridFilterModule} from './cdk-modelo-grid-filter/cdk-modelo-grid-filter.module';

@NgModule({
    declarations: [
        CdkModeloGridComponent
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

        CdkModeloAutocompleteModule,
        CdkModeloGridFilterModule,

        FuseSharedModule,
    ],
    providers: [
        ModeloService,
    ],
    exports: [
        CdkModeloGridComponent
    ]
})
export class CdkModeloGridModule {
}
