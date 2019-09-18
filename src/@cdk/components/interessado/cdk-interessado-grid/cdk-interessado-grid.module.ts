import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule, MatTooltipModule,
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeInteressadoService } from '@cdk/services/modalidade-interessado.service';
import { CdkModalidadeInteressadoAutocompleteModule } from '@cdk/components/modalidade-interessado/cdk-modalidade-interessado-autocomplete/cdk-modalidade-interessado-autocomplete.module';
import { CdkInteressadoGridComponent} from './cdk-interessado-grid.component';
import { CdkInteressadoGridFilterModule } from './cdk-interessado-grid-filter/cdk-interessado-grid-filter.module';

@NgModule({
    declarations: [
        CdkInteressadoGridComponent
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
        CdkInteressadoGridFilterModule,

        FuseSharedModule,
        MatTooltipModule,
    ],
    providers: [
        ModalidadeInteressadoService,
    ],
    exports: [
        CdkInteressadoGridComponent
    ]
})
export class CdkInteressadoGridModule {
}
