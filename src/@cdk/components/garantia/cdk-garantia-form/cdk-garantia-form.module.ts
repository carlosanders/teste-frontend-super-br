import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule, MatTooltipModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { GarantiaAdministrativoService } from '@cdk/services/garantia-administrativo.service';
import { CdkGarantiaFormComponent } from './cdk-garantia-form.component';
import { CdkGarantiaAdministrativoAutocompleteModule } from '@cdk/components/garantia-administrativo/cdk-garantia-administrativo-autocomplete/cdk-garantia-administrativo-autocomplete.module';
import { CdkGarantiaAdministrativoGridsearchModule } from '@cdk/components/garantia-administrativo/cdk-garantia-administrativo-autocomplete/cdk-garantia-administrativo-gridsearch/cdk-garantia-administrativo-gridsearch.module';

@NgModule({
    declarations: [
        CdkGarantiaFormComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,

        CdkGarantiaAdministrativoAutocompleteModule,
        CdkGarantiaAdministrativoGridsearchModule,

        FuseSharedModule,
        MatTooltipModule,
    ],
    providers: [
        GarantiaAdministrativoService,
    ],
    exports: [
        CdkGarantiaFormComponent
    ]
})
export class CdkGarantiaFormModule {
}
