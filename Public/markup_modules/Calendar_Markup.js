const createDayContainerMarkup = id => {
    const el = document.createElement('div');
    el.className = 'calendar_day';
    el.id = id;
    return el
};

const createDayLabelMarkUp = (day, dayNode) => {
    const dayLb = document.createElement('h4');
    dayLb.className = 'day';
    dayLb.innerText = day;
    dayNode.appendChild(dayLb)
};

const createDay = (day, month) => {
    const dayC = createDayContainerMarkup(`${month}_${day}`);
    createDayLabelMarkUp(day, dayC);
    return dayC
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
    createCalendarContainerMarkup
}