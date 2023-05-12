import { Component, ElementRef, Inject, Input, PLATFORM_ID, Renderer2, RendererStyleFlags2 } from '@angular/core';
import { AbstractBaseComponent, setStyles$ } from '@mapiacompany/armory';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'bottom-fixed-bar',
  template: `
    <ng-content></ng-content>
    <div class="empty-space"></div>
  `,
  styleUrls: [ './bottom-fixed-bar.scss' ],
  standalone: true,
})
export class BottomFixedBar extends AbstractBaseComponent {
  @Input() height: string;
  _backupHeight: string;

  get parentElement(): HTMLElement {
    const getParent = (element: HTMLElement) => {
      return element.parentElement;
    };
    let el = this.elementRef.nativeElement;
    while (getParent(el) !== document.body) {
      if (!getParent(el)) {
        break;
      }
      el = getParent(el);
      if (el.querySelector('router-outlet')) {
        break;
      }
    }
    return el?.querySelector('router-outlet + *') || this.hostEl.parentElement;
  }

  get hostEl() {
    return this.elementRef.nativeElement;
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {
    super();
  }

  ngOnInit() {
    if (!this.height) {
      throw new Error('bottom-fixed-bar에 height 인풋을 무조건 넣어줘야합니다.');
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this._backupHeight = getComputedStyle(this.parentElement).getPropertyValue('--bottom-fixed-bar-height');

      setTimeout(() => {
        // app-root 컴포넌트 수준에서 css variable을 할당합니다.
        this.subscribeOn(
          setStyles$(this, this.renderer, this.parentElement, {
            '--bottom-fixed-bar-height': ({ height }) => height
          })
        );
      });
    }
  }

  override ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      if (!this._backupHeight) {
        this.renderer.removeStyle(
          this.parentElement,
          '--bottom-fixed-bar-height',
          RendererStyleFlags2.DashCase
        );
      } else {
        this.renderer.setStyle(
          this.parentElement,
          '--bottom-fixed-bar-height',
          this._backupHeight,
          RendererStyleFlags2.DashCase
        );
      }
    }
  }

}
