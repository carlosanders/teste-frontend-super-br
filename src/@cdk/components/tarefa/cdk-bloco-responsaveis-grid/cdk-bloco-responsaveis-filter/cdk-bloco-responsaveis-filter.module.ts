import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkBlocoResponsaveisFilterComponent} from './cdk-bloco-responsaveis-filter.component';


@NgModule({
    declarations: [
        CdkBlocoResponsaveisFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatCheckboxModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        CdkSharedModule,

    ],
    providers: [
    ],
    exports: [
        CdkBlocoResponsaveisFilterComponent
    ]
})
export class CdkBlocoResponsaveisFilterModule {
}
