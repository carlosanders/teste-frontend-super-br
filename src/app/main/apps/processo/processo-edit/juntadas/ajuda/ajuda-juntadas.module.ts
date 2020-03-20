import {NgModule} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';


import {AjudaJuntadasComponent} from './ajuda-juntadas.component';
import {CdkSharedModule} from '../../../../../../../@cdk/shared.module';

@NgModule({
    declarations: [
        AjudaJuntadasComponent
    ],
    imports: [
        CdkSharedModule,
        MatExpansionModule,
        
    ],
    providers: [
    ],
    exports: [
        AjudaJuntadasComponent
    ]
})
export class AjudaJuntadasModule {
}