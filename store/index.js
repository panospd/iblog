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
          console.log(context.app.$axios.get);
          const res = await context.app.$axios.get("posts.json");

          const postsArray = [];

          for (const key in res.data) {
            postsArray.push({ ...res.data[key], id: key });
          }

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

          const res = await this.$axios.post("posts.json", newPost);

          return commit("addPost", { ...newPost, id: res.data.name });
        } catch (error) {
          console.log(error);
        }
      },
      async editPost({ commit }, editedPost) {
        try {
          const url = `posts/${editedPost.id}.json`;

          await this.$axios.put(url, editedPost);

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
