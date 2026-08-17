# Sociography Frontend

React client for Sociography, a social media platform for photographers. It lets photographers showcase their work, interact with other photographers, and connect with partners and sponsors.

This app talks to [sociography-backend](https://github.com/vinodhariharan/sociography-backend) over its REST API; the two run as separate services.

## Features

### Authentication
- Three modes: Photographer, Partner, and Not Signed-In.
- `AuthContext` manages auth state (email, mode, token, photographerId) and exposes a `useAuth` hook.
- JWT is stored in `localStorage`; an Axios interceptor (`axiosInstance.js`) attaches it as a `Bearer` token on every request.

### Photographer Profiles
- Profile page shows name, description, follower/following counts, and the photographer's uploaded pictures.

### Partner Profiles
- Shows name, contact number, email, profile picture, tagline, description, address, and website.
- "Edit Profile" and "Contact Request" actions, with photographer-only buttons hidden in partner mode.

### Navbar
- Profile avatar with a dropdown menu.
- Category dropdown for filtering by photography type (Nature, Landscape, Portrait, etc.).
- Light/dark theme toggle.
- Partner list link hidden in partner mode.

### Landing Page
- Suggested profile list alongside the main feed.

### Component Design
- Material UI (`@mui/material`) for the core design, with `@mui/joy`'s `Sheet` component used for some content wrappers.
- Typography uses "League Spartan" throughout.

## Tech Stack
- React 18, React Router
- Axios
- Material UI (`@mui/material`) + Joy UI (`@mui/joy`)

## Getting Started

### Prerequisites
- Node.js and npm
- A running instance of [sociography-backend](https://github.com/vinodhariharan/sociography-backend)

### Setup
1. Clone the repository:
   ```
   git clone https://github.com/vinodhariharan/sociography-frontend.git
   cd sociography-frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Point the app at your backend: `src/axiosInstance.js` sets the API `baseURL`. Update it if you're running the backend somewhere other than the URL currently configured there (e.g. `http://localhost:8080` for local dev).
4. Start the app:
   ```
   npm start
   ```

### Usage
- **Authentication:** Sign up or log in to access the platform's features.
- **Profile Management:** Edit your profile, upload pictures, and manage your social connections.
- **Explore:** Use the Navbar's search and category dropdown to browse photography categories.
- **Likes:** Like and unlike photos to engage with the community.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss your ideas.

## License

This project is licensed under the MIT License.
