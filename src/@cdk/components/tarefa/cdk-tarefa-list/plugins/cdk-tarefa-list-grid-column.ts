import {Tarefa} from "../../../../models";
import {TemplateRef, ViewContainerRef} from "@angular/core";

/**
 * Classe abstrata de plugin para criação de colunas dinâmicas na view mode 'grid' da cdk-tarefa-list.
 *
 * Exemplo de utilização:
 *
 * ##modules-config.ts:
 *
 * ```typescript
 *     {
 *         ...
 *         components: [
 *             '@cdk/components/tarefa/cdk-tarefa-list#gridcolumn': [
 *                 () => import('@cdk/components/tarefa/cdk-tarefa-list/plugins/exemplo/tarefa-grid-column-teste.module').then(m => m.TarefaGridColumnTesteModule),
 *             ],
 *         ]
 *     }
 * ```
 * ##@cdk/components/tarefa/cdk-tarefa-list/plugins/exemplo/tarefa-grid-column-teste.module.ts
 * ```typescript
 * @NgModule({
 *     imports: [
 *         MatIconModule,
 *         MatMenuModule,
 *         MatDividerModule,
 *         CommonModule,
 *         CdkSharedModule,
 *         MatTableModule,
 *         MatButtonModule
 *     ],
 *     providers: [],
 *     declarations: [ TarefaGridColumnTesteComponent ]
 * })
 * export class TarefaGridColumnTesteModule {
 *
 *     constructor(private resolver: ComponentFactoryResolver) {}
 *
 *     public resolveComponentFactory(): ComponentFactory<TarefaGridColumnTesteComponent> {
 *         return this.resolver.resolveComponentFactory(TarefaGridColumnTesteComponent);
 *     }
 * }
 * ```
 *
 * ##@cdk/components/tarefa/cdk-tarefa-list/plugins/exemplo/tarefa-grid-column-teste.component.ts
 * ```typescript
 * @Component({
 *     template: `
 *         <ng-template #td>
 *             EXEMPLO: {{tarefa.id}}
 *         </ng-template>
 *     `,
 *     styles: [],
 *     changeDetection: ChangeDetectionStrategy.OnPush,
 *     encapsulation: ViewEncapsulation.None
 * })
 * export class TarefaGridColumnTesteComponent extends CdkTarefaListGridColumn {
 *     @ViewChild('td', {static: true, read: TemplateRef}) _tdTemplateRef;
 *
 *     protected _matColumnDef: string = 'teste';
 *     protected _headerLabel: string = 'Teste';
 *     protected _isVisible: boolean = true;
 * }
 * ```
 */
export abstract class CdkTarefaListGridColumn {

    protected _matColumnDef: string;
    protected _tarefa: Tarefa;
    protected _isVisible: boolean;
    protected _headerLabel: string;
    protected _tdTemplateRef: TemplateRef<any>;

    public set tarefa(tarefa: Tarefa) {
        this._tarefa = tarefa;
    }

    public get tarefa(): Tarefa {
        return this._tarefa;
    }

    public getMatColumnDef(): string {
        return this._matColumnDef;
    }

    public isVisible(): boolean {
        return this._isVisible;
    }

    public tdTemplateRef(): TemplateRef<any> {
        return this._tdTemplateRef;
    }

    public headerLabel(): string {
        return this._headerLabel;
    }
}
