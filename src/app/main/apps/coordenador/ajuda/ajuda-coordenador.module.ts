import {NgModule} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

import { AjudaCoordenadorComponent } from './ajuda-coordenador.component';
import { CdkSharedModule } from '../../../../../@cdk/shared.module';


@NgModule({
    declarations: [
        AjudaCoordenadorComponent
    ],
    imports: [
        CdkSharedModule,
        MatExpansionModule,


    ],
    providers: [
    ],

    exports: [
        AjudaCoordenadorComponent
   ]
})
export class AjudaCoordenadorModule {
}