import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule, MatIconModule} from '@cdk/angular/material';
import {RouterModule, Routes} from '@angular/router';

import {CdkSidebarModule} from '@cdk/components';
import {CdkSharedModule} from '@cdk/shared.module';
import {AdminComponent} from './admin.component';
import {MainSidebarComponent} from './sidebars/main/main-sidebar.component';
import {modulesConfig} from 'modules/modules-config';
import * as fromGuards from './store/guards';
import {MatRippleModule} from '@angular/material/core';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: 'especie-tarefas',
                loadChildren: () => import('./especie-tarefa/especie-tarefa.module').then(m => m.EspecieTarefaModule)
            },
            {
                path: 'especie-setor',
                loadChildren: () => import('./especie-setor/especie-setor.module').then(m => m.EspecieSetorModule)
            },
            {
                path: 'especie-atividades',
                loadChildren: () => import('./especie-atividade/especie-atividade.module').then(m => m.EspecieAtividadeModule)
            },
            {
                path: 'especie-processo',
                loadChildren: () => import('./especie-processo/especie-processo.module').then(m => m.EspecieProcessoModule)
            },
            {
                path: 'unidades',
                loadChildren: () => import('./unidades/unidades.module').then(m => m.UnidadesModule)
            },
            {
                path: 'usuarios',
                loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule)
            },
            {
                path: 'externos',
                loadChildren: () => import('./usuarios-externos/usuarios-externos.module').then(m => m.UsuariosExternosModule)
            },
            {
                path: 'especie-relevancias',
                loadChildren: () => import('./especie-relevancia/especie-relevancia.module').then(m => m.EspecieRelevanciaModule)
            },
            {
                path: 'tipos-documentos',
                loadChildren: () => import('./tipo-documento/tipo-documento.module').then(m => m.TipoDocumentoModule)
            },
            {
                path: 'tipos-relatorios',
                loadChildren: () => import('./tipo-relatorio/tipo-relatorio.module').then(m => m.TipoRelatorioModule)
            },
            {
                path: 'templates',
                loadChildren: () => import('./templates/templates.module').then(m => m.TemplatesModule)
            },
            {
                path: 'assuntos',
                loadChildren: () => import('./assunto-administrativo/assunto-administrativo.module').then(m => m.AssuntoAdministrativoModule)
            },
            {
                path: 'classificacoes',
                loadChildren: () => import('./classificacao/classificacao.module').then(m => m.ClassificacaoModule)
            },
            {
                path: 'pessoas',
                loadChildren: () => import('./admin-pessoa/admin-pessoa.module').then(m => m.AdminPessoaModule)
            },
            {
                path: 'municipios',
                loadChildren: () => import('./municipio/municipio.module').then(m => m.MunicipioModule)
            },
            {
                path: 'cargos',
                loadChildren: () => import('./cargo/cargo.module').then(m => m.CargoModule)
            },
            {
                path: 'workflows',
                loadChildren: () => import('./workflow/workflow.module').then(m => m.WorkflowModule)
            },
            {
                path: 'modalidade-orgao-central',
                loadChildren: () => import('./modalidade-orgao-central/modalidade-orgao-central.module').then(m => m.ModalidadeOrgaoCentralModule)
            },
            {
                path: 'tipo-acao-workflow',
                loadChildren: () => import('./tipo-acao-workflow/tipo-acao-workflow.module').then(m => m.TipoAcaoWorkflowModule)
            },
            {
                path: 'tipo-validacao-workflow',
                loadChildren: () => import('./tipo-validacao-workflow/tipo-validacao-workflow.module').then(m => m.TipoValidacaoWorkflowModule)
            },
            {
                path: 'avisos',
                loadChildren: () => import('./aviso/aviso.module').then(m => m.AvisoModule)
            },
            {
                path: 'servidor-email',
                loadChildren: () => import('./servidor-email/servidor-email.module').then(m => m.ServidorEmailModule)
            },
            {
                path: 'especie-documento-avulso',
                loadChildren: () => import('./especie-documento-avulso/especie-documento-avulso.module').then(m => m.EspecieDocumentoAvulsoModule)
            },
            {
                path: 'modelos',
                loadChildren: () => import('./modelos/modelos.module').then(m => m.ModelosModule)
            },
            {
                path: 'config-modulo',
                loadChildren: () => import('./config-modulo/config-modulo.module').then(m => m.ConfigModuloModule)
            },
            {
                path: 'cronjob',
                loadChildren: () => import('./cronjob/cronjob.module').then(m => m.CronjobModule)
            },
        ],
        canActivate: [fromGuards.ResolveGuard]
    },
    {
        path: '**',
        redirectTo: 'especie-tarefas'
    }
];

const path = 'app/main/apps/admin';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.unshift(r)));
    }
});

@NgModule({
    declarations: [
        AdminComponent,
        MainSidebarComponent
    ],
    imports: [
        CommonModule,
        CdkSidebarModule,
        RouterModule.forChild(routes),
        MatIconModule,
        RouterModule,
        CdkSharedModule,
        MatButtonModule,
        MatRippleModule,
        MatExpansionModule
    ],
    providers: [
        fromGuards.ResolveGuard
    ]
})
export class AdminModule {
}
