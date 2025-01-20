# SwiftParcel - Client Side 🚀

---

### 🔗 Deployment Links:
 🎨 - **Frontend**: [https://swift-parcel-4a623.web.app](https://swift-parcel-4a623.web.app)

 ⚙️ - **Backend**: [https://swift-parcel-server-five.vercel.app](https://swift-parcel-server-five.vercel.app)

---

## ✨ Short description

Welcome to the **SwiftParcel** frontend repository! This is the client-side application for **SwiftParcel**, a robust **Parcel Management System** built using the **MERN stack**. The application is feature-rich, user-friendly, and responsive across all devices, ensuring a seamless experience for **Admins**, **Deliverymen**, and **Users**.

Key highlights include a fully responsive interface, secure payment processing via **Stripe**, robust authentication powered by **Firebase**, and engaging animations for an enhanced user experience. The platform supports CRUD operations, order management, dynamic dashboards, interactive maps, and much more to cater to the needs of a modern parcel management system.

---

## 🎯 Purpose

Designed to streamline logistics, it offers a feature-rich experience for admins, delivery personnel, and users alike. With role-based access control, real-time data insights, and modern design aesthetics, SwiftParcel ensures seamless parcel handling and delivery operations.

---

## 🔑 Admin Login Credentials

Use the following credentials for testing the admin panel:

- **Email**: `admin@admin.com`  
- **Password**: `123456aA@`

---

## 🌟 Key Features

### 🌐 **Authentication & Authorization**
- 🔑 **Google Authentication** and **Email/Password Login** via Firebase.
- 🔐 **JWT Token Verification** to secure protected routes.
- 🛡️ **Role-Based Access Control** for Admins, Deliverymen, and Users.

### 📦 **Order Management**
- ➕ Place, update, and cancel orders effortlessly.
- 📋 Users can review orders and leave feedback.
- 📍 Admins can view delivery addresses on a **map** using **Leaflet** and **React-Leaflet**.
- 📜 **Admins** can assign orders to deliverymen, who can then update the order status.

### 💳 **Payment Integration**
- 💰 Seamless **Stripe Payment Gateway** for order payments.

### 🧩 **Custom Functionality**
- ⚙️ **Custom Hooks** for reusability and cleaner code.
- 🔄 **React Hooks** like `useState`, `useEffect`, `useRef`, `useParams`, `useNavigate` and etc.

### 📊 **Dynamic Statistics**
- 📈 **Admin Dashboard** with real-time statistics:
  - Total Users.
  - Total Parcels Booked.
  - Total Parcels Delivered.
- 🏆 Displays **Top 3 Deliverymen** based on performance.
- 🔢 **React CountUp** used for dynamic number animations.

### 🎨 **UI/UX Features**
- 🌓 **Dark Mode** for a pleasant user experience.
- 🚫 **Beautiful 404 Error Page** for unmatched routes.
- 🔍 **Search Functionality** for quick access to data.
- 📉 **No Data Found Component** with a user-friendly design.
- 💫 Smooth and interactive **animations** using **Framer Motion** and **Lottie React**.
- 💡 **Modals** for better interactivity.
- 🍭 **Toast Notifications** using **React Hot Toast**.
- 🛠️ **DaisyUI** components with **TailwindCSS** for styling.

### 🗺️ **Map Integration**
- 🗺️ Real-time delivery address visualization with **Leaflet**.

### 📤 **File Upload**
- 🖼️ Upload images to **ImgBB** and save the URL for later use.

### 🔍 **Admin Features**
- 👨‍💼 Admins can:
  - 🔄 **Make Admins** or **Assign Deliverymen**.
  - 📍 View order addresses on the map.
  - 📊 Monitor dashboard statistics.

---

### 💡 Key Highlights:

- **Role-Based Access**: Separate dashboards for Admin, Deliveryman, and Users.
- **Authentication**: Secure login using Firebase (Google & Email/Password).
- **Order Management**: Place, update, cancel, and view parcel orders.
- **Secure Payments**: Integration with Stripe for smooth transactions.
- **Admin Tools**:
  - Assign orders to delivery personnel.
  - View delivery locations on an interactive map.
  - Manage roles (assign/remove admin or deliveryman).
  - Dynamic statistics and analytics.
- **Deliveryman Dashboard**:
  - View assigned orders.
  - Update order status (delivered/canceled).
  - See reviews
- **User Features**:
  - Book orders and provide reviews.
  - See all orders of his/her own
  - Profile updates with image uploads (stored via **ImgBB**).
- **Engaging UX**:
  - Animations via Lottie React and Framer Motion.
  - Beautiful 404 error page and "No Data Found" components.
  - Dark mode toggle for improved accessibility.
- **Dynamic Insights**:
  - Real-time statistics on the home page (e.g., total users, parcels booked, top delivery personnel).
  - Search and filtering functionality for easy data access.

  ---

## 🛠️ Technologies & Tools

### 🔗 **Frontend Stack**
- ⚛️ **React**: For building a dynamic and interactive user interface.
- 🔄 **React Router DOM**: For seamless route management.
- 🖌️ **Tailwind CSS** & **DaisyUI**: For crafting responsive and stylish designs effortlessly.
- 🎞️ **Lottie React**: For implementing engaging animations.
- 📦 **Axios**: For efficient and reliable API requests.
- 🌐 **Firebase**: Used for authentication and deployment.
- 💳 **Stripe**: Integrated for secure and user-friendly payment processing.

---

### ⚙️ **Dependencies**
Below are the core dependencies powering the SwiftParcel frontend:

- [@stripe/react-stripe-js](https://www.npmjs.com/package/@stripe/react-stripe-js): React components for Stripe.js.
- [@stripe/stripe-js](https://www.npmjs.com/package/@stripe/stripe-js): Stripe.js library for secure payment processing.
- [@tanstack/react-query](https://www.npmjs.com/package/@tanstack/react-query): Powerful data-fetching and caching.
- [apexcharts](https://www.npmjs.com/package/apexcharts): Interactive charts and visualizations.
- [axios](https://www.npmjs.com/package/axios): Promise-based HTTP client for API communication.
- [firebase](https://www.npmjs.com/package/firebase): Authentication and backend services.
- [framer-motion](https://www.npmjs.com/package/framer-motion): Advanced animations and gestures.
- [leaflet](https://www.npmjs.com/package/leaflet): Interactive map library.
- [localforage](https://www.npmjs.com/package/localforage): Local storage library for offline-first apps.
- [lottie-react](https://www.npmjs.com/package/lottie-react): Integration of Lottie animations in React.
- [moment](https://www.npmjs.com/package/moment): Date and time manipulation library.
- [react-apexcharts](https://www.npmjs.com/package/react-apexcharts): React wrapper for ApexCharts.
- [react-awesome-reveal](https://www.npmjs.com/package/react-awesome-reveal): React component for animated reveals.
- [react-confetti](https://www.npmjs.com/package/react-confetti): Render confetti animations in React.
- [react-countup](https://www.npmjs.com/package/react-countup): Animated counter for numerical data.
- [react-helmet-async](https://www.npmjs.com/package/react-helmet-async): Manage document head data asynchronously.
- [react-hot-toast](https://www.npmjs.com/package/react-hot-toast): Toast notifications for React apps.
- [react-icons](https://www.npmjs.com/package/react-icons): Library of popular icons for React.
- [react-intersection-observer](https://www.npmjs.com/package/react-intersection-observer): Hook for observing when elements enter the viewport.
- [react-leaflet](https://www.npmjs.com/package/react-leaflet): React components for Leaflet maps.
- [react-loader-spinner](https://www.npmjs.com/package/react-loader-spinner): Loaders for React applications.
- [react-modal](https://www.npmjs.com/package/react-modal): Accessible modal dialog component for React.
- [react-router-dom](https://www.npmjs.com/package/react-router-dom): Declarative routing for React applications.
- [react-simple-typewriter](https://www.npmjs.com/package/react-simple-typewriter): Typewriter effect for React.
- [sort-by](https://www.npmjs.com/package/sort-by): Utility for sorting arrays by object properties.
- [sweetalert2](https://www.npmjs.com/package/sweetalert2): Beautifully styled alert dialogs.

---

### 🔧 **Development Tools**
- [Vite](https://www.npmjs.com/package/vite): Lightning-fast development environment and bundler.
- [eslint](https://www.npmjs.com/package/eslint): Ensure code quality and consistency.
- [tailwindcss](https://www.npmjs.com/package/tailwindcss): Utility-first CSS framework for rapid UI development.
- [autoprefixer](https://www.npmjs.com/package/autoprefixer): Adds vendor prefixes for cross-browser compatibility.
- [daisyui](https://www.npmjs.com/package/daisyui): Tailwind CSS components for beautiful UI.

---

## ⚛️ React Fundamentals Used in SwiftParcel

This project showcases key React concepts and best practices:

- **Functional Components**  
  All components are implemented using functional components for cleaner, more readable, and performant code.

- **Hooks**  
  Various React hooks are utilized to manage state, handle side effects, and navigate through the app:
  - `useState`: For managing component-level states like form inputs and dynamic content.
  - `useEffect`: To handle side effects such as API calls and DOM updates.
  - `useNavigate`: For programmatic navigation after specific actions like login or order placement.
  - `useParams`: To access dynamic route parameters such as parcel IDs for detailed views.
  - `useContext`: For global state management like user authentication and roles.
  - `useRef`: To directly access and manipulate DOM elements or persist mutable values across renders.
  - `useIntersectionObserver`: For lazy-loading and triggering animations when elements are in view.

- **React Router**  
  - **Nested Routing**: Efficiently organizes components for dashboards and role-based access.  
  - **Dynamic Routing**: For pages like parcel details based on dynamic parameters.  
  - **Private Routes**: Ensures only authenticated users with appropriate roles can access specific sections.  
  - **Error Handling**: Displays a custom 404 page for unavailable routes.  

- **Props and Children**  
  - **Props**: Passed to components for dynamic rendering of data such as user details and order lists.  
  - **Children**: Used to create reusable components like modals and wrappers for nested content.

- **State Management**  
  - Local state management for real-time updates, form handling, and toggles like dark mode.  
  - Role-based state control for differentiating admin, delivery personnel, and user functionalities.

- **Animations and Effects**  
  Smooth and responsive animations implemented using libraries like **Framer Motion** and **React Awesome Reveal**.

- **Responsive Design**  
  Ensures optimal experience across all devices using **Tailwind CSS** and **DaisyUI**.

---

## 🙌 Acknowledgments

Special thanks to all the open-source libraries and tools used in this project! 💜

---

## 📧 Contact With Me for More

Feel free to explore and contribute to this repository. Happy coding!😊

## 🤝 Thank You
