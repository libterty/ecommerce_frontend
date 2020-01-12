<template>
  <v-row
    justify="center"
    class="mt-10"
  >
    <v-col
      cols="4"
      lg="4"
    >
      <v-card class="py-5">
        <p class="headline text-center">Congratulation!</p>
        <v-card-subtitle class="title">Your order is created.</v-card-subtitle>
        <v-card-action>
          <v-icon class="orderCheck animated jackInTheBox">mdi-check</v-icon>
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