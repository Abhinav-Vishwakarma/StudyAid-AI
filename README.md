

---

# 📚 AI-Powered Educational Resource Platform: StudyAid

## 🛠 Problem Statement

### Challenges Faced by College Students:
1. **Scattered Lecture Notes**  
   - Lecture-wise notes are shared across various social media groups, making them hard to organize or retrieve.  
   - Manually searching for specific topics in multiple PDFs is tedious and time-consuming.  

2. **Distributed Question Papers (PYQs)**  
   - Sessional test and university papers are scattered across different platforms, causing inconvenience in accessing them.

---

## 💡 Proposed Solution

*StudyAid* addresses these pain points with a structured and efficient platform:

### 1️⃣ Centralized Resource Management
- Collect and store lecture notes and PYQs in a well-organized format.  
- Enable easy access, search, and download of resources by year, semester, and subject.  
- Use **Google Drive API** or **Amazon S3** for scalable and reliable file storage.

### 2️⃣ AI-Powered Topic Search and Summarization
- Leverage **Generative AI** models to extract specific topics from uploaded PDFs.  
- Provide concise summaries or short descriptions of searched topics instantly.  
- Analyze patterns in past question papers using **GPT** to predict potential exam questions.  
- Help students focus on high-priority topics and prepare effectively.

### 3️⃣ One-Stop Platform
- Consolidate all resources (notes, PYQs, summaries) into a single platform.  
- Simplify the learning journey by eliminating the need for multiple tools.

---

## 🌟 Features

- 📂 **Centralized Resource Management**  
- 🔍 **AI-Powered Topic Search**  
- 📊 **Question Prediction and Summarization**  
- 🖥 **User-Friendly Interface**

---

## 🛠 Technology Stack

| Component          | Technology              |
|---------------------|-------------------------|
| **Frontend**        | React.js               |
| **Backend**         | Node.js, Express.js    |
| **Database**        | MySQL                  |
| **AI**              | GPT (Generative Models)|

---

## 🔑 How to Use Google Generative AI (Gemini API)

1. **Visit:** [Google AI Studio](https://aistudio.google.com/app/apikey) to get your API key.  
2. **Save the API Key:** Add the API key to your `.env` file as shown below:  
   ```env
   GEM_API=<your-google-generative-ai-api-key>
   ```

---

## 🚀 How to Run the Project

### 1. Clone the Repository:
```bash
git clone https://github.com/Abhinav-Vishwakarma/StudyAid-AI.git
cd studyaid
```

### 2. Set up the `.env` File:
Create a `.env` file in the project root and configure it with your environment variables:
```env
GEM_API=<your-google-generative-ai-api-key>
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=topic_metadata
```

### 3. Import Database Using phpMyAdmin:
1. Open phpMyAdmin in your browser.  
2. Click on the **Import** tab.  
3. Select the `.sql` file (`topic_metadata.sql`) provided in the project folder.  
4. Click on **Go** to import the database schema and data.  

The database schema includes:  
```sql
CREATE TABLE tc (
    id INT AUTO_INCREMENT PRIMARY KEY,
    topics VARCHAR(255),
    pdfPath VARCHAR(255),
    pageNumber INT
);
```

### 4. Set Up Backend:
```bash
cd backend
npm install
npm start
```

### 5. Set Up Frontend:
```bash
cd frontend
npm install
```

### 6. Start Frontend:
```bash
cd frontend/src
npm start
```

### 7. Access the Platform:
Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

---

## 🙌 Contributors

- **Team NEXTGEN NIRMANN**

---

## 📄 License

This project is licensed under the [GPL 3.0 License](LICENSE).

--- 

