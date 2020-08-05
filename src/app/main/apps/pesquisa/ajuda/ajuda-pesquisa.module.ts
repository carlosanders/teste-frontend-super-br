import {NgModule} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

import { AjudaPesquisaComponent } from './ajuda-pesquisa.component';
import { CdkSharedModule } from '../../../../../@cdk/shared.module';


@NgModule({
    declarations: [
        AjudaPesquisaComponent
    ],
    imports: [
        CdkSharedModule,
        MatExpansionModule,


    ],
    providers: [
    ],

    exports: [
        AjudaPesquisaComponent
   ]
})
export class AjudaPesquisaModule {
}