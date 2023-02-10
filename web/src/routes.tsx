import { Route, Routes as RoutesDom } from 'react-router-dom';
import { SignUp } from './pages/SignUp';
import { SignIn } from './pages/SignIn';
import { Home } from './pages/Home';
import { CreatePost } from './pages/CreatePost';
import { Post } from './pages/Post';
import { Profile } from './pages/Profile';

export function Routes() {
   return (
      <RoutesDom>
         <Route path="/" element={<SignIn />} />
         <Route path="/signup" element={<SignUp />} />
         <Route path="/home" element={<Home />} />
         <Route path="/createPost" element={<CreatePost />} />
         <Route path="/post/:id" element={<Post />} />
         <Route path="/profile" element={<Profile />} />
      </RoutesDom>
   );
}
