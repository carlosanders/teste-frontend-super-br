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
import { CdkCadastroIdentificadorFormComponent } from './cdk-cadastro-identificador-form.component';

@NgModule({
    declarations: [
        CdkCadastroIdentificadorFormComponent,
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

        FuseSharedModule,
    ],
    providers: [

    ],
    exports: [
        CdkCadastroIdentificadorFormComponent
    ]
})
export class CdkCadastroIdentificadorFormModule {
}
