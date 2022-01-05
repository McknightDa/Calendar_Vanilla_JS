import { convertTimeToAmPm } from '../util_modules/date_utils.js'

const createBackgroundGrid = (container) => {
    for(let i=0; i < 24; i++){
        const hourContainer = document.createElement('div');
        hourContainer.className = 'day_hour_container';
        for(let j = 0; j < 4; j++){
            const hourCell = document.createElement('div');
            hourCell.id = `hour_${i+1}_cell_${j+1}`;
            hourCell.className = 'hour_cell';
            hourContainer.appendChild(hourCell);
            if(j === 0){
                const hour = i === 0 ? '12:00 AM': i > 12 ? `${i-12}:00 PM`:`${i}:00 AM`;
                const el = document.createElement('p');
                el.className = 'hour_cell_text';
                el.innerText = hour;
                hourCell.appendChild(el);
            }
        }
        container.appendChild(hourContainer);
    }
};

const organize = data => data.reduce((acc, curr) => {
    const hour = Math.floor(curr.from);
    if(acc[hour]){
        acc[hour].push(curr);
        return acc
    }
    acc[hour] =[curr];
    return acc
}, {});

const findRows = dataArr => dataArr.map(el => {
    const fromBreakDown = el.from.toFixed(2).toString().split('.');
    const toBreakDown = el.to.toFixed(2).toString().split('.');

    return {
        ...el,
        fromRow: (fromBreakDown[0] > 0 ? (fromBreakDown[0] * 4) + 1 :1) + (fromBreakDown[1] > 0 ? fromBreakDown[1]/ 15:0),
        toRow: (toBreakDown[0] > 0 ? (toBreakDown[0] * 4) + 1 :1) + (toBreakDown[1] > 0 ? toBreakDown[1]/ 15:0),
    }
});

const createRandomColors = () =>`#${Math.floor(Math.random()*16777215).toString(16)}`;

const createContentGrid = (container, data) => {
    const outerContainer = document.createElement('div');
    outerContainer.className = 'summary_content_outer_shell';
    container.appendChild(outerContainer);
    const innerContainer = document.createElement('div');
    innerContainer.className = 'summary_content_inner_shell';
    outerContainer.appendChild(innerContainer);
    const scrollBackground = e => {
        container.scrollTop = e.target.scrollTop};
    outerContainer.addEventListener('scroll', (e) => scrollBackground(e)
    );
    const sortedData = organize(data.tasks);
    const keys = Object.keys(sortedData);
    const rowsConvert = keys.map(k =>findRows(sortedData[k]));
    const elementsToAdd = keys.flatMap(k => rowsConvert[k].map(node => {
        const el = document.createElement('div');
        el.className = 'summary_day_task';
        el.style.backgroundColor=createRandomColors();
        el.style.gridRow = `${node.fromRow} / ${node.toRow}`;
        const taskTitle = document.createElement('h4');
        taskTitle.innerText = node.title;
        el.addEventListener('click', e => {
            e.stopPropagation();
            const detailsEvent = new CustomEvent('task-details', {
                detail: node,
                bubbles: true
            });
            el.dispatchEvent(detailsEvent)
        });
        el.appendChild(taskTitle);
        return el;
    }));
    elementsToAdd.forEach(node => {
        innerContainer.appendChild(node)
    })
};

const createTimeGrid = (dataForDetails) => {
    const container = document.createElement('div');
    container.className = 'day_time_breakdown_container';
    createBackgroundGrid(container);
    createContentGrid(container, dataForDetails);
    return container
};

const renderDetailsMarkUp = data => {
    const returnContainer = document.createElement('div');
    returnContainer.style.width = '100%';
    const rightArrow = document.createElement('i');
    const arrowContainer = document.createElement('div');
    arrowContainer.className= 'arrow_container';
    rightArrow.className = 'arrow right';
    rightArrow.id = 'close_details';
    returnContainer.appendChild(arrowContainer);
    arrowContainer.appendChild(rightArrow);
    const detailsContainer = document.querySelector('.basic_modal_details');
    detailsContainer.appendChild(returnContainer);

    const title = document.createElement('h3');
    title.innerText= `Title: ${data.title}`;
    title.style.textAlign = 'center';
    detailsContainer.appendChild(title);
    const times = convertTimeToAmPm(data);
    const from = document.createElement('h4');
    const to = document.createElement('h4');
    from.innerText = `Start: ${times.from}`;
    to.innerText = `End: ${times.to}`;
    const timesContainer = document.createElement('div');
    timesContainer.className = 'details_times_container';
    const description = document.createElement('p');
    description.innerText = `Description: ${data.description}`;
    description.style.paddingLeft = '8px';
    const assigned = document.createElement('h4');
    assigned.innerText = `Task Assigned To: ${data.assignedTo}`;
    assigned.style.textAlign = 'right';

    timesContainer.appendChild(from);
    timesContainer.appendChild(to);
    detailsContainer.appendChild(timesContainer);
    detailsContainer.appendChild(description);
    detailsContainer.appendChild(assigned);

    description.classList.add('delay_visibility');
    title.classList.add('delay_visibility');
    timesContainer.classList.add('delay_visibility');
    assigned.classList.add('delay_visibility');


    setTimeout(() => {
        title.classList.add('show_visibility');
        timesContainer.classList.add('show_visibility');
        description.classList.add('show_visibility');
        assigned.classList.add('show_visibility')
    }, 500)

};

export {
    createTimeGrid,
    renderDetailsMarkUp
}

