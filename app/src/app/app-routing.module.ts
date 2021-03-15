import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './posts/post/post.component';
import { PostListComponent } from './posts/post-list/post-list.component';

const routes: Routes = [
  {
    path: '',
    component: PostListComponent
  },
  {
    path: 'posts',
    data: {
      breadcrumb: 'posts'
    },
    children: [
      {
        path: '',
        component: PostListComponent,
      },
      {
        path: 'create',
        component: PostComponent,
        data: {
          breadcrumb: 'create'
        }
      },
      {
        path: 'edit/:id',
        component: PostComponent,
        data: {
          breadcrumb: 'edit'
        },
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
