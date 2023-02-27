import {
   Route,
   Routes as RoutesDom,
   useParams,
} from 'react-router-dom';
import { SignUp } from './pages/SignUp';
import { SignIn } from './pages/SignIn';
import { Home } from './pages/Home';
import { CreatePost } from './pages/CreatePost';
import { Post } from './pages/Post';
import { Profile } from './pages/Profile';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

export function Routes() {
   const navigate = useNavigate();
   const token = Cookies;

   const params = useParams();

   useEffect(() => {
      console.log(token);
   }, [token]);

   function name() {}

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
