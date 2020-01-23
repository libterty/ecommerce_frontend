<template>
    <div>
        <b-container class="py-5">
            <div class="image-overlay"></div>
            <div class="text-center mb-4" id="signup">
                <h1 class="h3 mb-3 font-weight-normal">
                Sign Up
                </h1>
            </div>
            <b-form @submit="onSubmit" @reset="onReset">
                <b-form-group
                    id="name"
                    label="Username :"
                    label-for="name"
                    description="We are glad if you are going to join us"
                >
                    <b-form-input
                        id="name-input"
                        v-model="form.name"
                        :state="form.name.length > 0"
                        type="text"
                        required
                        placeholder="Enter username"
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    id="email"
                    label="Email address:"
                    label-for="email"
                    description="We'll never share your email with anyone else."
                >
                    <b-form-input
                        id="email-input"
                        v-model="form.email"
                        :state="form.email.length > 0"
                        type="email"
                        required
                        placeholder="Enter email"
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    id="password"
                    label="Your Password:"
                    label-for="password"
                    description="Please Input Your Password"
                >
                    <b-form-input
                        id="password-input"
                        v-model="form.password"
                        :state="form.password.length > 6"
                        type="password"
                        required
                        placeholder="Enter password"
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    id="passwordCheck"
                    label="Confirm your password :"
                    label-for="passwordCheck"
                    description="Please confirm Your Password"
                >
                    <b-form-input
                        id="passwordCheck-input"
                        v-model="form.passwordCheck"
                        :state="form.passwordCheck.length > 6"
                        type="password"
                        required
                        placeholder="Confirm your Password"
                    ></b-form-input>
                </b-form-group>

                <b-button type="submit" variant="primary">Submit</b-button>
                <b-button type="reset" variant="danger" style="margin-left: 0.25rem">Reset</b-button>
            </b-form>
            <br>
            <router-link to="/signin">Already have account? Go Sign in !!</router-link>
        </b-container>
    </div>
</template>

<script>
import Request from '../api';
import { Toast } from '../utils/helpers';
const request = new Request();

export default {
    name: 'SignUp',
    data() {
        return {
            form: {
                name: '',
                email: '',
                password: '',
                passwordCheck: ''
            }
        }
    },
    methods: {
        async onSubmit(evt) {
            evt.preventDefault();
            if (!this.form.name || !this.form.email || !this.form.password || !this.form.passwordCheck) {
                return Toast.fire({ icon: 'warning', title: 'empty input' });
            } else if (this.form.password.length < 6) {
                return Toast.fire({ icon: 'warning', title: 'Password is not strong enough', text: 'Password requires at least 6 characters' });
            } else if (this.form.password !== this.form.passwordCheck) {
                return Toast.fire({ icon: 'warning', title: 'Please check if both of your password is correct' });
            } else {
                try {
                    const data = JSON.stringify(this.form);
                    const res = await request.postSignUp(data);
                    if (res.status === 'success') {
                        Toast.fire({
                            icon: 'success',
                            title: 'Signup success'
                        });
                        return this.$router.push('/signin');
                    }
                } catch (error) {
                    Toast.fire({
                        icon: 'warning',
                        title: 'Signup fail'
                    });
                }
            }
        },
        onReset() {
            this.form.name = '',
            this.form.email = '',
            this.form.password = '',
            this.form.passwordCheck = ''
        }
    }
}
</script>

<style scoped>
#signup {
    width: 50%;
}

.image-overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #cccccc;
    opacity: 0.5;
    z-index: -1;
}
</style>