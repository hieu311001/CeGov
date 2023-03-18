<template>
    <div :class="Class">
        <input 
            :id="id" 
            :type="type" 
            :value="value" 
            :placeholder="placeholder" 
            :class="inputClass" 
            :ref="inputRef" 
            v-model="modelInput"
            :tabindex="tabindex">
        <slot></slot>
    </div>
</template>
    
<script>

export default {
    name: 'BaseInput',
    props: {
        id: {
            type: String,
            default: ""
        },
        type: {
            type: String,
            default: ""
        },
        value: {
            type: [String, Number],
            default: ""
        },
        placeholder: {
            type: String,
            default: ""
        },
        inputClass: {
            type: String,
            default: ""
        },
        Class: {
            type: String,
            default: ""
        },
        inputRef: {
            type: String,
            default: ""
        },
        tabindex: {
            type: Number,
            default: 0
        }
    }
}


</script>

<style scoped>
input::-webkit-calendar-picker-indicator {
    z-index: 10;
    font-size: 30px;
    opacity: 0;
}

input[type="date"] {
    text-transform: uppercase;
}

</style>