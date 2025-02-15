import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { Tasks } from 'src/app/Models/Tasks/tasks';
import { TasksService } from 'src/app/Service/api/tasks.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabletasks',
  templateUrl: './tabletasks.component.html',
  styleUrls: ['./tabletasks.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class TableTasksComponent implements OnInit{

  dataTable: any = {
    search: '',
    perPage: 10,
    total: 0,
    count: 0,
    per_page: 0,
    current_page: 1,
    total_pages: 0
  }

  task:Tasks = new Tasks();

  dataSource = new MatTableDataSource<Tasks>();
  displayedColumns: string[] = ['id', 'titulo', 'descripcion', 'estado', 'finalizar', 'editar', 'eliminar'];

  constructor(private taskService:TasksService,  private router:Router) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(){
    this.taskService.getTasks().subscribe(
      (response: any) => {
        if (response.error === false) {
          this.dataSource.data = response.data;
        }
      },
      error => {
        let mensaje = 'Se encontraron errores:\n';

        for (const campo in error.error.errors) {
          if (error.error.errors.hasOwnProperty(campo)) {
            const mensajes = error.error.errors[campo];
            mensaje += `${campo}:\n`;

            for (const mensajeError of mensajes) {
              mensaje += `- ${mensajeError}\n`;
            }
          }
        }
        this.alertSwal('error', 'Ooops..', mensaje)
      }
    )
  }

  editTask(id:number, task: Tasks){
    this.router.navigate([`tasks/edit/${id}`], { state: { task } });
  }

  completeTask(id:number){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Confirma si deseas finalizar la tarea.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, finalizar',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if(result.value){
        this.taskService.completeTasks(id).subscribe(
          data => {
            this.getTasks();
            this.alertSwal('success', '¡Accion Exitosa!', 'Se finalizó la tarea.');
          },
          error => {
            this.getTasks();
            this.alertSwal('error', '¡Accion Fallida!', 'No se finalizó la tarea.');
          }
        )
      }else{
        this.alertSwal('warning', '¡Accion Cancelada!', 'Finalización de la tarea cancelada.');
      }
    })
  }

  deleteTask(task: Tasks){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Confirma si deseas eliminar la tarea.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, elimínar',
      cancelButtonText: 'No, cancelar',
      buttonsStyling: true
    }).then((result) => {
      if(result.value){
        this.taskService.deleteTasks(task.id).subscribe(
          data => {
            this.getTasks();
            this.alertSwal('success', '¡Accion Exitosa!', 'Se elimino la tarea.');
          },
          error => {
            this.getTasks();
            this.alertSwal('error', '¡Accion Fallida!', 'No se elimino la tarea.');
          }
        )
      }else{
        this.alertSwal('warning', '¡Accion Cancelada!', 'Eliminacion de la tarea cancelada.');
      }
    })
  }

  alertSwal(icon:any, title:string, text:string){
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    })
  }

  searchTasks(){
    this.dataTable.current_page = 1;
    this.getTasks();
  }
}
