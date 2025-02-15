import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Tasks } from 'src/app/Models/Tasks/tasks';
import { TasksService } from 'src/app/Service/api/tasks.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edittasks',
  templateUrl: './edittasks.component.html',
  styleUrls: ['./edittasks.component.css']
})
export class EditTasksComponent {

  task: Tasks = {
    id:history.state.task.id,
    title:history.state.task.title,
    description:history.state.task.description
  };
  passwordMismatch = false;

  constructor(private tasksService:TasksService,  private router:Router) { }

  ngOnInit(): void {
    this.editTask();
  }

  editTask(){
    this.tasksService.editTasks(this.task.id).subscribe(
      (success: any) => {
          this.task = success.data;
          console.log(this.task);
      },
      error => {
        // Manejo de errores aquí
        let mensaje = 'Se encontraron errores:\n';
        if(error.error.errors){
          for (const campo in error.error.errors) {
            if (error.error.errors.hasOwnProperty(campo)) {
              const mensajes = error.error.errors[campo];
              for (const mensajeError of mensajes) {
                mensaje += `${mensajeError}`;
              }
            }
          }
        }else{
          mensaje += error.error.message;
        }
        this.alertSwal('error', '¡Accion Fallida!', mensaje);
      }
    )
  }

  onSubmit(){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Confirmar si deseas actualizar los datos de la tarea ingresados.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, actualizar',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if(result.value){
        this.tasksService.updateTasks(this.task.id, this.task).subscribe(
          (success: any) => {
              this.indexTasks();
              this.alertSwal('success', '¡Accion Exitosa!', 'Actualizacion de la tarea exitosa.')
          },
          error => {
            // Manejo de errores aquí
            let mensaje = 'Se encontraron errores:\n';
            if(error.error.errors){
              for (const campo in error.error.errors) {
                if (error.error.errors.hasOwnProperty(campo)) {
                  const mensajes = error.error.errors[campo];
                  for (const mensajeError of mensajes) {
                    mensaje += `${mensajeError}`;
                  }
                }
              }
            }else{
              mensaje += error.error.message;
            }
            this.alertSwal('error', '¡Accion Fallida!', mensaje);
          }
        )
      }else{
        this.alertSwal('warning', '¡Accion cancelada!', 'Actualizacion de la tarea cancelada.')
      }
    })
  }

  indexTasks(){
    this.router.navigate(['tasks']);
  }

  alertSwal(icon:any, title:string, text:string){
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    })
  }
}
