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
    MatSelectModule,
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {EspecieAtividadeService} from '@cdk/services/especie-atividade.service';
import {CdkEspecieAtividadeGridComponent} from './cdk-especie-atividade-grid.component';
import {CdkEspecieAtividadeAutocompleteModule} from '@cdk/components/especie-atividade/cdk-especie-atividade-autocomplete/cdk-especie-atividade-autocomplete.module';
import {CdkEspecieAtividadeGridFilterModule} from '@cdk/components/especie-atividade/cdk-especie-atividade-grid/cdk-especie-atividade-grid-filter/cdk-especie-atividade-grid-filter.module';

@NgModule({
    declarations: [
        CdkEspecieAtividadeGridComponent
    ],
    imports: [
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,

        CdkEspecieAtividadeGridFilterModule,

        CdkEspecieAtividadeAutocompleteModule,

        FuseSharedModule,
    ],
    providers: [
        EspecieAtividadeService,
    ],
    exports: [
        CdkEspecieAtividadeGridComponent
    ]
})
export class CdkEspecieAtividadeGridModule {
}
