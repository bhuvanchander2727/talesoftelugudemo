/**
 * Tales of Telugu — Site Storage Layer (site-store.js)
 * Exposes window.TOT_STORE for managing persistent site data in localStorage.
 * Handles gallery, menu items, categories, about content, and reservations.
 */
(function (global) {
  'use strict';

  var KEYS = {
    GALLERY: 'tot_gallery',
    MENU_ITEMS: 'tot_menu_items',
    CATEGORIES: 'tot_categories',
    ABOUT: 'tot_about',
    RESERVATIONS: 'tot_reservations'
  };

  /** Safe local storage reader */
  function storageGet(key) {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return null;
      var raw = window.localStorage.getItem(key);
      if (raw === null || raw === undefined) return null;
      return JSON.parse(raw);
    } catch (e) {
      console.warn('[TOT_STORE] Error reading key "' + key + '" from localStorage:', e);
      return null;
    }
  }

  /** Safe local storage writer */
  function storageSet(key, value) {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return false;
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('[TOT_STORE] Error writing key "' + key + '" to localStorage:', e);
      return false;
    }
  }

  /** Safe local storage remover */
  function storageRemove(key) {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return false;
      window.localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('[TOT_STORE] Error removing key "' + key + '" from localStorage:', e);
      return false;
    }
  }

  var TOT_STORE = {
    KEYS: KEYS,

    // -----------------------------------------------------------------------
    // Generic Accessors
    // -----------------------------------------------------------------------
    get: function (key) {
      return storageGet(key);
    },
    set: function (key, value) {
      return storageSet(key, value);
    },
    remove: function (key) {
      return storageRemove(key);
    },

    // -----------------------------------------------------------------------
    // 1. Gallery (ambiance & food)
    // -----------------------------------------------------------------------
    getGallery: function () {
      return storageGet(KEYS.GALLERY);
    },
    setGallery: function (galleryData) {
      return storageSet(KEYS.GALLERY, galleryData);
    },
    removeGallery: function () {
      return storageRemove(KEYS.GALLERY);
    },
    resetGallery: function () {
      return storageRemove(KEYS.GALLERY);
    },

    // -----------------------------------------------------------------------
    // 2. Menu Items & Dishes
    // -----------------------------------------------------------------------
    getMenuItems: function () {
      return storageGet(KEYS.MENU_ITEMS);
    },
    getMenu: function () {
      return storageGet(KEYS.MENU_ITEMS);
    },
    setMenuItems: function (items) {
      return storageSet(KEYS.MENU_ITEMS, items);
    },
    setMenu: function (items) {
      return storageSet(KEYS.MENU_ITEMS, items);
    },
    removeMenuItems: function () {
      return storageRemove(KEYS.MENU_ITEMS);
    },
    removeMenu: function () {
      return storageRemove(KEYS.MENU_ITEMS);
    },
    resetMenu: function () {
      return storageRemove(KEYS.MENU_ITEMS);
    },

    // -----------------------------------------------------------------------
    // 3. Categories (Metadata & Order)
    // -----------------------------------------------------------------------
    getCategories: function () {
      return storageGet(KEYS.CATEGORIES);
    },
    setCategories: function (categories) {
      return storageSet(KEYS.CATEGORIES, categories);
    },
    removeCategories: function () {
      return storageRemove(KEYS.CATEGORIES);
    },
    resetCategories: function () {
      return storageRemove(KEYS.CATEGORIES);
    },

    // -----------------------------------------------------------------------
    // 4. About Content (Hero, Narrative, Cards, Philosophy)
    // -----------------------------------------------------------------------
    getAbout: function () {
      return storageGet(KEYS.ABOUT);
    },
    setAbout: function (aboutData) {
      return storageSet(KEYS.ABOUT, aboutData);
    },
    removeAbout: function () {
      return storageRemove(KEYS.ABOUT);
    },
    resetAbout: function () {
      return storageRemove(KEYS.ABOUT);
    },

    // -----------------------------------------------------------------------
    // 5. Reservations (Guest bookings)
    // -----------------------------------------------------------------------
    getReservations: function () {
      var list = storageGet(KEYS.RESERVATIONS);
      return Array.isArray(list) ? list : [];
    },
    setReservations: function (reservationsList) {
      return storageSet(KEYS.RESERVATIONS, Array.isArray(reservationsList) ? reservationsList : []);
    },
    addReservation: function (reservation) {
      var current = TOT_STORE.getReservations();
      var id = 'res_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
      var record = Object.assign({
        id: id,
        createdAt: new Date().toISOString()
      }, reservation);

      // Prepend so latest appears first in admin
      current.unshift(record);
      storageSet(KEYS.RESERVATIONS, current);
      return record;
    },
    removeReservation: function (id) {
      var current = TOT_STORE.getReservations();
      var filtered = current.filter(function (r) { return r.id !== id; });
      storageSet(KEYS.RESERVATIONS, filtered);
      return filtered.length !== current.length;
    },
    clearReservations: function () {
      return storageRemove(KEYS.RESERVATIONS);
    },
    resetReservations: function () {
      return storageRemove(KEYS.RESERVATIONS);
    },

    // -----------------------------------------------------------------------
    // Master Reset / Inspection
    // -----------------------------------------------------------------------
    resetAll: function () {
      storageRemove(KEYS.GALLERY);
      storageRemove(KEYS.MENU_ITEMS);
      storageRemove(KEYS.CATEGORIES);
      storageRemove(KEYS.ABOUT);
      storageRemove(KEYS.RESERVATIONS);
      return true;
    },
    hasCustomData: function () {
      return Boolean(
        storageGet(KEYS.GALLERY) ||
        storageGet(KEYS.MENU_ITEMS) ||
        storageGet(KEYS.CATEGORIES) ||
        storageGet(KEYS.ABOUT) ||
        (storageGet(KEYS.RESERVATIONS) && storageGet(KEYS.RESERVATIONS).length > 0)
      );
    }
  };

  // Expose to window / global / module
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = TOT_STORE;
  }
  if (typeof window !== 'undefined') {
    window.TOT_STORE = TOT_STORE;
  }
  global.TOT_STORE = TOT_STORE;

})(typeof window !== 'undefined' ? window : this);
