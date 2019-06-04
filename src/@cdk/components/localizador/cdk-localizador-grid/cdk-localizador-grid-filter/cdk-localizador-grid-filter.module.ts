import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {LocalizadorService} from '@cdk/services/localizador.service';
import {CdkLocalizadorGridFilterComponent} from './cdk-localizador-grid-filter.component';

@NgModule({
    declarations: [
        CdkLocalizadorGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
    ],
    providers: [
        LocalizadorService,
    ],
    exports: [
        CdkLocalizadorGridFilterComponent
    ]
})
export class CdkLocalizadorGridFilterModule {
}
