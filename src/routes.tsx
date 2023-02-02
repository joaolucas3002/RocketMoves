import { Route, Routes as RoutesDom } from 'react-router-dom';
import { Record } from './pages/Record';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { CreatePost } from './pages/CreatePost';
import {Post} from './pages/Post';
import {Profile} from './pages/Profile';

export function Routes() {
   return (
      <RoutesDom>
         <Route path="/login" element={<Login />} />
         <Route path="/record" element={<Record />} />
         <Route path="/home" element={<Home />} />
         <Route path="/createPost" element={<CreatePost />} />
         <Route path="/post" element={<Post />} />
         <Route path="/profile" element={<Profile />} />
      </RoutesDom>
   );
}
