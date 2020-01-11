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
        <p class="headline text-center">Oops!</p>
        <v-card-subtitle class="title">Your order create failed.</v-card-subtitle>
        <v-card-action>
          <v-icon class="orderCheck animated jackInTheBox">mdi-alert-circle</v-icon>
        </v-card-action>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.orderCheck {
  font-size: 3em;
  color: #f19483;
}
</style>