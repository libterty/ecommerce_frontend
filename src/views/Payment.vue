<template>
  <v-row justify="end">
    <v-dialog
      v-model="confirmFormDialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          raised
          color="error"
          x-large
          class="mt-3 red lighten-3 dialog-btn"
          style="padding: 0 1em ; margin-right: 2.5em;"
          v-on="on"
          @click.stop.prevent="createPayment(order.id,order.UserId)"
        >Create Payment</v-btn>
      </template>
      <v-form>
        <v-card>
          <v-card-title>
            <span class="headline text--darken-3 cyan--text">Confirm info</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
              ref="tel"
              v-model="tel"
              label="Phone Number"
              placeholder="0912345678"
              disabled
            ></v-text-field>
            <v-text-field
              ref="address"
              v-model="address"
              disabled
              label="Address Line"
              placeholder="Snowy Rock Pl"
            ></v-text-field>
            <span
              class="display-1 mr-10 text--darken-3 cyan--text"
            >Total ${{paymentInfo.total_amount}}</span>
            <form
              name="Spgateway"
              :action="tradeInfo.PayGateWay"
              method="POST"
            >
              MerchantID:
              <input
                type="text"
                name="MerchantID"
                :value="tradeInfo.MerchantID"
              />
              <br />TradeInfo:
              <input
                type="text"
                name="TradeInfo"
                :value="tradeInfo.TradeInfo"
              />
              <br />TradeSha:
              <input
                type="text"
                name="TradeSha"
                :value="tradeInfo.TradeSha"
              />
              <br />Version:
              <input
                type="text"
                name="Version"
                :value="tradeInfo.Version"
              />
              <br />
              <v-btn
                text
                @click="confirmFormDialog=false"
              >Cancel</v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                type="submit"
              >Confirm</v-btn>
              <button
                type="submit"
                class="btn btn-primary"
              >Payment</button>
            </form>
          </v-card-text>
          <v-divider class="mt-5"></v-divider>
          <v-card-actions>
            <v-btn
              text
              @click="confirmFormDialog=false"
            >Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click.stop.prevent="spgatewayCallback"
            >Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>