import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '../assets/styles/App.css';

import { UserProvider } from '../context/User.context';

import Home from '../pages/Home/Home';
import Profile from '../pages/profile/profile';
import Repository from '../pages/repository/repository';
import FileContent from '../pages/fileContent/fileContent';
import FolderContent from '../pages/folderContent/folderContent';

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
    {
      path: "/:username/:repo/content",
      element: <FileContent />,
    },
  ]);

  return (
    <UserProvider>
      <RouterProvider router={router} />

    </UserProvider>
  );
}
