import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArquivistaLembreteBlocoComponent} from './arquivista-lembrete-bloco.component';
import {LembreteBlocoStoreModule} from './store/store.module';


@NgModule({
    declarations: [ArquivistaLembreteBlocoComponent],
    imports: [
        CommonModule,
        LembreteBlocoStoreModule
    ]
})
export class ArquivistaLembreteBlocoModule {
}
