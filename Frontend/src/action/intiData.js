
export const initData = {
    boards:
        {
            columnOrder:['column-2','column-1','column-3'],
            columns:
                [
                {
                    id:'column-1',
                    title: 'Todo-1',
                    taskOrder:['task-1','task-2','task-3','task-4'],
                    tasks:[
                        {
                            id:'task-1',
                            title :"Title of task 1",
                            status:1,
                            describe : "Deciption of Task 1",
                            hashtags:[{
                                id:'hashtag-1',
                                name:'HashTag 1',
                            }],
                            subtaskOrder:['task-5','task-6'],
                            subtasks:[
                                {
                                    id:'task-5',
                                    title: "Title of task 5",
                                    status: 1
                                },
                                {
                                    id:'task-6',
                                    title:"Title of task 6",
                                    status:0
                                }
                            ],
                        },
                        {
                            id:'task-2',
                            title :"Title of task 2",
                            status: 1,
                            describe : "Deciption of Task 2",
                            hashtags:[{
                                id:'hashtag-2',
                                name:'HashTag 2',
                            }],
                            subtaskOrder:['task-7','task-8'],
                            subtasks:[
                                {
                                    id:'task-7',
                                    title: "Title of task 7",
                                    status: 1
                                },
                                {
                                    id:'task-8',
                                    title:"Title of task 8",
                                    status:0
                                }
                            ],
                        },
                        {
                            id:'task-3',
                            title :"Title of task 3",
                            status: 1,
                            describe : "Deciption of Task 3",
                            hashtags:[{
                                id:'hashtag-3',
                                name:'HashTag 3',
                            }],
                            subtaskOrder:['task-5'],
                            subtasks:[
                                {
                                    id:'task-5',
                                    title: "Title of task 5",
                                    status: 1
                                }
                            ],
                        },
                        {
                            id:'task-4',
                            title :"Title of task 4",
                            status: 1,
                            describe : "Deciption of Task 4",
                            hashtags:[{
                                id:'hashtag-4',
                                name:'HashTag 4',
                            }],
                            subtaskOrder:['task-6'],
                            subtasks:[
                                {
                                    id:'task-6',
                                    title:"Title of task 6",
                                    status:0
                                }
                            ],
                        }
                    ]
                },
                {
                    id:'column-2',
                    title: 'Todo-2',
                    taskOrder:['task-5','task-6','task-7'],
                    tasks:[
                        {
                            id:'task-5',
                            title :"Title of task 5",
                            status: 1,
                            describe : "Deciption of Task 5",
                            hashtags:[{
                                id:'hashtag-2',
                                name:'HashTag 2',
                            }],
                            subtaskOrder:['task-10'],
                            subtasks:[
                                {
                                    id:'task-10',
                                    title:"Title of task 10",
                                    status:0
                                }
                            ],
                        },
                        {
                            id:'task-6',
                            title :"Title of task 6",
                            status: 1,
                            describe : "Deciption of Task 6",
                            hashtags:[{
                                id:'hashtag-2',
                                name:'HashTag 2',
                            }],
                            subtaskOrder:['task-12'],
                            subtasks:[
                                {
                                    id:'task-12',
                                    title:"Title of task 12",
                                    status:1
                                }
                            ],
                        },
                        {
                            id:'task-7',
                            title :"Title of task 7",
                            status: 1,
                            describe : "Deciption of Task 7",
                            hashtags:[{
                                id:'hashtag-1',
                                name:'HashTag 1',
                            }],
                            subtaskOrder:['task-12'],
                            subtasks:[
                                {
                                    id:'task-12',
                                    title:"Title of task 12",
                                    status:1
                                }
                            ],
                        }
                    ]
                },
                {
                    id:'column-3',
                    title: 'Todo-3',
                    taskOrder:['task-8','task-9','task-10','task-11','task-12'],
                    tasks:[
                        {
                            id:'task-8',
                            title :"Title of task 8",
                            status: 1,
                            describe : "Deciption of Task 8",
                            hashtag:[{
                                id:'hashtag-3',
                                name:'HashTag 3',
                            }],
                            subtaskOrder:['task-1'],
                            subtasks:[
                                {
                                    id:'task-1',
                                    title:"Title of task 1",
                                    status:0
                                }
                            ],
                        },
                        {
                            id:'task-9',
                            title :"Title of task 9",
                            status: 1,
                            describe : "Deciption of Task 9",
                            hashtags:[{
                                id:'hashtag-1',
                                name:'HashTag 1',
                            }],
                            subtaskOrder:['task-1'],
                            subtasks:[
                                {
                                    id:'task-1',
                                    title:"Title of task 1",
                                    status:0
                                }
                            ],
                        },
                        {
                            id:'task-10',
                            title :"Title of task 10",
                            status: 0,
                            describe : "Deciption of Task 10",
                            hashtags:[{
                                id:'hashtag-2',
                                name:'HashTag 2',
                            }],
                            subtaskOrder:['task-11'],
                            subtasks:[
                                {
                                    id:'task-11',
                                    title:"Title of task 11",
                                    status:1
                                }
                            ],
                        },
                        {
                            id:'task-11',
                            title :"Title of task 11",
                            status: 1,
                            describe : "Deciption of Task 11",
                            hashtags:[{
                                id:'hashtag-1',
                                name:'HashTag 1',
                            }],
                            subtaskOrder:[],
                            subtasks:[

                            ],
                        },
                        {
                            id:'task-12',
                            title :"Title of task 12",
                            status: 1,
                            describe : "Deciption of Task 12",
                            hashtags:[{
                                id:'hashtag-1',
                                name:'HashTag 1',
                            }],
                            subtaskOrder:[],
                            subtasks:[
                            ],
                        }
                    ]
                }
            ]
        }
}
export const initHashtag = {
    hashtaglists:
        {
            HashtagOrder:['hashtag-1','hashtag-2','hashtag-3'],
            hashtags:[{
                id: 'hashtag-1',
                name: 'HashTag 1'
            },{
                id: 'hashtag-2',
                name: 'HashTag 2'
            },{
                id: 'hashtag-3',
                name: 'HashTag 3'
            }]
        }
}
export const initTask = {
    id:'task-8',
    title :"Title of task 8",
    status: 1,
    describe : "Deciption of Task 8",
    hashtag:[{
        id:'hashtag-3',
        name:'HashTag 3',
    }],
    subtaskOrder:['task-1'],
    subtasks:[
        {
            id:'task-1',
            title:"Title of task 1",
            status:0
        },{
            id:'task-1',
            title:"Title of task 1",
            status:0
        },{
            id:'task-1',
            title:"Title of task 1",
            status:0
        },{
            id:'task-1',
            title:"Title of task 1",
            status:0
        },{
            id:'task-1',
            title:"Title of task 1",
            status:0
        }
    ],
}
