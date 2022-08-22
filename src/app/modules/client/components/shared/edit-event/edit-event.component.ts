import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Event } from 'src/app/models/event.entity';
import { EventService } from 'src/app/services/event.service';
import {Category} from "../../../../../models/Category.entity";
import {CategoryService} from "../../../../../services/category.service";

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
    category: "",
    description: "",
    isAlive: true
  });

  event?: Event;
  errorMessage?: string;
  hourBegin!: Date;

  categories: Category[] = [];


  constructor(private eventService: EventService,
      private cateoryService: CategoryService,
      private toastr: ToastrService,
      private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  onSubmit(): void {

    this.form = this.fb.group({
      eventTitle: this.form.get('eventTitle')?.value,
      city: this.form.get('city')?.value,
      hourBegin: this.form.get('hourBegin')?.value.toString().replace("T"," "),
      hourEnd: this.form.get('hourEnd')?.value.toString().replace("T"," "),
      category: this.form.get('category')?.value,
      description: this.form.get('description')?.value,
      isAlive: true
    });

    // this.form.patchValue(this.form.get('hourBegin')?.value.toString().replace("T"," "));
    // this.form.patchValue(this.form.get('hourBegin')?.value.toString().replace("T"," "));
    // this.form.get('hourBegin')?.value.toString().replace("T"," ");
    // this.form.get('hourBegin')?.value.toString().replace("T"," ");
    this.hourBegin = this.form.get('hourBegin')?.value;

    console.log("Vérif Format date debut : " + this.form.get('hourBegin')?.value);
    console.log("Vérif Format date debut : " + this.form.get('hourBegin')?.value);
    console.log("Vérif hourBegin : " + this.hourBegin);
    console.log("vétif de la catégorie:" + this.form.get('category')?.value);
    // this.eventService.save(this.event!).subscribe({
    // this.eventService.save(this.form.value).subscribe({

    this.eventService.save(this.form.value).subscribe({
      next: () => {
        // this.event = data;
        // this.form = data;
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
