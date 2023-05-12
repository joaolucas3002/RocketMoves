import {
   Route,
   createBrowserRouter,
   createRoutesFromElements,
} from 'react-router-dom';

// page
import { Home, loaderHome } from './pages/Home';
import { CreatePost } from './pages/CreatePost';
import { Post, getPost } from './pages/Post';
import { Profile } from './pages/Profile';

// layout
import { Layout } from './components/Layout';
import { Loading } from './components/Loading';

// router

import { SignInRoute } from './components/router/SignInRoute';
import { SignUpRoute } from './components/router/SignUpRoute';

import { PrivateRoute } from './components/router/PrivateRoute';
import { RootRouter, rootRouter } from './context/RootRouter';

import { SubmitFormSignIn } from './pages/SignIn';
import { SubmitFormSignUp } from './pages/SignUp';

export const route = createBrowserRouter(
   createRoutesFromElements(
      <Route loader={rootRouter} element={<RootRouter />}>
         <Route
            path="/login"
            element={<SignInRoute />}
            action={SubmitFormSignIn}
         />
         <Route
            path="/signup"
            element={<SignUpRoute />}
            action={SubmitFormSignUp}
         />
         <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Layout />} >
               <Route
                  index
                  element={<Home />}
                  loader={loaderHome}
                  errorElement={<Loading />}
               />
               <Route path="post/new" element={<CreatePost />} />
               <Route
                  path="post/:id"
                  element={<Post />}
                  loader={getPost}
                  errorElement={<Loading />}
               />
            </Route>
            <Route path="profile" element={<Profile />} />
         </Route>
      </Route>,
   ),
);
