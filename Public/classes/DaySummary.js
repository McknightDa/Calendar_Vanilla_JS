import { openDialog } from '../util_modules/modal_utils.js'
import { createTimeGrid, renderDetailsMarkUp } from '../markup_modules/Day_Summary_Markup.js';

export default class DaySummary{
    constructor(data){
        this.data = data;
        this.selectedTask= null;
    }
    closeDetails(){
        const foregroundGrid = document.querySelector('.summary_content_outer_shell');
        foregroundGrid.style.width = '80%';
        const details = document.querySelector('.basic_modal_details');
        details.style.width = null;
        details.innerHTML =null;
        this.selectedTask = null;
    }
    boundCloseDetails = this.closeDetails.bind(this);
    openDetails(){
        const foregroundGrid = document.querySelector('.summary_content_outer_shell');
        foregroundGrid.style.width = '64%';
        const details = document.querySelector('.basic_modal_details');
        details.style.width = '20%';
        renderDetailsMarkUp(this.selectedTask);
        document.querySelector('#close_details').addEventListener('click', (e) => {
            e.stopPropagation();
            this.boundCloseDetails()
        })

    }
    setSelectedTask(taskData){
        this.selectedTask = taskData;
        this.openDetails()
    }
    boundSelectedTask = this.setSelectedTask.bind(this);
    render(){
        openDialog(createTimeGrid(this.data),{width: '80%', height: '90%'});
        const scheduleMappingContainerLocation = document.querySelector('.summary_content_outer_shell');
        const backgroundGridLocation = document.querySelector('.day_time_breakdown_container').getBoundingClientRect();
        scheduleMappingContainerLocation.style.top = `${backgroundGridLocation.top}px`;
        scheduleMappingContainerLocation.style.left = `${backgroundGridLocation.left}px`;
        const contentContainer = document.querySelector('.basic_modal_content_and_details_container');
        contentContainer.addEventListener('task-details', e => this.boundSelectedTask(e.detail));

    }
}