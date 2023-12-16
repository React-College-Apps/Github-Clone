import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '../assets/styles/App.css';

import { AppContextProvider } from '../context/App.context';

import Home from '../pages/Home/Home';
import Profile from '../pages/profile/profile';
import Repository from '../pages/repository/repository';
import FileContent from '../pages/fileContent/fileContent';
import FindRepo from '../pages/findRepo/findRepo';
import Repositories from '../pages/repositories/repositories';

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
    }, {
      path: "/findrepo",
      element: <FindRepo />,
    }, {
      path: "/repositories/search",
      element: <Repositories />,
    },
  ]);

  return (
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  );
}
