import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@cdk/angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { CampoService } from '@cdk/services/campo.service';
import { CdkCampoGridFilterComponent } from './cdk-campo-grid-filter.component';
import {CdkUsuarioAutocompleteModule} from '../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';

@NgModule({
    declarations: [
        CdkCampoGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatAutocompleteModule,

        FuseSharedModule,

        CdkUsuarioAutocompleteModule,
    ],
    providers: [
        CampoService,
    ],
    exports: [
        CdkCampoGridFilterComponent
    ]
})
export class CdkCampoGridFilterModule {
}
