import React from 'react';

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul className='list-group mb-9 '>
      {posts.map(post => (
        <li key={post.id} className='list-group-item'>
          <div className="text-primary fontsize18">
            {post.title}
          </div>
          <br></br>
          <div className="main">
            {post.des}
          </div>

          {/* {post.body} */}
        </li>
      ))}
    </ul>
  );
};

export default Posts;
