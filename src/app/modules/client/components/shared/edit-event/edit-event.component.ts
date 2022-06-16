import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Event } from 'src/app/models/event.entity';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {

  // form: EventDTO = {
  //   eventTitle: "",
  //   city: "", 
  //   hourBegin: new Date,
  //   hourEnd: new Date, 
  //   description: "",
  //   isAlive: true

  // };

  form = this.fb.group({
    eventTitle: "",
    city: "", 
    hourBegin: "",
    hourEnd: "", 
    description: "",
    isAlive: true
  });

  event?: Event;
  errorMessage?: string;
  hourBegin!: Date;


  constructor(private eventService: EventService, 
      private toastr: ToastrService,
      private fb: FormBuilder,) { }

  ngOnInit(): void {
  }

  onSubmit(): void {

    this.form = this.fb.group({
      eventTitle: this.form.get('eventTitle')?.value,
      city: this.form.get('city')?.value, 
      hourBegin: this.form.get('hourBegin')?.value.toString().replace("T"," "),
      hourEnd: this.form.get('hourEnd')?.value.toString().replace("T"," "), 
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
        this.toastr.error(this.errorMessage , 'Echec de l\'ajout d\'événement', {
          timeOut: 3000,
          progressBar: true
        });
      }
    });
  }

}
