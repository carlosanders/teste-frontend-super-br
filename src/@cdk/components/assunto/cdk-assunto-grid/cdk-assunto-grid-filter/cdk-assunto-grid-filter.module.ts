import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { AssuntoAdministrativoService } from '@cdk/services/assunto-administrativo.service';
import {CdkAssuntoAdministrativoAutocompleteModule} from '@cdk/components/assunto-administrativo/cdk-assunto-administrativo-autocomplete/cdk-assunto-administrativo-autocomplete.module';
import {CdkAssuntoGridFilterComponent} from './cdk-assunto-grid-filter.component';

@NgModule({
    declarations: [
        CdkAssuntoGridFilterComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,

        CdkAssuntoAdministrativoAutocompleteModule,

        FuseSharedModule,
    ],
    providers: [
        AssuntoAdministrativoService,
    ],
    exports: [
        CdkAssuntoGridFilterComponent
    ]
})
export class CdkAssuntoGridFilterModule {
}
