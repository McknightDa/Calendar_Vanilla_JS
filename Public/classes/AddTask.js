import { openDialog } from "../util_modules/modal_utils.js";
import { AddTaskMarkup } from "../markup_modules/Add_Task_Markup.js"
import { closeDialog } from '../util_modules/modal_utils.js';
import { uuidv4 } from '../util_modules/uuid_util.js'
import { getMonth } from '../util_modules/date_utils.js';

export default class AddTask{
    constructor(context){
        this.context = context;
        this.hours = [];
        for(let i=0; i < 24; i++){
            for(let j = 0; j < 4; j++){
                const mins = j === 0 ? '00': j*15;
                const hourText = i === 0 ? `12:${mins} AM`: i > 12  ? `${i-12}:${mins} PM`:`${i}:${mins} ${i === 12 ? 'PM':'AM'}`;
                const value = Number(`${i}.${j*15}`);
                this.hours.push({hourText, value})
            }
        }
    }
    addTask(formData){
        const dateSelected = new Date(formData.get('task_date'));
        const user = this.context.getState('currentUser');
        const currentCalendarData = this.context.getState('calendarData');
        const month = `${getMonth(dateSelected.getMonth() + 1).toLowerCase()}_${dateSelected.getFullYear()}`;
        const currentTaskList = currentCalendarData[month].find(d => d.day === dateSelected.getDate())?.tasks || [];
        let newDay;
        if(!currentTaskList.length){
            newDay = {
                month:getMonth(dateSelected.getMonth() + 1),
                monthNum: dateSelected.getMonth() + 1,
                day:dateSelected.getDate(),
                year: dateSelected.getFullYear(),
                tasks: currentTaskList
            };
            if(!currentCalendarData[month]){
                currentCalendarData[month] = []
            }
            currentCalendarData[month].push( newDay )
        }

        const newEntry = {
            task_id: uuidv4(),
            title:formData.get('task_title'),
            description:formData.get('task_description'),
            createdBy:{
                id: user.id,
                name:user.name
            },
            assignedTo:formData.get('task_assigned'),
            from: Number(formData.get('task_start')),
            to: Number(formData.get('task_end'))
        };
        currentTaskList.push(newEntry);
        this.context.getState('renderedCalendar').refreshCalendar();
        this.context.setState({addingTask: false});
        closeDialog()
    }
    boundAdd = this.addTask.bind(this);
    /* validation to stop user from having end time that is earlier than start time */
    updateOptions(){
        const startNodes =  this.startDropDown.querySelectorAll('option');
        startNodes.forEach(node => {
            node.disabled = node.value >= Number(this.endDropDown.value)
        });
        const endNodes = this.endDropDown.querySelectorAll('option');
        endNodes.forEach(node => {
            node.disabled = node.value <= Number(this.startDropDown.value)
        })
    }
    boundUpdateOptions = this.updateOptions.bind(this);

    render(){
        openDialog(new AddTaskMarkup(),{height: '40vh'});
        const form = document.querySelector('.add_task_form');
        this.startDropDown = document.querySelector('#task_start');
        this.endDropDown = document.querySelector('#task_end');

        this.hours.forEach((_d,i) => {
            const node = document.createElement('option');
            node.value = _d.value;
            node.innerText = _d.hourText;
            const sClone = node.cloneNode(true);
            const eClone = node.cloneNode(true);
            if(i === 0 ){
                sClone.selected = 'selected';
                eClone.disabled = true;
            }
            if(i===1){
                eClone.selected = 'selected'
            }
            if(i > 0){
                sClone.disabled = true
            }
            this.startDropDown.appendChild(sClone);
            this.endDropDown.appendChild(eClone)
        });

        this.startDropDown.addEventListener('change', e => {
            e.stopPropagation();
            this.boundUpdateOptions()
        });
        this.endDropDown.addEventListener('change', e=>{
            e.stopPropagation();
            this.boundUpdateOptions()
        });

        const cancelBtn = document.querySelector('.task_cancel_button');
        cancelBtn.addEventListener('click', e => {
            e.stopPropagation();
            e.preventDefault();
            closeDialog()
        });

        form.addEventListener('submit', e =>{
            e.preventDefault();
            e.stopPropagation();
            const data = new FormData(form);
            this.boundAdd(data)
        })
    }
}