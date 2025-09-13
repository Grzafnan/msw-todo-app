/* eslint-disable prefer-const */
import { Todo, User } from "../types"

export let users: User[] = [
    {
        "id": 1,
        "email": "user@mail.com",
        "password": "password123",
        "name": "User"
    },
    {
        "id": 1757777759916,
        "email": "shakil@mail.com",
        "password": "Afnan123",
        "name": "Shakil Ahmmed"
    }
]
export let todos: Todo[] = [
    {
        "id": 2,
        "userId": 1,
        "title": "In Progress Task",
        "description": "Currently working on this",
        "status": "todo",
        "priority": "medium",
        "tags": [
            {
                "id": "t3",
                "name": "work"
            },
            {
                "id": "t4",
                "name": "urgent"
            }
        ],
        "dueDate": "2025-01-25T00:00:00.000Z",
        "createdAt": "2025-01-19T14:30:00.000Z",
        "updatedAt": "2025-09-13T15:13:21.444Z"
    },
    {
        "title": "new",
        "description": "des",
        "status": "done",
        "priority": "low",
        "tags": [
            {
                "id": "1757708525175",
                "name": "one"
            }
        ],
        "dueDate": "2025-09-25T00:00:00.000Z",
        "id": 1757708527713,
        "userId": 1,
        "createdAt": "2025-09-12T20:22:07.733Z",
        "updatedAt": "2025-09-13T15:13:41.918Z"
    },
    {
        "title": "UPdate One",
        "description": "Des",
        "status": "todo",
        "priority": "high",
        "tags": [
            {
                "id": "1757773416063",
                "name": "one"
            },
            {
                "id": "1757773418263",
                "name": "two"
            },
            {
                "id": "1757773421104",
                "name": "three"
            }
        ],
        "dueDate": "2025-09-24T00:00:00.000Z",
        "id": 1757773425978,
        "userId": 1,
        "createdAt": "2025-09-13T14:23:45.993Z",
        "updatedAt": "2025-09-13T15:33:09.454Z"
    },
    {
        "title": "Ratione amet lorem ",
        "description": "Molestiae ad unde pl",
        "status": "done",
        "priority": "high",
        "tags": [
            {
                "id": "1757776304399",
                "name": "Perferendis voluptat"
            }
        ],
        "dueDate": "2025-12-18",
        "id": 1757776305557,
        "userId": 1,
        "createdAt": "2025-09-13T15:11:45.565Z",
        "updatedAt": "2025-09-13T15:33:09.196Z"
    },
    {
        "title": "Optio quos sapiente",
        "description": "Adipisicing quia del",
        "status": "done",
        "priority": "high",
        "tags": [
            {
                "id": "1757776319144",
                "name": "Provident velit ali"
            },
            {
                "id": "1757776339849",
                "name": "afaf"
            }
        ],
        "dueDate": "2025-09-29",
        "id": 1757776343344,
        "userId": 1,
        "createdAt": "2025-09-13T15:12:23.358Z",
        "updatedAt": "2025-09-13T15:14:43.195Z"
    },
    {
        "title": "Ipsam ipsum soluta n",
        "description": "In et est rem rem pl",
        "status": "todo",
        "priority": "medium",
        "tags": [
            {
                "id": "1757776369923",
                "name": "Voluptatem et magna"
            }
        ],
        "dueDate": "2026-02-03",
        "id": 1757776374488,
        "userId": 1,
        "createdAt": "2025-09-13T15:12:54.501Z",
        "updatedAt": "2025-09-13T15:14:43.194Z"
    },
    {
        "title": "Et pariatur Qui tem",
        "description": "Nostrum sunt duis en",
        "status": "done",
        "priority": "medium",
        "tags": [],
        "dueDate": "2028-05-16",
        "id": 1757776393757,
        "userId": 1,
        "createdAt": "2025-09-13T15:13:13.769Z",
        "updatedAt": "2025-09-13T15:33:09.195Z"
    },
    {
        "title": "Assumenda qui eius d",
        "description": "Sint consequatur lab",
        "status": "todo",
        "priority": "high",
        "tags": [
            {
                "id": "1757776408925",
                "name": "Sunt veniam tempor"
            }
        ],
        "dueDate": "2028-01-14",
        "id": 1757776410027,
        "userId": 1,
        "createdAt": "2025-09-13T15:13:30.041Z",
        "updatedAt": "2025-09-13T15:33:09.197Z"
    },
    {
        "title": "Velit quaerat aspern",
        "description": "Rerum ut beatae quis",
        "status": "done",
        "priority": "low",
        "tags": [],
        "dueDate": "2027-03-09",
        "id": 1757776426332,
        "userId": 1,
        "createdAt": "2025-09-13T15:13:46.343Z",
        "updatedAt": "2025-09-13T15:14:43.191Z"
    },
    {
        "title": "Voluptates quidem hi",
        "description": "Accusantium tempor v",
        "status": "todo",
        "priority": "low",
        "tags": [
            {
                "id": "1757776438894",
                "name": "Eligendi quis est am"
            }
        ],
        "dueDate": "2029-06-23",
        "id": 1757776444517,
        "userId": 1,
        "createdAt": "2025-09-13T15:14:04.532Z",
        "updatedAt": "2025-09-13T15:33:09.194Z"
    },
    {
        "title": "Voluptas aliqua Acc",
        "description": "Minim ea quia ut con",
        "status": "todo",
        "priority": "medium",
        "tags": [
            {
                "id": "1757776493162",
                "name": "Sapiente irure totam"
            }
        ],
        "dueDate": "2028-02-15",
        "id": 1757776496576,
        "userId": 1,
        "createdAt": "2025-09-13T15:14:56.591Z",
        "updatedAt": "2025-09-13T15:14:56.591Z"
    },
    {
        "title": "Title Update",
        "description": "Description of todo...",
        "status": "done",
        "priority": "high",
        "tags": [],
        "dueDate": "2025-10-02T00:00:00.000Z",
        "id": 1757777193781,
        "userId": 1,
        "createdAt": "2025-09-13T15:26:33.797Z",
        "updatedAt": "2025-09-13T15:44:42.027Z"
    },
    {
        "title": "Iste quia voluptas n",
        "description": "Aspernatur atque nat",
        "status": "in_progress",
        "priority": "medium",
        "tags": [
            {
                "id": "1757777791952",
                "name": "Qui possimus quia e"
            }
        ],
        "dueDate": "2025-09-25",
        "id": 1757777794447,
        "userId": 1757777759916,
        "createdAt": "2025-09-13T15:36:34.458Z",
        "updatedAt": "2025-09-13T15:36:34.458Z"
    }
]
