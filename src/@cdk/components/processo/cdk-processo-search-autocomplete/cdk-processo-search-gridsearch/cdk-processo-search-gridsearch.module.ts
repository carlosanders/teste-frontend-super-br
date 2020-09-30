import {NgModule} from '@angular/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkProcessoSearchGridsearchComponent} from './cdk-processo-search-gridsearch.component';
import {ProcessoService} from '../../../../services/processo.service';
import {CdkProcessoGridModule} from '../../cdk-processo-grid/cdk-processo-grid.module';

@NgModule({
    declarations: [
        CdkProcessoSearchGridsearchComponent
    ],
    imports: [
        CdkProcessoGridModule,

        CdkSharedModule,
    ],
    providers: [
        ProcessoService
    ],
    exports: [
        CdkProcessoSearchGridsearchComponent
    ]
})
export class CdkProcessoSearchGridsearchModule {
}
