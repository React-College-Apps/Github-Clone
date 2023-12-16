import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '../assets/styles/App.css';

import { UserProvider } from '../context/User.context';

import Home from '../pages/Home/Home';
import Profile from '../pages/profile/profile';
import Repository from '../pages/repository/repository';

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
    {
      path: "/:username/:repo",
      element: <Repository />,
    },
  ]);

  return (
    <UserProvider>
      <RouterProvider router={router} />

    </UserProvider>
  );
}
