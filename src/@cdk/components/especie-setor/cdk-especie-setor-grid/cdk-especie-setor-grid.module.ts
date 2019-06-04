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
import { EspecieSetorService } from '@cdk/services/especie-setor.service';
import { CdkEspecieSetorGridComponent} from './cdk-especie-setor-grid.component';
import { CdkEspecieSetorGridFilterComponent } from './cdk-especie-setor-grid-filter/cdk-especie-setor-grid-filter.component';
import { CdkEspecieSetorAutocompleteModule } from '@cdk/components/especie-setor/cdk-especie-setor-autocomplete/cdk-especie-setor-autocomplete.module';

@NgModule({
    declarations: [
        CdkEspecieSetorGridComponent,
        CdkEspecieSetorGridFilterComponent
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

        CdkEspecieSetorAutocompleteModule,

        FuseSharedModule,
    ],
    providers: [
        EspecieSetorService,
    ],
    exports: [
        CdkEspecieSetorGridComponent
    ]
})
export class CdkEspecieSetorGridModule {
}
