// Xx: while not required, it is considered good practice to put different components into different files
// import { useState, useEffect } from "react"; // Xx: used in the first implementation of fetching posts, before implementing routes

import { useLoaderData } from "react-router-dom"; // Xx: will be used to get the posts through our loader implemented in main.jsx and Posts.jsx

import Post from "./Post";
import classes from "./PostsList.module.css";

function PostsList() {
  const posts = useLoaderData();

  function addPostHandler(postData) {
    fetch("http://localhost:8080/posts", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    }); // Xx: js function to handle HTTP requests, can be used to fetch and also send http requests
    // Xx: this is what sends the request to the backend api

    // Xx: adds the new post as the first post and shows the previous posts
    // setPosts([postData, ...posts]);
    // Xx: general rule using states, if shouldng use existing posts as the above, we cant do just "...posts", we should actually pass a function to setPosts
    setPosts((existingPosts) => [postData, ...existingPosts]);
    // Xx: the function will automatically receive the current state snapsnot so the existing posts and we return a new state value, adding the new post data and the previous posts
    // Xx: its similar to the previous code, but it is the suggested approach if the function depends on the previous state snapshot
    // Xx: the reason is react does not execute state updating functions instantly, it schedules these state updates; in case you have multiple state updates, you could potentially update state with an old state.
  }

  return (
    <>
      {posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => (
            <Post
              key={crypto.randomUUID()}
              author={post.author}
              body={post.body}
            />
          ))}
        </ul>
      )}
      {posts.length === 0 && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>There are no posts yet.</h2>
          <p>Start adding some!</p>
        </div>
      )}
    </>
  );
}

// Xx: ul is unordered list
// Xx: about the wrapper: NewPost and ul were siblings, so must be wrapped. We used the <> this time.

// Xx: if you wrap components with other components react wont know where to put the wrapped content;
// Xx: you have to tell react react where the components go using props

// Xx: modalIsVisible && -> the way js works, the code after && will only run if modalIsVisible is true, so this is a quick implementation, instead of other implementations
// Xx: the previous implementation was inputting the jsx code in a variable, which by the way, can be done

// Xx: about the posts output: if simply input {posts}, the output would be an array of pure js objects, not of JSX elements. so we need to use map
// Xx: map method takes a function that is executed for each item in the array, receiving that item and then returning the value to each it should be mapped, so we transform the item received into a JSX Post

// Xx: about key: each child in a list should have a unique key, as required by react. usually we should make it so that the key is unique, but in this case, as a quick fix, we just use post.body as the key;
// Xx: if 2 posts are made with the same body, the posts will show up initially without issues, but react may have issues later on rendering them (like omitting one)
// Xx: key is a special prop, it does not need to be passed or anything like that
// Xx: I replaced Max' solution of key={post.body} to key={Math.random()} initially; later I googled a simple unique id generator and updated it

export default PostsList;
