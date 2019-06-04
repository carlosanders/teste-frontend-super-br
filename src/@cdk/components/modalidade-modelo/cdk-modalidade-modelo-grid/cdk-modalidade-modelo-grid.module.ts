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
import { ModalidadeModeloService } from '@cdk/services/modalidade-modelo.service';
import { CdkModalidadeModeloGridComponent} from './cdk-modalidade-modelo-grid.component';
import { CdkModalidadeModeloGridFilterComponent } from './cdk-modalidade-modelo-grid-filter/cdk-modalidade-modelo-grid-filter.component';
import { CdkModalidadeModeloAutocompleteModule } from '@cdk/components/modalidade-modelo/cdk-modalidade-modelo-autocomplete/cdk-modalidade-modelo-autocomplete.module';

@NgModule({
    declarations: [
        CdkModalidadeModeloGridComponent,
        CdkModalidadeModeloGridFilterComponent
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

        CdkModalidadeModeloAutocompleteModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeModeloService,
    ],
    exports: [
        CdkModalidadeModeloGridComponent
    ]
})
export class CdkModalidadeModeloGridModule {
}
