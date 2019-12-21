<template>
    <div>
        <b-card bg-variant="light">
            <b-form class="create-product-card" @submit.stop.prevent="createNewProduct">
                <b-form-group
                    label-cols-sm="3"
                    label="名稱 :"
                    label-align-sm="right"
                    label-for="name"
                >
                    <b-form-input 
                        id="name"
                        v-model="form.name"
                        :state="form.name.length > 0"
                        type="text"
                        name="name"
                        placeholder="輸入產品名稱"
                        required
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    label-cols-sm="3"
                    label="描述 :"
                    label-align-sm="right"
                    label-for="description"
                >
                    <b-form-textarea
                        id="description"
                        v-model="form.description"
                        :state="form.description.length > 0"
                        type="text"
                        rows="3"
                        max-rows="6"
                        name="description"
                        placeholder="輸入產品描述"
                        required
                    ></b-form-textarea>
                </b-form-group>
                
                <b-form-group
                    label-cols-sm="3"
                    label="成本 :"
                    label-align-sm="right"
                    label-for="cost"
                >
                    <b-form-input 
                        id="cost"
                        v-model="form.cost"
                        :state="form.cost > 0"
                        type="number"
                        name="cost"
                        required
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    label-cols-sm="3"
                    label="售價 :"
                    label-align-sm="right"
                    label-for="price"
                >
                    <b-form-input 
                        id="price"
                        v-model="form.price"
                        :state="form.price > 0"
                        type="number"
                        name="price"
                        required
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    label-cols-sm="3"
                    label="高度 :"
                    label-align-sm="right"
                    label-for="height"
                >
                    <b-form-input 
                        id="height"
                        v-model="form.height"
                        :state="form.height > 0"
                        type="number"
                        name="height"
                        required
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    label-cols-sm="3"
                    label="寬度 :"
                    label-align-sm="right"
                    label-for="width"
                >
                    <b-form-input 
                        id="width"
                        v-model="form.width"
                        :state="form.width > 0"
                        type="number"
                        name="width"
                        required
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    label-cols-sm="3"
                    label="長度 :"
                    label-align-sm="right"
                    label-for="length"
                >
                    <b-form-input 
                        id="length"
                        v-model="form.length"
                        :state="form.length > 0"
                        type="number"
                        name="length"
                        required
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    label-cols-sm="3"
                    label="產品重量 :"
                    label-align-sm="right"
                    label-for="weight"
                >
                    <b-form-input 
                        id="weight"
                        v-model="form.weight"
                        :state="form.weight > 0"
                        type="number"
                        name="weight"
                        required
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    label-cols-sm="3"
                    label="產品原料 :"
                    label-align-sm="right"
                    label-for="material"
                >
                    <b-form-input 
                        id="material"
                        v-model="form.material"
                        :state="form.material.length > 0"
                        type="text"
                        name="material"
                        placeholder="輸入產品原料"
                        required
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    label-cols-sm="3"
                    label="分類 :"
                    label-align-sm="right"
                    label-for="CategoryId"
                >
                    <b-form-select
                        id="CategoryId"
                        v-model="form.CategoryId"
                        placeholder="Select Category"
                        name="CategoryId"
                        required
                    >
                        <option value="1" name="沙發">沙發</option>
                        <option value="2" name="床具">床具</option>
                        <option value="3" name="桌子">桌子</option>
                        <option value="4" name="長桌">長桌</option>
                        <option value="5" name="櫃子">櫃子</option>
                    </b-form-select>
                </b-form-group>
                <b-form-group
                    label-cols-sm="3"
                    label="庫存 :"
                    label-align-sm="right"
                    label-for="quantity"
                >
                    <b-form-input 
                        id="quantity"
                        v-model="form.quantity"
                        :state="form.quantity > 0"
                        type="number"
                        name="quantity"
                        required
                    ></b-form-input>
                </b-form-group>
                <b-form-group
                    label-cols-sm="3"
                    label="顏色 :"
                    label-align-sm="right"
                    label-for="colorName"
                >
                    <b-form-select
                        id="colorName"
                        v-model="form.colorName"
                        placeholder="輸入產品顏色"
                        name="colorName"
                        required
                    >
                        <option value="black">黑色</option>
                        <option value="blue">藍色</option>
                        <option value="white">白色</option>
                        <option value="yellow">黃色</option>
                    </b-form-select>
                </b-form-group>
                <b-form-group
                    label-cols-sm="3"
                    label="上傳照片 :"
                    label-align-sm="right"
                    label-for="url"
                >
                    <b-img-lazy
                        v-if="form.url"
                        :src="form.url"
                        class="d-block img-thumbnail mb-3"
                        width="200"
                        height="200"
                    ></b-img-lazy>
                    <input
                        id="url"
                        type="file"
                        name="url"
                        accept="image/*"
                        class="form-control-file"
                        @change="handleFileChange"
                    >
                </b-form-group>
                <b-button type="submit" variant="primary">Submit</b-button>
            </b-form>
        </b-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                name: '',
                description: '',
                cost: 0,
                price: 0,
                height: 0,
                width: 0,
                length: 0,
                weight: 0,
                material: '',
                CategoryId: '',
                quantity: 0,
                colorName: '',
                url: ''
            }
        }
    },
    methods: {
        handleFileChange (e) {
            const files = e.target.files;
            if (!files.length) return;
            const imageURL = window.URL.createObjectURL(files[0]);
            this.form.url = imageURL;
        },
        createNewProduct(e) {
            const form = e.target;
            const formData = new FormData(form);
            // 要加入邏輯，等Mina的Toast設定
            this.$emit('after-create-product', formData);
        }
    }
}
</script>

<style scoped>
.create-product-card {
    height: 80%;
    width: auto;
    overflow-y: scroll;
}
</style>