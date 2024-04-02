import { Directive, ElementRef, Output, EventEmitter, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs'
  
@Directive({
  selector: '[appIntersectionObserver]',
  standalone: true
})
export class IntersectionObserverDirective implements OnInit, OnDestroy {
  @Input() offset = 0;

  @Input() active = false
  @Output() isIntersecting = new EventEmitter<boolean>()

  public _isIntersecting = false
  public subscription!: Subscription

  constructor (private element: ElementRef<Element>) {
  }

  ngOnInit () {
    this.subscription = this.createAndObserve()
  }

  ngOnDestroy () {
    this.subscription.unsubscribe()
  }

  createAndObserve () {
    const options: IntersectionObserverInit = {
      root: document.querySelector('#rootObserver'),
      rootMargin: `${this.offset}px`,
      threshold: 0,
    }

    return new Observable<boolean>(subscriber => {

      const intersectionObserver = new IntersectionObserver(entries => {
        const { isIntersecting } = entries[0];
        subscriber.next(isIntersecting);

      }, options)

      intersectionObserver.observe(this.element.nativeElement)

      return {
        unsubscribe () {
          intersectionObserver.disconnect()
        },
      }
    })
      .subscribe(insideElementOffset => {
        if(this.active) {
          this.isIntersecting.emit(insideElementOffset)
          this._isIntersecting = !insideElementOffset
        }
      })
  }
}