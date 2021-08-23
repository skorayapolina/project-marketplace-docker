import { action, computed, observable, reaction } from "mobx";
import {
  createIntlCache,
  createIntl,
  IntlShape,
} from "react-intl";
import axios from 'axios';

class Localization {
  @observable.shallow messages: Record<string, string> = {};
  @observable intl: IntlShape;

  @observable private _locale: string;
  private defaultLocale = 'en';

  constructor() {
    this._locale = localStorage.getItem('locale') || this.defaultLocale;

    this.initIntl().then(() => {
      reaction(() => this.locale, () => this.initIntl());
      reaction(() => this.messages, () => this.initIntl());
    });
  }

  @computed
  get locale() {
    return this._locale;
  }

  set locale(locale: string) {
    if (this._locale !== locale) {
      localStorage.setItem('locale', locale);

      this._locale = locale;
      this.fetchTranslation(this._locale);
    }
  }

  @action.bound
  async fetchTranslation(locale: string) {
    try {
      const response = await axios.get(`${process.env.PUBLIC_URL}/assets/i18n/${locale}.json`);

      this.messages = response.data;
    } catch (error) {
    }
  }

  private async initIntl() {
    const cache = createIntlCache();

    this.intl = createIntl(
        {
          locale: this.locale,
          messages: this.messages,
        },
        cache,
    );
  }
}

export default Localization;
