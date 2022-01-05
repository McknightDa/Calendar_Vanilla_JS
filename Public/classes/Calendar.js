import { getMonth, getMonthDays } from '../util_modules/date_utils.js';
import { createDay, createCalendarContainerMarkup, createTaskList } from "../markup_modules/Calendar_Markup.js";

export default class Calendar{
    constructor(data){
        this.data = data;
        this.today = new Date();
        this.currentMonthLbl = getMonth();
        this.currentSelectedMonthNum = this.today.getMonth() + 1;
        this.year = this.today.getFullYear();
    }
    moveLeft(){
        if(this.currentSelectedMonthNum === 1){
            this.currentSelectedMonthNum = 12;
            this.year = this.year -1 ;
            this.currentMonthLbl =  getMonth(this.currentSelectedMonthNum);
            return this.refreshCalendar(true)
        }

        this.currentSelectedMonthNum--;
        this.currentMonthLbl = getMonth(this.currentSelectedMonthNum);
        return this.refreshCalendar(true);
    }
    moveRight(){
        if(this.currentSelectedMonthNum === 12){
            this.year++;
            this.currentSelectedMonthNum = 1;
            this.currentMonthLbl = getMonth(this.currentSelectedMonthNum);
            return this.refreshCalendar(true);
        }
        this.currentSelectedMonthNum++;
        this.currentMonthLbl = getMonth(this.currentSelectedMonthNum);
        return this.refreshCalendar(true);
    }
    /*Hard binding the class context to the function,
    otherwise it will loose the context when used as a callback in the event
    */
    boundMoveLeft = this.moveLeft.bind(this);
    boundMoveRight = this.moveRight.bind(this);


    refreshCalendar(){
        const calendarTitle =  document.querySelector('.calendar_title_text');
        calendarTitle.innerText = "";
        const calendarDaysContainer = document.querySelector('.calendar_days_container');
        calendarDaysContainer.innerHTML = null;
        this.render(true)
    }
    render(skipContainerBuilding= false){
        if(!skipContainerBuilding){
            createCalendarContainerMarkup();
            const leftArrow = document.querySelector('.arrow.left');
            const rightArrow = document.querySelector('.arrow.right');
            leftArrow.addEventListener('click', this.boundMoveLeft);
            rightArrow.addEventListener('click', this.boundMoveRight)
        }

        //adding year
        const yearText = document.querySelector('.calendar_year_text');
        yearText.innerText= this.year;

        //adding calendar title
        const calendarTitle =  document.querySelector('.calendar_title_text');
        const currentMonthTitle = this.currentMonthLbl;
        calendarTitle.innerText= currentMonthTitle;

        //adding calendar days
        const numberOfCurrentMonthDays = getMonthDays(this.currentSelectedMonthNum, this.year);
        const calendarDaysContainer = document.querySelector('.calendar_days_container');
        //finding all tasks for the month
        const dataToUse = this.data[`${this.currentMonthLbl.toLowerCase()}_${this.year}`] || [];
        for(let i =0 ; i < numberOfCurrentMonthDays; i++){
            const dayEl = createDay(i+1, currentMonthTitle, numberOfCurrentMonthDays < 29);
            //find day
            const dayTasks = dataToUse.find(d => d.day === i+1);
            //create task list to be inserted in calendar day
            if(dayTasks){
                const tasks = createTaskList(dayTasks.tasks, `${currentMonthTitle}_${i+1}`);
                dayEl.appendChild(tasks);
            }

            dayEl.addEventListener('click', (e) => {
                e.stopPropagation();
                const event = new CustomEvent('selected-day', {
                bubbles: true,
                detail:{ id: `${currentMonthTitle}_${i+1}`, dataForModal: dayTasks}
            });
                dayEl.dispatchEvent(event)});
            calendarDaysContainer.appendChild(dayEl)
        }
    }
}

