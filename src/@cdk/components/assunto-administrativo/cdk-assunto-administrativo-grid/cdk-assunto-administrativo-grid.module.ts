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
import { CdkAssuntoAdministrativoGridComponent} from './cdk-assunto-administrativo-grid.component';
import { CdkAssuntoAdministrativoGridFilterComponent } from './cdk-assunto-administrativo-grid-filter/cdk-assunto-administrativo-grid-filter.component';
import { CdkAssuntoAdministrativoAutocompleteModule } from '@cdk/components/assunto-administrativo/cdk-assunto-administrativo-autocomplete/cdk-assunto-administrativo-autocomplete.module';

@NgModule({
    declarations: [
        CdkAssuntoAdministrativoGridComponent,
        CdkAssuntoAdministrativoGridFilterComponent
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

        FuseSharedModule,
    ],
    providers: [
        AssuntoAdministrativoService,
    ],
    exports: [
        CdkAssuntoAdministrativoGridComponent
    ]
})
export class CdkAssuntoAdministrativoGridModule {
}
