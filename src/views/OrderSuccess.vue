<template>
  <v-row
    justify="center"
    class="mt-10"
  >
    <v-col
      cols="4"
      lg="4"
    >
      <v-card class="pt-5">
        <p class="headline text-center">Congratulation!</p>
        <v-card-subtitle class="title">Your order is created.</v-card-subtitle>
        <v-icon class="orderCheck animated jackInTheBox">mdi-check</v-icon>
        <v-card-action>
          <v-btn
            block
            :to="{name:'orders'}"
            class="mt-2 cyan white--text darken-4"
          >Check orders</v-btn>
        </v-card-action>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.orderCheck {
  font-size: 3em;
  color: #577c8a;
  border: 1.5px solid #f19483;
  border-radius: 100%;
}
</style>