import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {NomeService} from '@cdk/services/nome.service';
import {CdkNomeGridFilterComponent} from './cdk-nome-grid-filter.component';

@NgModule({
    declarations: [
        CdkNomeGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
    ],
    providers: [
        NomeService,
    ],
    exports: [
        CdkNomeGridFilterComponent
    ]
})
export class CdkNomeGridFilterModule {
}
