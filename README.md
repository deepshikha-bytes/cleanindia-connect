# 🌱 CleanIndia Connect

> **Report. Track. Improve. Together.**

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-sharp)](http://makeapullrequest.com)
[![Status](https://img.shields.io/badge/Status-Active%20Development-blue)](https://github.com/deepshikha-bytes/cleanindia-connect)

**CleanIndia Connect** is an open-source civic-tech platform designed to bridge the gap between citizen awareness and community action. The platform empowers users to effortlessly report public cleanliness issues, leverage AI to generate structured official complaints, track resolution pipelines, and adopt sustainable local practices.

Built with a modern serverless architecture, this project serves as a scalable solution for transparent, community-driven civic improvements.

---

## ✨ Core Pillars

*   **Effortless Reporting:** Snap a photo, add details, and log community cleanliness issues instantly.
*   **AI-Assisted Advocacy:** Automated generation of formal, location-specific complaint texts optimized for municipal authorities.
*   **Actionable Insights:** A dynamic dashboard tracking active issues, resolution metrics, and regional sustainability trends.
*   **Community Education:** Curated resources and interactive spaces promoting daily zero-waste habits.

---

## 🛠 Tech Stack

### Frontend
*   **Framework:** React (Vite)
*   **Styling:** Tailwind CSS

### Backend & Cloud Architecture (Serverless)
*   **Runtime:** Node.js
*   **Compute:** Azure Functions
*   **Hosting:** Azure Static Web Apps
*   **Storage:** Azure Blob Storage *(Planned)*
*   **Database:** Azure Cosmos DB *(Planned)*
*   **AI Service:** Azure OpenAI / AI Services *(Planned)*

---

## 📸 System Preview

> *Visual interfaces are currently being polished. Screenshots of the core platform views will be updated below as deployment phases conclude.*

| Landing Page | Analytics Dashboard | AI Complaint Hub |
| :---: | :---: | :---: |
| _[Coming Soon]_ | _[Coming Soon]_ | _[Coming Soon]_ |

---

## 📁 Architecture & Directory Structure

```text
cleanindia-connect/
├── api/                  # Serverless Azure Functions backend
├── docs/                 # System architecture plans, DB schemas, & API contracts
└── frontend/             # Single Page Application (SPA) source code
🧪 Getting Started
Follow these steps to spin up a local development environment.

Prerequisites
Node.js (v18+ recommended)

Azure Functions Core Tools (for local backend testing)

1. Clone the Repository
Bash
git clone [https://github.com/deepshikha-bytes/cleanindia-connect.git](https://github.com/deepshikha-bytes/cleanindia-connect.git)
cd cleanindia-connect
2. Launch the Frontend
Bash
cd frontend
npm install
npm run dev
The frontend should now be running locally at http://localhost:5173.

3. Launch the Backend
Open a new terminal window or tab, then execute:

Bash
cd api
npm install
func start
🔐 Environment Configurations
To handle application secrets and service endpoints securely, local configuration files are utilized.

Create a local.settings.json file inside the api/ directory for backend environment variables:

JSON
{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AzureWebJobsStorage": "UseDevelopmentStorage=true"
  }
}
⚠️ Security Warning: Never commit actual API keys, connection strings, or private credentials to GitHub. The .gitignore file is pre-configured to exclude these files automatically.

🤝 Contributing to Civic Tech
We love community contributions! Whether you want to fix a bug, optimize UI responsiveness, improve documentation, or suggest architectural enhancements, your help is welcome.

Contribution Process
Fork the repository.

Create a feature branch (git checkout -b feature/AmazingFeature).

Commit your changes (git commit -m 'Add some AmazingFeature').

Push to the branch (git push origin feature/AmazingFeature).

Open a Pull Request for engineering review.

🗺 Strategic Roadmap
[x] Initial MVP Architecture Strategy

[x] Directory Restructuring & Core Config Setup

[ ] Implement Azure Blob Storage for secure image uploads

[ ] Connect Azure Cosmos DB for scalable report persistence

[ ] Integrate Azure AI Services for automated municipal complaint generation

[ ] Roll out User Authentication & Profile Histories

[ ] Deploy live application via Azure Static Web Apps

📄 License
Distributed under the MIT License. See the accompanying LICENSE file for details.
