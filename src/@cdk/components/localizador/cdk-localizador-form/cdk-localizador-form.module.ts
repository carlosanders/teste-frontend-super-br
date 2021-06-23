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
import {CdkLocalizadorFormComponent} from './cdk-localizador-form.component';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';

@NgModule({
    declarations: [
        CdkLocalizadorFormComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        NgxUpperCaseDirectiveModule,
        CdkSharedModule,
        MatAutocompleteModule,
    ],
    providers: [

    ],
    exports: [
        CdkLocalizadorFormComponent
    ]
})
export class CdkLocalizadorFormModule {
}
