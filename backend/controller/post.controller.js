import { Post } from "../models/post.model.js";

// Create a new post
const createPost = async (req, res) => {
    try {
        const { name, description, age } = req.body;

        if (!name || !description || !age) {
            return res.status(400).json({ 
                message: "Name, description, and age are required" });
        }

        const post = new Post({ name, description, age });
        await post.save();

        res.status(201).json({ 
            message: "Post created successfully", post });
    } catch (error) {
        res.status(500).json({ 
            message: "Error creating post", error });
    }
};

//Read all posts
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);

    } catch (error) {
        res.status(500).json({ 
            message: "Error fetching posts", error });
    }
};

//update post
const updatePost = async (req, res) => {
    try {
        //basic validation to check if body is empty

        // {name: x, description: y, age: z} -> [name, description, age]
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ 
                message: "No data provided for update" });
        }

        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!post) {
            return res.status(404).json({ 
                message: "Post not found" });
        }

        res.status(200).json({ 
            message: "Post updated successfully", post });
        

    } catch (error) {
        res.status(500).json({ 
            message: "Error updating post", error });
    }
};

//delete post
const deletePost = async (req, res) => {
    try {
        const deleted = await Post.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ 
                message: "Post not found" });
        }
        res.status(200).json({ 
            message: "Post deleted successfully" });
            
    } catch (error) {
        res.status(500).json({ 
            message: "Error deleting post", error });
    }
};
export { 
    createPost,
    getPosts,
    updatePost,
    deletePost
};