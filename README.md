# Document Management API

## Overview

This project is a Backend Engineering Internship Assignment built using Node.js, Express.js, and Multer.

The API supports CRUD (Create, Read, Update, Delete) operations for document records and allows uploading PDF, DOC, and DOCX files.

---

## Features

* Create a document
* Get all documents
* Get document by ID
* Update document
* Delete document
* Upload files using Multer
* Store uploaded files in local uploads folder
* Error handling
* JSON responses

---

## Technologies Used

* Node.js
* Express.js
* Multer

---

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

---

## Run the Server

```bash
node index.js
```

Server will start on:

```text
http://localhost:3000
```

---

## API Endpoints

### Create Document

```http
POST /doc
```

### Get All Documents

```http
GET /doc
```

### Get Document By ID

```http
GET /doc/:id
```

### Update Document

```http
PUT /doc/:id
```

### Delete Document

```http
DELETE /doc/:id
```

---

## File Upload

Supported file types:

* PDF (.pdf)
* Word Document (.doc)
* Word Document (.docx)

Uploaded files are stored in:

```text
/uploads
```

---

## Testing

You can test the API using:

* Postman
* Browser
* HTML Upload Form

---

## Author

Himanshu 
# collage-intern
