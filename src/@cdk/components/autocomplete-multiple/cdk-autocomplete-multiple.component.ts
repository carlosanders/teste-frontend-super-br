import {
    AfterContentInit,
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, ContentChildren, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output,
    QueryList, TemplateRef, ViewChild, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {MatOption} from '@angular/material/core';
import {ConnectionPositionPair, Overlay, OverlayRef, PositionStrategy} from '@angular/cdk/overlay';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {TemplatePortal} from '@angular/cdk/portal';
import {MatCheckbox} from '@angular/material/checkbox';
import {AbstractControl} from '@angular/forms';

@Component({
    selector: 'cdk-autocomplete-multiple',
    templateUrl: './cdk-autocomplete-multiple.component.html',
    styleUrls: ['./cdk-autocomplete-multiple.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: cdkAnimations,
    exportAs: 'cdkAutocompleteMultiple'
})

export class CdkAutocompleteMultipleComponent implements OnInit, AfterContentInit, OnDestroy{

    @ViewChild('root', {static: true}) rootTemplate: TemplateRef<any>;
    @HostListener('document:keydown.escape', ['$event']) onKeydownHandler() {
        if (this._isOpen) {
            this.closeDropdown();
        }
    }
    @ContentChildren(MatOption, {descendants: true}) _options: QueryList<MatOption> = new QueryList<MatOption>();
    @ContentChildren(MatCheckbox, {descendants: true}) _checkboxs: QueryList<MatCheckbox> = new QueryList<MatCheckbox>();
    @Output() panelState: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() valuesChanged: EventEmitter<{value: any, source: MatCheckbox}> = new EventEmitter<{value: any, source: MatCheckbox}>();
    @Input() autoclose: boolean = true;
    @Input() displayWith: ((value: any) => string) | null;
    @Input() control: AbstractControl;
    private _inputRef: ElementRef<HTMLInputElement>;
    private _isOpen: boolean = false;
    private _overlayRef: OverlayRef;
    private _overlayOpen: Subject<boolean> = new Subject<boolean>();
    private _unsubscribeAll: Subject<boolean> = new Subject<boolean>();
    private _optionList: MatOption[] = [];
    private _checkboxList: MatCheckbox[] = [];

    constructor(private _vcr: ViewContainerRef,
                private _overlay: Overlay,
                private _changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this._overlayOpen.next(false);

        this._overlayOpen
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((isOpen) => {
                this._isOpen = isOpen;
                this.panelState.emit(this._isOpen);
            });
    }

    ngAfterContentInit(): void {
        this._options.changes
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((queryList: QueryList<MatOption>) => {
                this._optionList = queryList.toArray();
            });
        
        this._checkboxs.changes
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((queryList: QueryList<MatCheckbox>) => {
                this._checkboxList.forEach((checkbox: MatCheckbox) => checkbox.change.unsubscribe());
                this._checkboxList = queryList.toArray();
                queryList.map((checkbox: MatCheckbox, index: number) => {
                    checkbox.change
                        .pipe(takeUntil(this._unsubscribeAll))
                        .subscribe(() => {
                            let option = this._optionList[index];
                            
                            if (option && checkbox.checked && !option.selected) {
                                option.select();
                            } else if (option && !checkbox.checked && option.selected) {
                                option.deselect();
                            }
                            this.valuesChanged.emit({
                                value: option?.value || checkbox.value,
                                source: checkbox
                            });
                            if (this.autoclose) {
                                this.closeDropdown();
                            }
                        });
                });
            }); 
    }
    
    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
        if (this._overlayRef) {
            this._overlayRef.detach();
        }
        this._overlayOpen.complete();
    }
    
    set hostInput(ref: ElementRef<HTMLInputElement>) {
        this._inputRef = ref;
    }

    openDropdown(
        positionStrategy: PositionStrategy = null,
        maxHeight:number = 50*3,
        panelClass: string = 'cdk-autocomplete-multiple-panel',
        backdropClass: string = 'cdk-autocomplete-multiple-backdrop'
    ): void {
        if (!this._isOpen) {
            this._overlayRef = this._overlay.create({
                panelClass: panelClass,
                width: this._inputRef.nativeElement.offsetWidth,
                maxHeight: maxHeight,
                backdropClass: backdropClass,
                scrollStrategy: this._overlay.scrollStrategies.reposition(),
                positionStrategy: (positionStrategy ?? this.getOverlayPosition()),
                disposeOnNavigation: true,
                hasBackdrop: true
            });

            const template = new TemplatePortal(this.rootTemplate, this._vcr);
            this._overlayRef.attach(template);
            this._overlayRef.backdropClick()
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(() => {
                    this.closeDropdown();
                });

            this._overlayOpen.next(true);
        }
    }

    closeDropdown(): void {
        if (this._overlayRef && this._isOpen) {
            this._overlayRef.detachBackdrop();
            this._overlayRef.detach();
            this._overlayRef.dispose();
            this._overlayRef = null;
            this._overlayOpen.next(false);
            this._changeDetectorRef.markForCheck();
        }
    }

    private getOverlayPosition(): PositionStrategy {
        return this._overlay
            .position()
            .flexibleConnectedTo(this._inputRef.nativeElement)
            .withPositions([
                new ConnectionPositionPair(
                    { originX: 'start', originY: 'bottom' },
                    { overlayX: 'start', overlayY: 'top' }
                )
            ])
            .withFlexibleDimensions(false)
            .withPush(false);
    }
}
