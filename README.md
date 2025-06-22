Here is a complete folder structure for a clean and scalable Login & Signup API system using Node.js, Express.js, MongoDB, Mongoose, with proper separation of concerns (models, controllers, routes, config, etc.):

✅ Final Folder Structure
bash
CopyEdit
auth-api/
│
├── config/
│   └── db.js                 # MongoDB connection
│
├── controllers/
│   └── authController.js     # Signup/Login logic
│
├── models/
│   └── User.js               # User model schema
│
├── routes/
│   └── authRoutes.js         # Signup/Login routes
│
├── middleware/
│   └── authMiddleware.js     # JWT auth check (optional)
│
├── .env                      # Environment variables
├── app.js                    # Main app entry
├── package.json              # NPM config


🔧 Step-by-Step Implementation
1. 📦 package.json
Run:
bash
CopyEdit
npm init -y
npm install express mongoose dotenv bcryptjs jsonwebtoken


2. 🌐 .env
env
CopyEdit
PORT=5000
MONGO_URI=mongodb://localhost:27017/auth-api
JWT_SECRET=your_jwt_secret_key


3. ⚙️ config/db.js – MongoDB Connection
js
CopyEdit
const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
module.exports = connectDB;


4. 👤 models/User.js – Mongoose User Schema
js
CopyEdit
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);


5. 🧠 controllers/authController.js – Signup/Login Logic
js
CopyEdit
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


6. 🚏 routes/authRoutes.js – Auth Routes
js
CopyEdit
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

router.post('/signup', register);
router.post('/login', login);

module.exports = router;


7. 🧱 middleware/authMiddleware.js – Optional JWT Middleware
js
CopyEdit
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;


8. 🚀 app.js – Entry Point
js
CopyEdit
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


✅ API Test
POST /api/auth/signup
json
CopyEdit
{
  "name": "Hritik Shukla",
  "email": "hritik@example.com",
  "password": "123456"
}

POST /api/auth/login
json
CopyEdit
{
  "email": "hritik@example.com",
  "password": "123456"
}


Let me know if you also want:
Forgot password with OTP/email


Token refresh system


Frontend form example (HTML/Angular/React)


Swagger/OpenAPI docs setup


Would you like to connect this to MongoDB Atlas too?








To Do Remainder crud in node 

✅ 1. Install Required Packages
You'll need multer for handling image uploads.
bash
CopyEdit
npm install multer


🗂️ 2. Folder Structure Update
pgsql
CopyEdit
auth-api/
│
├── controllers/
│   ├── authController.js
│   └── todoController.js        ✅ NEW
│
├── models/
│   ├── User.js
│   └── Todo.js                 ✅ NEW
│
├── routes/
│   ├── authRoutes.js
│   └── todoRoutes.js           ✅ NEW
│
├── middleware/
│   ├── authMiddleware.js
│   └── uploadMiddleware.js     ✅ NEW


📁 3. models/Todo.js
js
CopyEdit
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  photo: String, // Image path
}, { timestamps: true });

module.exports = mongoose.model('Todo', todoSchema);


🧠 4. controllers/todoController.js
js
CopyEdit
const Todo = require('../models/Todo');

exports.createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const photo = req.file ? req.file.filename : null;

    const todo = await Todo.create({
      user: req.user.id,
      title,
      description,
      photo
    });

    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Error creating todo', error: err.message });
  }
};

exports.getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user.id });
  res.json(todos);
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findOneAndUpdate(
    { _id: id, user: req.user.id },
    { ...req.body },
    { new: true }
  );
  if (!todo) return res.status(404).json({ message: 'Todo not found or unauthorized' });
  res.json(todo);
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findOneAndDelete({ _id: id, user: req.user.id });
  if (!todo) return res.status(404).json({ message: 'Todo not found or unauthorized' });
  res.json({ message: 'Todo deleted' });
};


📤 5. middleware/uploadMiddleware.js
js
CopyEdit
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') cb(null, true);
  else cb(new Error('Only images are allowed'), false);
};

module.exports = multer({ storage, fileFilter });

Make sure to create an uploads/ directory in your root:
bash
CopyEdit
mkdir uploads


🚏 6. routes/todoRoutes.js
js
CopyEdit
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const {
  createTodo, getTodos, updateTodo, deleteTodo
} = require('../controllers/todoController');

router.use(authMiddleware); // Protect all routes

router.post('/', upload.single('photo'), createTodo);
router.get('/', getTodos);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;


🚀 7. app.js Changes
Update app.js:
js
CopyEdit
const todoRoutes = require('./routes/todoRoutes');
const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/todos', todoRoutes);


✅ 8. API Test Sample with Image (Postman)
POST /api/todos
Body: form-data


title: (Text)


description: (Text)


photo: (File)


Make sure to include Authorization: Bearer <your_token> in headers.



https://chatgpt.com/share/685708b5-4cd8-8010-b343-c6✅ Goal:
POST /api/photos → Upload multiple photos


GET /api/photos → Get all uploaded photos (for logged-in user)


We'll assume:
You already have user authentication with JWT


You already use authMiddleware


You already have multer setup in middleware/uploadMiddleware.js


Let’s begin:
STEP 1: Create a Mongoose model for storing uploaded photo info
📁 models/Photo.js
const mongoose = require('mongoose');
const photoSchema = new mongoose.Schema({
 filename: String,
 filepath: String,
 user: {
 type: mongoose.Schema.Types.ObjectId,
 ref: 'User',
 required: true,
 },
 }, { timestamps: true });
module.exports = mongoose.model('Photo', photoSchema);
STEP 2: Create a controller for handling photo upload and fetch
📁 controllers/photoController.js
const Photo = require('../models/Photo');
exports.uploadPhotos = async (req, res) => {
 try {
 const files = req.files;
 const userId = req.user.id;
less
CopyEdit
if (!files || files.length === 0) {
  return res.status(400).json({ message: 'No photos uploaded' });
}

const uploadedPhotos = await Promise.all(
  files.map(file =>
    Photo.create({
      filename: file.filename,
      filepath: `/uploads/${file.filename}`,
      user: userId,
    })
  )
);

res.status(201).json({ message: 'Photos uploaded', data: uploadedPhotos });

} catch (err) {
 res.status(500).json({ message: 'Upload failed', error: err.message });
 }
 };
exports.getAllPhotos = async (req, res) => {
 try {
 const photos = await Photo.find({ user: req.user.id });
 res.json(photos);
 } catch (err) {
 res.status(500).json({ message: 'Fetch failed', error: err.message });
 }
 };
STEP 3: Create routes for uploading and getting photos
📁 routes/photoRoutes.js
const express = require('express');
 const router = express.Router();
 const upload = require('../middleware/uploadMiddleware'); // your existing multer middleware
 const authMiddleware = require('../middleware/authMiddleware');
 const { uploadPhotos, getAllPhotos } = require('../controllers/photoController');
// Protect all routes
 router.use(authMiddleware);
// Upload multiple photos (max 10)
 router.post('/', upload.array('photos', 10), uploadPhotos);
// Get all photos uploaded by the user
 router.get('/', getAllPhotos);
module.exports = router;
STEP 4: Register the photoRoutes in your app.js
📁 app.js (or server.js)
const photoRoutes = require('./routes/photoRoutes');
// Serve static files (to preview uploaded images)
 const path = require('path');
 app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Use photo routes
 app.use('/api/photos', photoRoutes);
STEP 5: Test in Postman
Upload photos:


Method: POST


URL: http://localhost:5000/api/photos


Authorization: Bearer {your_token}


Body → form-data:


Key: photos (File) — choose multiple images


Add more photos by clicking “+” and using same key photos


Get all photos:


Method: GET


URL: http://localhost:5000/api/photos


Authorization: Bearer {your_token}


You’ll get an array like:
[
 {
 "_id": "665e3ab19f...",
 "filename": "1718807143_dog.jpg",
 "filepath": "/uploads/1718807143_dog.jpg",
 "user": "6658a68e6c...",
 "createdAt": "...",
 "__v": 0
 },
 ...
 ]
To preview an image in browser:
http://localhost:5000/uploads/1718807143_dog.jpg
✅ Done!
4fe7a0b862
