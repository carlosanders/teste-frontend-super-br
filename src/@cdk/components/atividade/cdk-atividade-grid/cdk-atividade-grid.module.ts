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
import { EspecieAtividadeService } from '@cdk/services/especie-atividade.service';
import { CdkEspecieAtividadeAutocompleteModule } from '@cdk/components/especie-atividade/cdk-especie-atividade-autocomplete/cdk-especie-atividade-autocomplete.module';
import { CdkAtividadeGridComponent} from './cdk-atividade-grid.component';
import { CdkAtividadeGridFilterModule } from './cdk-atividade-grid-filter/cdk-atividade-grid-filter.module';

@NgModule({
    declarations: [
        CdkAtividadeGridComponent
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

        CdkEspecieAtividadeAutocompleteModule,
        CdkAtividadeGridFilterModule,

        FuseSharedModule,
    ],
    providers: [
        EspecieAtividadeService,
    ],
    exports: [
        CdkAtividadeGridComponent
    ]
})
export class CdkAtividadeGridModule {
}
