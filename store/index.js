import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null
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
      },
      setToken(state, token) {
        state.token = token;
      },
      clearToken(state) {
        state.token = null;
      }
    },
    actions: {
      async nuxtServerInit({ commit }, context) {
        try {
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

          const res = await this.$axios.post(
            "posts.json?auth=${state.token}",
            newPost
          );

          return commit("addPost", { ...newPost, id: res.data.name });
        } catch (error) {
          console.log(error);
        }
      },
      async editPost({ commit, state }, editedPost) {
        try {
          const url = `posts/${editedPost.id}.json?auth=${state.token}`;

          await this.$axios.put(url, editedPost);

          return commit("editPost", editedPost);
        } catch (error) {
          console.log(error);
        }
      },
      async authenticateUser({ commit, dispatch }, authData) {
        try {
          const url = authData.isLogin
            ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.fbAPIKey}`
            : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.fbAPIKey}`;

          const { data } = await this.$axios.post(url, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          });

          commit("setToken", data.idToken);
          localStorage.setItem("token", data.idToken);
          localStorage.setItem(
            "tokenExpiration",
            new Date().getTime() + data.expiresIn * 1000
          );

          dispatch("setLogoutTimer", data.expiresIn * 1000);
        } catch (error) {
          console.log(error);
        }
      },
      setLogoutTimer({ commit }, duration) {
        setTimeout(() => {
          commit("clearToken");
        }, duration);
      },
      initAuth({ commit, dispatch }) {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("tokenExpiration");

        console.log("Here I am", token);

        console.log(new Date() > expirationDate);

        if (new Date().getTime() > +expirationDate || !token) return;

        dispatch("setLogoutTimer", expirationDate - new Date().getTime);
        console.log("Here I am", token);

        commit("setToken", token);
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      },
      isAuthenticated(state) {
        return !!state.token;
      }
    }
  });
};

export default createStore;
