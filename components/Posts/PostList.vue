<template>
  <section class="posts">
    <PostPreview
      id="1"
      :is-admin="isAdmin"
      thumbnail="https://s27389.pcdn.co/wp-content/uploads/2019/10/retail-innovation-changing-tech-consumer-employee-demands-1024x440.jpeg"
      title="Post 1"
      previewText="This is my first post"
    />
    <PostPreview
      id="2"
      :is-admin="isAdmin"
      thumbnail="https://s27389.pcdn.co/wp-content/uploads/2019/10/retail-innovation-changing-tech-consumer-employee-demands-1024x440.jpeg"
      title="Post 2"
      previewText="This is my second post"
    />
    <PostPreview
      id="3"
      :is-admin="isAdmin"
      thumbnail="https://s27389.pcdn.co/wp-content/uploads/2019/10/retail-innovation-changing-tech-consumer-employee-demands-1024x440.jpeg"
      title="Post 3"
      previewText="This is my third post"
    />
  </section>
</template>

<script>
import PostPreview from "@/components/Posts/PostPreview";

export default {
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  components: {
    PostPreview
  }
};
</script>

<style scoped>
.posts {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>