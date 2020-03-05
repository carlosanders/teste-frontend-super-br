import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule, MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
} from '@cdk/angular/material';

import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkBlocoResponsaveisGridFilterComponent} from './cdk-bloco-responsaveis-grid-filter.component';


@NgModule({
    declarations: [
        CdkBlocoResponsaveisGridFilterComponent,
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
        CdkBlocoResponsaveisGridFilterComponent
    ]
})
export class CdkBlocoResponsaveisGridFilterModule {
}
