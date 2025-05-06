<template>
    <button
        class="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 transition duration-200 hover:bg-gray-100 w-full text-left">
        <!-- Group Checkbox and Sender -->
        <div class="col-span-4 flex items-center space-x-2">
            <input type="checkbox" class="h-6 w-6 text-blue-600" @click.stop />
            <span>{{ sender }}</span>
        </div>
        <div class="col-span-5">{{ subject }}</div>
        <div class="col-span-3 text-right pr-4">{{ date }}</div>
    </button>
</template>

<script>
export default {
    name: "EmailItem",
    props: {
        sender: String,
        subject: String,
        date: String,
    },
};
</script>