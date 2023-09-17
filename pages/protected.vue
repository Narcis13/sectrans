<template>
  <div v-if="isLoaded && isLoggedIn">
    <h2>Transfer fisier</h2>
    <form>
      <label for="file">Fisier: </label>
      <input type="file" name="file" @change="onChange" />
    </form>
    <NxForm v-show="isUploaded" :data="inputData" submit-text="Transmite" @submit="transmite" />
  </div>
</template>

<script setup lang="ts">
import {TransferFinalizat,  NxFormInput } from "~~/iam/misc/types";
const { isAuthenticated } = useIam();
const isLoggedIn = ref(false);
const isLoaded = ref(false);
const numefisier = ref('')
const isUploaded = ref(false)
const {executaTransfer} = useTransfer();
const inputData = [
{
    label: "Nume pacient",
    id: "numepacient",
    type: "input:text",
  },
  {
    label: "Adresa Email",
    id: "adresaemail",
    type: "input:email",
  },
  {
    label: "Mesaj",
    id: "mesaj",
    type: "textarea",
  },
] as Array<NxFormInput>;


  async function transmite(transfer:TransferFinalizat){
    transfer.numefiser=numefisier.value;
    transfer.stare="incarcat"
    console.log(transfer)
    const { status, error } = await executaTransfer(transfer)
     return;
  }

onMounted(async () => {
  isLoggedIn.value = await isAuthenticated();
  if (!isLoggedIn.value) navigateTo("iam/login");
  isLoaded.value = true;
});

const onChange = async (e:any) => {
  const files = e.target.files;
  const formData = new FormData();
  console.log('fisier',files[0])
  formData.append('file', files[0]);
  await useFetch('/api/upload', {
    method: 'post',
    body: formData,
  });
  isUploaded.value=true
  numefisier.value=files[0].name
};

useHead({
  title: "Transfer fisiere",
});
</script>
