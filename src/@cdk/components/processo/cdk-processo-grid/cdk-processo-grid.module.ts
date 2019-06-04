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
import { ProcessoService } from '@cdk/services/processo.service';
import { CdkProcessoGridComponent} from './cdk-processo-grid.component';
import { CdkProcessoGridFilterComponent } from './cdk-processo-grid-filter/cdk-processo-grid-filter.component';
import { CdkProcessoAutocompleteModule } from '@cdk/components/processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';

@NgModule({
    declarations: [
        CdkProcessoGridComponent,
        CdkProcessoGridFilterComponent
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

        FuseSharedModule,
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
