import React from "react";
// <PostDisplay posts={posts} />
function PostDisplay({ posts }) {

    const handleDelete = (e) => {
        e.preventdefault();
        
        console.log("Delete button clicked");
    }


  return (
    <div data-testid="posts-container" className="flex wrap gap-10">
      {posts.map((post, index) => (
        <div key={index} className="post-box">
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          <button onclick={handleDelete}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default PostDisplay;
