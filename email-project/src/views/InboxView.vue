<template>
  <div class="flex h-screen flex-col lg:flex-row bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
    <SidebarOptions />
    <div class="flex-1 flex flex-col">
      <div class="pl-4 pr-5 pt-5">
        <h1 class="mt-5 mb-5 text-4xl font-bold text-green-600 dark:text-green-400">
          Caixa de entrada
        </h1>
        <SearchBar />
        <TopbarOptions />
      </div>
      <EmailList />
    </div>
  </div>
</template>

<script>
import SidebarOptions from '@/components/SidebarOptions.vue';
import TopbarOptions from '@/components/TopbarOptions.vue';
import SearchBar from '@/components/SearchBar.vue';
import EmailList from '@/components/EmailList.vue';

export default {
  components: {
    SidebarOptions,
    TopbarOptions,
    SearchBar,
    EmailList,
  },
};
</script>
