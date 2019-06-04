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
import { AssuntoAdministrativoService } from '@cdk/services/assunto-administrativo.service';
import { CdkAssuntoAdministrativoAutocompleteModule } from '@cdk/components/assunto-administrativo/cdk-assunto-administrativo-autocomplete/cdk-assunto-administrativo-autocomplete.module';
import { CdkAssuntoGridComponent} from './cdk-assunto-grid.component';
import { CdkAssuntoGridFilterModule } from './cdk-assunto-grid-filter/cdk-assunto-grid-filter.module';

@NgModule({
    declarations: [
        CdkAssuntoGridComponent
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

        CdkAssuntoAdministrativoAutocompleteModule,
        CdkAssuntoGridFilterModule,

        FuseSharedModule,
    ],
    providers: [
        AssuntoAdministrativoService,
    ],
    exports: [
        CdkAssuntoGridComponent
    ]
})
export class CdkAssuntoGridModule {
}
