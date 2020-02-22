import { NgModule } from '@angular/core';
import { FuseSharedModule } from '../../../../@fuse/shared.module';
import { CdkChaveAcessoPluginComponent } from './cdk-chave-acesso-plugin.component';
import { MatButtonModule, MatDialogModule, MatInputModule } from '@cdk/angular/material';

@NgModule({
    declarations: [
        CdkChaveAcessoPluginComponent
    ],
    imports: [
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        FuseSharedModule
    ],
    entryComponents: [
        CdkChaveAcessoPluginComponent
    ],
    exports: [

    ]
})

export class CdkChaveAcessoPluginModule {

}
