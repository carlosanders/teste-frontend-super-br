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
import { ModalidadeInteressadoService } from '@cdk/services/modalidade-interessado.service';
import { CdkModalidadeInteressadoGridComponent} from './cdk-modalidade-interessado-grid.component';
import { CdkModalidadeInteressadoAutocompleteModule } from '@cdk/components/modalidade-interessado/cdk-modalidade-interessado-autocomplete/cdk-modalidade-interessado-autocomplete.module';
import {CdkModalidadeInteressadoGridFilterModule} from './cdk-modalidade-interessado-grid-filter/cdk-modalidade-interessado-grid-filter.module';

@NgModule({
    declarations: [
        CdkModalidadeInteressadoGridComponent
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

        CdkModalidadeInteressadoAutocompleteModule,
        CdkModalidadeInteressadoGridFilterModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeInteressadoService,
    ],
    exports: [
        CdkModalidadeInteressadoGridComponent
    ]
})
export class CdkModalidadeInteressadoGridModule {
}
