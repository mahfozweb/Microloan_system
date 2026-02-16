# LoanLink Backend - Complete Development Guide

## 📋 Table of Contents
1. [Project Setup](#project-setup)
2. [Environment Configuration](#environment-configuration)
3. [Database Models](#database-models)
4. [Middleware](#middleware)
5. [Controllers](#controllers)
6. [Routes](#routes)
7. [API Endpoints](#api-endpoints)
8. [Authentication & Authorization](#authentication--authorization)
9. [Payment Integration](#payment-integration)
10. [Deployment](#deployment)

---

## 🚀 Project Setup

### Initialize Project
```bash
mkdir loanlink-server
cd loanlink-server
npm init -y
```

### Install Dependencies
```bash
# Core dependencies
npm install express mongoose dotenv cors cookie-parser

# Authentication & Security
npm install jsonwebtoken firebase-admin bcrypt helmet express-rate-limit

# Payment
npm install stripe

# Validation & Utilities
npm install express-validator morgan

# File Upload (optional)
npm install multer cloudinary

# Development
npm install --save-dev nodemon
```

### Project Structure
```
server/
├── config/
│   ├── db.js                 # MongoDB connection
│   ├── firebase.js           # Firebase Admin SDK
│   └── stripe.js             # Stripe configuration
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── loanController.js     # Loan CRUD operations
│   ├── applicationController.js  # Loan application logic
│   ├── userController.js     # User management
│   └── paymentController.js  # Stripe payment handling
├── middleware/
│   ├── auth.js               # JWT verification
│   ├── roleCheck.js          # Role-based access control
│   ├── errorHandler.js       # Global error handling
│   └── validators.js         # Input validation
├── models/
│   ├── User.js               # User schema
│   ├── Loan.js               # Loan schema
│   └── LoanApplication.js    # Application schema
├── routes/
│   ├── authRoutes.js         # Auth endpoints
│   ├── loanRoutes.js         # Loan endpoints
│   ├── applicationRoutes.js  # Application endpoints
│   ├── userRoutes.js         # User management endpoints
│   └── paymentRoutes.js      # Payment endpoints
├── utils/
│   ├── helpers.js            # Utility functions
│   └── constants.js          # Constants
├── .env                      # Environment variables
├── .gitignore
├── package.json
└── server.js                 # Entry point
```

---

## 🔧 Environment Configuration

### .env File
```env
# Server
NODE_ENV=development
PORT=5000

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/loanlink?retryWrites=true&w=majority

# JWT
JWT_SECRET=your_super_secret_jwt_key_here_min_32_chars
JWT_EXPIRE=7d
COOKIE_EXPIRE=7

# Firebase
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:5173
PRODUCTION_URL=https://your-app.vercel.app

# Cloudinary (optional)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### .env.example Template
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=
JWT_SECRET=
JWT_EXPIRE=7d
COOKIE_EXPIRE=7
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
CLIENT_URL=http://localhost:5173
PRODUCTION_URL=
```

---

## 📊 Database Models

### 1. User Model (`models/User.js`)
```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  photoURL: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    enum: ['admin', 'manager', 'borrower'],
    default: 'borrower'
  },
  status: {
    type: String,
    enum: ['active', 'suspended'],
    default: 'active'
  },
  suspendReason: {
    type: String,
    default: ''
  },
  firebaseUid: {
    type: String,
    unique: true,
    sparse: true
  }
}, {
  timestamps: true
});

// Index for faster queries
userSchema.index({ email: 1 });
userSchema.index({ role: 1, status: 1 });

module.exports = mongoose.model('User', userSchema);
```

### 2. Loan Model (`models/Loan.js`)
```javascript
const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Loan title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  interestRate: {
    type: Number,
    required: [true, 'Interest rate is required'],
    min: [0, 'Interest rate cannot be negative']
  },
  maxLoanLimit: {
    type: Number,
    required: [true, 'Max loan limit is required'],
    min: [0, 'Loan limit cannot be negative']
  },
  requiredDocuments: [{
    type: String
  }],
  emiPlans: [{
    type: String
  }],
  images: [{
    type: String
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  showOnHome: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes
loanSchema.index({ title: 'text', category: 'text' });
loanSchema.index({ showOnHome: 1 });
loanSchema.index({ createdBy: 1 });

module.exports = mongoose.model('Loan', loanSchema);
```

### 3. Loan Application Model (`models/LoanApplication.js`)
```javascript
const mongoose = require('mongoose');

const loanApplicationSchema = new mongoose.Schema({
  loanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Loan',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required']
  },
  nationalId: {
    type: String,
    required: [true, 'National ID is required']
  },
  incomeSource: {
    type: String,
    required: [true, 'Income source is required']
  },
  monthlyIncome: {
    type: Number,
    required: [true, 'Monthly income is required'],
    min: [0, 'Income cannot be negative']
  },
  loanAmount: {
    type: Number,
    required: [true, 'Loan amount is required'],
    min: [0, 'Loan amount cannot be negative']
  },
  reason: {
    type: String,
    required: [true, 'Reason for loan is required']
  },
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  extraNotes: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Cancelled'],
    default: 'Pending'
  },
  applicationFeeStatus: {
    type: String,
    enum: ['Unpaid', 'Paid'],
    default: 'Unpaid'
  },
  paymentDetails: {
    transactionId: String,
    amount: Number,
    paidAt: Date
  },
  approvedAt: Date,
  rejectedAt: Date,
  cancelledAt: Date
}, {
  timestamps: true
});

// Indexes
loanApplicationSchema.index({ userId: 1, status: 1 });
loanApplicationSchema.index({ loanId: 1 });
loanApplicationSchema.index({ status: 1 });
loanApplicationSchema.index({ applicationFeeStatus: 1 });

module.exports = mongoose.model('LoanApplication', loanApplicationSchema);
```

---

## 🛡️ Middleware

### 1. Authentication Middleware (`middleware/auth.js`)
```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in cookies
    if (req.cookies.token) {
      token = req.cookies.token;
    }
    // Also check Authorization header
    else if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from token
      req.user = await User.findById(decoded.id).select('-__v');
      
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User not found'
        });
      }

      // Check if user is suspended
      if (req.user.status === 'suspended') {
        return res.status(403).json({
          success: false,
          message: 'Your account has been suspended',
          reason: req.user.suspendReason
        });
      }

      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }
  } catch (error) {
    next(error);
  }
};
```

### 2. Role Check Middleware (`middleware/roleCheck.js`)
```javascript
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user.role}' is not authorized to access this route`
      });
    }

    next();
  };
};
```

### 3. Error Handler Middleware (`middleware/errorHandler.js`)
```javascript
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log to console for dev
  console.error(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = { message, statusCode: 404 };
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = { message, statusCode: 400 };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = { message, statusCode: 400 };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;
```

### 4. Validators (`middleware/validators.js`)
```javascript
const { body, validationResult } = require('express-validator');

exports.validateRegistration = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/[A-Z]/).withMessage('Password must contain uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain lowercase letter'),
  body('role').isIn(['admin', 'manager', 'borrower']).withMessage('Invalid role'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }
    next();
  }
];

exports.validateLoanApplication = [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('contactNumber').trim().notEmpty().withMessage('Contact number is required'),
  body('nationalId').trim().notEmpty().withMessage('National ID is required'),
  body('loanAmount').isNumeric().withMessage('Loan amount must be a number'),
  body('monthlyIncome').isNumeric().withMessage('Monthly income must be a number'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }
    next();
  }
];
```

---

## 🎮 Controllers

### 1. Auth Controller (`controllers/authController.js`)
```javascript
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const admin = require('../config/firebase');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Send token response
const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      photoURL: user.photoURL,
      status: user.status
    }
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const { name, email, photoURL, role, firebaseUid } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Create user
    user = await User.create({
      name,
      email,
      photoURL,
      role,
      firebaseUid
    });

    sendTokenResponse(user, 201, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { firebaseToken } = req.body;

    if (!firebaseToken) {
      return res.status(400).json({
        success: false,
        message: 'Please provide Firebase token'
      });
    }

    // Verify Firebase token
    const decodedToken = await admin.auth().verifyIdToken(firebaseToken);
    const { uid, email } = decodedToken;

    // Find user
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if suspended
    if (user.status === 'suspended') {
      return res.status(403).json({
        success: false,
        message: 'Your account has been suspended',
        reason: user.suspendReason
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
exports.logout = async (req, res, next) => {
  try {
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });

    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify token
// @route   GET /api/auth/verify
// @access  Private
exports.verifyToken = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user
    });
  } catch (error) {
    next(error);
  }
};
```

### 2. Loan Controller (`controllers/loanController.js`)
```javascript
const Loan = require('../models/Loan');

// @desc    Get all loans
// @route   GET /api/loans
// @access  Public
exports.getAllLoans = async (req, res, next) => {
  try {
    const { search, category, page = 1, limit = 10 } = req.query;

    let query = {};

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    const loans = await Loan.find(query)
      .populate('createdBy', 'name email')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await Loan.countDocuments(query);

    res.status(200).json({
      success: true,
      count: loans.length,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: loans
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get loans for home page
// @route   GET /api/loans/home
// @access  Public
exports.getHomeLoans = async (req, res, next) => {
  try {
    const loans = await Loan.find({ showOnHome: true })
      .limit(6)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: loans.length,
      data: loans
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single loan
// @route   GET /api/loans/:id
// @access  Public
exports.getLoan = async (req, res, next) => {
  try {
    const loan = await Loan.findById(req.params.id)
      .populate('createdBy', 'name email photoURL');

    if (!loan) {
      return res.status(404).json({
        success: false,
        message: 'Loan not found'
      });
    }

    res.status(200).json({
      success: true,
      data: loan
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create loan
// @route   POST /api/loans
// @access  Private (Manager only)
exports.createLoan = async (req, res, next) => {
  try {
    req.body.createdBy = req.user.id;

    const loan = await Loan.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Loan created successfully',
      data: loan
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update loan
// @route   PUT /api/loans/:id
// @access  Private (Manager/Admin)
exports.updateLoan = async (req, res, next) => {
  try {
    let loan = await Loan.findById(req.params.id);

    if (!loan) {
      return res.status(404).json({
        success: false,
        message: 'Loan not found'
      });
    }

    // Check ownership (manager can only update their own loans)
    if (req.user.role === 'manager' && loan.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this loan'
      });
    }

    loan = await Loan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Loan updated successfully',
      data: loan
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete loan
// @route   DELETE /api/loans/:id
// @access  Private (Manager/Admin)
exports.deleteLoan = async (req, res, next) => {
  try {
    const loan = await Loan.findById(req.params.id);

    if (!loan) {
      return res.status(404).json({
        success: false,
        message: 'Loan not found'
      });
    }

    // Check ownership
    if (req.user.role === 'manager' && loan.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this loan'
      });
    }

    await loan.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Loan deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle show on home
// @route   PATCH /api/loans/:id/toggle-home
// @access  Private (Admin only)
exports.toggleShowOnHome = async (req, res, next) => {
  try {
    const loan = await Loan.findById(req.params.id);

    if (!loan) {
      return res.status(404).json({
        success: false,
        message: 'Loan not found'
      });
    }

    loan.showOnHome = !loan.showOnHome;
    await loan.save();

    res.status(200).json({
      success: true,
      message: `Loan ${loan.showOnHome ? 'added to' : 'removed from'} home page`,
      data: loan
    });
  } catch (error) {
    next(error);
  }
};
```

### 3. Application Controller (`controllers/applicationController.js`)
```javascript
const LoanApplication = require('../models/LoanApplication');
const Loan = require('../models/Loan');

// @desc    Get all applications (Admin)
// @route   GET /api/applications
// @access  Private (Admin)
exports.getAllApplications = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    let query = {};
    if (status) {
      query.status = status;
    }

    const applications = await LoanApplication.find(query)
      .populate('loanId', 'title category interestRate')
      .populate('userId', 'name email photoURL')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await LoanApplication.countDocuments(query);

    res.status(200).json({
      success: true,
      count: applications.length,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: applications
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get pending applications (Manager)
// @route   GET /api/applications/pending
// @access  Private (Manager)
exports.getPendingApplications = async (req, res, next) => {
  try {
    const applications = await LoanApplication.find({ status: 'Pending' })
      .populate('loanId', 'title category')
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get approved applications (Manager)
// @route   GET /api/applications/approved
// @access  Private (Manager)
exports.getApprovedApplications = async (req, res, next) => {
  try {
    const applications = await LoanApplication.find({ status: 'Approved' })
      .populate('loanId', 'title category')
      .populate('userId', 'name email')
      .sort({ approvedAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's applications (Borrower)
// @route   GET /api/applications/my-loans
// @access  Private (Borrower)
exports.getMyApplications = async (req, res, next) => {
  try {
    const applications = await LoanApplication.find({ userId: req.user.id })
      .populate('loanId', 'title category interestRate')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single application
// @route   GET /api/applications/:id
// @access  Private
exports.getApplication = async (req, res, next) => {
  try {
    const application = await LoanApplication.findById(req.params.id)
      .populate('loanId')
      .populate('userId', 'name email photoURL');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.status(200).json({
      success: true,
      data: application
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create application
// @route   POST /api/applications
// @access  Private (Borrower)
exports.createApplication = async (req, res, next) => {
  try {
    const { loanId } = req.body;

    // Verify loan exists
    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({
        success: false,
        message: 'Loan not found'
      });
    }

    // Check if loan amount exceeds max limit
    if (req.body.loanAmount > loan.maxLoanLimit) {
      return res.status(400).json({
        success: false,
        message: `Loan amount cannot exceed ${loan.maxLoanLimit}`
      });
    }

    req.body.userId = req.user.id;

    const application = await LoanApplication.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: application
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Approve application
// @route   PATCH /api/applications/:id/approve
// @access  Private (Manager)
exports.approveApplication = async (req, res, next) => {
  try {
    const application = await LoanApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    if (application.status !== 'Pending') {
      return res.status(400).json({
        success: false,
        message: 'Only pending applications can be approved'
      });
    }

    application.status = 'Approved';
    application.approvedAt = Date.now();
    await application.save();

    res.status(200).json({
      success: true,
      message: 'Application approved successfully',
      data: application
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reject application
// @route   PATCH /api/applications/:id/reject
// @access  Private (Manager)
exports.rejectApplication = async (req, res, next) => {
  try {
    const application = await LoanApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    if (application.status !== 'Pending') {
      return res.status(400).json({
        success: false,
        message: 'Only pending applications can be rejected'
      });
    }

    application.status = 'Rejected';
    application.rejectedAt = Date.now();
    await application.save();

    res.status(200).json({
      success: true,
      message: 'Application rejected',
      data: application
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel application
// @route   PATCH /api/applications/:id/cancel
// @access  Private (Borrower)
exports.cancelApplication = async (req, res, next) => {
  try {
    const application = await LoanApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // Check ownership
    if (application.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    if (application.status !== 'Pending') {
      return res.status(400).json({
        success: false,
        message: 'Only pending applications can be cancelled'
      });
    }

    application.status = 'Cancelled';
    application.cancelledAt = Date.now();
    await application.save();

    res.status(200).json({
      success: true,
      message: 'Application cancelled successfully',
      data: application
    });
  } catch (error) {
    next(error);
  }
};
```

### 4. User Controller (`controllers/userController.js`)
```javascript
const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/users
// @access  Private (Admin)
exports.getAllUsers = async (req, res, next) => {
  try {
    const { search, role, status, page = 1, limit = 10 } = req.query;

    let query = {};

    // Search by name or email
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by role
    if (role) {
      query.role = role;
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    const users = await User.find(query)
      .select('-__v')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      count: users.length,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-__v');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user role
// @route   PUT /api/users/:id/role
// @access  Private (Admin)
exports.updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;

    if (!['admin', 'manager', 'borrower'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role'
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User role updated successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Suspend user
// @route   PATCH /api/users/:id/suspend
// @access  Private (Admin)
exports.suspendUser = async (req, res, next) => {
  try {
    const { suspendReason } = req.body;

    if (!suspendReason) {
      return res.status(400).json({
        success: false,
        message: 'Suspend reason is required'
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { 
        status: 'suspended',
        suspendReason 
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User suspended successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Activate user
// @route   PATCH /api/users/:id/activate
// @access  Private (Admin)
exports.activateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { 
        status: 'active',
        suspendReason: ''
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User activated successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};
```

### 5. Payment Controller (`controllers/paymentController.js`)
```javascript
const stripe = require('../config/stripe');
const LoanApplication = require('../models/LoanApplication');

// @desc    Create payment intent
// @route   POST /api/payments/create-intent
// @access  Private (Borrower)
exports.createPaymentIntent = async (req, res, next) => {
  try {
    const { applicationId } = req.body;

    const application = await LoanApplication.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // Check ownership
    if (application.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    // Check if already paid
    if (application.applicationFeeStatus === 'Paid') {
      return res.status(400).json({
        success: false,
        message: 'Application fee already paid'
      });
    }

    // Create payment intent (fixed $10)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // $10 in cents
      currency: 'usd',
      metadata: {
        applicationId: applicationId,
        userId: req.user.id
      }
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Confirm payment
// @route   POST /api/payments/confirm
// @access  Private (Borrower)
exports.confirmPayment = async (req, res, next) => {
  try {
    const { applicationId, transactionId } = req.body;

    const application = await LoanApplication.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // Update application
    application.applicationFeeStatus = 'Paid';
    application.paymentDetails = {
      transactionId,
      amount: 10,
      paidAt: Date.now()
    };

    await application.save();

    res.status(200).json({
      success: true,
      message: 'Payment confirmed successfully',
      data: application
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get payment details
// @route   GET /api/payments/:applicationId
// @access  Private
exports.getPaymentDetails = async (req, res, next) => {
  try {
    const application = await LoanApplication.findById(req.params.applicationId)
      .select('paymentDetails applicationFeeStatus email');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    if (application.applicationFeeStatus !== 'Paid') {
      return res.status(400).json({
        success: false,
        message: 'Payment not completed'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        email: application.email,
        transactionId: application.paymentDetails.transactionId,
        amount: application.paymentDetails.amount,
        paidAt: application.paymentDetails.paidAt,
        loanId: req.params.applicationId
      }
    });
  } catch (error) {
    next(error);
  }
};
```

---

## 🛣️ Routes

### Auth Routes (`routes/authRoutes.js`)
```javascript
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  register,
  login,
  logout,
  verifyToken
} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', protect, logout);
router.get('/verify', protect, verifyToken);

module.exports = router;
```

### Loan Routes (`routes/loanRoutes.js`)
```javascript
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roleCheck');
const {
  getAllLoans,
  getHomeLoans,
  getLoan,
  createLoan,
  updateLoan,
  deleteLoan,
  toggleShowOnHome
} = require('../controllers/loanController');

router.get('/', getAllLoans);
router.get('/home', getHomeLoans);
router.get('/:id', getLoan);
router.post('/', protect, authorize('manager', 'admin'), createLoan);
router.put('/:id', protect, authorize('manager', 'admin'), updateLoan);
router.delete('/:id', protect, authorize('manager', 'admin'), deleteLoan);
router.patch('/:id/toggle-home', protect, authorize('admin'), toggleShowOnHome);

module.exports = router;
```

### Application Routes (`routes/applicationRoutes.js`)
```javascript
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roleCheck');
const { validateLoanApplication } = require('../middleware/validators');
const {
  getAllApplications,
  getPendingApplications,
  getApprovedApplications,
  getMyApplications,
  getApplication,
  createApplication,
  approveApplication,
  rejectApplication,
  cancelApplication
} = require('../controllers/applicationController');

router.get('/', protect, authorize('admin'), getAllApplications);
router.get('/pending', protect, authorize('manager', 'admin'), getPendingApplications);
router.get('/approved', protect, authorize('manager', 'admin'), getApprovedApplications);
router.get('/my-loans', protect, authorize('borrower'), getMyApplications);
router.get('/:id', protect, getApplication);
router.post('/', protect, authorize('borrower'), validateLoanApplication, createApplication);
router.patch('/:id/approve', protect, authorize('manager', 'admin'), approveApplication);
router.patch('/:id/reject', protect, authorize('manager', 'admin'), rejectApplication);
router.patch('/:id/cancel', protect, authorize('borrower'), cancelApplication);

module.exports = router;
```

### User Routes (`routes/userRoutes.js`)
```javascript
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roleCheck');
const {
  getAllUsers,
  getUser,
  updateUserRole,
  suspendUser,
  activateUser
} = require('../controllers/userController');

router.get('/', protect, authorize('admin'), getAllUsers);
router.get('/:id', protect, getUser);
router.put('/:id/role', protect, authorize('admin'), updateUserRole);
router.patch('/:id/suspend', protect, authorize('admin'), suspendUser);
router.patch('/:id/activate', protect, authorize('admin'), activateUser);

module.exports = router;
```

### Payment Routes (`routes/paymentRoutes.js`)
```javascript
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roleCheck');
const {
  createPaymentIntent,
  confirmPayment,
  getPaymentDetails
} = require('../controllers/paymentController');

router.post('/create-intent', protect, authorize('borrower'), createPaymentIntent);
router.post('/confirm', protect, authorize('borrower'), confirmPayment);
router.get('/:applicationId', protect, getPaymentDetails);

module.exports = router;
```

---

## 🔧 Configuration Files

### Database Config (`config/db.js`)
```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
```

### Firebase Config (`config/firebase.js`)
```javascript
const admin = require('firebase-admin');

const serviceAccount = {
  type: 'service_account',
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
```

### Stripe Config (`config/stripe.js`)
```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = stripe;
```

---

## 🚀 Main Server File (`server.js`)
```javascript
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Security headers
app.use(helmet());

// CORS
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.PRODUCTION_URL 
    : process.env.CLIENT_URL,
  credentials: true
};
app.use(cors(corsOptions));

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/loans', require('./routes/loanRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running' });
});

// Error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
```

---

## 📦 Package.json
```json
{
  "name": "loanlink-server",
  "version": "1.0.0",
  "description": "LoanLink Backend API",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "keywords": ["loan", "api", "express", "mongodb"],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.3",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5",
    "cookie-parser": "^1.4.6",
    "jsonwebtoken": "^9.0.2",
    "firebase-admin": "^12.0.0",
    "stripe": "^14.7.0",
    "helmet": "^7.1.0",
    "express-validator": "^7.0.1",
    "morgan": "^1.10.0",
    "bcrypt": "^5.1.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
```

---

## 🚀 Deployment

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Create `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ]
}
```
3. Deploy: `vercel --prod`

### Deploy to Railway
1. Push code to GitHub
2. Connect Railway to your repo
3. Add environment variables
4. Deploy automatically

### Deploy to Render
1. Create new Web Service
2. Connect GitHub repo
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables

---

## ✅ Testing Checklist

- [ ] MongoDB connection successful
- [ ] All routes accessible
- [ ] Authentication working
- [ ] Role-based access control functioning
- [ ] CRUD operations for loans
- [ ] Application workflow complete
- [ ] Payment integration working
- [ ] Error handling proper
- [ ] CORS configured correctly
- [ ] Environment variables secure

---

## 📚 Additional Resources

- **Express.js**: https://expressjs.com/
- **Mongoose**: https://mongoosejs.com/
- **JWT**: https://jwt.io/
- **Stripe API**: https://stripe.com/docs/api
- **Firebase Admin**: https://firebase.google.com/docs/admin/setup

---

**Backend development guide complete! 🎉**
