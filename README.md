# Books Directory

A basic Book Directory management system with 4 endpoints that supports GET, POST, PUT and DELETE operations. This project helps the user to store records of the book along with its related information to the database in an organised manner. A user can View datas according to their choice either all at a time or viewing them according to their respective IDs, but whereas the Add, Modify and Delete operations can be only performed by a admin. The admin credentials are stored in 'credentials.js' file that can be configured by the admin accordingly before deployment.
Keeping the project simple but yet effective, this project uses the Basic Authentication technique inorder to verify the admin.

## Testing

```bash
npm test
```

## Local Run

```bash
npm install && npm start
```

## Operations:

### Get all books:

Using Curl:
```
curl http://localhost:3000/books -H "Accept: application/json" 
```
This returns all the books stored in the database.

### Get books by ID

Using Curl:
```
curl http://localhost:3000/books/3 -H "Accept: application/json" 
```
This returns the information of a book with ID - 3 from the database.

### Note that all POST, PUT and DELETE operations on the endpoints are protected and requires ADMIN privilages so the username, password for Basic Auth must be supplied as authentication headers to perform the respective task.

### Add books to the database

A book contains information such as - title, author, link, origin, language, year and number of pages and each of them must be supplied to the POST request. An example can be seen below.

```
curl -d '{
    "title": "Nostromo",
    "author": "Joseph Conrad",
    "link": "https://en.wikipedia.org/wiki/Nostromo",
    "origin": "United Kingdom",
    "language": "English",
    "year": 1904,
    "pages": 320
}' 
-H "Content-Type: application/json" --user username:password -X POST http://localhost:3000/books
```

### Modify books information from the database

A tipical example of modification to Book with ID -3 can be seen below. Note that PUT operation requires Admin privilages

```
curl -d '{
    "title": "Your modified value",
    "author": "Your modified value",
    "link": "Your modified value",
    "origin": "Your modified value",
    "language": "Your modified value",
    "year": 1813,
    "pages": 226
}' 
-H "Content-Type: application/json" --user username:password -X PUT http://localhost:3000/books/3
```

### Delete books from the database

A book can be deleted only by an Admin. A delete request must be sent to the server along with the Auth credentials and the book ID which is to be deleted. An example is shown below.

```
curl -H "Content-Type: application/json" --user username:password -X DELETE http://localhost:3000/books/4
```
This will delete the book with ID - 4