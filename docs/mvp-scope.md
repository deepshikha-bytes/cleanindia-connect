# CleanIndia Connect — MVP Scope

## Final Demo Core

The 6-day demo version will focus on the most important features needed to show the idea clearly.

## Must-Have Features

1. Landing page
2. Report garbage issue form
3. Image upload preview
4. Reports feed
5. Report status display
6. Dashboard statistics
7. Complaint generator
8. Sustainability tips
9. Government submission help section

## Optional Feature

Community discussion will be kept simple. If time allows, each report may have a basic comment box. Full chat or real-time discussion will be added in Version 2.

## Version 1 Decisions

### Report Storage
For the first working demo, reports will be stored locally in the browser. Later, they can be connected to Azure Cosmos DB.

### Image Storage
For the first demo, uploaded images will be previewed locally. Later, Azure Blob Storage can be used for real image storage.

### Complaint Generator
Version 1 will use a template-based complaint generator. Azure AI can be added later if time allows.

### Report Status
For demo purposes, report status can be changed using a simple dropdown:
- Pending
- In Progress
- Resolved

### Cleanliness Impact Score
For Version 1, the impact score will use a simple formula:

Impact Score = (Resolved Reports × 10) + (Total Reports × 2)

## Version 2 Features

These features are not part of the 6-day core build:

- Login/signup
- Real government complaint submission
- Map-based reporting
- Real-time chat
- AI image waste detection
- Admin dashboard
- Sustainable product marketplace
- Video upload
- Volunteer clean-up drive system