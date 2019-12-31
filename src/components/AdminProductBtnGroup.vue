<template>
    <div>
        <b-nav tabs align="center">
            <b-nav-item>
                <b-button v-b-modal.editProdut>修改產品資訊</b-button>
            </b-nav-item>
            <b-nav-item>
                <b-button v-b-modal.addProductColor>新增產品顏色</b-button>
            </b-nav-item>
            <b-nav-item>
                <b-button v-b-modal.reviseProductColor>修改產品顏色</b-button>
            </b-nav-item>
            <b-nav-item>
                <b-button v-b-modal.editInventory>修改產品庫存</b-button>
            </b-nav-item>
            <b-nav-item>
                <b-button v-b-modal.editImage>新增產品圖片</b-button>
            </b-nav-item>
        </b-nav>

        <b-modal 
            id="editProdut" 
            title="修改產品資訊"
            @ok.prevent="editProductSubmit()"
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
                        min="1"
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
                        min="1"
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
                        min="1"
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
                        min="1"
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
                        min="1"
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
                        min="1"
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
                        v-model="form.CategoryId"
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

        <b-modal 
            id="addProductColor" 
            title="新增產品顏色"
            @ok.prevent="createProductColors()"
        >
            <b-form>
                <b-form-group
                    label-cols-sm="3"
                    label="新增產品顏色 :"
                    label-align-sm="right"
                    label-for="newColor-name"
                    :description="'目前分類 : ' + initProduct.Category.name"
                >
                    <b-form-select
                        id="newColor-name"
                        v-model="newColor.name"
                        placeholder="Select Category"
                        name="newColor-name"
                        required
                    >
                        <option value="black" :disabled="'black' | isColorDisabled(initColors)">黑色</option>
                        <option value="blue" :disabled="'blue' | isColorDisabled(initColors)">藍色</option>
                        <option value="white" :disabled="'white' | isColorDisabled(initColors)">白色</option>
                        <option value="yellow" :disabled="'yellow' | isColorDisabled(initColors)">黃色</option>
                    </b-form-select>
                </b-form-group>
                <b-form-group
                    label-cols-sm="3"
                    label="庫存 :"
                    label-align-sm="right"
                    label-for="newColor-quantity"
                    description="數入庫存數量"
                >
                    <b-form-input 
                        id="newColor-quantity"
                        v-model="newColor.quantity"
                        :state="newColor.quantity > 0"
                        type="number"
                        min="1"
                        name="newColor-quantity"
                        required
                    ></b-form-input>
                </b-form-group>
            </b-form>
        </b-modal>

        <b-modal 
            id="reviseProductColor" 
            title="修改產品顏色"
            @ok.prevent="reviseProductColors()"
        >
            <b-form>
                <b-form-group
                    label-cols-sm="3"
                    label="修改產品顏色 :"
                    label-align-sm="right"
                    label-for="newColor-name"
                    :description="'目前分類 : ' + initProduct.Category.name"
                >
                    <b-form-select
                        id="reviseColor-ColorId"
                        v-model="reviseColor.ColorId"
                        @change="updateRevisColor"
                        placeholder="Select Category"
                        name="reviseColor-ColorId"
                        required
                    >
                        <option
                            v-for="inventory in initProduct.inventories"
                            :key="inventory.id"
                            :value="inventory.id"
                        >{{inventory.name | convertLanguage}}</option>
                    </b-form-select>
                    <b-form-select
                        id="reviseColor-name"
                        v-model="reviseColor.name"
                        placeholder="Select Category"
                        name="reviseColor-name"
                        required
                    >
                        <option value="black" :disabled="isColorEditable('black', tempReviseColor)">黑色</option>
                        <option value="blue" :disabled="isColorEditable('blue', tempReviseColor)">藍色</option>
                        <option value="white" :disabled="isColorEditable('white', tempReviseColor)">白色</option>
                        <option value="yellow" :disabled="isColorEditable('yellow', tempReviseColor)">黃色</option>
                    </b-form-select>
                </b-form-group>
            </b-form>
        </b-modal>

        <b-modal 
            id="editInventory" 
            title="修改產品庫存"
            hide-footer
        >
            <b-list-group-item 
                class="text-left"
                v-for="item in initProduct.inventories"
                :key="item.id"
            >
                <strong>{{item.name | convertLanguage}} : </strong>
                <small
                    :class="checkQuantity(item.Inventory.quantity)"
                >{{item.Inventory.quantity}}</small>
                <b-button 
                    size="sm" 
                    variant="info"
                    style="float:right"
                    @click.stop.prevent="isEdit(item.id, item.Inventory.quantity, item.name)"
                >Edit</b-button>
            </b-list-group-item>
            <b-form v-if="editQuantity" @submit.prevent="editProductInventory()" @reset="onClose">
                <b-form-group
                    label-cols-sm="3"
                    label="庫存 :"
                    label-align-sm="right"
                    label-for="editColor-quantity"
                >
                    選擇修改{{editColorQuantityName | convertLanguage}}庫存數量
                    <b-form-input 
                        id="editColor-quantity"
                        v-model="editColorQuantity"
                        :state="editColorQuantity > 0"
                        type="number"
                        min="1"
                        name="editColor-quantity"
                        required
                    ></b-form-input>
                </b-form-group>
                <b-button-group>
                    <b-button type="submit" variant="primary">Submit</b-button>
                    <b-button type="reset" variant="warning" style="margin-left: 0.25rem">Close</b-button>
                </b-button-group>
            </b-form>
        </b-modal>

        <b-modal 
            id="editImage" 
            title="新增產品圖片"
            hide-footer
        >
            <b-form @submit.stop.prevent="createNewProdcutImage">
                <b-form-group>
                    <label for="url">上傳照片</label>
                    <b-img-lazy
                        v-if="imageForm.url"
                        :src="imageForm.url"
                        class="d-block img-thumbnail mb-3"
                        width="200"
                        height="200"
                    ></b-img-lazy>
                    <input
                        id="image"
                        type="file"
                        name="url"
                        accept="image/*"
                        class="form-control-file"
                        @change="handleFileChange"
                    >
                    <b-button type="submit" size="sm" variant="success">Submit</b-button>
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
        },
        initColors: {
            type: Array
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
                CategoryId: ''
            },
            newColor: {
                name: '',
                ProductId: this.initProduct.id,
                quantity: 0,
            },
            tempReviseColor: '',
            reviseColor: {
                name: '',
                ColorId: 0
            },
            editQuantity: false,
            editColorQuantityId: 0,
            editColorQuantity: 0,
            editColorQuantityName: '',
            imageForm: {
                url: '',
            }
        }
    },
    filters: {
        isColorDisabled(str, initColors) {
            if (initColors.indexOf(str) === -1) {
                return false;
            }
            return true;
        },
        isColorEditable(str, initColors) {
            if (initColors.indexOf(str) === -1) {
                return true;
            }
            return false;
        },
        convertLanguage(string) {
            if (string === 'blue') {
                return '藍色';
            } else if (string === 'black') {
                return '黑色';
            } else if (string === 'white') {
                return '白色';
            } else if (string === 'yellow') {
                return '黃色';
            } else {
                return '';
            }
        }
    },
    methods: {
        checkQuantity(number) {
            if (number <= 5) return 'product-Quantity-danger';
            return 'product-Quantity-success'
        },

        editProductSubmit() {
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
        },

        createProductColors() {
            if (this.newColor.name.length > 0 && this.newColor.quantity > 0) {
                const data = JSON.stringify(this.newColor);
                this.$emit('after-color-create', data);
            }
        },

        reviseProductColors() {
            if (this.reviseColor.name.length > 0) {
                const data = JSON.stringify(this.reviseColor);
                this.$emit('after-color-revise', data);
            }
        },

        editProductInventory() {
            if (this.editColorQuantity > 0) {
                const urlId = this.editColorQuantityId;
                const data = JSON.stringify({ quantity: Number(this.editColorQuantity) });
                this.$emit('after-inventory-change', urlId, data);
            }
        },

        isEdit(id, quantity, name) {
            this.editQuantity = true;
            this.editColorQuantityId = id;
            this.editColorQuantity = quantity;
            this.editColorQuantityName = name;
        },

        onClose() {
            this.editQuantity = false;
            this.editColorQuantityId = 0;
            this.editColorQuantity = 0;
            this.editColorQuantityName = '';
        },

        handleFileChange (e) {
            const files = e.target.files;
            if (!files.length) return;
            const imageURL = window.URL.createObjectURL(files[0]);
            this.imageForm.url = imageURL;
        },

        createNewProdcutImage(e) {
            const form = e.target;
            const formData = new FormData(form);
            this.$emit('after-submit-image', formData);
        },

        updateRevisColor(arug) {
            const temp = this.initProduct.inventories;
            const result = temp.filter(item => item.id === arug);
            this.tempReviseColor = result[0].name;
        },

        isColorEditable(str, initColors) {
            return initColors === str;
        }
    },
    watch: {
        initProduct: function (updateData) {
            this.initProduct = updateData;
        },
        initColors: function(updateData) {
            this.initColors = updateData;
        }
    }
}
</script>

<style scoped>
.product-Quantity-danger {
    color: #f90909;
}
.product-Quantity-success {
    color: #094af9;
}
</style>