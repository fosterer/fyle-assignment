import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SubjectsService } from '../../core/services/subjects.service';
import { Book } from 'src/app/core/models/book-response.model';

@Component({
  selector: 'front-end-internship-assignment-trending-subjects',
  templateUrl: './trending-subjects.component.html',
  styleUrls: ['./trending-subjects.component.scss'],
})
export class TrendingSubjectsComponent implements OnInit {

   // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  isLoading: boolean = true;

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  subjectName: string = '';

  allBooks: Book[] = [];

  constructor(
    private route: ActivatedRoute,
    private subjectsService: SubjectsService
  ) {}

  getAllBooks() {
    this.subjectsService.getAllBooks(this.subjectName).subscribe((data) => {
      this.allBooks = data?.works;
      // this.subjectsArray = data;
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.subjectName = params.get('name') || '';
      this.isLoading = true;
      this.getAllBooks();
    });
  }

}
