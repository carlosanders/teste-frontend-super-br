import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { PessoaService } from '@cdk/services/pessoa.service';
import { CdkPessoaGridFilterComponent } from './cdk-pessoa-grid-filter.component';

@NgModule({
    declarations: [
        CdkPessoaGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        PessoaService,
    ],
    exports: [
        CdkPessoaGridFilterComponent
    ]
})
export class CdkPessoaGridFilterModule {
}
