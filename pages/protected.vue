<template>
  <div v-if="isLoaded && isLoggedIn">
    <h1>File Upload</h1>
    <form>
      <label for="file">File: </label>
      <input type="file" name="file" @change="onChange" />
    </form>
  </div>
</template>

<script setup lang="ts">
const { isAuthenticated } = useIam();
const isLoggedIn = ref(false);
const isLoaded = ref(false);

onMounted(async () => {
  isLoggedIn.value = await isAuthenticated();
  if (!isLoggedIn.value) navigateTo("iam/login");
  isLoaded.value = true;
});
const onChange = async (e) => {
  const files = e.target.files;
  const formData = new FormData();
  formData.append('file', files[0]);
  await useFetch('/api/upload', {
    method: 'post',
    body: formData,
  });
};

useHead({
  title: "Sample protected page",
});
</script>
