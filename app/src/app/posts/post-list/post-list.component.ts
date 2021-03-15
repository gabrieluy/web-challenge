import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PostModel } from '../models/post.model';
import { PostLocationModalComponent } from '../post-location-modal/post-location-modal.component';

@Component({
  selector: 'app-posts',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts: PostModel[] = [];
  loading = true;

  constructor(private postsService: PostsService,
              private nzMessageService: NzMessageService,
              private modalService: NzModalService) { }

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.loading = true;
    this.posts = await this.postsService.getPosts();
    this.loading = false;
  }

  async deletePost(id: string) {
    await this.postsService.deletePost(id);
    this.nzMessageService.info('Post deleted');
    this.loadData();
  }

  showLocationModal(post: PostModel) {
    this.modalService.create({
      nzTitle: 'Post Location',
      nzContent: PostLocationModalComponent,
      nzComponentParams: {
        lat: Number(post.lat),
        long: Number(post.long),
        tag: post.title
      },
      nzFooter: null
    });
  }
}
