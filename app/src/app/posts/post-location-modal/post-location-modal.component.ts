import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-post-location-modal',
  templateUrl: './post-location-modal.component.html',
  styleUrls: ['./post-location-modal.component.scss']
})
export class PostLocationModalComponent implements OnInit {
  @Input() tag = '';
  @Input() lat = 0;
  @Input() long = 0;
  zoom = environment.map.defaultZoom;

  constructor(private modal: NzModalRef) {}

  destroyModal(): void {
    this.modal.destroy();
  }

  ngOnInit() {
  }
}
