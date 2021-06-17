import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';

import {MatExpansionModule} from '@cdk/angular/material';


import {AjudaVinculacoesProcessosComponent} from './ajuda-vinculacoes-processos.component';
import {AjudaAssuntosModule} from 'app/main/apps/processo/processo-edit/assuntos/ajuda/ajuda-assuntos.module';
import {AjudaInteressadosModule} from 'app/main/apps/processo/processo-edit/interessados/ajuda/ajuda-interessados.module';
import {AjudaTramitacoesModule} from 'app/main/apps/processo/processo-edit/tramitacoes/ajuda/ajuda-tramitacoes.module';
import {AjudaSigilosModule} from 'app/main/apps/processo/processo-edit/sigilos/ajuda/ajuda-sigilos.module';
import {AjudaVisibilidadesModule} from 'app/main/apps/processo/processo-edit/visibilidades/ajuda/ajuda-visibilidades.module';

import {CdkSharedModule} from '@cdk/shared.module';

@NgModule({
    declarations: [
        AjudaVinculacoesProcessosComponent
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
        AjudaVinculacoesProcessosComponent
    ]
})
export class AjudaVinculacoesProcessosModule {
    constructor(private resolver: ComponentFactoryResolver) {
    }

    public resolveComponentFactory(): ComponentFactory<AjudaVinculacoesProcessosComponent> {
        return this.resolver.resolveComponentFactory(AjudaVinculacoesProcessosComponent);
    }
}
