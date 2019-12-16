export const convertClassFilter = {
  filters: {
    convertClass(string) {
      if (string === 'blue') {
        return 'product_color_blue';
      } else if (string === 'black') {
        return 'product_color_black';
      } else if (string === 'white') {
        return 'product_color_white';
      } else if (string === 'yellow') {
        return 'product_color_yellow';
      } else {
        return '';
      }
    }
  }
}