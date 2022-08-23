import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Event } from 'src/app/models/event.entity';
import { EventService } from 'src/app/services/event.service';
import {Category} from "../../../../../models/Category.entity";
import {CategoryService} from "../../../../../services/category.service";
import {TokenStorageService} from "../../../../../auth/token-storage.service";

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {


  form = this.fb.group({
    eventTitle: "",
    city: "",
    hourBegin: "",
    hourEnd: "",
    createdAt: new Date(),
    category: "",
    description: "",
    isAlive: true,
    author: String
  });

  authorId?: String;

  event?: Event;
  errorMessage?: string;
  hourBegin!: Date;

  categories: Category[] = [];


  constructor(private eventService: EventService,
      private cateoryService: CategoryService,
      private toastr: ToastrService,
      private fb: FormBuilder,
      private tokenStotageService: TokenStorageService  ) { }

  ngOnInit(): void {
    this.getAllCategories();

    const user = this.tokenStotageService.getUser();
    this.authorId = user.id;

  }

  onSubmit(): void {

    this.form = this.fb.group({
      eventTitle: this.form.get('eventTitle')?.value,
      city: this.form.get('city')?.value,
      hourBegin: this.form.get('hourBegin')?.value.toString().replace("T"," "),
      hourEnd: this.form.get('hourEnd')?.value.toString().replace("T"," "),
      createdAt: new Date(),
      category: this.form.get('category')?.value,
      description: this.form.get('description')?.value,
      isAlive: true,
      authorId: this.authorId
    });

    console.log(this.form.value);

    this.eventService.save(this.form.value).subscribe({
      next: () => {
        console.log("data added : " + this.form.value);
        this.toastr.success("Ajout ok", 'Evénement ajouter avec succès', {
          timeOut: 3000,
          progressBar: true
        });
      },
      error: (err) => {
        this.errorMessage = err.message;
        console.log("add event failed")
        this.toastr.error(this.errorMessage , 'Echec de l\'ajout de l\'événement', {
          timeOut: 3000,
          progressBar: true
        });
      }
    });



  }




  getAllCategories() {
    this.cateoryService.findAll().subscribe( {
      next: (data) => {
        this.categories = data;
        console.log('List des catégories:', this.categories);
      },
      error: (err) => {
        this.errorMessage = err.message;
        console.log("La liste des catégories n'a pas pu être récupérée");
      }
    })
  }

}
