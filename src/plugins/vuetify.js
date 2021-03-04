import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueI18n from 'vue-i18n'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.use(VueI18n)

const messages = {
  en: {
    $vuetify: {
      close: 'Close',
      dataIterator: {
        pageText: '{0}-{1} of {2}',
        noResultsText: 'No matching records found',
        loadingText: 'Loading items...'
      },
      dataTable: {
        itemsPerPageText: 'Rows per page:',
        ariaLabel: {
          sortDescending: ': Sorted descending. Activate to remove sorting.',
          sortAscending: ': Sorted ascending. Activate to sort descending.',
          sortNone: ': Not sorted. Activate to sort ascending.'
        },
        sortBy: 'Sort by'
      },
      dataFooter: {
        pageText: '{0}-{1} of {2}',
        itemsPerPageText: 'Items per page:',
        itemsPerPageAll: 'All',
        nextPage: 'Next page',
        prevPage: 'Previous page',
        firstPage: 'First page',
        lastPage: 'Last page'
      },
      datePicker: {
        itemsSelected: '{0} selected'
      },
      noDataText: 'No data available',
      carousel: {
        prev: 'Previous visual',
        next: 'Next visual'
      },
      calendar: {
        moreEvents: '{0} more'
      }
    }
  },
  bg: {
    $vuetify: {
      close: 'Затвори',
      dataIterator: {
        pageText: '{0}-{1} от {2}',
        noResultsText: 'Не бяха открити резултати',
        loadingText: 'Зарежда...'
      },
      dataTable: {
        itemsPerPageText: 'Резлутати на страница:',
        ariaLabel: {
          sortDescending:
            ': В низходящ ред. Активирай, за да махнеш сортиране.',
          sortAscending: ': Във възходящ ред. Активирай за низходящ.',
          sortNone: ': Несортирано. активирай за възходящ.'
        },
        sortBy: 'Сортирай по'
      },
      dataFooter: {
        pageText: '{0}-{1} от {2}',
        itemsPerPageText: 'Резултата на страница:',
        itemsPerPageAll: 'Всички',
        nextPage: 'Следваща',
        prevPage: 'Предишна',
        firstPage: 'Първа',
        lastPage: 'Последна'
      },
      datePicker: {
        itemsSelected: '{0} избрани'
      },
      noDataText: 'Няма информация',
      carousel: {
        prev: 'ППредишен',
        next: 'Следващ'
      },
      calendar: {
        moreEvents: '{0} още'
      }
    }
  }
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'bg',
  messages
})

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  },
  lang: {
    t: (key, ...params) => i18n.t(key, params)
  }
})
