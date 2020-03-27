import {NgModule} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';


import {AjudaSigilosComponent} from './ajuda-sigilos.component';
import {CdkSharedModule} from '../../../../../../../@cdk/shared.module';

@NgModule({
    declarations: [
        AjudaSigilosComponent
    ],
    imports: [
        CdkSharedModule,
        MatExpansionModule,
        
    ],
    providers: [
    ],
    exports: [
        AjudaSigilosComponent
    ]
})
export class AjudaSigilosModule {
}