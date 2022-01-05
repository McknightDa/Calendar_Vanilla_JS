import { AppState, Calendar, DaySummary } from './classes/index.js'

const clickDay = (detail, context) => {
    if(!detail.dataForModal) return;
    context.setState({
        openDay: detail.id,
        dataForModal: detail.dataForModal
    });
    const modal = new DaySummary(context.getState('dataForModal'));
    modal.render()
};

const customEventsRegistry = (context) => {
    document.addEventListener('selected-day', e => clickDay(e.detail, context))

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

//data from and to should be from 0-11 with decimals .15, .30,.45 to represent minutes in 15 minute intervals
const data ={
    december_2021:[
        {
            month: 'December',
            monthNum: 12,
            day: 1,
            year: 2021,
            tasks:[
                {
                    task_id:'fadr4555',
                    title:'Sample Class',
                    description:'Something something dark side',
                    createdBy:{
                        id: 1,
                        name:'Max'
                    },
                    assignedTo:'Max',
                    from: 0,
                    to: 1
                }
            ]
        },
    ],
    january_2022:[
            {
                month:'January',
                monthNum: 1,
                day:1,
                year: 2022,
                tasks:[
                    {
                        task_id: '21d3c',
                        title:'Sample Class 1',
                        description:'Something something dark side',
                        createdBy:{
                            id: 1,
                            name:'Max'
                        },
                        assignedTo:'Max',
                        from: 0.15,
                        to: 1
                    },
                    {
                        task_id: 'dae3242',
                        title:'Sample Class 2',
                        description:'Something something dark side',
                        createdBy:{
                            id: 1,
                            name:'Max'
                        },
                        assignedTo:'Max',
                        from: 1.15,
                        to: 2
                    },
                    {
                        task_id: '2d1d3c',
                        title:'Sample Class 3',
                        description:'Something something dark side',
                        createdBy:{
                            id: 1,
                            name:'Max'
                        },
                        assignedTo:'Max',
                        from: 0,
                        to: 1
                    },
                    {
                        task_id: 'daesade3242',
                        title:'Sample Class 4',
                        description:'Something something dark side',
                        createdBy:{
                            id: 1,
                            name:'Max'
                        },
                        assignedTo:'Max',
                        from: 1,
                        to: 2
                    },
                    {
                        task_id: '21deeew3c',
                        title:'Sample Class 5',
                        description:'Something something dark side',
                        createdBy:{
                            id: 1,
                            name:'Max'
                        },
                        assignedTo:'Max',
                        from: 0,
                        to: 1
                    },
                    {
                        task_id: 'dae3dasd242',
                        title:'Sample Class 6',
                        description:'Something something dark side',
                        createdBy:{
                            id: 1,
                            name:'Max'
                        },
                        assignedTo:'Max',
                        from: 1,
                        to: 2
                    },
                    {
                        task_id: '21d3c',
                        title:'Sample Class 7',
                        description:'Something something dark side',
                        createdBy:{
                            id: 1,
                            name:'Max'
                        },
                        assignedTo:'Max',
                        from: 0.15,
                        to: 1.30
                    },
                    {
                        task_id: 'dae3242',
                        title:'Sample Class 8',
                        description:'Something something dark side',
                        createdBy:{
                            id: 1,
                            name:'Max'
                        },
                        assignedTo:'Max',
                        from: 1,
                        to: 2
                    },
                ]
            }
        ]
    };

function main(){
    const appState = new AppState.State({
        openDay: null,
        today:new Date(),
        currentlySelectedMonth: new Date().getMonth() +1,
        calendarData: data,
        dataForModal: null,
    });

    customEventsRegistry(appState);

    /**********Calendar ********/
    const calendar = new Calendar(appState.getState('calendarData'));
    calendar.render();
    /********* End of Calendar******/
}

window.addEventListener('DOMContentLoaded', event => {
    main()
});