import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RealizarTransicaoComponent} from './realizar-transicao.component';
import {CdkTransicaoFormModule} from "../../../../../@cdk/components/transicao/cdk-transicao-form/cdk-transicao-form.module";


@NgModule({
    declarations: [RealizarTransicaoComponent],
    imports: [
        CommonModule,
        CdkTransicaoFormModule
    ]
})
export class RealizarTransicaoModule {
}
