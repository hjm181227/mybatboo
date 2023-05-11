import {
  Component,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  PLATFORM_ID,
  Renderer2,
  RendererStyleFlags2,
  ViewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AbstractBaseComponent, setStyles$ } from '@mapiacompany/armory';
import { ColorUtil } from '@mapiacompany/styled-components';
import { SyntaxSharedModule } from "../../syntax-shared.module";

@Component({
  selector: 'page-header,top-panel',
  templateUrl: './page-header.component.html',
  styleUrls: [ './page-header.component.scss' ],
  standalone: true,
  imports: [
    SyntaxSharedModule
  ]
})
export class PageHeaderComponent extends AbstractBaseComponent {
  @Input() title: string;
  @Input() height: string;
  @Input() titleColor: string;
  _backupHeight: string;

  @HostBinding('style.padding') @Input() padding: PixelNumbers;
  @Input() backgroundColor: MpColor = 'white';

  @ViewChild('titleDiv') titleElement: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) public platformId: string,
    public elementRef: ElementRef<HTMLElement>,
    public renderer: Renderer2,
  ) {
    super();
  }

  get parentElement(): HTMLElement {
    return this.elementRef.nativeElement.parentElement;
  }

  ngOnInit() {
    if (!this.height) {
      throw new Error('page-header에 height 인풋을 무조건 넣어줘야합니다.');
    }

    this.subscribeOn(
      setStyles$(this, this.renderer, this.elementRef.nativeElement, {
        '--text-color': ({ titleColor }) => ColorUtil.parse(titleColor),
        '--page-header-background': ({ backgroundColor }) => ColorUtil.parse(backgroundColor)
      }),
    );
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this._backupHeight = getComputedStyle(this.parentElement).getPropertyValue('--page-header-height');
    }
    // root 컴포넌트 수준에서 css variable을 할당합니다.
    this.subscribeOn(
      setStyles$(this, this.renderer, this.parentElement, {
        '--page-header-height': ({ height }) => height,
      })
    );
  }

  override ngOnDestroy() {
    super.ngOnDestroy();

    if (isPlatformBrowser(this.platformId)) {
      if (!this._backupHeight) {
        this.renderer.removeStyle(
          this.parentElement,
          '--page-header-height',
          RendererStyleFlags2.DashCase
        );
      } else {
        this.renderer.setStyle(
          this.parentElement,
          '--page-header-height',
          this._backupHeight,
          RendererStyleFlags2.DashCase
        );
      }
    }
  }
}
