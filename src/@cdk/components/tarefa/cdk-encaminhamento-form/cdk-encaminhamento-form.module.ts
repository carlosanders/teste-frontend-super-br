import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatRadioModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkEncaminhamentoFormComponent} from './cdk-encaminhamento-form.component';
import {MatCardModule} from "@angular/material/card";

@NgModule({
    declarations: [
        CdkEncaminhamentoFormComponent,
    ],
    imports: [

        MatFormFieldModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatIconModule,
        CdkSharedModule,
        MatRadioModule,
        MatCardModule,
    ],
    providers: [

    ],
    exports: [
        CdkEncaminhamentoFormComponent
    ]
})
export class CdkEncaminhamentoFormModule {
}
