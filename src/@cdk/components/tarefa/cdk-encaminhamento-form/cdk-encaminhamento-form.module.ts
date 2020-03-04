import {NgModule} from '@angular/core';
import {
    MatButtonModule, MatFormFieldModule,
    MatIconModule, MatProgressSpinnerModule, MatRadioModule

} from '@cdk/angular/material';

import { CdkSharedModule } from '@cdk/shared.module';
import { CdkEncaminhamentoFormComponent } from './cdk-encaminhamento-form.component';

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
    ],
    providers: [

    ],
    exports: [
        CdkEncaminhamentoFormComponent
    ]
})
export class CdkEncaminhamentoFormModule {
}
