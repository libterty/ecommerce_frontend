<template>
    <div>
        <b-nav pills>
            <b-nav-item>新增產品</b-nav-item>
            <b-nav-item>
                <b-button v-b-modal.editProdut>修改產品資訊</b-button>
            </b-nav-item>
            <b-nav-item>刪除產品</b-nav-item>
        </b-nav>

        <b-modal 
            id="editProdut" 
            title="修改產品資訊"
            @ok.prevent="onSubmit()"
        >
            <b-form>
                <b-form-group
                    label-cols-sm="3"
                    label="Name :"
                    label-align-sm="right"
                    label-for="name"
                >
                    <b-form-input 
                        id="name"
                        v-model="form.name"
                        :state="form.name.length > 0"
                        type="text"
                        name="name"
                        :placeholder="initProduct.name"
                        required
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    label-cols-sm="3"
                    label="Description :"
                    label-align-sm="right"
                    label-for="description"
                >
                    <b-form-textarea
                        id="description"
                        v-model="form.description"
                        :state="form.description.length > 0"
                        :placeholder="initProduct.description"
                        type="text"
                        rows="3"
                        max-rows="6"
                        name="description"
                        required
                    ></b-form-textarea>
                </b-form-group>
                
                <b-form-group
                    label-cols-sm="3"
                    label="成本 :"
                    label-align-sm="right"
                    label-for="cost"
                    :description="'成本 : ' + initProduct.cost"
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
                    :description="'售價 : ' + initProduct.price"
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
                    :description="'高度 : ' + initProduct.height"
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
                    :description="'寬度 : ' + initProduct.width"
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
                    :description="'長度 : ' + initProduct.length"
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
                    label="重量 :"
                    label-align-sm="right"
                    label-for="weight"
                    :description="'重量 : ' + initProduct.weight"
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
                    label="Material :"
                    label-align-sm="right"
                    label-for="material"
                >
                    <b-form-input 
                        id="material"
                        v-model="form.material"
                        :state="form.material.length > 0"
                        type="text"
                        name="material"
                        :placeholder="initProduct.material"
                        required
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    label-cols-sm="3"
                    label="分類 :"
                    label-align-sm="right"
                    label-for="categoryId"
                    :description="'目前分類 : ' + initProduct.Category.name"
                >
                    <b-form-select
                        id="categoryId"
                        v-model="form.categoryId"
                        placeholder="Select Category"
                        name="categoryId"
                        required
                    >
                        <option value="1" name="沙發">沙發</option>
                        <option value="2" name="床具">床具</option>
                        <option value="3" name="桌子">桌子</option>
                        <option value="4" name="長桌">長桌</option>
                        <option value="5" name="櫃子">櫃子</option>
                    </b-form-select>
                </b-form-group>
            </b-form>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: 'admin-product-BtnGroup',
    props: {
        initProduct: {
            type: Object
        }
    },
    methods: {
        onSubmit() {
            if (
                this.form.cost > 0 
                && this.form.price > 0 
                && this.form.height > 0 
                && this.form.width > 0 
                && this.form.length > 0 
                && this.form.weight > 0
            ) {
                const data = JSON.stringify(this.form);
                this.$emit('after-product-revise', data);
            } else {
                alert('Do you forget to input something ?');
            }
        }
    },
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
                categoryId: ''
            }
        }
    },
    watch: {
        initProduct: function (updateData) {
            this.initProduct = updateData;
        }
    }
}
</script>