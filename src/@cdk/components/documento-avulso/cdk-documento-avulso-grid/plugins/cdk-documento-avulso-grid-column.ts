import {DocumentoAvulso} from '../../../../models';
import {TemplateRef} from '@angular/core';
import {TableColumn} from '../../../table-definitions/table-column';

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
 *         <ng-template #columnExemplo>
 *             EXEMPLO SLAVE TPL: {{tarefa.id}}
 *         </ng-template>
 *     `,
 *     styles: [],
 *     changeDetection: ChangeDetectionStrategy.OnPush,
 *     encapsulation: ViewEncapsulation.None
 * })
 * export class TarefaGridColumnTesteComponent implements CdkTarefaListGridColumn {
 *     @ViewChild('columnExemplo', {static: true, read: TemplateRef}) columnTeste;
 *
 *     tableColumn: TableColumn;
 *     tarefa: Tarefa;
 *
 *     constructor() {
 *         this.tableColumn = new TableColumn();
 *         this.tableColumn.id = 'exemplo';
 *         this.tableColumn.positionFixed = false;
 *         this.tableColumn.headerLabel = 'EXEMPLO';
 *         this.tableColumn.definitions.order = 1000;
 *         this.tableColumn.definitions.selected = true;
 *         this.tableColumn.definitions.ordable = true;
 *         this.tableColumn.definitions.resizable = true;
 *         this.tableColumn.definitions.sortable = false;
 *         this.tableColumn.definitions.slave = false; // se true usa o getTemplateRef, se false usa o dataValue
 *         this.tableColumn.dataValue = (tarefa,) => `EXEMPLO DATA COLUMN: ${tarefa.id}`;
 *     }
 *
 *     getTemplateRef(tableColumn: TableColumn): TemplateRef<any> | null {
 *         if (tableColumn.id === 'exemplo') {
 *             return this.columnTeste;
 *         }
 *     }
 * }
 * ```
 */
export interface CdkDocumentoAvulsoGridColumn {

    documentoAvulso: DocumentoAvulso;
    tableColumn: TableColumn;
    getTemplateRef: (tableColumn: TableColumn) => TemplateRef<any> | null;
}
