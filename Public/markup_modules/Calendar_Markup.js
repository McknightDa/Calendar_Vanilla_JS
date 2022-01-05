const createDayContainerMarkup = (id, shouldAddFebOverride) => {
    const el = document.createElement('div');
    el.className = `calendar_day${ shouldAddFebOverride ?  ' february_override':''}`;
    el.id = id;
    return el
};

const createDayLabelMarkUp = (day, dayNode) => {
    const dayLb = document.createElement('h4');
    dayLb.className = 'day';
    dayLb.innerText = day;
    dayNode.appendChild(dayLb)
};

const createDay = (day, month, shouldAddFebOverride) => {
    const dayC = createDayContainerMarkup(`${month}_${day}`, shouldAddFebOverride);
    createDayLabelMarkUp(day, dayC);
    return dayC
};

const createTaskList =  (taskArray, dayId) => {
    const list_container = document.createElement('ul');
    list_container.className = 'tasks_list_container';
    list_container.id = `task_list_${dayId}`;
    const userTaskCount = taskArray.reduce((acc, curr) => {
        if(acc[curr.assignedTo]){
            acc[curr.assignedTo].push(curr);
            return acc;
        }
        acc[curr.assignedTo] = [curr];
        return acc
    }, {});
    Object.keys(userTaskCount).forEach(user => {
        const el = document.createElement('li');
        el.className = 'task_item';
        el.innerText = `${user} - ${userTaskCount[user].length} tasks`;
        list_container.appendChild(el)
    });
    return list_container;
};

const createCalendarContainerMarkup = () => {
    const targetLocation = document.querySelector('#calendarTarget');
    const outerContainer = document.createElement('div');
    outerContainer.className = 'calendar_container';
    const titleContainer = document.createElement('div');
    titleContainer.className = 'calendar_title';
    const daysContainer = document.createElement('div');
    daysContainer.className = 'calendar_days_container';
    outerContainer.appendChild(titleContainer);
    outerContainer.appendChild(daysContainer);
    const titleEl = document.createElement('h3');
    titleEl.className= 'calendar_title_text';
    const arrowContainer = document.createElement('div');
    arrowContainer.className= 'arrow_container';
    const leftArrow = document.createElement('i');
    const rightArrow = document.createElement('i');
    leftArrow.className = 'arrow left';
    rightArrow.className = 'arrow right';
    const yearContainer = document.createElement('div');
    yearContainer.className ='calendar_year_container';
    const yearText = document.createElement('h3');
    yearText.className='calendar_year_text';
    yearContainer.appendChild(yearText);
    arrowContainer.appendChild(leftArrow);
    arrowContainer.appendChild(rightArrow);
    titleContainer.appendChild(titleEl);
    titleContainer.appendChild(arrowContainer);
    titleContainer.appendChild(yearContainer);
    targetLocation.appendChild(outerContainer)
};

export {
    createDay,
    createCalendarContainerMarkup,
    createTaskList
}