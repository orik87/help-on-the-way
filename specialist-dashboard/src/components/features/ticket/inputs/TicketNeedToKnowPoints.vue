<template>
  <b-row>
       <b-col cols="9">        
           <b-form-input  v-model="newPointModel" @keyup.enter.native="addItem"/>
             <b-list-group class="my-2">
                 <b-list-group-item  v-for="(item, index) in value" :key="index" class="d-flex justify-content-between align-items-center">
                     {{item.text ? item.text : item}}
                      <b-btn  variant="secondary" @click="() => removeItem(index)">מחק הערה</b-btn>
                 </b-list-group-item>
             </b-list-group>
        </b-col>
        <b-col cols="3">
           <b-btn class="px-5" variant="primary" v-on:click="addItem">  +    הוסף   </b-btn>   
        </b-col>
  </b-row>
</template>
<script>
    export default {
        props: ['value'],
        data(){
            return {
                newPointModel: '',
            }
        },
        methods: {
            addItem(item){
                this.$emit('input', [...this.value, { text: this.newPointModel, step: 'none' }])
                this.newPointModel = ''
            },
            removeItem(indexToRemove){
                this.$emit('input', this.value.filter((val, i) => i !==indexToRemove))
            }
        }
    }
</script>