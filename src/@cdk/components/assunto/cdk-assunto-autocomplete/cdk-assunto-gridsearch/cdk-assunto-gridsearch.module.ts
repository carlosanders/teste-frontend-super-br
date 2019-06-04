import {NgModule} from '@angular/core';

import {FuseSharedModule} from '@fuse/shared.module';

import {AssuntoService} from '@cdk/services/assunto.service';
import {CdkAssuntoGridsearchComponent} from './cdk-assunto-gridsearch.component';
import {CdkAssuntoGridModule} from '@cdk/components/assunto/cdk-assunto-grid/cdk-assunto-grid.module';

@NgModule({
    declarations: [
        CdkAssuntoGridsearchComponent
    ],
    imports: [

        CdkAssuntoGridModule,

        FuseSharedModule,
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
