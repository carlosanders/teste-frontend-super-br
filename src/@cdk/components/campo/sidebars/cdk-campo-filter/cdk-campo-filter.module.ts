import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {CampoService} from '@cdk/services/campo.service';
import {CdkCampoFilterComponent} from './cdk-campo-filter.component';
import {CdkUsuarioAutocompleteModule} from '../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
    declarations: [
        CdkCampoFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatAutocompleteModule,

        CdkSharedModule,

        CdkUsuarioAutocompleteModule,
        MatButtonToggleModule,
    ],
    providers: [
        CampoService,
    ],
    exports: [
        CdkCampoFilterComponent
    ]
})
export class CdkCampoFilterModule {
}
