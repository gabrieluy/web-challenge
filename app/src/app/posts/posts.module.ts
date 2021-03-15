import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { PostListComponent } from './post-list/post-list.component';
import { environment } from '../../environments/environment';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { PostLocationModalComponent } from './post-location-modal/post-location-modal.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [PostListComponent, PostLocationModalComponent, PostComponent],
  imports: [
    AgmCoreModule.forRoot({
        apiKey: environment.map.apiKey,
    }),
    CommonModule,
    RouterModule,
    FormsModule,
    NzDividerModule,
    NzTableModule,
    NzMessageModule,
    NzModalModule,
    NzPopconfirmModule,
    NzButtonModule,
    NzAvatarModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    ReactiveFormsModule
  ],
  entryComponents: [PostLocationModalComponent],
  exports: [PostListComponent, PostComponent]
})
export class PostsModule { }

