# Alumni-Student Portal – Frontend

This is the frontend for the **Alumni-Student Portal**, a platform designed to connect current students with alumni. Users can interact via blogs, chats, job postings, and topic-based discussions.
---

# Backend repo
  [Alumni-student-backend](https://github.com/aditya13raja/alumni-student-backend)

## 🚀 Features

- 🔐 **Authentication** via JWT
- 🧠 **Topic-based Discussions** with Categories
- 🗣️ **Real-time Chat** powered by Pusher
- 📝 **Blog Posts** authored by verified alumni
- 💼 **Job Listings** posted by alumni
- 📄 **Clean UI/UX** with responsive design

---

## 🛠️ Tech Stack

- **Frontend Framework**: React.js 
- **State Management**:  Redux 
- **Styling**: TailwindCSS, ShadCN UI, CSS Modules 
- **Routing**: React Router
- **API Communication**: Fetch
- **Real-time Updates**: Pusher
- **Form Handling**: React Hook Form

---

## 📁 Project Structure

```
/src
├── components/        # Reusable UI components
├── pages/             # Route-based pages 
├── utils/             # Utility functions (e.g., Redux setup)
└── assets/            # Images, icons, static files

````

---

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/aditya13raja/alumni-student-frontend.git
   cd alumni-student-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**

   Create a `.env` file:

   ```env
   VITE_PUSHER_KEY
   VITE_PUSHER_CLUSTER
   VITE_SUPABASE_URL
   VITE_SUPABASE_ANON_KEY
```

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

---

## 🔐 Authentication Flow

* JWT tokens are stored securely in memory / cookies
* Protected routes are guarded using route wrappers
* Token refresh or logout on expiry is implemented

---

## 📡 API Integration

All routes are handled through RESTful APIs defined in the [Backend Repository](https://github.com/aditya13raja/alumni-student-backend). These include:

* `/auth/*`
* `/topics/*`
* `/chat/*`
* `/blogs/*`
* `/jobs/*`

---

## 🧪 Testing

```bash
# Example
npm run test
# or using tools like Cypress, Jest, etc.
```

---

## 🧑‍💻 Contributing

1. Fork the repo
2. Create your feature branch: `git checkout -b feat/your-feature`
3. Commit your changes
4. Push to the branch
5. Create a pull request

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.

---

## 🙋‍♀️ Maintainers

* [Aditya Raja](https://github.com/aditya13raja)
* [Aman Kumar Verma](https://github.com/aman22verma10)

---

## 📬 Contact

Feel free to reach out via [issues](https://github.com/aditya13raja/alumni-student-frontend/issues) or connect via [LinkedIn](https://www.linkedin.com/in/adirajdev/)!
