import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataTable } from 'src/app/Models/DataTable/data-table';
import { Tasks } from 'src/app/Models/Tasks/tasks';
import { TasksService } from 'src/app/Service/api/tasks.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-createtasks',
  templateUrl: './createtasks.component.html',
  styleUrls: ['./createtasks.component.css']
})
export class CreateTasksComponent implements OnInit{

  task: Tasks = new Tasks();

  constructor(private tasksService:TasksService,  private router:Router) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void { }

  onSubmit(){
      Swal.fire({
        title: '¿Estas seguro?',
        text: "Confirmar si deseas guardar los datos del usuario ingresados.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, guardar',
        cancelButtonText: 'No, cancelar',
        buttonsStyling: true
      }).then((result) => {
        if(result.value){
          this.tasksService.storeTasks(this.task).subscribe(
            (success: any) => {
                this.indexTasks();
                this.alertSwal('success', '¡Accion Exitosa!', 'Creacion del usuario exitosa.');
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
          this.alertSwal('warning', '¡Accion cancelada!', 'Creacion del usuario cancelada.');
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
