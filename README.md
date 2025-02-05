
# SwiftParcel - Client Side 🚀  

![SwiftParcel](https://i.ibb.co.com/Wpdy5kxX/Screenshot-1.png) <!-- Replace with a real screenshot if available -->

---

## 🔗 Live Project Links  
🎨 **Frontend**: [SwiftParcel Frontend](https://swift-parcel-4a623.web.app)  
⚙️ **Backend**: [SwiftParcel Backend](https://swift-parcel-server-five.vercel.app)  

---

## ✨ Project Overview  

**SwiftParcel** is a **modern Parcel Management System** built using the **MERN stack**. It offers role-based access control for **Admins, Deliverymen, and Users**, ensuring efficient logistics management. With a sleek UI, real-time tracking, secure payments, and interactive dashboards, SwiftParcel simplifies parcel handling and delivery operations.  

### 🛠️ Technologies Used  
- **Frontend**: React, Vite, Tailwind CSS, DaisyUI  
- **State Management**: React Hooks, Context API  
- **Authentication**: Firebase (Google, Email/Password), JWT  
- **Payments**: Stripe  
- **Maps**: Leaflet, React-Leaflet  
- **Animations**: Framer Motion, Lottie React  

---

## 🌟 Key Features  

### 🔑 **Authentication & Authorization**  
- Google & Email/Password login via Firebase  
- JWT token verification for secure routes  
- Role-based access control (Admin, Deliveryman, User)  

### 📦 **Parcel Management**  
- Place, update, and cancel orders  
- Admin assigns orders to delivery personnel  
- Deliverymen update order status (delivered/canceled)  
- Users can track orders and provide feedback  

### 🛡️ **Admin Dashboard**  
- View real-time statistics (Total Users, Parcels Booked, Delivered)  
- Assign roles (Admin, Deliveryman)  
- Interactive map for tracking delivery locations  

### 💳 **Payment Integration**  
- Secure **Stripe Payment Gateway** for order payments  

### 🎨 **User Experience Enhancements**  
- Dark Mode toggle  
- Beautiful 404 Error Page  
- Smooth animations via Framer Motion & Lottie React  
- Real-time notifications using React Hot Toast  

### 🗺️ **Interactive Maps**  
- View delivery addresses using Leaflet & React-Leaflet  

### 📤 **File Upload**  
- Upload profile images using ImgBB API  

---

## 📜 Dependencies Used  

```json
"dependencies": {
  "@stripe/react-stripe-js": "^3.1.1",
  "@stripe/stripe-js": "^5.5.0",
  "@tanstack/react-query": "^5.64.1",
  "axios": "^1.7.9",
  "firebase": "^11.1.0",
  "framer-motion": "^11.18.0",
  "leaflet": "^1.9.4",
  "lottie-react": "^2.4.0",
  "moment": "^2.30.1",
  "react": "^18.3.1",
  "react-router-dom": "^7.1.1",
  "react-hot-toast": "^2.5.1",
  "react-leaflet": "^4.0.0",
  "sweetalert2": "^11.15.10"
}
```

---

## 🚀 How to Run the Project Locally  

### 1️⃣ Prerequisites  
Ensure you have **Node.js (v16+)** and **npm/yarn** installed.  

### 2️⃣ Clone the Repository  
```sh
git clone https://github.com/your-username/swift-parcel-client.git
cd swift-parcel-client
```

### 3️⃣ Install Dependencies  
```sh
npm install  # or yarn install
```

### 4️⃣ Set Up Environment Variables  
Create a `.env.local` file and add the following:  

```env
VITE_API_URL=https://swift-parcel-server-five.vercel.app
VITE_Payment_Gateway_PK=your-stripe-public-key
VITE_IMGBB_API_KEY=your-imgbb-api-key
```

### 5️⃣ Run the Development Server  
```sh
npm run dev  # or yarn dev
```

### 6️⃣ Open in Browser  
Visit **[http://localhost:5173](http://localhost:5173)**  

---

## 🙌 Acknowledgments  

Special thanks to **open-source libraries** and tools that made this project possible! 💜  

Happy Coding! 😊

---

## 📧 Contact With Me for More

Feel free to explore and contribute to this repository. Happy coding!😊

## 🤝 Thank You
