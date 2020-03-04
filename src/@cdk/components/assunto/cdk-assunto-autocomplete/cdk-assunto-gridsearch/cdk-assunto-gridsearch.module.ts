import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {AssuntoService} from '@cdk/services/assunto.service';
import {CdkAssuntoGridsearchComponent} from './cdk-assunto-gridsearch.component';
import {CdkAssuntoGridModule} from '@cdk/components/assunto/cdk-assunto-grid/cdk-assunto-grid.module';

@NgModule({
    declarations: [
        CdkAssuntoGridsearchComponent
    ],
    imports: [

        CdkAssuntoGridModule,

        CdkSharedModule,
    ],
    providers: [
        AssuntoService
    ],
    exports: [
        CdkAssuntoGridsearchComponent
    ]
})
export class CdkAssuntoGridsearchModule {
}
