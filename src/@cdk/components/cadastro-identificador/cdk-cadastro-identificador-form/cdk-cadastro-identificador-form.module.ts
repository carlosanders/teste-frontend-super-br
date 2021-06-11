import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkCadastroIdentificadorFormComponent} from './cdk-cadastro-identificador-form.component';

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

        CdkSharedModule,
    ],
    providers: [],
    exports: [
        CdkCadastroIdentificadorFormComponent
    ]
})
export class CdkCadastroIdentificadorFormModule {
}
