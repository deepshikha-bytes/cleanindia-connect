# CleanIndia Connect — Backend Plan

## Purpose

The purpose of the backend is to move CleanIndia Connect from browser-only localStorage to a real cloud-based application where reports, tips, comments, and image URLs can be stored and accessed from any device.

## Current Frontend State

The frontend currently stores data in browser localStorage.

Current localStorage features:

* Submitted reports
* Report status
* Community comments
* User-submitted sustainability tips

This is useful for development and demo, but it is not enough for a real hosted website because localStorage data stays only in one browser.

## Professional Backend Goal

The professional version will use:

* Azure Static Web Apps for hosting the React frontend
* Azure Functions for backend API routes
* Azure Cosmos DB for storing reports, tips, and comments
* Azure Blob Storage for storing uploaded images
* Environment variables for sensitive configuration values

## Why Backend Is Needed

A backend is needed because:

1. Reports should be visible to all users, not only the browser where they were submitted.
2. Tips shared by users should be stored permanently.
3. Community comments should be available publicly.
4. Uploaded images should be stored in cloud storage instead of localStorage.
5. The project should be ready for real deployment and future scaling.

## Backend Responsibilities

The backend will handle:

* Creating a report
* Reading all reports
* Updating report status
* Adding comments to a report
* Creating user-submitted sustainability tips
* Reading all tips
* Generating complaint text if moved from frontend later
* Uploading image proof to Blob Storage in a future step

## Version 1 Backend Scope

The first backend version will focus on:

* Reports API
* Tips API
* Comments inside reports
* Cosmos DB connection
* Basic error handling

## Version 2 Backend Scope

Later backend improvements can include:

* Image upload using Azure Blob Storage
* Admin-only status updates
* Authentication
* Moderation system
* Spam protection
* AI image waste detection
* Map-based reporting
* Email/notification system

## Important Decision

Login/signup will not be added in the first backend version.

Reason:
The main purpose of CleanIndia Connect is fast public reporting. If users are forced to create an account before reporting a garbage issue, many may avoid submitting reports.

For now:

* Name will be optional
* Reports can be public
* Admin features can be added later

## Data Flow

Report submission flow:

Frontend report form
↓
API route receives report data
↓
API validates required fields
↓
Report is saved in Cosmos DB
↓
Frontend fetches updated reports
↓
Reports feed displays public reports

Tip submission flow:

Frontend tip form
↓
API route receives tip data
↓
API validates title and description
↓
Tip is saved in Cosmos DB
↓
Tips page displays official + user-submitted tips

Comment submission flow:

Frontend comment form
↓
API route receives report ID and comment data
↓
API finds the report
↓
Comment is added to that report
↓
Updated report appears in reports feed

# Backend Risks and Safety Decisions

## 1. CORS Risk

The frontend may be blocked from calling backend APIs if CORS is not configured correctly.

During development and deployment, API access must be tested from the frontend URL.

## 2. Environment Variable Risk

Cosmos DB connection strings and keys must not be written directly inside code.

They should be stored in environment variables or Azure Function app settings.

## 3. Partition Key Risk

Cosmos DB containers require a partition key decision.

For Version 1, `/id` will be used to keep setup simple.

Later, the partition key may be changed to a location-based value if the app grows.

## 4. Public Submission Risk

Because Version 1 does not use login, anyone can submit reports, tips, and comments.

This is acceptable for a student demo, but a real public version should add moderation and spam protection.

## 5. Status Update Risk

In the current frontend, users can change report status.

For a real production version, only admins should be allowed to update status.

## 6. Image Storage Risk

Images should not be saved as Base64 in Cosmos DB.

When cloud image upload is added, images should be stored in Azure Blob Storage and only the image URL should be saved in Cosmos DB.

## 7. Concurrent Comment Risk

If two users comment at the same time, update handling must be done carefully to avoid overwriting comments.

For Version 1, this risk is acceptable, but it should be improved later.

# Backend Build Order

The backend should be built in this order:

1. Create Azure Functions project structure
2. Connect Azure Functions to Cosmos DB
3. Build GET /api/reports
4. Build POST /api/reports
5. Connect frontend reports feed and report form to API
6. Build PATCH /api/reports/:id/status
7. Build POST /api/reports/:id/comments
8. Build GET /api/tips
9. Build POST /api/tips
10. Add Blob Storage image upload later
