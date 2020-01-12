import moment from 'moment';

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

export const convertLanguageFilter = {
  filters: {
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
    },
  }
}

export const convertTimeFilter = {
  filters: {
    convertTime(date) {
      return moment(date).calendar()
    }
  }
}