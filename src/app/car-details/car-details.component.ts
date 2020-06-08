import { Car } from '../car';
import { Comment } from '../comment';
import { Component, OnInit } from '@angular/core';
import { CarService } from '../car.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import {CommentService} from '../comment.service';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ViewportScroller} from "@angular/common";

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})

export class CarDetailsComponent implements OnInit {
  car: Car = new Car();
  param: string;
  roles: string;
  currentUserId: number;
  flagOfEditAndDelete: boolean;
  comments: Observable<Comment[]>;
  commentsForm: FormGroup;
  newComment: Comment = new Comment();
  isAnswer: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private carService: CarService,
              private authService: AuthService,
              private commentService: CommentService,
              private fb: FormBuilder,
              private viewportScroller: ViewportScroller) { }

  getCarDetails(id) {
    this.carService.getCar(id).subscribe(
      data => {
        this.car = data;
        console.log(data);
        this.getComments(this.car.id);
        this.checkEditRight();
      },
      error => console.log(error));
  }

  getComments(carId) {
    this.commentService.getCommentList(carId).subscribe(
      data => {
        this.comments = data;
        console.log(data);
      },
      error => console.log(error)
    );
  }

  createForm() {
    this.commentsForm = this.fb.group( {
      commentText: ['', Validators.maxLength(200)]
    });
  }

  checkEditRight() {
    if (this.roles.indexOf('ADMIN') !== -1 || this.currentUserId === this.car.ownerId) {
      console.log(this.roles.indexOf('ADMIN'));
      this.flagOfEditAndDelete = true;
    }
  }

  ngOnInit() {
    this.param = 'id';
    this.flagOfEditAndDelete = false;
    this.getCarDetails(this.route.snapshot.params[this.param]);
    this.authService.getUserInfo().subscribe(
      data => {
        this.roles = data.roles;
        this.currentUserId = data.id;
        this.checkEditRight();
      });
    this.createForm();
    this.isAnswer = false;
  }

  deleteCar(id: number) {
    this.carService.deleteCar(id)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['cars']);
        },
        error => console.log(error));
  }

  saveComment() {
    console.log(this.newComment);
    this.commentService.createComment(this.newComment).subscribe(
      data => {
        this.newComment = new Comment();
        this.newComment = data;
        this.newComment = new Comment();
        this.getComments(this.car.id);
      },
      error => console.log(error));
  }

  onSubmit() {
    this.newComment.carId = this.car.id;
    this.saveComment();
    this.isAnswer = false;
  }

  clickOnAnswer(commentId: number) {
    this.isAnswer = true;
    this.newComment.receiverCommentId = commentId;
    this.viewportScroller.scrollToAnchor('commentText');
  }

  clickOnCancelAnswer() {
    this.isAnswer = false;
    this.newComment.receiverCommentId = null;
  }

}
