# Contributing to Super-CRM

Welcome to the Super-CRM Team Development Starter Template! This document defines our official architecture and coding conventions. Following these guidelines ensures that our codebase remains scalable, predictable, and easy for any team member to navigate.

## 1. Feature Development Standard

Whenever a new module is built (e.g., Inventory, Warehouse, Finance), please follow this standard pattern to create predictable, decoupled features.

### Frontend Module Standard
* **Pages:** Place all views specific to your module in `frontend/src/pages/[ModuleName]/` (e.g., `src/pages/Inventory/`).
* **Components:** If you build components that are *only* used by your module, you may create a `frontend/src/components/[ModuleName]/` directory. Otherwise, put generic UI components in `components/common/`.
* **Services:** Group all API calls for your module into a dedicated service file: `frontend/src/services/[module]Service.js` (e.g., `inventoryService.js`).

### Backend Module Standard
* **Controllers:** `backend/src/controllers/[module]Controller.js`
* **Models:** `backend/src/models/[ModelName].js` (PascalCase, e.g., `InventoryItem.js`)
* **Routes:** `backend/src/routes/[module]Routes.js`
* **Services:** If your module contains complex logic that shouldn't pollute the controller, extract it to `backend/src/services/[module]Service.js`.

---

## 2. Folder Responsibilities

### Frontend (`frontend/src/`)
* **`components/common/`**: Dumb, generic UI components (Buttons, Modals, Cards, Icons) that have no domain knowledge.
* **`components/layout/`**: Structural components like `Sidebar.jsx` and `AuxTopBar.jsx`.
* **`components/forms/`**: Reusable form elements (Inputs, Selects, validation wrappers).
* **`pages/`**: Stateful views grouped by domain (e.g., `CRM/`, `HRM/`, `Auth/`, `Shared/`).
* **`routes/`**: Route definitions and guards (e.g., `ProtectedRoute.jsx`).
* **`services/`**: Pure functions handling Axios/Fetch requests. Do not store React state here.
* **`hooks/`**: Custom reusable React hooks (`useAuth.jsx`, etc.).
* **`constants/`**: Application-wide constants (Enums, static data).
* **`utils/`**: Pure helper functions (date formatting, parsers).

### Backend (`backend/src/`)
* **`controllers/`**: Extracts parameters from `req`, calls services/models, and returns `res`. Keep these thin.
* **`models/`**: Mongoose schemas and DB logic.
* **`routes/`**: Maps HTTP endpoints to controller functions.
* **`services/`**: Complex business logic, third-party integrations, or operations spanning multiple models.
* **`middleware/`**: Express middlewares (Auth, RBAC, Upload).
* **`helpers/`**: Reusable domain-specific helpers (e.g., `campaignHelper.js`).
* **`utils/`**: Generic, pure utility functions (e.g., `encryption.js`).
* **`validations/`**: (Future) Request validation schemas (Joi/Zod).

---

## 3. Naming Conventions

* **React Components:** PascalCase (`DashboardPage.jsx`, `Sidebar.jsx`).
* **Hooks:** camelCase with "use" prefix (`useAuth.js`).
* **Backend Models:** PascalCase, singular (`Lead.js`, `OfferTemplate.js`).
* **Backend Controllers/Routes/Services:** camelCase (`leadController.js`, `leadRoutes.js`).
* **Constants:** UPPER_SNAKE_CASE (`MAX_UPLOAD_SIZE`, `AUX_COLORS`).

## 4. Import Conventions

Organize your imports logically:
1. **Third-party libraries** (e.g., `import React from 'react';`, `import { lucide } from 'lucide-react';`)
2. **Contexts & Hooks** (`import { useAuth } from '../../context/AuthContext';`)
3. **Components** (`import Sidebar from '../../components/layout/Sidebar';`)
4. **Services & Utilities** (`import API from '../../services/api';`)
5. **Assets & Styles** (`import logo from '../../assets/logo.png';`)

## 5. Clean Code Practices
* **No Logic in Routes:** Keep Express route files purely for defining endpoints. All logic goes into controllers.
* **Don't Duplicate State:** Use Contexts (`AuthContext`, `AuxContext`) or custom hooks instead of prop-drilling deeply.
* **Move files safely:** If you need to reorganize, always use `git mv` to preserve the file history.
