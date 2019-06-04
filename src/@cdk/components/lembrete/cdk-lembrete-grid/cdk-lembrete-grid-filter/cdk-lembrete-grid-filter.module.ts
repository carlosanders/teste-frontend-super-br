import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {LembreteService} from '@cdk/services/lembrete.service';
import {CdkLembreteGridFilterComponent} from './cdk-lembrete-grid-filter.component';

@NgModule({
    declarations: [
        CdkLembreteGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
    ],
    providers: [
        LembreteService,
    ],
    exports: [
        CdkLembreteGridFilterComponent
    ]
})
export class CdkLembreteGridFilterModule {
}
