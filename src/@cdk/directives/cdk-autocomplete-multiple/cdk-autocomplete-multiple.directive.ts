import {
    Directive,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
} from '@angular/core';
import {fromEvent, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {CdkAutocompleteMultipleComponent} from '@cdk/components/autocomplete-multiple/cdk-autocomplete-multiple.component';

@Directive({
    selector: '[cdkAutocompleteMultiple]'
})
export class CdkAutocompleteMultipleDirective implements OnInit, OnDestroy {

    @Input() cdkAutocompleteMultiple: CdkAutocompleteMultipleComponent;
    private _unsubscribeAll: Subject<boolean> = new Subject<boolean>();

    constructor(private host: ElementRef<HTMLInputElement>) {
    }

    get origin(): HTMLInputElement {
        return this.host.nativeElement;
    }

    ngOnInit(): void {
        this.cdkAutocompleteMultiple.hostInput = this.host;

        fromEvent(this.origin, 'focus').pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(() => {
            this.cdkAutocompleteMultiple.openDropdown();
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }
}