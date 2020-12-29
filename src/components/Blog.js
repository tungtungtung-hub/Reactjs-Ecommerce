import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Posts from '../components/Post';
import Pagination from '../components/Pagination';
import axios from 'axios';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function Blog(props){  


   
//
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://raw.githubusercontent.com/tungtungtung-hub/demo/d335dec749d55f9fbda6c9f9fa642b3cb32542f2/title');
      setPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);


  return (
    <BrowserRouter>

    <div className="container">
    <h1 className='text-primary mb-3 center'>Tin tức</h1>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
        
      />
    </div>
      
    
           
      

    </BrowserRouter>
    
// <!-- Load Facebook SDK for JavaScript -->
  );
  
}

export default Blog;
