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
import { EspecieProcessoService } from '@cdk/services/especie-processo.service';
import { CdkEspecieProcessoGridComponent} from './cdk-especie-processo-grid.component';
import { CdkEspecieProcessoGridFilterComponent } from './cdk-especie-processo-grid-filter/cdk-especie-processo-grid-filter.component';
import { CdkEspecieProcessoAutocompleteModule } from '@cdk/components/especie-processo/cdk-especie-processo-autocomplete/cdk-especie-processo-autocomplete.module';

@NgModule({
    declarations: [
        CdkEspecieProcessoGridComponent,
        CdkEspecieProcessoGridFilterComponent
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

        CdkEspecieProcessoAutocompleteModule,

        FuseSharedModule,
    ],
    providers: [
        EspecieProcessoService,
    ],
    exports: [
        CdkEspecieProcessoGridComponent
    ]
})
export class CdkEspecieProcessoGridModule {
}
