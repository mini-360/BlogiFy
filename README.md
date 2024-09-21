# BlogiFy

Welcome to the Blog Website repository! This project is a modern, responsive blog platform built with Node.js, designed to provide a dynamic space for engaging articles across various topics such as technology, lifestyle, personal development, and creativity.

## Features

- **Responsive Design**: Optimized for viewing on desktops, tablets, and mobile devices.
- **Content Management**: Easily manage and publish articles through a user-friendly interface.
- **Commenting System**: Engage with readers through a built-in commenting feature.
- **Search Functionality**: Quickly find articles with an integrated search bar.
- **Category Filtering**: Browse articles by categories to find topics of interest.
- **Newsletter Subscription**: Stay updated with the latest articles by subscribing to our newsletter.
- **Social Media Integration**: Share articles across various social media platforms.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing blog posts and user data.
- **EJS**: Templating engine for generating HTML markup.
- **Bootstrap**: Frontend framework for responsive design.
- **Passport.js**: Authentication middleware for Node.js.
- **Nodemailer**: Library for sending emails (newsletter subscription).

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/mini-360/MyBlog.git
    cd MyBlog
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root directory and add the following variables:

    ```env
    PORT=3000
    MONGODB_URI=your_mongodb_uri
    SESSION_SECRET=your_session_secret
    EMAIL_HOST=your_email_host
    EMAIL_PORT=your_email_port
    EMAIL_USER=your_email_user
    EMAIL_PASS=your_email_password
    ```

4. **Start the application:**

    ```bash
    npm start
    ```

5. **Visit the website:**
    Open your browser and go to `http://localhost:3000`

## Usage

- **Homepage**: Displays the latest blog posts.
- **Categories**: Browse posts by category.
- **Single Post**: View a full article with comments.
- **Admin Panel**: (Accessible to authenticated users) Manage posts, categories, and comments.

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. **Fork the repository.**
2. **Create a new branch:**

    ```bash
    git checkout -b feature/your-feature-name
    ```

3. **Make your changes and commit them:**

    ```bash

    git commit -m 'Add some feature'
    ```

4. **Push to the branch:**

    ```bash
    git push origin feature/your-feature-name
    ```

5. **Create a pull request.**

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

If you have any questions, feel free to contact us at [abhayraj.svm14@gmail.com](mailto:abhayraj.svm14@gmail.com).

---

Thank you for visiting our repository!
