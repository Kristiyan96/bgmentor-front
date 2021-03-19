import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
  en: {
    roles: {
      student: 'student',
      guardian: 'parent',
      teacher: 'teacher',
      admin: 'admin'
    },
    form: {
      required: 'indicates required field'
    },
    calendar: {
      today: 'Today',
      day: 'Day',
      week: 'Week',
      month: 'Month',
      fourDays: '4 Days',
      weekdays: {
        1: 'Mon',
        2: 'Tue',
        3: 'Wed',
        4: 'Thu',
        5: 'Fri',
        6: 'Sat',
        0: 'Sun'
      }
    },
    account: {
      roles: {
        student: 'Student',
        teacher: 'Teacher',
        parent: 'Parent',
        guardian: 'Parent',
        admin: 'Admin'
      },
      general: {
        title: 'General'
      },
      security: {
        changePassword: 'Change password',
        changePasswordInfo:
          'Click on the link above and you will receive an email with instructions.',
        changePhone: 'Change phone number',
        changePhoneInfo:
          'Sorry, this functionality is still not available :/. You can chat with us and we will make the change for you!'
      },
      notif: {
        title: 'Notifications and SMS',
        info:
          'Apologies, this functionality is not ready yet. We will not send "unimportant" SMS and emails.'
      },
      ad: {
        title: 'My public profile',
        education:
          'Please, list your achievements, education, previous work...',
        addSubject: 'Add a subject'
      }
    },
    lessons: {
      searchPlaceholder: 'Search lessons by student name/number',
      emptyList: 'No lessons found.',
      1: 'Group lesson',
      0: 'Privave lesson',
      edit: 'Edit lesson',
      new: 'New lesson',
      form: {
        student: 'Student',
        starts_at: 'Starts at',
        ends_at: 'Ends at',
        price: 'Price',
        location: 'Location, link',
        completed: 'Completed',
        cancelled: 'Cancelled'
      }
    },
    auth: {
      title: {
        signin: 'Log in',
        register: 'Sign up',
        forgot_password: 'Forgot password',
        reset_password: 'Reset password'
      },
      button: {
        google: 'Sign in with Google',
        signin: 'Sign in',
        register: 'Sign up',
        change_password: 'Change password',
        reset_password: 'Reset password'
      },
      label: {
        firstName: 'First name',
        lastName: 'Last name',
        email: 'Email',
        phoneNumber: 'Phone number',
        password: 'Password',
        remember_me: 'Remember me',
        new_password: 'New password',
        confirm_password: 'Confirm password'
      },
      link: {
        forgot_password: 'Forgot password?',
        register: 'New account',
        signin: 'Sign in'
      }
    },
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
    },
    verify: {
      country_code: 'Country code',
      changeNumber: 'Change mobile number',
      resend: 'Resend code',
      info: 'You will receive a confirmation code via SMS.',
      infoSummary:
        "If you don't receive an SMS in 5-10 minutes, please call us at +359 885955926",
      verifyNumber: 'Confirm mobile number'
    },
    nav: {
      verify: 'Verify phone number',
      payments: 'Balance and payments',
      myStudents: 'Students',
      myLessons: 'Lessons',
      profile: 'Profile',
      schedule: 'Schedule'
    },
    actions: {
      confirm: 'Confirm',
      submit: 'Submit',
      save: 'Save',
      update: 'Update',
      delete: 'Delete',
      cancel: 'Cancel',
      close: 'Close',
      clearChanges: 'Clear changes',
      preview: 'Preview'
    },
    profile: {
      titles: {
        change_address: 'Change your address',
        change_pricing: 'Edit pricing',
        subject: 'Add a subject',
        level: 'Add a level',
        location: 'Add a location',
        cv: 'CV',
        methodology: 'Methodology',
        experience: 'Experience',
        rate_details: 'Price breakdown',
        price: 'Price ',
        negotiate: "Let's discuss",
        title: 'Chnage title'
      },
      labels: {
        subject: 'I teach',
        level: 'to',
        location: 'My lessons take place',
        add: 'Add',
        add_pricing: 'Add pricing',
        city: 'City',
        country: 'Country',
        title: 'Profile title',
        pricing_minutes: 'Minutes',
        pricing_price: 'Price'
      },
      rules: {
        minutes: 'Minutes should be an integer > 0',
        price: 'Price should be a decimal >= 0'
      }
    },
    time: {
      minutes: 'minutes',
      min: 'min.',
      hours: 'hours',
      h: 'h.',
      days: 'days',
      d: 'd.'
    },
    search: {
      titles: {
        results: 'Results'
      },
      labels: {
        location: 'Lesson location',
        subject: 'Subjects',
        level: 'Knowledge level'
      }
    }
  },
  bg: {
    roles: {
      student: 'ученик',
      guardian: 'родител',
      teacher: 'учител',
      admin: 'админ'
    },
    form: {
      required: 'задължително поле'
    },
    calendar: {
      today: 'Днес',
      day: 'Ден',
      week: 'Седмица',
      month: 'Месец',
      fourDays: '4 Дни',
      weekdays: {
        1: 'Пон',
        2: 'Вт',
        3: 'Ср',
        4: 'Четв',
        5: 'Пет',
        6: 'Съб',
        0: 'Нед'
      }
    },
    account: {
      roles: {
        student: 'Ученик',
        teacher: 'Учител',
        parent: 'Родител',
        guardian: 'Родител',
        admin: 'Админ'
      },
      general: {
        title: 'Лична информация'
      },
      security: {
        title: 'Настройки за достъп',
        changePassword: 'Промени паролата',
        changePasswordInfo:
          'Кликни на бутона, за да получиш имейл с линк за смяна на паролата.',
        changePhone: 'Промени мобилен номер',
        changePhoneInfo:
          'Съжаляваме, тази функционалност още не е готова. Моля, обадете ни се, за да сменим номера Ви ръчно.'
      },
      notif: {
        title: 'Известия и SMS',
        info:
          'Съжаляваме, тази функционалност още не е готова. Няма да изпращаме СМС-и и имейли, които не Ви засягат лично!'
      },
      ad: {
        title: 'Моята обява',
        education:
          'Моля, опишете Вашия опит, постижения, предишна/постоянна работа...',
        addSubject: 'Добави предмет'
      }
    },
    lessons: {
      searchPlaceholder: 'Търси урок по име/номер на ученик',
      emptyList: 'Няма намерени уроци.',
      collective: 'Групов урок',
      individual: 'Частен урок',
      edit: 'Редакция на урок',
      new: 'Нов урок',
      form: {
        student: 'Ученик',
        starts_at: 'Начало',
        ends_at: 'Край',
        price: 'Цена',
        location: 'Място, линк',
        completed: 'Преподаден',
        cancelled: 'Отказан от клиента'
      }
    },
    auth: {
      title: {
        signin: 'Вход',
        register: 'Регистрация',
        forgot_password: 'Забравена парола',
        reset_password: 'Промяна на парола'
      },
      button: {
        google: 'Влез с Google',
        signin: 'Влез',
        register: 'Създай акаунт',
        change_password: 'Промени паролата',
        reset_password: 'Прати нова парола'
      },
      label: {
        firstName: 'Първо име',
        lastName: 'Фамилно име',
        email: 'Имейл',
        phoneNumber: 'Мобилен номер',
        password: 'Парола',
        remember_me: 'Запомни ме',
        new_password: 'Нова парола',
        confirm_password: 'Потвърди паролата'
      },
      link: {
        forgot_password: 'Забравена парола?',
        register: 'Нов акаунт',
        signin: 'Вход'
      }
    },
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
    },
    verify: {
      country_code: 'Държава',
      resend: 'Изпрати отново',
      changeNumber: 'Промени номера',
      info: 'Ще получите СМС с код за достъп.',
      infoSummary:
        'Обадете се на +359 885955926, ако не получите код до 5-10 минути.',
      verifyNumber: 'Потвърждаване на мобилен номер'
    },
    nav: {
      verify: 'Потвърди номер',
      payments: 'Баланс и плащания',
      myStudents: 'Ученици',
      myLessons: 'Уроци',
      profile: 'Профил',
      schedule: 'Календар'
    },
    actions: {
      confirm: 'Потвърди',
      submit: 'Запази',
      save: 'Запази',
      update: 'Промени',
      delete: 'Изтрий',
      cancel: 'Откажи',
      close: 'Затвори',
      clearChanges: 'Върни промените',
      preview: 'Преглед'
    },
    profile: {
      titles: {
        change_address: 'Промени адрес',
        change_pricing: 'Промени ценоразпис',
        subject: 'Добави предмет',
        level: 'Добави ниво на преподаване',
        location: 'Добави място на преподаване',
        cv: 'CV',
        methodology: 'Начин на преподаване',
        experience: 'Опит като преподавател',
        rate_details: 'Ценоразпис',
        price: 'Цена',
        negotiate: 'По Договаряне',
        title: 'Промени заглавие'
      },
      labels: {
        subject: 'Превподавам по',
        level: 'Преподавам на',
        location: 'Урокът се провежда',
        add: 'Добави',
        add_pricing: 'Добави цена',
        city: 'Град',
        country: 'Държава',
        title: 'Заглавие на профил',
        pricing_minutes: 'Минути',
        pricing_price: 'Цена'
      },
      rules: {
        minutes: 'Минутите трябва да са положително число.',
        price: 'Цената трябва да е положително число.'
      }
    },
    time: {
      minutes: 'минути',
      min: 'мин.',
      hours: 'часа',
      h: 'ч.',
      days: 'дни',
      d: 'д.'
    },
    search: {
      titles: {
        results: 'Резултати'
      },
      labels: {
        location: 'Място на урок',
        subject: 'Предмети',
        level: 'Ниво на знание'
      }
    }
  }
}

export default new VueI18n({
  locale: localStorage.locale || 'bg',
  messages
})
