# HariChatApp

Comprehensive guide to create a chat app using the MERN stack:

### 1. Setup Project Structure
1. Create backend and frontend folders.
   ```bash
   mkdir backend frontend
   ```

### 2. Frontend Setup
1. Initialize Vite in the frontend directory.
   ```bash
   cd frontend
   npm create vite@latest
   ```

### 3. Backend Setup
1. Initialize npm in the root directory for hosting purposes.
   ```bash
   cd ../
   npm init -y
   ```

2. Install backend dependencies.
   ```bash
   npm i express dotenv cookie-parser bcryptjs mongoose socket.io jsonwebtoken
   ```

3. Install nodemon as a development dependency.
   ```bash
   npm i nodemon --save-dev
   ```

4. Create `server.js` in the backend directory and update the `scripts` section in `package.json`.
   ```json
   "scripts": {
       "server": "nodemon backend/server.js"
   }
   ```

5. Run the server.
   ```bash
   npm run server
   ```

### 4. Backend Configuration
1. Create a `.env` file and configure the `PORT`. Import dotenv in `server.js`.
   ```javascript
   import dotenv from 'dotenv';
   dotenv.config();
   ```

2. Change `type` to `module` in `package.json` and use `import` instead of `require`.

3. Create `routes/authRoutes.js`, `controller/authController.js`, and implement signup, login, and logout functionalities.
   
4. Create `db/connectMongoDB.js` and import it in `server.js`.

5. Create `models/userModel.js` in the backend.

6. Complete the signup function in `authController`.

7. Create `utils/generateToken.js` in the backend and implement the function.

8. Generate a secret key for JWT and set it in the `.env` file.
   ```bash
   openssl rand -base64 32
   ```

9. Complete the `generateTokenAndSetCookies` function and import it in the `authController` signup function.

10. Complete login and logout functions.

11. Create `models/MessageModel.js` and `models/ConversationModel.js`.

12. Create `controller/messageController.js`, `routes/messageRoutes.js`, and import them in `server.js`.

13. Import `cookie-parser` in the server, and complete `middleware/protectRoute.js`. Use the middleware in both `messageRoutes` and `authRoutes`.

14. Create `controller/userController.js` and import it in `userRoutes`.

### 5. Frontend Process
1. Create Vite project.
   ```bash
   cd frontend
   npm create vite@latest
   ```

2. Install Tailwind CSS.
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

3. Configure `tailwind.config.js` and `index.css` in `src`.

4. Install DaisyUI.
   ```bash
   npm i -D daisyui@latest
   ```

5. Add the plugin in `tailwind.config.js`.
   ```javascript
   plugins: [require('daisyui')],
   ```

6. Delete `app.css`.

7. Create `pages` and `components` folders in `src`. 

8. Create `home`, `login`, and `signup` folders and respective `.jsx` files in `pages`.

9. Create `public` folder and insert background images. Import background in `index.css`.

10. Create login and signup pages with `GenderCheckBox.jsx`.

11. Create `sidebar` folder and `Sidebar.jsx` in `components`.

12. Import `Sidebar` in `Home.jsx`.

13. Create `SearchInput.jsx` and import it in `Sidebar`, then import `Sidebar` in `Home` and `Home` in `App`.

14. Install React Icons.
    ```bash
    npm install react-icons --save
    ```

15. Create `Conversation.jsx` in `sidebar`.

16. Create logout button in `sidebar`.

17. Create `messages` folder and `MessageContainer.jsx`, `Messages.jsx`, `Message.jsx`, and `MessageInput.jsx`.

18. Update `index.css` for scrollbar.

### 6. Adding Functionality
1. Install React Router DOM.
   ```bash
   npm i react-router-dom
   ```

2. Wrap the `App` component in `BrowserRouter`.

3. Create routes for `Home`, `Login`, and `Signup`.

4. Change the port to `3000` in `vite.config.js`.

5. Use `<Link to={'/login'}>` in the signup page to change the page, and similarly in the login page.

6. Complete `handleSubmit` function in `signup`.

7. Create `hooks` folder and implement hooks.

8. Install `react-hot-toast` for toasting messages.
   ```bash
   npm i react-hot-toast
   ```

9. Add a hook to verify input data. Add `<Toaster/>` in `App` (Make sure it's placed at the top).

10. Complete signup function in hooks.

11. Create `context` folder and `authContext.js`.

12. Wrap `App` in `<AuthContextProvider>`.

13. Set local storage for chat-user.

14. In `App`, if `authUser` exists, navigate to `Home`, else navigate to `Login`.

15. Create `useLogout` hook and import it in `LogoutBtn`.

16. In `login` page, make `handleSubmit` function and create `useLogin` hook.

17. Complete `useLogin` hook and `login` page. After verification of data, redirect to `Home`.

18. For `getConversation`, use Zustand to provide global state.
    ```bash
    npm install zustand
    ```

19. Create `zustand` folder and `useConversation.js`.

20. Create `useGetConversations.js` hook.

21. Update `Conversations.jsx` in `sidebar`.

22. Create `utils/emojis.js` for emojis.

23. Update `Conversation.jsx` in `sidebar`.

24. Update `MessageContainer` for selected chat and logged user.

25. Create `useSendMessage.js` hook and import it in `MessageInput`.

26. Create `useGetMessage.js` hook and import it in `Messages`.

27. Create `MessageSkeleton` to show while loading.

28. Update `Messages.jsx`.

29. Create `extractTime.js` in `utils` and import it in `Message`.

30. Update `Messages.jsx` to shift scrollbar to the recent message.

31. Update `SearchInput` to search user and shift the chat respectively.

### 7. Real-time Messaging with Socket.io
1. Create socket server at the top of the express server in the backend.

2. Create `socket/socket.js`.

3. Update `server.js`.

4. In the frontend, create `socketContext.js` in the `context` folder.

5. Wrap `App` in `SocketContext` in `main.jsx`.

6. Install socket.io-client.
   ```bash
   npm i socket.io-client
   ```

7. Update server and socket and context.

8. Import `SocketContext` in `Sidebar` to get online users.

9. Update `messageController` to maintain updates for live messaging.

10. Create `useListenMessages.js` to listen to events for live messaging.

11. Add notification sound in `assets` frontend and import it in `useListenMessages`.

12. Import `useListenMessages` in `Messages.jsx`.

---

Save this guide as a reference to understand and revisit the steps for creating your MERN stack chat application.








-----------------------------------------------------------------------------------

2. `{participants: {$all: [senderId, receiverId]}}`: This is the query object passed to the `findOne()` function. It specifies the criteria that the document must match in order to be returned. 

    - `participants`: This suggests that the `Conversation` model has a field named `participants`, which likely contains an array of participant IDs or references.
    
    - `$all`: This is a MongoDB operator that checks if all elements in the array match the specified value(s). It's commonly used to find documents where an array field contains all of the specified values.
    
    - `[senderId, receiverId]`: These are variables representing the IDs of the participants involved in the conversation. The query is looking for conversations where both the `senderId` and `receiverId` are present in the `participants` array. This implies that the conversation involves both the sender and the receiver.

    In Mongoose, `populate()` is a method used to populate reference fields in a document with actual documents from other collections. When you have a schema with a field that references documents in another collection, using `populate()` allows you to retrieve those referenced documents and include them directly in the query result.

In your case, `Conversation` schema seems to have a field named `messages`, which likely holds references (IDs) to documents in the `Message` collection. By calling `populate("messages")`, you're instructing Mongoose to replace these IDs in the `messages` field with the actual documents from the `Message` collection.

Here's how `populate()` works in your code:

1. You first query the `Conversation` collection using `findOne()` with a condition to find the conversation where both `senderId` and `receiverId` are participants.
2. By calling `populate("messages")` on the returned `conversation`, you tell Mongoose to fetch the actual `Message` documents referenced by the `messages` field in the `Conversation` document.
3. After populating, `conversation.messages` will contain the actual message documents instead of just IDs.
4. You can then access and manipulate these populated messages directly in your code.

This approach simplifies your code by eliminating the need for additional queries to fetch message documents separately. It also ensures that you have all the relevant data you need in a single query result, improving performance.
