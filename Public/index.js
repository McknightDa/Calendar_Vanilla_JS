import { openDialog } from './util_modules/modal_utils.js'
import { AppState, Calendar } from './classes/index.js'

const clickDay = (id, context) => {
    context.setState({
        openDay: id
    });
    openDialog();
    updateUI();
};

const updateUI = () => {
    console.log('updating ui')
};

const customEventsRegistry = () => {
    document.addEventListener('selected-day', e => console.log(e.detail))

};

const users = [
    {
        id: 1,
        name: 'Max',
        isAdmin: true,
        lastModified:'',
        createdOn:'1/12/2021'
    },
    {
        id: 2,
        name: 'Amber',
        isAdmin: true,
        lastModified:'',
        createdOn:'1/12/2021'
    },
];
const data = [
    {
        month: 'December',
        monthNum: 12,
        day: 1,
        year: 2020,
        tasks:[
            {
                title:'Sample Class',
                description:'Something something dark side',
                createdBy:{
                    id: 1,
                    name:'Max'
                },
                assignedTo:'Max'
            }
        ]
    },
];

function main(){
    const appState = new AppState.State({
        openDay: null,
        today:new Date(),
        currentlySelectedMonth: new Date().getMonth() +1,
        calendarData: data,
    });

    customEventsRegistry();
    /**********Calendar ui builder logic********/
    const calendar = new Calendar(appState.getState('data'));
    calendar.render();
    /**** End of Calendar UI builder ******/
}

window.addEventListener('DOMContentLoaded', event => {
    main()
});