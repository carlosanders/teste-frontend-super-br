import {NgModule} from '@angular/core';
import {MatExpansionModule} from '@cdk/angular/material';


import {AjudaProtocoloCreateComponent} from './ajuda-protocolo-create.component';
import {AjudaAssuntosModule} from 'app/main/apps/processo/processo-edit/assuntos/ajuda/ajuda-assuntos.module';
import {AjudaInteressadosModule} from 'app/main/apps/processo/processo-edit/interessados/ajuda/ajuda-interessados.module';
import {AjudaTramitacoesModule} from 'app/main/apps/processo/processo-edit/tramitacoes/ajuda/ajuda-tramitacoes.module';
import {AjudaSigilosModule} from 'app/main/apps/processo/processo-edit/sigilos/ajuda/ajuda-sigilos.module';
import {AjudaVisibilidadesModule} from 'app/main/apps/processo/processo-edit/visibilidades/ajuda/ajuda-visibilidades.module';


import {CdkSharedModule} from '@cdk/shared.module';

@NgModule({
    declarations: [
        AjudaProtocoloCreateComponent
    ],
    imports: [
        CdkSharedModule,
        MatExpansionModule,
        AjudaAssuntosModule,
        AjudaInteressadosModule,
        AjudaTramitacoesModule,
        AjudaSigilosModule,
        AjudaVisibilidadesModule,
    ],
    providers: [
    ],
    exports: [
        AjudaProtocoloCreateComponent
    ]
})
export class AjudaProtocoloCreateModule {
}
