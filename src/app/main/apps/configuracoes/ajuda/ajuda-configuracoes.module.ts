import {NgModule} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

import { AjudaConfiguracoesComponent } from './ajuda-configuracoes.component';
import { CdkSharedModule } from '../../../../../@cdk/shared.module';


@NgModule({
    declarations: [
        AjudaConfiguracoesComponent
    ],
    imports: [
        CdkSharedModule,
        MatExpansionModule,


    ],
    providers: [
    ],

    exports: [
        AjudaConfiguracoesComponent
   ]
})
export class AjudaConfiguracoesModule {
}