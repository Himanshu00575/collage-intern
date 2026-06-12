const path = require('path');
const express = require('express');
const multer = require('multer');

const app = express();
const PORT = 3000;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`)
    },
});
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'application/pdf'||
        file.mimetype === 'application/msword'||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
        cb(null, true);
    }
    else {
        cb(new Error('only pdf and word documents are uploaded'), false);
    }
};
const upload = multer({ storage, fileFilter });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

let doc = [
    {
        "id": 1,
        "title": "Marksheet",
        "author": "Rahul",
        "description": "B.Tech CSE Student"
    },
    {
        "id": 2,
        "title": "Resume",
        "author": "Aman",
        "description": "Frontend Developer"
    },
    {
        "id": 3,
        "title": "Certificate",
        "author": "Priya",
        "description": "Java Certification"
    },
    {
        "id": 4,
        "title": "Project Report",
        "author": "Neha",
        "description": "Library Management System"
    }
];

//create document 
app.post('/doc', upload.single('file'), (req, res) => {
    console.log("body", req.body);
    console.log("file", req.file);
    const { title, author, description } = req.body || {};
    if (!title || !author || !description) {
        return res.status(400).json({
            message: "document is required"
        });
    }
    const newDoc = {
        id: doc.length + 1,
        title, author, description,
        file: req.file ? req.file.filename : null,
        filePath: req.file ? `/uploads/${req.file.filename}` : null
    };
    doc.push(newDoc);
    return res.status(201).json({
        message: "document created successfully",
        doc: newDoc
    });
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
//get all document 
app.get('/doc', (req, res) => {
    return res.json(doc);
});

//get document for each id 
app.get('/doc/:id', (req, res) => {
    const id = Number(req.params.id);
    const document = doc.find((d) => d.id === id);
    if (document) {
        return res.json(document);
    }
    return res.status(404).json({
        message: "document not found"
    });
});

//update docment for each id
app.put('/doc/:id', upload.single('file'), (req, res) => {
    const id = Number(req.params.id);
    const docIndex = doc.findIndex((d) => d.id === id);
    if (docIndex !== -1) {
        doc[docIndex] = {
            ...doc[docIndex], ...req.body,
            file: req.file ? req.file.filename : doc[docIndex].file,
            filePath: req.file ? `/uploads/${req.file.filename}` : doc[docIndex].filePath
        };
        return res.json(doc[docIndex]);
    }
    return res.status(404).json({
        message: "document not found"
    });
});

//delete document for each id
app.delete('/doc/:id', (req, res) => {
    const id = Number(req.params.id);
    const docIndex = doc.findIndex((d) => d.id === id);
    if (docIndex !== -1) {
        const deletedDoc = doc.splice(docIndex, 1);
        return res.json({
            message: "document deleted " + deletedDoc[0].title
        });
    }
    return res.status(404).json({
        message: "document not found"
    });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Internal Server Error"
    });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});