import {Directive, ElementRef, AfterViewInit, Input} from '@angular/core';

@Directive({
    selector: 'input[inputAutoFocus]'
})
export class CdkInputAutoFocusDirective implements AfterViewInit {

    @Input('inputAutoFocus')
    public  focused: boolean = false;

    constructor(private el: ElementRef<HTMLElement>) {}

    ngAfterViewInit(): void {
        if (this.focused) {
            setTimeout(() => this.el.nativeElement.focus(), 0);
        }
    }
}
