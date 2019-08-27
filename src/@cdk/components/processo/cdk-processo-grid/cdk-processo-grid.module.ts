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
import { ProcessoService } from '@cdk/services/processo.service';
import { CdkProcessoGridComponent} from './cdk-processo-grid.component';
import { CdkProcessoAutocompleteModule } from '@cdk/components/processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {CdkProcessoGridFilterModule} from './cdk-processo-grid-filter/cdk-processo-grid-filter.module';

@NgModule({
    declarations: [
        CdkProcessoGridComponent
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

        CdkProcessoAutocompleteModule,
        CdkProcessoGridFilterModule,

        FuseSharedModule,
        MatTooltipModule,
    ],
    providers: [
        ProcessoService,
    ],
    exports: [
        CdkProcessoGridComponent
    ]
})
export class CdkProcessoGridModule {
}
