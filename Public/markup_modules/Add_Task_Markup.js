/*web component syntax*/

export class AddTaskMarkup extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
      <form class="add_task_form">
        <h2>Add Task</h2>
        <div class="add_task_field_container">
            <div>
                <label for="task_title">Title:</label>
                <input required type="text" id="task_title" name="task_title">            
            </div>
            <div>
                <label for="task_assigned">Assigned To:</label>
                <input required type="text" id="task_assigned"  name="task_assigned">
            </div>
        </div>
         <div class="add_task_field_container">
            <label for="task_description">Description:</label>
            <textarea required cols="3" id="task_description" name="task_description"> </textarea>
        </div>
         <div class="add_task_field_container">
         <div style="width:100%">
             <label for="task_description">Date:</label>
            <input required type="date" id="task_date" name="task_date">
        </div>
        </div>
        <div class="add_task_time_container">
            <div class="add_task_field_container">
                <label for="task_assigned">Start Time:</label>
                <select required id="task_start" name="task_start"></select>
            </div>
            <div class="add_task_field_container">
                <label for="task_assigned">End Time:</label>
                <select required id="task_end" name="task_end"></select>
            </div>
        </div>
        <div class="add_task_btn_container">
            <button type="submit" class="task_add_button">Add</button>
            <button class="task_cancel_button">Cancel</button>
        </div>
      </form>
    `;
    }
}

customElements.define('add-task-component', AddTaskMarkup);