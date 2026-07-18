# CleanIndia Connect — Database Schema

## Partition Key Decision

For Version 1, both containers will use `/id` as the partition key.

### Reports Container Partition Key

```txt
/id
```

### Tips Container Partition Key

```txt
/id
```

## Why `/id` for Version 1?

The project is currently a student portfolio/demo version with a small amount of data.

Using `/id` keeps setup simple and avoids confusion during the first backend implementation.

## Future Partition Key Improvement

Later, if CleanIndia Connect grows and needs location-based filtering, the reports container can be redesigned with a better partition key such as:

```txt
/locationKey
```

or

```txt
/city
```

This would help group reports by area or city.

## Field Length Limits

To keep data clean and avoid very large submissions, the backend should apply these limits:

### Report Limits

```txt
title: maximum 100 characters
description: maximum 800 characters
location: maximum 150 characters
citizenName: maximum 60 characters
```

### Comment Limits

```txt
comment text: maximum 250 characters
author: maximum 60 characters
```

### Tip Limits

```txt
tip title: maximum 100 characters
tip description: maximum 400 characters
author: maximum 60 characters
```

These limits should be checked both on the frontend and backend.


## Database Choice

CleanIndia Connect will use Azure Cosmos DB for storing application data.

Cosmos DB is suitable for this project because the data can be stored as JSON-like documents, which works well with reports, tips, and comments.

## Main Collections / Containers

For the first backend version, the database can use these containers:

1. reports
2. tips

Comments can be stored inside each report document for now.

---

# 1. Reports Container

## Purpose

The reports container stores garbage and cleanliness issue reports submitted by citizens.

## Report Document Structure

```json
{
  "id": "report-1234567890",
  "title": "Garbage dump near public road",
  "description": "A large amount of garbage is dumped near the road.",
  "location": "Bikaner, Rajasthan",
  "type": "Garbage Dump",
  "urgency": "High",
  "status": "Pending",
  "imageUrl": "https://storage-url/report-image.jpg",
  "citizenName": "Anonymous Citizen",
  "comments": [],
  "createdAt": "2026-06-22T10:00:00.000Z",
  "updatedAt": "2026-06-22T10:00:00.000Z"
}
```

## Required Fields

* id
* title
* description
* location
* type
* urgency
* status
* createdAt

## Optional Fields

* imageUrl
* citizenName
* comments
* updatedAt

## Status Values

```txt
Pending
In Progress
Resolved
```

## Urgency Values

```txt
Low
Medium
High
```

## Issue Type Values

```txt
Garbage Dump
Overflowing Dustbin
Plastic Waste
Open Drain
Waste Burning
Other
```

---

# 2. Comments Inside Reports

## Purpose

Comments allow citizens to share suggestions, awareness messages, or possible solutions under a report.

## Comment Object Structure

```json
{
  "id": "comment-1234567890",
  "author": "Anonymous Citizen",
  "text": "This area needs a covered dustbin.",
  "createdAt": "2026-06-22T10:10:00.000Z"
}
```

## Required Fields

* id
* author
* text
* createdAt

## Why Comments Are Stored Inside Reports

For the first version, comments are stored inside the report document because:

* It keeps the backend simple
* Each report will have limited comments
* It is easier to fetch report and comments together
* It avoids creating extra API complexity at the beginning

Later, comments can be moved to a separate comments container if the project grows.

---

# 3. Tips Container

## Purpose

The tips container stores sustainability tips shared by users.

## Tip Document Structure

```json
{
  "id": "tip-1234567890",
  "author": "Anonymous Citizen",
  "title": "Carry a cloth bag while shopping",
  "category": "Plastic-Free Living",
  "description": "Using a cloth bag reduces plastic waste.",
  "createdAt": "2026-06-22T10:20:00.000Z"
}
```

## Required Fields

* id
* title
* category
* description
* createdAt

## Optional Fields

* author

## Tip Categories

```txt
Clean Habit
Plastic-Free Living
Waste Reduction
Waste Management
Citizen Action
Environment Safety
```

---

# 4. Future Containers

In future versions, the database may include:

## users

For login/signup and user profiles.

## adminActions

For tracking admin status changes.

## cleanDrives

For volunteer clean-up drives.

## products

For sustainable product marketplace.

## moderationQueue

For reviewing inappropriate reports, tips, or comments before publishing.

---

# 5. LocalStorage to Database Mapping

Current localStorage key:

```txt
cleanindia_reports
```

Future database container:

```txt
reports
```

Current localStorage key:

```txt
cleanindia_user_tips
```

Future database container:

```txt
tips
```

This means the current frontend logic can later be replaced by API calls without changing the complete UI.
