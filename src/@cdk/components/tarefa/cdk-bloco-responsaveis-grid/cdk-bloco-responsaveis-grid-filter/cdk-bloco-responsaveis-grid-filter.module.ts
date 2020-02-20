import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule, MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
} from '@cdk/angular/material';

import {FuseSidebarModule} from '@fuse/components';
import {FuseSharedModule} from '@fuse/shared.module';
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
        FuseSharedModule,
        
    ],
    providers: [
    ],
    exports: [
        CdkBlocoResponsaveisGridFilterComponent
    ]
})
export class CdkBlocoResponsaveisGridFilterModule {
}
