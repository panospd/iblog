import axios from "axios";
import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: []
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
      addPost(state, post) {
        state.loadedPosts.push(post);
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(
          post => post.id === editedPost.id
        );

        state.loadedPosts[postIndex] = editedPost;
      }
    },
    actions: {
      async nuxtServerInit({ commit }, context) {
        try {
          const res = await axios.get(
            "https://nuxt-blog-97910.firebaseio.com/posts.json"
          );

          console.log("Post array", res.data);

          const postsArray = [];

          for (const key in res.data) {
            postsArray.push({ ...res.data[key], id: key });
          }

          console.log("Post array", postsArray);

          commit("setPosts", postsArray);
        } catch (error) {
          e => context.error(e);
        }
      },
      savePosts({ commit }, posts) {
        commit("setPosts", posts);
      },
      async addPost({ commit }, post) {
        try {
          const newPost = {
            ...post,
            updatedDate: new Date()
          };

          const res = await axios.post(
            "https://nuxt-blog-97910.firebaseio.com/posts.json",
            newPost
          );

          return commit("addPost", { ...newPost, id: res.data.name });
        } catch (error) {
          console.log(error);
        }
      },
      async editPost({ commit }, editedPost) {
        try {
          const url = `https://nuxt-blog-97910.firebaseio.com/posts/${editedPost.id}.json`;

          await axios.put(url, editedPost);

          return commit("editPost", editedPost);
        } catch (error) {
          console.log(error);
        }
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      }
    }
  });
};

export default createStore;
