import '@mdi/font/css/materialdesignicons.css';
import Vue from "vue";
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
  en: {
    calendar: {
      today: 'Today',
      day: "Day",
      week: "Week",
      month: "Month",
      weekdays: {
        "1": "Mon",
        "2": "Tue",
        "3": "Wed",
        "4": "Thu",
        "5": "Fri",
        "6": "Sat",
        "0": 'Sun'
      }
    },
    account: {
      roles: {
        student: 'Student',
        teacher: 'Teacher',
        parent: 'Parent',
        guardian: 'Parent',
        admin: 'Admin'
      }
    },
    lesson: {
      "1": "Group lesson",
      "0": "Privave lesson",
    },
    memberships: {
      remainingCredits: "Payed lessons: {0}"
    },
    auth: {
      title: {
        signin: "Log in",
        register: "Sign up",
        forgot_password: "Forgot password",
        reset_password: "Reset password"
      },
      button: {
        google: "Sign in with Google",
        signin: "Sign in",
        register: "Sign up",
        change_password: "Change password"
      },
      label: {
        name: "Names",
        email: "Email",
        password: "Password",
        remember_me: "Remember me",
        new_password: "New password",
        confirm_password: "Confirm password"
      },
      link: {
        forgot_password: "Forgot password?",
        register: "New account",
        signin: "Sign in"
      }
    },
    $vuetify: {
      close: 'Close',
      dataIterator: {
        pageText: '{0}-{1} of {2}',
        noResultsText: 'No matching records found',
        loadingText: 'Loading items...',
      },
      dataTable: {
        itemsPerPageText: 'Rows per page:',
        ariaLabel: {
          sortDescending: ': Sorted descending. Activate to remove sorting.',
          sortAscending: ': Sorted ascending. Activate to sort descending.',
          sortNone: ': Not sorted. Activate to sort ascending.',
        },
        sortBy: 'Sort by',
      },
      dataFooter: {
        pageText: '{0}-{1} of {2}',
        itemsPerPageText: 'Items per page:',
        itemsPerPageAll: 'All',
        nextPage: 'Next page',
        prevPage: 'Previous page',
        firstPage: 'First page',
        lastPage: 'Last page',
      },
      datePicker: {
        itemsSelected: '{0} selected',
      },
      noDataText: 'No data available',
      carousel: {
        prev: 'Previous visual',
        next: 'Next visual',
      },
      calendar: {
        moreEvents: '{0} more',
      },
    }
  },
  bg: {
    calendar: {
      today: 'Днес',
      day: "Ден",
      week: "Седмица",
      month: "Месец",
      weekdays: {
        "1": "Пон",
        "2": "Вт",
        "3": "Ср",
        "4": "Четв",
        "5": "Пет",
        "6": "Съб",
        "0": 'Нед'
      }
    },
    account: {
      roles: {
        student: 'Ученик',
        teacher: 'Учител',
        parent: 'Родител',
        guardian: 'Родител',
        admin: 'Админ'
      }
    },
    lesson: {
      "1": "Групов урок",
      "0": "Частен урок",
    },
    auth: {
      title: {
        signin: "Вход",
        register: "Регистрация",
        forgot_password: "Забравена парола",
        reset_password: "Промяна на парола"
      },
      button: {
        google: "Влез с Google",
        signin: "Влез",
        register: "Създай акаунт",
        change_password: "Промени паролата",
      },
      label: {
        name: "Имена",
        email: "Имейл",
        password: "Парола",
        remember_me: "Запомни ме",
        new_password: "Нова парола",
        confirm_password: "Потвърди паролата"
      },
      link: {
        forgot_password: "Забравена парола?",
        register: "Нов акаунт",
        signin: "Вход"
      }
    },
    memberships: {
      remainingCredits: "Платени уроци: {0}"
    },
    $vuetify: {
      close: 'Close',
      dataIterator: {
        pageText: '{0}-{1} of {2}',
        noResultsText: 'No matching records found',
        loadingText: 'Loading items...',
      },
      dataTable: {
        itemsPerPageText: 'Rows per page:',
        ariaLabel: {
          sortDescending: ': Sorted descending. Activate to remove sorting.',
          sortAscending: ': Sorted ascending. Activate to sort descending.',
          sortNone: ': Not sorted. Activate to sort ascending.',
        },
        sortBy: 'Sort by',
      },
      dataFooter: {
        pageText: '{0}-{1} of {2}',
        itemsPerPageText: 'Items per page:',
        itemsPerPageAll: 'All',
        nextPage: 'Next page',
        prevPage: 'Previous page',
        firstPage: 'First page',
        lastPage: 'Last page',
      },
      datePicker: {
        itemsSelected: '{0} selected',
      },
      noDataText: 'No data available',
      carousel: {
        prev: 'Previous visual',
        next: 'Next visual',
      },
      calendar: {
        moreEvents: '{0} more',
      },
    }
  }
}

export default new VueI18n({
  locale: 'bg', 
  messages 
});