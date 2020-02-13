import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule, 
    MatTooltipModule,
    MatDatepickerModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeGarantiaService } from '@cdk/services/modalidade-garantia.service';
import { CdkGarantiaFormComponent } from './cdk-garantia-form.component';
import { CdkModalidadeGarantiaAutocompleteModule } from '@cdk/components/modalidade-garantia/cdk-modalidade-garantia-autocomplete/cdk-modalidade-garantia-autocomplete.module';
import { CdkModalidadeGarantiaGridsearchModule } from '@cdk/components/modalidade-garantia/cdk-modalidade-garantia-autocomplete/cdk-modalidade-garantia-gridsearch/cdk-modalidade-garantia-gridsearch.module';

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
        MatDatepickerModule,

        CdkModalidadeGarantiaAutocompleteModule,
        CdkModalidadeGarantiaGridsearchModule,

        FuseSharedModule,
        MatTooltipModule,
    ],
    providers: [
        ModalidadeGarantiaService,
    ],
    exports: [
        CdkGarantiaFormComponent
    ]
})
export class CdkGarantiaFormModule {
}
