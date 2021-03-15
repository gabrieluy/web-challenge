import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { PostsService } from '../services/posts.service';
import { PostModel } from '../models/post.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Crud } from '../../generics/crud/crud';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent extends Crud implements OnInit {
  post: PostModel = { id: '', title: '', content: '', lat: 30, long: 30, image_url: '' };
  passwordVisible = false;

  constructor(
    fb: FormBuilder,
    private route: ActivatedRoute,
    router: Router,
    private postsService: PostsService,
    nzMessageService: NzMessageService
  ) {
    super(
      fb.group({
        id: ['', []],
        title: ['', [Validators.required]],
        content: ['', [Validators.required]],
        lat: [undefined, [Validators.required]],
        long: [undefined, [Validators.required]],
        image_url: ['', [Validators.required]],
      }),
      nzMessageService,
      router
    );
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.init(id, 'post');
    if (this.isEditMode) {
      this.loadEditingPost(id);
    }
  }

  async loadEditingPost(id: any) {
    const data = await this.postsService.getPost(id);
    this.loadForm(data);
    this.post = data;
  }

  async submitForm(post: any) {
    this.validateForm();
    if (this.isEditMode) {
      await this.postsService.updatePost(post);
    } else {
      await this.postsService.createPost(post);
    }
    this.afterEditOrCreate();
  }
}
