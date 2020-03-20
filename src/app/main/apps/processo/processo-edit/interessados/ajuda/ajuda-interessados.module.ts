import {NgModule} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';


import {AjudaInteressadosComponent} from './ajuda-interessados.component';
import {CdkSharedModule} from '../../../../../../../@cdk/shared.module';

@NgModule({
    declarations: [
        AjudaInteressadosComponent
    ],
    imports: [
        CdkSharedModule,
        MatExpansionModule,
        
    ],
    providers: [
    ],
    exports: [
        AjudaInteressadosComponent
    ]
})
export class AjudaInteressadosModule {
}