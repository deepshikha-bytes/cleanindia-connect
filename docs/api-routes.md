# CleanIndia Connect — API Routes Plan

## Purpose

This document defines the backend API routes needed for the professional version of CleanIndia Connect.

The frontend will call these API routes instead of directly using localStorage.

---

# Standard API Response Format

All API routes should return a consistent response format.

## Success Response

```json
{
  "success": true,
  "data": {}
}
```

## Error Response

```json
{
  "success": false,
  "message": "Error message here"
}
```

## Why This Is Important

Using the same response format makes frontend handling easier.

The frontend can check:

```js
if (response.success) {
  // show data
} else {
  // show error message
}
```

This avoids confusion when different API routes return data in different styles.

# Common Backend Validation Rules

## Required Report Fields

```txt
title
description
location
type
urgency
```

## Required Tip Fields

```txt
title
category
description
```

## Required Comment Fields

```txt
text
```

## Default Values

```txt
report status: Pending
citizenName: Anonymous Citizen
comment author: Anonymous Citizen
tip author: Anonymous Citizen
comments: []
```


# Reports API

## 1. Get All Reports

```txt
GET /api/reports
```

## Purpose

Fetch all public reports from the database.

## Response Example

```json
[
  {
    "id": "report-123",
    "title": "Garbage dump near public road",
    "location": "Bikaner, Rajasthan",
    "type": "Garbage Dump",
    "urgency": "High",
    "status": "Pending",
    "imageUrl": "",
    "comments": [],
    "createdAt": "2026-06-22T10:00:00.000Z"
  }
]
```

---

## 2. Create Report

```txt
POST /api/reports
```

## Purpose

Create a new garbage or cleanliness report.

## Request Body Example

```json
{
  "title": "Garbage dump near public road",
  "description": "Garbage has been dumped near the road.",
  "location": "Bikaner, Rajasthan",
  "type": "Garbage Dump",
  "urgency": "High",
  "imageUrl": "",
  "citizenName": ""
}
```

## Backend Validation

Required fields:

* title
* description
* location
* type
* urgency

Default values:

* status: Pending
* citizenName: Anonymous Citizen
* comments: []

---

## 3. Update Report Status

```txt
PATCH /api/reports/:id/status
```

## Purpose

Update the status of a report.

## Request Body Example

```json
{
  "status": "Resolved"
}
```

## Allowed Status Values

```txt
Pending
In Progress
Resolved
```

## Note

In the final real version, only an admin should update report status. For the current student project, status update can remain open for demo purposes.

---

## 4. Add Comment to Report

```txt
POST /api/reports/:id/comments
```

## Purpose

Add a community suggestion/comment under a report.

## Request Body Example

```json
{
  "author": "Anonymous Citizen",
  "text": "This area needs a covered dustbin."
}
```

## Backend Validation

Required field:

* text

Default value:

* author: Anonymous Citizen

---

# Tips API

## 5. Get All Tips

```txt
GET /api/tips
```

## Purpose

Fetch sustainability tips from the database.

## Response Example

```json
[
  {
    "id": "tip-123",
    "author": "Anonymous Citizen",
    "title": "Carry a cloth bag while shopping",
    "category": "Plastic-Free Living",
    "description": "Using a cloth bag reduces plastic waste.",
    "createdAt": "2026-06-22T10:20:00.000Z"
  }
]
```

---

## 6. Create Tip

```txt
POST /api/tips
```

## Purpose

Allow users to share sustainability tips.

## Request Body Example

```json
{
  "author": "Deepu",
  "title": "Always carry a small waste pouch",
  "category": "Clean Habit",
  "description": "If no dustbin is nearby, keep wrappers in a small pouch and throw them later."
}
```

## Backend Validation

Required fields:

* title
* category
* description

Default value:

* author: Anonymous Citizen

---

# Complaint API

## 7. Generate Complaint

```txt
POST /api/complaints/generate
```

## Purpose

Generate formal complaint text from issue details.

## Note

Currently complaint generation is handled on the frontend using complaintService.js.

This API is optional for Version 1 backend. It can be added later if we want complaint generation to happen on the server or through AI.

---

# Image Upload API

## 8. Upload Report Image

```txt
POST /api/upload/report-image
```

## Purpose

Upload image proof to Azure Blob Storage and return an image URL.

## Request

The request will contain image file data.

## Response Example

```json
{
  "imageUrl": "https://storage-url/report-image.jpg"
}
```

## Note

This is planned for the Blob Storage version. Until then, image handling can stay local for development.

---

# API Build Order

The backend should be built in this order:

1. GET /api/reports
2. POST /api/reports
3. PATCH /api/reports/:id/status
4. POST /api/reports/:id/comments
5. GET /api/tips
6. POST /api/tips
7. Image upload API
8. Complaint generation API if needed later

---

# Frontend Service Mapping

Current frontend file:

```txt
reportsService.js
```

Future responsibility:

```txt
Call reports API instead of localStorage
```

Current frontend file:

```txt
tipsService.js
```

Future responsibility:

```txt
Call tips API instead of localStorage
```

Current frontend file:

```txt
complaintService.js
```

Future responsibility:

```txt
Can stay frontend-based or move to backend later
```
