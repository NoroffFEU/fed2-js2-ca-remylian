# Noroff Social Media App

![image](https://i.ibb.co/Lh2yvpCk/JS2-readme.png)

A frontend client for a social media application built as part of Noroff's Frontend Development 2 course.

## Description

This project provides a fully functional social media feed with user authentication, CRUD operations for posts and profiles, and interactive features such as following/unfollowing users and searching posts.

Key features:

- **User registration & login** with protected routes
- **Create, read, update & delete** (CRUD) for posts
- **View single post** pages with conditional edit/delete
- **User profiles**: view, update avatar/banner, list your posts
- **Follow/unfollow** other users and display follower counts
- **Search** posts by full text query
- **Responsive layout** using CSS grid and flexbox

## Built With

- HTML5 & CSS3
- Vanilla JavaScript (ES6 modules)
- [Vite](https://vitejs.dev/) for bundling and dev server
- Fetch API for HTTP requests to Noroff v2 REST endpoints

## Getting Started

### Prerequisites

- Node.js v14+ installed

### Installing

1. Clone the repo:

   ```bash
   git clone https://github.com/yourusername/fed2-js2-ca.git
   cd fed2-js2-ca
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Running in Development

Start the Vite development server:

```bash
npm run dev
```

Then open `http://localhost:5173` in your browser.

### Building for Production

Generate a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add SomeFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## Contact

Feel free to reach out on [GitHub](https://github.com/yourusername).


