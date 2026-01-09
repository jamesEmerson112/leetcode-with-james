import React from "react";
import Input from "./Input";
import PostDisplay from "./PostDisplay";

function Home() {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [posts, setPosts] = React.useState([]);


    const handleCreatePost = () => {
        e.preventDefault();
        const newPost = { title, description };

        title = title.trim();
        description = description.trim();

        if (title === "" || description === "") {
            console.log("Error: Title and Description cannot be empty.");
            return;
        }
        
        setPosts([...posts, newPost]);
        setTitle("");
        setDescription("");
    }

    return (
        <div className="text-center ma-20">
        <div className="mb-20">
            <Input 
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
            />
            <button data-testid="create-button" className="mt-10" 
            onClick = {handleCreatePost}>
            Create Post
            </button>
        </div>
        <div className="posts-section">
            <PostDisplay posts={posts} />
        </div>
        </div>
    );
}

export default Home;
