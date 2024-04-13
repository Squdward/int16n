/**
 * Класс для работы с интернационализацией (i18n).
 * @template T - тип объекта переводов.
 * @template U - тип ключей языков.
 */
class int16n<T extends object, U extends keyof T> {
    /**
     * Объект с переводами.
     * @type {T}
     */
    translations: T;
  
    /**
     * Ключ текущего языка.
     * @type {U}
     */
    languages: U;
  
    /**
     * Текущие переводы для выбранного языка.
     * @type {T[U]}
     */
    currentTranslations: T[U];
  
    /**
     * Создает экземпляр класса I18n.
     * @param {T} translations - объект с переводами.
     * @param {U} lang - ключ текущего языка.
     */
    constructor(translations: T, lang: U) {
      this.translations = translations;
      this.languages = lang;
      this.currentTranslations = translations[lang];
    }
  
    /**
     * Получает перевод по указанному пути для текущего языка.
     * @template K - тип ключа пути перевода.
     * @param {K} path - путь к переводу.
     * @returns {T[U][K]} - перевод для указанного пути и текущего языка.
     */
    get<K extends keyof T[U]>(path: K): T[U][K] {
      return this.currentTranslations[path];
    }
  
    replace<K extends keyof T[U], V>(path: K, params: V[]): string {
      const translation = this.currentTranslations[path];
  
      if (typeof translation !== 'string') {
          throw new Error(`Value at path is not a string`);
      }
  
      let result:string = translation;
  
      params.forEach((item) => result = result.replace('%v%', String(item)))
  
      return result
    }
  
  }
  
  export default int16n;