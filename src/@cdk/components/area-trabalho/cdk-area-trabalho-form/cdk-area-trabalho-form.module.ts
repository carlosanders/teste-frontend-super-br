import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatDatepickerModule

} from '@cdk/angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { UsuarioService } from '@cdk/services/usuario.service';
import { CdkAreaTrabalhoFormComponent } from './cdk-area-trabalho-form.component';
import { CdkUsuarioAutocompleteModule } from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import { CdkUsuarioGridsearchModule } from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-gridsearch/cdk-usuario-gridsearch.module';

@NgModule({
    declarations: [
        CdkAreaTrabalhoFormComponent,
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

        CdkUsuarioAutocompleteModule,
        CdkUsuarioGridsearchModule,

        FuseSharedModule,
    ],
    providers: [
        UsuarioService
    ],
    exports: [
        CdkAreaTrabalhoFormComponent
    ]
})
export class CdkAreaTrabalhoFormModule {
}
