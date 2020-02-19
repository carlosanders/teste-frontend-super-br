import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule, MatTooltipModule
} from '@cdk/angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { AssuntoAdministrativoService } from '@cdk/services/assunto-administrativo.service';
import { CdkAssuntoFormComponent } from './cdk-assunto-form.component';
import { CdkAssuntoAdministrativoAutocompleteModule } from '@cdk/components/assunto-administrativo/cdk-assunto-administrativo-autocomplete/cdk-assunto-administrativo-autocomplete.module';
import { CdkAssuntoAdministrativoGridsearchModule } from '@cdk/components/assunto-administrativo/cdk-assunto-administrativo-autocomplete/cdk-assunto-administrativo-gridsearch/cdk-assunto-administrativo-gridsearch.module';

@NgModule({
    declarations: [
        CdkAssuntoFormComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,

        CdkAssuntoAdministrativoAutocompleteModule,
        CdkAssuntoAdministrativoGridsearchModule,

        FuseSharedModule,
        MatTooltipModule,
    ],
    providers: [
        AssuntoAdministrativoService,
    ],
    exports: [
        CdkAssuntoFormComponent
    ]
})
export class CdkAssuntoFormModule {
}
