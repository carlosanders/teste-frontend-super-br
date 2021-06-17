import {NgModule} from '@angular/core';
import {CdkSharedModule} from '../../../shared.module';
import {CdkChaveAcessoPluginComponent} from './cdk-chave-acesso-plugin.component';
import {MatButtonModule, MatDialogModule, MatInputModule} from '@cdk/angular/material';

@NgModule({
    declarations: [
        CdkChaveAcessoPluginComponent
    ],
    imports: [
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        CdkSharedModule
    ],
    entryComponents: [
        CdkChaveAcessoPluginComponent
    ],
    exports: [

    ]
})

export class CdkChaveAcessoPluginModule {

}
