import {Directive, ElementRef, AfterViewInit, Input} from '@angular/core';

@Directive({
    selector: 'input[cdkInputAutoFocus]'
})
export class CdkInputAutoFocusDirective implements AfterViewInit {

    @Input('inputAutoFocus')
    public  focused: boolean = true;

    constructor(private el: ElementRef<HTMLElement>) {}

    ngAfterViewInit(): void {
        if (this.focused) {
            setTimeout(() => this.el.nativeElement.focus(), 0);
        }
    }
}
