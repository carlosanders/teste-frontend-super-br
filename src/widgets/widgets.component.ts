import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter,
    Input, Output, QueryList, ViewChild,
    ViewChildren, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import {Widget} from './widget';
import {DynamicService} from '../modules/dynamic.service';
import {cdkAnimations} from '@cdk/animations';
import {MatGridList} from '@angular/material/grid-list';
import {DndDragImageOffsetFunction} from 'ngx-drag-drop';

@Component({
    selector: 'widgets',
    templateUrl: './widgets.component.html',
    styleUrls: ['./widgets.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class WidgetsComponent {

    @Input() widgets: Widget[] = [];

    @Output() widgetsOrderChange: EventEmitter<Widget[]> = new EventEmitter<Widget[]>();

    @ViewChildren('dynamicComponent', {read: ViewContainerRef}) set _containers(dynamicComponent: QueryList<ViewContainerRef>) {
        if (this.dynamicComponent?.length && !dynamicComponent?.length) {
            this.dynamicComponent.forEach((vcr) => vcr.clear());
        }
        this.dynamicComponent = dynamicComponent;
        if (this.dynamicComponent) {
            const visibleWidgets = this.getVisibleWidgets();
            this.dynamicComponent.forEach((vcr, index) => {
                if (!vcr.length || vcr.element.nativeElement.getAttribute('widget') !== visibleWidgets[index].moduleName) {
                    vcr.clear();
                    this._dynamicService.loadComponent(visibleWidgets[index].module)
                        .then( (componentFactory)  => {
                            vcr.createComponent(componentFactory);
                            this._changeDetectorRef.detectChanges();
                        });
                }
            });
        }
    }
    @ViewChild(MatGridList) matGridList: MatGridList;

    dynamicComponent: QueryList<ViewContainerRef>;
    maxColspan = 1;
    maxRowspan = 1;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _dynamicService: DynamicService
    ) {
    }

    getVisibleWidgets(): Widget[] {
        return this.widgets
            .filter((widget) => !widget.hidden)
    }

    colsChanged(cols): void {
        this.maxColspan = cols;
        this.maxRowspan = Math.ceil((this.widgets.length / cols));
    }

    onDrop(targetWidget: Widget, originWidget: Widget): void {
        if (targetWidget.moduleName != originWidget.moduleName) {
            const fromIndex = this.widgets.findIndex((widget: Widget) => widget.moduleName == originWidget.moduleName);
            const toIndex = this.widgets.findIndex((widget: Widget) => widget.moduleName == targetWidget.moduleName);
            this.widgets.splice(toIndex, 0, this.widgets.splice(fromIndex, 1)[0])
            let orderSum = 0;
            this.widgets.forEach((widget: Widget) => {
                orderSum += 10;
                widget.ordem = orderSum;
            });
            this.widgetsOrderChange.emit(this.widgets)
            this._changeDetectorRef.detectChanges();
        }
    }

    offsetFunction: DndDragImageOffsetFunction = (event: DragEvent, dragImage: Element) => ({x: 0, y: 0});
}
