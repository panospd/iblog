<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from "@/components/Admin/AdminPostForm";

export default {
  layout: "admin",
  components: {
    AdminPostForm
  },
  async asyncData(context) {
    try {
      const url = `posts/${context.params.postId}.json`;
      const res = await context.app.$axios.get(url);

      return {
        loadedPost: { ...res.data, id: context.params.postId }
      };
    } catch (error) {
      context.error(error);
    }
  },
  methods: {
    async onSubmitted(editedPost) {
      await this.$store.dispatch("editPost", editedPost);
      this.$router.push("/admin");
    }
  }
};
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
