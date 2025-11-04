# AI Career Guide



```

 This prjject include the diffrent types of folders:-
  THe main folder will be server ,
  Then inside this we have src folder where we all be stored the remaining folders 
  sub folders as:-
  ---->controllers
  ----> routes
  ---->services
  ---->utils
  

  Info about each folder then moving to the app.js 

  , This folders where we are gonna handle the entire backend will the ost crucial ones

  The first folder in thee folder structure will be 

  1) Controllers :-
  ------> Here we have two sub files  :-  
                                   -----> jobController.js :-
                                    Here we will be controllinng all the functions related to the searching of job based on user skills ,role ,location



```

```

server/
│
├── src/
│   ├── routes/                 # API endpoints
│   │   ├── resumeRoutes.js     # /parse-resume, /analyze-resume
│   │   └── jobRoutes.js        # /search-jobs
│   │
│   ├── controllers/            # Orchestrates logic per route
│   │   ├── resumeController.js # Calls Gemini service
│   │   └── jobController.js    # Calls JSearch service + mapper
│   │
│   ├── services/               # External API integrations
│   │   ├── geminiService.js    # Handles Gemini AI calls
│   │   └── jsearchService.js   # Handles JSearch API calls
│   │
│   ├── utils/                  # Helpers
│   │   └── responseMapper.js   # Normalizes JSearch response → clean schema
│   │
│   ├── app.js                  # Express app setup (routes, middleware)
│
│
├── server.js                   # Entry point (starts server)
├── .env                        # API keys (Gemini, JSearch)
├── package.json
└── README.md                   # detail of our Server;

```
