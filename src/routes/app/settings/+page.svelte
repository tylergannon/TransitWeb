<script lang="ts">
  import type { PageData } from './$types';
	import TextInputFieldset from '$lib/components/auth/InputFieldset.svelte';
  import { required, url } from "svelte-use-form"

  import { database } from '$lib/db';
  import { debounce } from '$lib/components/helper';
  import { useForm } from 'svelte-use-form';
  import { getContext } from 'svelte';

  import type { UserType } from '$lib/srv/model/user';
	import { PASSWORD_HINTS, PASSWORD_VALIDATORS } from '$lib/authHelper';
	import type { Writable } from 'svelte/store';

  export let data: PageData
  const userProfile = getContext<Writable<Partial<UserType>>>("userProfile")

  const form = useForm({
    firstName: { initial: data.user?.firstName || "" },
    lastName: { initial: data.user?.lastName || "" },
    profileImg: { initial: data.user?.profileImg || "", validators: [url], errorMap: {"url": "Profile image doesn't look like a real url."} }
  }, "settings")

  const passwordForm = useForm({
    password: { initial: "", validators: PASSWORD_VALIDATORS, errorMap: PASSWORD_HINTS},
    oldPassword: { initial: "", validators: [required], errorMap: { "required": "Please provide your old password."}}
  }, "password")

  const profileImg = $form.profileImg.valid ? $form.profileImg.value : null

  let error: string | null = null;
  type args = { profileImg: string, firstName: string, lastName: string }

  const saveProfile = debounce(async (args: Partial<args>) => {
    console.log("Save profile")

    const res = await fetch("/app/settings?/saveProfile", {
      method: "POST",
      body: new URLSearchParams(args)
    })
    if (res.status == 200) {
      userProfile.update((value) => {
        return {
          ...value,
          ...args
        }
      })
    }
    console.log(await res.text())
  })

  async function handleDeleteDatabase() {
    if (confirm('Are you sure you want to delete the database?')) {
      await database.delete()
      console.log("Deleted database.")
      window.location.reload()
    }
  }
</script>

<div class="p-4">
  <h1 class="text-4xl font-semibold mb-4">Settings</h1>
  {#if $saveProfile}
  saving...
  {/if}
  <form class="space-y-4" use:form>
    <TextInputFieldset
      label="First Name"
      formName="form"
      name="firstName"
      onChange={(e) => { $form.firstName.valid && saveProfile({firstName: e.currentTarget.value})}}
    />

    <TextInputFieldset
      label="Last Name"
      formName="form"
      name="lastName"
      onChange={(e) => { $form.lastName.valid && saveProfile({lastName: e.currentTarget.value})}}
    />

    <TextInputFieldset
      label="Profile Image URL"
      formName="form"
      name="profileImg"
      onChange={(e) => { $form.profileImg.valid && saveProfile({profileImg: e.currentTarget.value})}}
    />
    {#if profileImg}
        <img
          src="{profileImg}"
          alt="Profile"
          class="w-16 h-16 rounded-full" />
    {/if}

  </form>

  <div class="mt-4">
    <button
      type="button"
      class="btn btn-accent"
      on:click="{handleDeleteDatabase}">Delete Database</button>
  </div>

  <div class="mt-4">
    <!-- Add the "change password" feature here -->
  </div>

</div>
