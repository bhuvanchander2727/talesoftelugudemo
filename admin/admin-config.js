/**
 * Tales of Telugu — Admin Configuration
 * Configures authentication credentials for the /admin portal.
 */
(function (global) {
  'use strict';

  global.TOT_ADMIN_CONFIG = {
    // Default credentials (change these for production)
    username: 'admin',
    password: 'admin123',
    sessionKey: 'tot_admin_auth_session',
    sessionDurationHours: 24
  };
})(typeof window !== 'undefined' ? window : this);
