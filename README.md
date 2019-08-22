# payoda
# initial step up
1. "npm i"
2. "npm fetch-users" to fetch the user details and their corresponding post and comments
3. "npm start" to start the server
4. "npm flush" to flush the database

# api list
1. localhost:3000/users - fetch users
    - method: get
    - query: NA
    - params: NA
    - body: NA
    - eg: localhost:3000/users
2. localhost:3000/users/:id - fetch the user details and their posts and comments
    - method: get
    - query: NA
    - params: userid
    - body: NA
    - eg: localhost:3000/users/1
3. localhost:3000/users - update the user details
    - method: put
    - query: NA
    - params: NA
    - body: {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
            "lat": "-37.3159",
            "lng": "81.1496"
        }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
        }
    }