/* tslint:disable:no-string-literal */
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import { TempDataService } from '../service/temp-data.service';
import { Quiz } from '../entities/quiz';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit {
  createQuiz: FormGroup;

  constructor(private fb: FormBuilder, private data: TempDataService) { }

  saveQuiz() {
    console.log(this.createQuiz.value);
    this.data.saveQuiz(this.createQuiz.value as Quiz);
  }

  createNewQuestion() {
    const question = this.fb.group({
      title: ['', Validators.required],
      options: this.fb.array([])
    });

    const questions = this.createQuiz.controls.questions as FormArray;
    const options = question.controls.options as FormArray;
    options.push(this.createNewOptionGroup());
    options.push(this.createNewOptionGroup());
    // console.log(options);
    questions.push(question);
  }
  createNewOption(questionIndex: number) {
    const option = this.createNewOptionGroup();
    const questions = this.createQuiz.controls.questions as FormArray;
    // console.log(questions);
    const options = (questions.controls[questionIndex] as FormArray).controls['options'] as FormArray;
    // console.log(options);
    options.push(option);
  }
  private createNewOptionGroup(): FormGroup {
    return this.fb.group({
      answer: ['', Validators.required],
      correct: [false, Validators.required]
    });
  }


  ngOnInit() {
    this.createQuiz = this.fb.group({
      
      _id: String((this.data.quizzes.length) +1),
      title: [''],
      questions: this.fb.array([]),
      // question1: [''],  // We want a dynamic form and not this!
      // option1_1: [''],
      // option1_2: [''],
      // option1_3: [''],
      // question2: [''],
      // option2_1: [''],
      // option2_2: [''],
      // option2_3: [''],
    });
  }
}
