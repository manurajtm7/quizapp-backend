Quiz Application backend documentation


Welcome to the Quiz API Documentation. This document provides comprehensive guidance on interacting with our backend API designed specifically for managing quizzes. Whether you're a developer integrating our API into your application or an administrator managing quiz data, this documentation will guide you through the available endpoints, request and response formats, authentication methods, and more.

Introduction

Our Quiz API is developed to facilitate the seamless integration of quiz functionalities into various applications. It offers a range of endpoints to handle quiz creation, user interaction, and result tracking

Features

1.User authentications : uses authentications for user credentials while registrations and logins
2.Creation of quizzes : user can build or create  quizzes by giving some informations of quiz
3.Access all quizzes : users can see all the questions or quizzes , all the active and inactive quizzes
4.Retrive all active quizzes : User get active quizzes and user can answer the quiz
5.Result management : after quiz ending time user can see their results




Get started

1.	Authentications :
For accessing the endpoints or the route each time user visits authentication token is verified For the security measures .  Giving the username and password for accessing  user  accounts 
      



2.	End points : 

1.	“/register” : This end point is used for registering or creating the user account after the registration only user can access all other end point
2.	“/login” : This end point is used for login with a valid user credentials after the login user can access all other end points
3.	“/quizzes” : This end point is used for creating the quiz, by send the information such as quiz question ,options ,answers ,starting date & ending date , the quiz will be created 
After submission of the required information the quiz is saved to database
4.	“/quizzes/all” : This end point is used for getting all the quizzes. It will show all the active and inactive quizzes.
5.	“/quizzes/active” : This end point   is used for gathering or receiving the currently active quizzes it avoid inactive quizzes
6.	“/quizzes/:id/result” : This end point is used for getting the results of a particular quiz it will takes the quiz id (a unique id) as url parameter    

3.	Request and Response formats

1.	“/register” : ( handles registration )  [ POST REQUEST ]

request format : 

{
username : “test-user”,
password  : “test password”
}

Response format :

{
  header : “ Successfully user registered ”,
  message : unique token “eg:gusya87w848 sdfbsrfw8er sassaf9e”
}

2.	“/login” : (handle login )  [ POST REQUEST ]

Request format :

{
  username : “test-user”,
  password : “test password”
}


Response format :

{
  header : “ Successfully user registered ”,
  message : unique token “eg:gusya87w848 sdfbsrfw8er sassaf9e”
}
               
3.	“/quizzes” : (handles quiz creation)  [ POST REQUEST ]

request format :
 

{
  "Question": "what is 1+1?",
  "Options": [
    "1",
    "5",
    "2",
    "6"
  ],
  "Answer": 2,
  "StartDate": "2024-04-20T15:30:00.000Z",
  "EndDate": "2024-04-20T15:35:00.000Z"
} 

Response format : 


{
            header: "Quiz question added",
            message: "Successfully added to quiz information to the database” 
}












4.	“/quizzes/all” : (handles all the quizzes )  [GET REQUEST ]

By a GET request to this end point gives all the quizzes both active and inactive quizzes

Response format : 

{
  "header": "All Quizzes",
  "message": [
    {
      "_id": "66251ac34ffeebcc1c5e0d27",
      "Question": "what is null?",
      "Options": [
        "0",
        "5",
        "2",
        "6"
      ],
      "StartDate": "2024-04-21T19:20:00.000Z",
      "EndDate": "2024-04-21T19:45:00.000Z",
      "isActive": true,
      "__v": 0
    },
    {
      "_id": "66251d6992322a4c920ca0ef",
      "Question": "what is null?",
      "Options": [
        "0",
        "5",
        "2",
        "6"
      ],
      "StartDate": "2024-04-21T19:30:00.000Z",
      "EndDate": "2024-04-21T19:45:00.000Z",
      "isActive":false,
      "__v": 0
    }
  ]
}









5.	“/quizzes/active” : ( handles active quizzes )  [ GET REQUEST ]  

By sending a get request to this end point gets all the active quizzes.

Respone format :

{
  "header": "Currently active Quizzes",
  "message": [
    {
      "_id": "66251ac34ffeebcc1c5e0d27",
      "Question": "what is null?",
      "Options": [
        "0",
        "5",
        "2",
        "6"
      ],
      "StartDate": "2024-04-21T19:20:00.000Z",
      "EndDate": "2024-04-21T19:45:00.000Z",
      "isActive": true,
      "__v": 0
    },
    {
      "_id": "66251d6992322a4c920ca0ef",
      "Question": "what is null?",
      "Options": [
        "0",
        "5",
        "2",
        "6"
      ],
      "StartDate": "2024-04-21T19:30:00.000Z",
      "EndDate": "2024-04-21T19:45:00.000Z",
      "isActive": true,
      "__v": 0
    }
  ]
}









6.	“/quizzes/:id/result” : (handle the result of a specific quiz id) [ GET REQUEST ]

By a GET request with quiz id inserted or enclosed url , it gets the answers of the quiz

Example : /qizzes/:66251d6992322a4c920ca0ef/result



Response format :  

{
header : “Result of quiz”
message :     {
      "_id": "66251d6992322a4c920ca0ef",
      "Question": "what is null?",
      "Options": [
        "0",
        "5",
        "2",
        "6"
      ],
     “Answer” : 0
      "StartDate": "2024-04-21T19:30:00.000Z",
      "EndDate": "2024-04-21T19:45:00.000Z",
      "isActive":false,
      "__v": 0
    }


}

 
4.	Error handling 
 
Proper  error handling is done with all the request route also for the  utilities , method & middleware , if any method return any misbehaviours proper error indications are served
Also handling any error 

   
5.	Methods,  middlewares ,  utilities used

1.Hashing function :
             Includes password hashing and verification as reusable module or utility

2.jwt operatons :
            Json web token authentication are build , it mainly used as a middleware function
            For authorizing the user also for token generation
3.job scheduling :                   
                                                                                                                                                                                         Uses a scheduling or a croning method for automating the active status also for                                                                                                          checking active status                                                                
     
              

Conclusion

Congratulations! You've reached the end of the Quiz API Documentation. We hope this guide has provided you with a comprehensive understanding of my API's capabilities and how to effectively utilize its features in your applications.





