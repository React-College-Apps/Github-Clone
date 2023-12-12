import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import '../assets/styles/App.css';
import Home from '../pages/Home/Home';
import Profile from '../pages/profile/profile';

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/profile/:username",
      element: <Profile />,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}
