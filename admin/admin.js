/**
 * Tales of Telugu — Admin Portal Controller (admin.js)
 * Handles authentication, gallery management (with image resizing),
 * about page editing, heritage menu & dishes management, reservations review,
 * and storage monitoring.
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. CONFIGURATION & STATE
  // =========================================================================
  const CONFIG = window.TOT_ADMIN_CONFIG || {
    username: 'admin',
    password: 'admin123',
    sessionKey: 'tot_admin_auth_session'
  };

  const SEED = window.TOT_SEED_DATA || {
    gallery: { ambiance: [], food: [] },
    about: { heroTag: '', heroTitle: '', heroSubtitle: '', lead: '', cards: [], quote: '', quoteSign: '' },
    categories: [],
    menuItems: []
  };

  const STORE = window.TOT_STORE;

  // Active state
  let currentNav = 'gallery';
  let currentGalleryTab = 'ambiance';
  let currentGalleryData = null; // { ambiance: [], food: [] }
  let currentAboutData = null;

  // Menu state
  let currentCategoriesData = null; // Array of { id, label, icon }
  let currentMenuData = null;       // Array of dish objects
  let selectedMenuCategory = 'all';  // 'all' or category id slug
  let menuSearchQuery = '';

  // Editing pointers
  let activeEditingPhotoIndex = null;    // null = add new, number = edit
  let activeEditingCardIndex = null;     // null = add new, number = edit
  let activeEditingCategoryIndex = null; // null = add new, number = edit
  let activeEditingDishIndex = null;     // null = add new, number = edit
  let activeMovingDishIndex = null;

  // Image buffers
  let photoPendingBase64 = null;
  let dishPendingBase64 = null;

  // =========================================================================
  // 2. DOM ELEMENT REFERENCES
  // =========================================================================
  const loginView          = document.getElementById('loginView');
  const loginForm          = document.getElementById('loginForm');
  const loginUser          = document.getElementById('loginUser');
  const loginPass          = document.getElementById('loginPass');
  const loginError         = document.getElementById('loginError');

  const adminApp           = document.getElementById('adminApp');
  const adminSidebar       = document.getElementById('adminSidebar');
  const mobileMenuBtn      = document.getElementById('mobileMenuBtn');
  const pageHeading        = document.getElementById('pageHeading');
  const logoutBtn          = document.getElementById('logoutBtn');

  // Nav links & views
  const navLinks           = document.querySelectorAll('.admin-nav-link');
  const viewPanels         = {
    gallery:      document.getElementById('viewGallery'),
    about:        document.getElementById('viewAbout'),
    menu:         document.getElementById('viewMenu'),
    reservations: document.getElementById('viewReservations')
  };

  // Badges & storage
  const badgeGalleryCount  = document.getElementById('badgeGalleryCount');
  const badgeMenuCount     = document.querySelector('a[data-nav="menu"] .admin-nav-badge');
  const badgeReserveCount  = document.getElementById('badgeReserveCount');
  const storageUsageText   = document.getElementById('storageUsageText');
  const storageUsageBar    = document.getElementById('storageUsageBar');
  const storageAlertBanner = document.getElementById('storageAlertBanner');
  const menuStorageAlertBanner = document.getElementById('menuStorageAlertBanner');

  // Gallery view controls
  const galleryTabBtns     = document.querySelectorAll('[data-gallery-tab]');
  const galleryCardsGrid   = document.getElementById('galleryCardsGrid');
  const btnAddPhoto        = document.getElementById('btnAddPhoto');
  const btnResetGallery    = document.getElementById('btnResetGallery');

  // About view controls
  const btnResetAbout      = document.getElementById('btnResetAbout');
  const btnSaveAbout       = document.getElementById('btnSaveAbout');
  const aboutHeroTag       = document.getElementById('aboutHeroTag');
  const aboutHeroTitle     = document.getElementById('aboutHeroTitle');
  const aboutHeroSubtitle  = document.getElementById('aboutHeroSubtitle');
  const aboutLead          = document.getElementById('aboutLead');
  const aboutQuote         = document.getElementById('aboutQuote');
  const aboutQuoteSign     = document.getElementById('aboutQuoteSign');
  const storyCardsList     = document.getElementById('storyCardsList');
  const btnAddStoryCard    = document.getElementById('btnAddStoryCard');

  // Menu view controls
  const btnResetMenu           = document.getElementById('btnResetMenu');
  const btnAddCategoryBtn      = document.getElementById('btnAddCategoryBtn');
  const btnAddDishBtn          = document.getElementById('btnAddDishBtn');
  const categoriesTotalCount   = document.getElementById('categoriesTotalCount');
  const categoryPillsContainer = document.getElementById('categoryPillsContainer');
  const dishSearchInput        = document.getElementById('dishSearchInput');
  const btnClearDishSearch     = document.getElementById('btnClearDishSearch');
  const dishStatsText          = document.getElementById('dishStatsText');
  const dishesListContainer    = document.getElementById('dishesListContainer');

  // Reservations view controls
  const reservationsTableBody    = document.getElementById('reservationsTableBody');
  const noReservationsNotice     = document.getElementById('noReservationsNotice');
  const noReservationsTitle      = document.getElementById('noReservationsTitle');
  const noReservationsDesc       = document.getElementById('noReservationsDesc');
  const btnClearReservations     = document.getElementById('btnClearReservations');
  const btnExportReservationsCSV = document.getElementById('btnExportReservationsCSV');
  const btnAddSampleReservations = document.getElementById('btnAddSampleReservations');
  const btnEmptyAddSamples       = document.getElementById('btnEmptyAddSamples');
  const kpiCardToday             = document.getElementById('kpiCardToday');
  const kpiCardUpcoming          = document.getElementById('kpiCardUpcoming');
  const kpiCardPending           = document.getElementById('kpiCardPending');
  const kpiTodayCount            = document.getElementById('kpiTodayCount');
  const kpiUpcomingCount         = document.getElementById('kpiUpcomingCount');
  const kpiPendingCount          = document.getElementById('kpiPendingCount');
  const reserveSearchInput       = document.getElementById('reserveSearchInput');
  const btnClearReserveSearch    = document.getElementById('btnClearReserveSearch');
  const dateFilterGroup          = document.getElementById('dateFilterGroup');
  const statusFilterGroup        = document.getElementById('statusFilterGroup');
  const reserveStatsText         = document.getElementById('reserveStatsText');

  // Modals
  const photoModal         = document.getElementById('photoModal');
  const photoModalTitle    = document.getElementById('photoModalTitle');
  const photoForm          = document.getElementById('photoForm');
  const photoDropzone      = document.getElementById('photoDropzone');
  const photoFileInput     = document.getElementById('photoFileInput');
  const photoPreviewBox    = document.getElementById('photoPreviewBox');
  const photoPreviewImg    = document.getElementById('photoPreviewImg');
  const photoPreviewSize   = document.getElementById('photoPreviewSize');
  const photoTitle         = document.getElementById('photoTitle');
  const photoSubtitle      = document.getElementById('photoSubtitle');
  const photoCaption       = document.getElementById('photoCaption');

  const cardModal          = document.getElementById('cardModal');
  const cardModalTitle     = document.getElementById('cardModalTitle');
  const cardForm           = document.getElementById('cardForm');
  const cardIcon           = document.getElementById('cardIcon');
  const cardTitle          = document.getElementById('cardTitle');
  const cardDesc           = document.getElementById('cardDesc');

  // Category Modal
  const categoryModal      = document.getElementById('categoryModal');
  const categoryModalTitle = document.getElementById('categoryModalTitle');
  const categoryForm       = document.getElementById('categoryForm');
  const categoryIcon       = document.getElementById('categoryIcon');
  const categoryName       = document.getElementById('categoryName');
  const categorySlug       = document.getElementById('categorySlug');

  // Dish Modal
  const dishModal          = document.getElementById('dishModal');
  const dishModalTitle     = document.getElementById('dishModalTitle');
  const dishForm           = document.getElementById('dishForm');
  const dishCategory       = document.getElementById('dishCategory');
  const dishSubcategory    = document.getElementById('dishSubcategory');
  const dishSubcategoryList= document.getElementById('dishSubcategoryList');
  const dishTitle          = document.getElementById('dishTitle');
  const dishPrice          = document.getElementById('dishPrice');
  const dishDesc           = document.getElementById('dishDesc');
  const dishIngredients    = document.getElementById('dishIngredients');
  const dishDropzone       = document.getElementById('dishDropzone');
  const dishFileInput      = document.getElementById('dishFileInput');
  const dishPreviewBox     = document.getElementById('dishPreviewBox');
  const dishPreviewImg     = document.getElementById('dishPreviewImg');
  const dishPreviewSize    = document.getElementById('dishPreviewSize');
  const btnRemoveDishImg   = document.getElementById('btnRemoveDishImg');

  // Move Dish Modal
  const moveDishModal        = document.getElementById('moveDishModal');
  const moveDishForm         = document.getElementById('moveDishForm');
  const moveDishName         = document.getElementById('moveDishName');
  const moveTargetCategory   = document.getElementById('moveTargetCategory');
  const moveTargetSubcategory= document.getElementById('moveTargetSubcategory');
  const moveSubcatList       = document.getElementById('moveSubcatList');

  // Confirm Modal & Toast
  const confirmModal         = document.getElementById('confirmModal');
  const confirmModalTitle     = document.getElementById('confirmModalTitle');
  const confirmModalMessage   = document.getElementById('confirmModalMessage');
  const confirmModalActionBtn = document.getElementById('confirmModalActionBtn');
  const adminToast           = document.getElementById('adminToast');
  let confirmCallback        = null;

  // =========================================================================
  // 3. AUTHENTICATION & SESSION
  // =========================================================================
  function isAuthenticated() {
    try {
      return sessionStorage.getItem(CONFIG.sessionKey) === 'true';
    } catch (_) {
      return false;
    }
  }

  function setAuthenticated(status) {
    try {
      if (status) {
        sessionStorage.setItem(CONFIG.sessionKey, 'true');
      } else {
        sessionStorage.removeItem(CONFIG.sessionKey);
      }
    } catch (_) {}
  }

  function showLogin() {
    loginView.style.display = 'flex';
    adminApp.style.display  = 'none';
    if (loginUser) loginUser.value = '';
    if (loginPass) loginPass.value = '';
    if (loginError) loginError.style.display = 'none';
  }

  function showDashboard() {
    loginView.style.display = 'none';
    adminApp.style.display  = 'flex';
    initDashboard();
  }

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = (loginUser.value || '').trim();
    const pass = (loginPass.value || '').trim();

    if (user === CONFIG.username && pass === CONFIG.password) {
      setAuthenticated(true);
      showDashboard();
      showToast('Welcome back, Administrator!');
    } else {
      loginError.style.display = 'block';
      loginError.textContent = 'Invalid credentials. Please verify username and password.';
      loginPass.value = '';
      loginPass.focus();
    }
  });

  logoutBtn.addEventListener('click', () => {
    setAuthenticated(false);
    showLogin();
    showToast('Signed out successfully.');
  });

  // =========================================================================
  // 4. STORAGE QUOTA MONITORING
  // =========================================================================
  function updateStorageMeter() {
    let totalBytes = 0;
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        const v = localStorage.getItem(k);
        totalBytes += (k.length + v.length) * 2; // Approximate UTF-16 bytes
      }
    } catch (_) {}

    const maxQuota = 5 * 1024 * 1024; // 5 MB typical limit
    const pct = Math.min(100, Math.round((totalBytes / maxQuota) * 100));
    const kbUsed = Math.round(totalBytes / 1024);

    if (storageUsageText) {
      storageUsageText.textContent = `${kbUsed} KB / 5 MB (${pct}%)`;
    }
    if (storageUsageBar) {
      storageUsageBar.style.width = `${pct}%`;
      storageUsageBar.className = 'admin-storage-bar-fill';
      if (pct > 80) storageUsageBar.classList.add('danger');
      else if (pct > 60) storageUsageBar.classList.add('warn');
    }

    const isHigh = pct >= 80;
    if (storageAlertBanner) storageAlertBanner.classList.toggle('active', isHigh);
    if (menuStorageAlertBanner) menuStorageAlertBanner.classList.toggle('active', isHigh);
  }

  // =========================================================================
  // 5. NAVIGATION CONTROLLER
  // =========================================================================
  function switchNav(navKey) {
    currentNav = navKey;
    navLinks.forEach(l => {
      l.classList.toggle('active', l.getAttribute('data-nav') === navKey);
    });

    Object.keys(viewPanels).forEach(k => {
      if (viewPanels[k]) {
        viewPanels[k].style.display = (k === navKey) ? '' : 'none';
      }
    });

    const titles = {
      gallery:      'Gallery Manager',
      about:        'About Content Manager',
      menu:         'Heritage Menu Manager',
      reservations: 'Guest Reservations Manager'
    };
    if (pageHeading) pageHeading.textContent = titles[navKey] || 'Admin Portal';

    if (navKey === 'gallery') renderGallery();
    else if (navKey === 'about') renderAboutEditor();
    else if (navKey === 'menu') renderMenuManager();
    else if (navKey === 'reservations') renderReservationsManager();

    // Close mobile menu if open
    adminSidebar.classList.remove('open');
    window.location.hash = `#${navKey}`;
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const navKey = link.getAttribute('data-nav');
      if (navKey) switchNav(navKey);
    });
  });

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      adminSidebar.classList.toggle('open');
    });
  }

  // =========================================================================
  // 6. GALLERY MANAGER
  // =========================================================================

  function getOrInitGalleryData() {
    let stored = STORE ? STORE.getGallery() : null;
    if (!stored || (!Array.isArray(stored.ambiance) && !Array.isArray(stored.food))) {
      stored = JSON.parse(JSON.stringify(SEED.gallery));
    }
    return {
      ambiance: Array.isArray(stored.ambiance) ? stored.ambiance : (SEED.gallery.ambiance || []),
      food:     Array.isArray(stored.food)     ? stored.food     : (SEED.gallery.food || [])
    };
  }

  function saveGalleryData(showToastNotice = true) {
    if (!STORE) return false;
    try {
      const success = STORE.setGallery(currentGalleryData);
      if (!success) {
        showToast('Storage limit reached! Please use smaller images.', true);
        return false;
      }
      updateStorageMeter();
      updateBadges();
      if (showToastNotice) showToast('Gallery updated successfully.');
      return true;
    } catch (err) {
      console.error('[Admin] Error saving gallery:', err);
      showToast('Error: Browser storage quota exceeded.', true);
      return false;
    }
  }

  function resolveAdminImgSrc(src) {
    if (!src) return '';
    if (src.startsWith('data:') || src.startsWith('http://') || src.startsWith('https://')) {
      return src;
    }
    if (src.startsWith('/')) {
      return src;
    }
    const clean = src.replace(/^\.\.\//, '');
    return `/${clean}`;
  }

  function renderGallery() {
    if (!currentGalleryData) {
      currentGalleryData = getOrInitGalleryData();
    }

    const items = currentGalleryData[currentGalleryTab] || [];
    galleryCardsGrid.innerHTML = '';

    if (items.length === 0) {
      galleryCardsGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; background: #ffffff; border-radius: 10px; border: 1px dashed #d6ccba;">
          <p style="font-size: 1.1rem; color: var(--adm-text-muted);">No photos in this tab. Click "+ Add New Photo" to add one.</p>
        </div>
      `;
      return;
    }

    items.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'admin-photo-card';

      const imgSrc = resolveAdminImgSrc(item.src);

      card.innerHTML = `
        <div class="admin-photo-thumb-wrap">
          <img src="${imgSrc}" alt="${escapeHTML(item.title)}" class="admin-photo-thumb" loading="lazy" onerror="this.src='/assets/gallery/ambiance-1.jpg'" />
          <span class="admin-photo-index">#${index + 1}</span>
        </div>
        <div class="admin-photo-body">
          <h3 class="admin-photo-title">${escapeHTML(item.title)}</h3>
          <p class="admin-photo-subtitle">${escapeHTML(item.subtitle)}</p>
          <p class="admin-photo-caption">${escapeHTML(item.caption)}</p>
          <div class="admin-card-actions">
            <div class="admin-reorder-group">
              <button class="admin-icon-btn btn-move-up" title="Move Up" ${index === 0 ? 'disabled' : ''}>↑</button>
              <button class="admin-icon-btn btn-move-down" title="Move Down" ${index === items.length - 1 ? 'disabled' : ''}>↓</button>
            </div>
            <div class="admin-edit-del-group">
              <button class="admin-btn admin-btn-sm admin-btn-secondary btn-edit-photo">Edit</button>
              <button class="admin-btn admin-btn-sm admin-btn-danger btn-delete-photo">Delete</button>
            </div>
          </div>
        </div>
      `;

      const upBtn   = card.querySelector('.btn-move-up');
      const downBtn = card.querySelector('.btn-move-down');
      const editBtn = card.querySelector('.btn-edit-photo');
      const delBtn  = card.querySelector('.btn-delete-photo');

      if (upBtn) {
        upBtn.addEventListener('click', () => {
          if (index > 0) {
            const temp = items[index - 1];
            items[index - 1] = items[index];
            items[index] = temp;
            saveGalleryData(false);
            renderGallery();
            showToast('Reordered photo.');
          }
        });
      }

      if (downBtn) {
        downBtn.addEventListener('click', () => {
          if (index < items.length - 1) {
            const temp = items[index + 1];
            items[index + 1] = items[index];
            items[index] = temp;
            saveGalleryData(false);
            renderGallery();
            showToast('Reordered photo.');
          }
        });
      }

      if (editBtn) {
        editBtn.addEventListener('click', () => openPhotoModal(index));
      }

      if (delBtn) {
        delBtn.addEventListener('click', () => {
          openConfirmModal(
            'Delete Photo',
            `Are you sure you want to delete "${item.title}" from ${currentGalleryTab} gallery? This action cannot be undone.`,
            () => {
              items.splice(index, 1);
              saveGalleryData();
              renderGallery();
            }
          );
        });
      }

      galleryCardsGrid.appendChild(card);
    });
  }

  galleryTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentGalleryTab = btn.getAttribute('data-gallery-tab') || 'ambiance';
      renderGallery();
    });
  });

  btnResetGallery.addEventListener('click', () => {
    openConfirmModal(
      'Reset Gallery to Original',
      'This will reset both Ambiance and Food galleries back to the 10 original default photos. All uploaded photos and reorderings will be discarded. Continue?',
      () => {
        if (STORE) STORE.resetGallery();
        currentGalleryData = JSON.parse(JSON.stringify(SEED.gallery));
        renderGallery();
        updateStorageMeter();
        updateBadges();
        showToast('Gallery restored to original defaults.');
      }
    );
  });

  btnAddPhoto.addEventListener('click', () => {
    openPhotoModal(null);
  });

  function openPhotoModal(editIndex) {
    activeEditingPhotoIndex = editIndex;
    photoPendingBase64 = null;
    photoFileInput.value = '';

    if (editIndex !== null) {
      const item = currentGalleryData[currentGalleryTab][editIndex];
      photoModalTitle.textContent = `Edit Photo (${currentGalleryTab.toUpperCase()})`;
      photoTitle.value = item.title || '';
      photoSubtitle.value = item.subtitle || '';
      photoCaption.value = item.caption || '';

      photoPendingBase64 = item.src;
      photoPreviewImg.src = resolveAdminImgSrc(item.src);
      photoPreviewBox.style.display = 'block';
      photoPreviewSize.textContent = item.src.startsWith('data:') ? `${Math.round(item.src.length / 1024)} KB` : 'Original Asset';
    } else {
      photoModalTitle.textContent = `Add Photo to ${currentGalleryTab.toUpperCase()}`;
      photoTitle.value = '';
      photoSubtitle.value = '';
      photoCaption.value = '';
      photoPreviewBox.style.display = 'none';
      photoPreviewImg.src = '';
    }

    openModal(photoModal);
  }

  function processAndResizeImage(file, maxWidth, quality, callback) {
    if (!file || !file.type.startsWith('image/')) {
      showToast('Please select a valid image file.', true);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const base64Data = canvas.toDataURL('image/jpeg', quality);
        callback(base64Data, width, height);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  photoFileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      processAndResizeImage(e.target.files[0], 1200, 0.82, (base64, w, h) => {
        photoPendingBase64 = base64;
        photoPreviewImg.src = base64;
        photoPreviewBox.style.display = 'block';
        const kb = Math.round(base64.length * 0.75 / 1024);
        photoPreviewSize.textContent = `Optimized: ${w}×${h} (${kb} KB)`;
      });
    }
  });

  // Dropzone drag-and-drop
  ['dragenter', 'dragover'].forEach(eventName => {
    photoDropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      photoDropzone.classList.add('dragover');
    });
  });
  ['dragleave', 'drop'].forEach(eventName => {
    photoDropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      photoDropzone.classList.remove('dragover');
    });
  });
  photoDropzone.addEventListener('drop', (e) => {
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
      processAndResizeImage(e.dataTransfer.files[0], 1200, 0.82, (base64, w, h) => {
        photoPendingBase64 = base64;
        photoPreviewImg.src = base64;
        photoPreviewBox.style.display = 'block';
        const kb = Math.round(base64.length * 0.75 / 1024);
        photoPreviewSize.textContent = `Optimized: ${w}×${h} (${kb} KB)`;
      });
    }
  });

  photoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!photoPendingBase64) {
      showToast('Please select or upload an image file.', true);
      return;
    }

    const title    = photoTitle.value.trim();
    const subtitle = photoSubtitle.value.trim();
    const caption  = photoCaption.value.trim();

    if (!title || !subtitle) {
      showToast('Please enter both title and subtitle.', true);
      return;
    }

    const item = {
      src: photoPendingBase64,
      title,
      subtitle,
      caption: caption || title
    };

    if (activeEditingPhotoIndex !== null) {
      currentGalleryData[currentGalleryTab][activeEditingPhotoIndex] = item;
    } else {
      currentGalleryData[currentGalleryTab].push(item);
    }

    const saved = saveGalleryData(true);
    if (saved) {
      closeModal(photoModal);
      renderGallery();
    }
  });

  // =========================================================================
  // 7. ABOUT CONTENT MANAGER
  // =========================================================================

  function getOrInitAboutData() {
    let stored = STORE ? STORE.getAbout() : null;
    if (!stored || typeof stored !== 'object' || !Array.isArray(stored.cards)) {
      stored = JSON.parse(JSON.stringify(SEED.about));
    }
    return {
      heroTag:      stored.heroTag      || SEED.about.heroTag,
      heroTitle:    stored.heroTitle    || SEED.about.heroTitle,
      heroSubtitle: stored.heroSubtitle || SEED.about.heroSubtitle,
      lead:         stored.lead         || SEED.about.lead,
      cards:        Array.isArray(stored.cards) ? stored.cards : JSON.parse(JSON.stringify(SEED.about.cards)),
      quote:        stored.quote        || SEED.about.quote,
      quoteSign:    stored.quoteSign    || SEED.about.quoteSign
    };
  }

  function renderAboutEditor() {
    if (!currentAboutData) {
      currentAboutData = getOrInitAboutData();
    }

    aboutHeroTag.value      = currentAboutData.heroTag || '';
    aboutHeroTitle.value    = currentAboutData.heroTitle || '';
    aboutHeroSubtitle.value = currentAboutData.heroSubtitle || '';
    aboutLead.value         = currentAboutData.lead || '';
    aboutQuote.value        = currentAboutData.quote || '';
    aboutQuoteSign.value    = currentAboutData.quoteSign || '';

    renderStoryCardsList();
  }

  function renderStoryCardsList() {
    storyCardsList.innerHTML = '';
    const cards = currentAboutData.cards || [];

    if (cards.length === 0) {
      storyCardsList.innerHTML = `
        <p style="color: var(--adm-text-muted); font-size: 0.9rem; padding: 12px; background: #ffffff; border-radius: 6px; border: 1px dashed #d6ccba;">
          No heritage cards. Click "+ Add Heritage Card" to create one.
        </p>
      `;
      return;
    }

    cards.forEach((card, index) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'admin-story-card-item';
      cardEl.innerHTML = `
        <div class="admin-story-card-icon">${card.icon || '❁'}</div>
        <div class="admin-story-card-content">
          <h4 class="admin-story-card-title">${escapeHTML(card.title)}</h4>
          <p class="admin-story-card-desc">${escapeHTML(card.desc)}</p>
        </div>
        <div style="display: flex; gap: 4px; align-self: center;">
          <button class="admin-icon-btn btn-card-up" title="Move Up" ${index === 0 ? 'disabled' : ''}>↑</button>
          <button class="admin-icon-btn btn-card-down" title="Move Down" ${index === cards.length - 1 ? 'disabled' : ''}>↓</button>
          <button class="admin-btn admin-btn-sm admin-btn-secondary btn-card-edit" type="button">Edit</button>
          <button class="admin-btn admin-btn-sm admin-btn-danger btn-card-del" type="button">✕</button>
        </div>
      `;

      cardEl.querySelector('.btn-card-up')?.addEventListener('click', () => {
        if (index > 0) {
          const t = cards[index - 1];
          cards[index - 1] = cards[index];
          cards[index] = t;
          renderStoryCardsList();
        }
      });

      cardEl.querySelector('.btn-card-down')?.addEventListener('click', () => {
        if (index < cards.length - 1) {
          const t = cards[index + 1];
          cards[index + 1] = cards[index];
          cards[index] = t;
          renderStoryCardsList();
        }
      });

      cardEl.querySelector('.btn-card-edit')?.addEventListener('click', () => {
        openCardModal(index);
      });

      cardEl.querySelector('.btn-card-del')?.addEventListener('click', () => {
        openConfirmModal(
          'Delete Heritage Card',
          `Are you sure you want to delete the story card "${card.title}"?`,
          () => {
            cards.splice(index, 1);
            renderStoryCardsList();
          }
        );
      });

      storyCardsList.appendChild(cardEl);
    });
  }

  function openCardModal(editIndex) {
    activeEditingCardIndex = editIndex;
    if (editIndex !== null) {
      const c = currentAboutData.cards[editIndex];
      cardModalTitle.textContent = 'Edit Heritage Story Card';
      cardIcon.value  = c.icon || '❁';
      cardTitle.value = c.title || '';
      cardDesc.value  = c.desc || '';
    } else {
      cardModalTitle.textContent = 'Add Heritage Story Card';
      cardIcon.value  = '❁';
      cardTitle.value = '';
      cardDesc.value  = '';
    }
    openModal(cardModal);
  }

  btnAddStoryCard.addEventListener('click', () => openCardModal(null));

  cardForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const item = {
      icon:  cardIcon.value.trim() || '❁',
      title: cardTitle.value.trim(),
      desc:  cardDesc.value.trim()
    };
    if (!item.title || !item.desc) return;

    if (activeEditingCardIndex !== null) {
      currentAboutData.cards[activeEditingCardIndex] = item;
    } else {
      currentAboutData.cards.push(item);
    }

    closeModal(cardModal);
    renderStoryCardsList();
    showToast('Heritage card updated.');
  });

  btnSaveAbout.addEventListener('click', () => {
    currentAboutData.heroTag      = aboutHeroTag.value.trim();
    currentAboutData.heroTitle    = aboutHeroTitle.value.trim();
    currentAboutData.heroSubtitle = aboutHeroSubtitle.value.trim();
    currentAboutData.lead         = aboutLead.value.trim();
    currentAboutData.quote        = aboutQuote.value.trim();
    currentAboutData.quoteSign    = aboutQuoteSign.value.trim();

    if (STORE) {
      STORE.setAbout(currentAboutData);
    }
    updateStorageMeter();
    showToast('About page content saved successfully!');
  });

  btnResetAbout.addEventListener('click', () => {
    openConfirmModal(
      'Reset About to Original',
      'This will reset the About page back to original defaults. All custom titles, story paragraphs, and heritage cards will be replaced. Continue?',
      () => {
        if (STORE) STORE.resetAbout();
        currentAboutData = JSON.parse(JSON.stringify(SEED.about));
        renderAboutEditor();
        updateStorageMeter();
        showToast('About page restored to original defaults.');
      }
    );
  });

  // =========================================================================
  // 8. HERITAGE MENU MANAGER (CATEGORIES & DISHES)
  // =========================================================================

  function getOrInitCategories() {
    let stored = STORE ? STORE.getCategories() : null;
    if (!Array.isArray(stored) || stored.length === 0) {
      stored = JSON.parse(JSON.stringify(SEED.categories));
    }
    return stored;
  }

  function getOrInitMenuData() {
    let stored = STORE ? STORE.getMenuItems() : null;
    if (!Array.isArray(stored) || stored.length === 0) {
      stored = JSON.parse(JSON.stringify(SEED.menuItems));
    }
    return stored;
  }

  function saveCategories(showNotice = true) {
    if (!STORE) return false;
    try {
      const ok = STORE.setCategories(currentCategoriesData);
      updateStorageMeter();
      updateBadges();
      if (ok && showNotice) showToast('Categories saved successfully.');
      return ok;
    } catch (e) {
      showToast('Error saving categories: quota exceeded.', true);
      return false;
    }
  }

  function saveMenuData(showNotice = true) {
    if (!STORE) return false;
    try {
      const ok = STORE.setMenuItems(currentMenuData);
      updateStorageMeter();
      updateBadges();
      if (ok && showNotice) showToast('Menu dishes saved successfully.');
      return ok;
    } catch (e) {
      showToast('Error saving dishes: quota exceeded.', true);
      return false;
    }
  }

  function renderMenuManager() {
    if (!currentCategoriesData) {
      currentCategoriesData = getOrInitCategories();
    }
    if (!currentMenuData) {
      currentMenuData = getOrInitMenuData();
    }

    renderCategoryPills();
    renderDishesList();
  }

  // --- Categories Controller ---
  function renderCategoryPills() {
    if (!categoryPillsContainer) return;
    categoryPillsContainer.innerHTML = '';

    if (categoriesTotalCount) {
      categoriesTotalCount.textContent = currentCategoriesData.length;
    }

    // 1. "All Dishes" Pill
    const allPill = document.createElement('div');
    allPill.className = `admin-cat-pill ${selectedMenuCategory === 'all' ? 'active' : ''}`;
    allPill.innerHTML = `
      <span class="admin-cat-pill-icon">🍽️</span>
      <span>All Dishes</span>
      <span class="admin-cat-pill-count">${currentMenuData.length}</span>
    `;
    allPill.addEventListener('click', () => {
      selectedMenuCategory = 'all';
      renderCategoryPills();
      renderDishesList();
    });
    categoryPillsContainer.appendChild(allPill);

    // 2. Individual Category Pills (in current order)
    currentCategoriesData.forEach((cat, index) => {
      const dishCount = currentMenuData.filter(d => d.category === cat.id).length;
      const pill = document.createElement('div');
      pill.className = `admin-cat-pill ${selectedMenuCategory === cat.id ? 'active' : ''}`;

      pill.innerHTML = `
        <span class="admin-cat-pill-icon">${cat.icon || '🍽️'}</span>
        <span>${escapeHTML(cat.label || cat.id)}</span>
        <span class="admin-cat-pill-count">${dishCount}</span>
        <span class="admin-cat-pill-actions">
          <button class="admin-cat-mini-btn btn-cat-up" title="Move Left" ${index === 0 ? 'disabled' : ''}>◀</button>
          <button class="admin-cat-mini-btn btn-cat-down" title="Move Right" ${index === currentCategoriesData.length - 1 ? 'disabled' : ''}>▶</button>
          <button class="admin-cat-mini-btn btn-cat-edit" title="Edit Category">✏️</button>
          <button class="admin-cat-mini-btn btn-cat-del" title="Delete Category">✕</button>
        </span>
      `;

      // Click pill body to select category
      pill.addEventListener('click', (e) => {
        if (e.target.closest('.admin-cat-mini-btn')) return; // ignore action buttons
        selectedMenuCategory = cat.id;
        renderCategoryPills();
        renderDishesList();
      });

      // Move left/up
      pill.querySelector('.btn-cat-up')?.addEventListener('click', (e) => {
        e.stopPropagation();
        if (index > 0) {
          const t = currentCategoriesData[index - 1];
          currentCategoriesData[index - 1] = currentCategoriesData[index];
          currentCategoriesData[index] = t;
          saveCategories(false);
          renderCategoryPills();
          renderDishesList();
          showToast(`Moved "${cat.label}" up.`);
        }
      });

      // Move right/down
      pill.querySelector('.btn-cat-down')?.addEventListener('click', (e) => {
        e.stopPropagation();
        if (index < currentCategoriesData.length - 1) {
          const t = currentCategoriesData[index + 1];
          currentCategoriesData[index + 1] = currentCategoriesData[index];
          currentCategoriesData[index] = t;
          saveCategories(false);
          renderCategoryPills();
          renderDishesList();
          showToast(`Moved "${cat.label}" down.`);
        }
      });

      // Edit
      pill.querySelector('.btn-cat-edit')?.addEventListener('click', (e) => {
        e.stopPropagation();
        openCategoryModal(index);
      });

      // Delete with strong confirmation if dishes exist
      pill.querySelector('.btn-cat-del')?.addEventListener('click', (e) => {
        e.stopPropagation();
        const dishesInCat = currentMenuData.filter(d => d.category === cat.id);
        const count = dishesInCat.length;

        const warningMsg = count > 0
          ? `⚠️ STRONG WARNING: The category "${cat.label}" currently contains ${count} dish${count === 1 ? '' : 'es'}.\n\nDeleting this category will PERMANENTLY REMOVE all ${count} dishes associated with it from the menu. Are you sure you wish to proceed?`
          : `Are you sure you want to delete the category "${cat.label}"?`;

        openConfirmModal('Delete Category', warningMsg, () => {
          // Remove category
          currentCategoriesData.splice(index, 1);
          // Remove associated dishes
          if (count > 0) {
            currentMenuData = currentMenuData.filter(d => d.category !== cat.id);
            saveMenuData(false);
          }
          saveCategories(false);

          if (selectedMenuCategory === cat.id) {
            selectedMenuCategory = 'all';
          }
          renderCategoryPills();
          renderDishesList();
          showToast(`Category "${cat.label}" and its dishes were removed.`);
        });
      });

      categoryPillsContainer.appendChild(pill);
    });
  }

  // Add / Edit Category Modal
  function openCategoryModal(index) {
    activeEditingCategoryIndex = index;

    if (index !== null) {
      const cat = currentCategoriesData[index];
      categoryModalTitle.textContent = 'Edit Category';
      categoryName.value = cat.label || '';
      categoryIcon.value = cat.icon || '🍽️';
      categorySlug.value = cat.id || '';
      categorySlug.readOnly = false;
    } else {
      categoryModalTitle.textContent = 'Add New Category';
      categoryName.value = '';
      categoryIcon.value = '🍽️';
      categorySlug.value = '';
      categorySlug.readOnly = false;
    }
    openModal(categoryModal);
  }

  // Auto-slug generator on name input
  categoryName.addEventListener('input', () => {
    if (activeEditingCategoryIndex === null) {
      categorySlug.value = categoryName.value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }
  });

  btnAddCategoryBtn.addEventListener('click', () => openCategoryModal(null));

  categoryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const label = categoryName.value.trim();
    const icon  = categoryIcon.value.trim() || '🍽️';
    const slug  = categorySlug.value.trim().toLowerCase().replace(/[^a-z0-9_-]+/g, '-');

    if (!label || !slug) {
      showToast('Please provide both name and slug.', true);
      return;
    }

    // Check slug uniqueness
    const exists = currentCategoriesData.some((c, i) => c.id === slug && i !== activeEditingCategoryIndex);
    if (exists) {
      showToast('A category with this identifier already exists.', true);
      return;
    }

    if (activeEditingCategoryIndex !== null) {
      const oldId = currentCategoriesData[activeEditingCategoryIndex].id;
      currentCategoriesData[activeEditingCategoryIndex] = { id: slug, label, icon };

      // If id changed, cascade update to existing dishes
      if (oldId !== slug) {
        currentMenuData.forEach(d => {
          if (d.category === oldId) d.category = slug;
        });
        saveMenuData(false);
      }
      showToast('Category updated.');
    } else {
      currentCategoriesData.push({ id: slug, label, icon });
      selectedMenuCategory = slug;
      showToast(`Category "${label}" created.`);
    }

    saveCategories(false);
    closeModal(categoryModal);
    renderCategoryPills();
    renderDishesList();
  });

  // --- Dishes Controller ---
  function renderDishesList() {
    if (!dishesListContainer) return;
    dishesListContainer.innerHTML = '';

    const query = (dishSearchInput.value || '').trim().toLowerCase();
    menuSearchQuery = query;

    if (btnClearDishSearch) {
      btnClearDishSearch.style.display = query ? 'block' : 'none';
    }

    // Filter dishes
    let filtered = currentMenuData.filter(d => {
      // Category filter
      if (selectedMenuCategory !== 'all' && d.category !== selectedMenuCategory) {
        return false;
      }
      // Search query filter
      if (query) {
        const titleMatch = (d.title || '').toLowerCase().includes(query);
        const descMatch  = (d.desc || '').toLowerCase().includes(query);
        const ingMatch   = (d.ingredients || '').toLowerCase().includes(query);
        const subMatch   = (d.subcategory || '').toLowerCase().includes(query);
        if (!titleMatch && !descMatch && !ingMatch && !subMatch) return false;
      }
      return true;
    });

    // Update stats
    if (dishStatsText) {
      const catLabel = selectedMenuCategory === 'all'
        ? 'All Categories'
        : (currentCategoriesData.find(c => c.id === selectedMenuCategory)?.label || selectedMenuCategory);
      dishStatsText.textContent = query
        ? `Found ${filtered.length} dish${filtered.length === 1 ? '' : 'es'} matching "${query}"`
        : `Showing ${filtered.length} dish${filtered.length === 1 ? '' : 'es'} in ${catLabel}`;
    }

    if (filtered.length === 0) {
      dishesListContainer.innerHTML = `
        <div class="admin-card-panel" style="text-align: center; padding: 48px 20px; color: var(--adm-text-muted);">
          <div style="font-size: 2.2rem; margin-bottom: 8px;">🍲</div>
          <h3 style="font-family: var(--adm-font-serif); margin-bottom: 6px; color: var(--adm-green-deep);">No dishes found</h3>
          <p style="font-size: 0.9rem;">${query ? 'Try a different search term or clear the filter.' : 'Click "+ Add New Dish" above to create a dish in this category.'}</p>
        </div>
      `;
      return;
    }

    // Group filtered dishes by subcategory (preserving order of appearance)
    const subcategories = [];
    filtered.forEach(d => {
      const sub = d.subcategory || 'General';
      if (!subcategories.includes(sub)) subcategories.push(sub);
    });

    subcategories.forEach(subName => {
      const subDishes = filtered.filter(d => (d.subcategory || 'General') === subName);

      const block = document.createElement('div');
      block.className = 'admin-subcategory-block';

      block.innerHTML = `
        <div class="admin-subcategory-header">
          <span>❖ ${escapeHTML(subName)}</span>
          <span style="font-size: 0.8rem; font-weight: normal; color: var(--adm-text-muted);">${subDishes.length} dish${subDishes.length === 1 ? '' : 'es'}</span>
        </div>
        <div class="admin-subcategory-dishes"></div>
      `;

      const dishesWrap = block.querySelector('.admin-subcategory-dishes');

      subDishes.forEach((dish, subIndex) => {
        const globalIndex = currentMenuData.indexOf(dish);
        const row = document.createElement('div');
        row.className = 'admin-dish-row';

        const imgSrc = resolveAdminImgSrc(dish.image || 'assets/gallery/food-1.jpg');
        const catObj = currentCategoriesData.find(c => c.id === dish.category);
        const catBadge = catObj ? `${catObj.icon} ${catObj.label}` : dish.category;

        row.innerHTML = `
          <img src="${imgSrc}" alt="${escapeHTML(dish.title)}" class="admin-dish-thumb" onerror="this.src='/assets/gallery/food-1.jpg'" />
          <div class="admin-dish-info">
            <div class="admin-dish-title-row">
              <h4 class="admin-dish-name">${escapeHTML(dish.title)}</h4>
              <span class="admin-dish-price">${escapeHTML(dish.price)}</span>
              ${selectedMenuCategory === 'all' || query ? `<span class="admin-dish-cat-badge">${escapeHTML(catBadge)}</span>` : ''}
            </div>
            ${dish.desc ? `<p class="admin-dish-desc">${escapeHTML(dish.desc)}</p>` : ''}
            ${dish.ingredients ? `<p class="admin-dish-ing"><strong>Ingredients:</strong> ${escapeHTML(dish.ingredients)}</p>` : ''}
          </div>
          <div class="admin-dish-actions">
            <button class="admin-icon-btn btn-dish-up" title="Move Up" ${subIndex === 0 ? 'disabled' : ''}>↑</button>
            <button class="admin-icon-btn btn-dish-down" title="Move Down" ${subIndex === subDishes.length - 1 ? 'disabled' : ''}>↓</button>
            <button class="admin-btn admin-btn-sm admin-btn-secondary btn-dish-move" type="button">Move</button>
            <button class="admin-btn admin-btn-sm admin-btn-secondary btn-dish-edit" type="button">Edit</button>
            <button class="admin-btn admin-btn-sm admin-btn-danger btn-dish-del" type="button">✕</button>
          </div>
        `;

        // Reorder Up
        row.querySelector('.btn-dish-up')?.addEventListener('click', () => {
          if (subIndex > 0) {
            const prevDish = subDishes[subIndex - 1];
            const prevGlobalIndex = currentMenuData.indexOf(prevDish);
            currentMenuData[globalIndex] = prevDish;
            currentMenuData[prevGlobalIndex] = dish;
            saveMenuData(false);
            renderDishesList();
          }
        });

        // Reorder Down
        row.querySelector('.btn-dish-down')?.addEventListener('click', () => {
          if (subIndex < subDishes.length - 1) {
            const nextDish = subDishes[subIndex + 1];
            const nextGlobalIndex = currentMenuData.indexOf(nextDish);
            currentMenuData[globalIndex] = nextDish;
            currentMenuData[nextGlobalIndex] = dish;
            saveMenuData(false);
            renderDishesList();
          }
        });

        // Move to another category
        row.querySelector('.btn-dish-move')?.addEventListener('click', () => {
          openMoveDishModal(globalIndex);
        });

        // Edit
        row.querySelector('.btn-dish-edit')?.addEventListener('click', () => {
          openDishModal(globalIndex);
        });

        // Delete
        row.querySelector('.btn-dish-del')?.addEventListener('click', () => {
          openConfirmModal(
            'Delete Dish',
            `Are you sure you want to delete "${dish.title}" (${dish.price})?`,
            () => {
              currentMenuData.splice(globalIndex, 1);
              saveMenuData(true);
              renderCategoryPills();
              renderDishesList();
            }
          );
        });

        dishesWrap.appendChild(row);
      });

      dishesListContainer.appendChild(block);
    });
  }

  // Search input listeners
  dishSearchInput.addEventListener('input', () => {
    renderDishesList();
  });
  btnClearDishSearch.addEventListener('click', () => {
    dishSearchInput.value = '';
    renderDishesList();
  });

  // --- Add / Edit Dish Modal ---
  function openDishModal(index) {
    activeEditingDishIndex = index;
    dishPendingBase64 = null;
    dishFileInput.value = '';

    // Populate category select
    dishCategory.innerHTML = '';
    currentCategoriesData.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat.id;
      opt.textContent = `${cat.icon || '🍽️'} ${cat.label || cat.id}`;
      dishCategory.appendChild(opt);
    });

    function updateSubcategoryDatalist(catId) {
      dishSubcategoryList.innerHTML = '';
      const existingSubs = [];
      currentMenuData.filter(d => d.category === catId).forEach(d => {
        if (d.subcategory && !existingSubs.includes(d.subcategory)) {
          existingSubs.push(d.subcategory);
        }
      });
      existingSubs.forEach(sub => {
        const opt = document.createElement('option');
        opt.value = sub;
        dishSubcategoryList.appendChild(opt);
      });
    }

    dishCategory.onchange = () => {
      updateSubcategoryDatalist(dishCategory.value);
    };

    if (index !== null) {
      const dish = currentMenuData[index];
      dishModalTitle.textContent = 'Edit Dish';
      dishCategory.value = dish.category || (currentCategoriesData[0]?.id || '');
      updateSubcategoryDatalist(dishCategory.value);

      dishSubcategory.value = dish.subcategory || '';
      dishTitle.value = dish.title || '';

      // Extract numeric price
      const numericPrice = (dish.price || '').replace(/[^0-9.]/g, '');
      dishPrice.value = numericPrice;
      dishDesc.value = dish.desc || '';
      dishIngredients.value = dish.ingredients || '';

      dishPendingBase64 = dish.image;
      if (dish.image) {
        dishPreviewImg.src = resolveAdminImgSrc(dish.image);
        dishPreviewBox.style.display = 'block';
        dishPreviewSize.textContent = dish.image.startsWith('data:') ? `${Math.round(dish.image.length / 1024)} KB` : 'Preset Photo';
      } else {
        dishPreviewBox.style.display = 'none';
      }
    } else {
      dishModalTitle.textContent = 'Add New Dish';
      const defaultCat = (selectedMenuCategory !== 'all' && currentCategoriesData.some(c => c.id === selectedMenuCategory))
        ? selectedMenuCategory
        : (currentCategoriesData[0]?.id || '');

      dishCategory.value = defaultCat;
      updateSubcategoryDatalist(defaultCat);

      dishSubcategory.value = '';
      dishTitle.value = '';
      dishPrice.value = '';
      dishDesc.value = '';
      dishIngredients.value = '';
      dishPreviewBox.style.display = 'none';
      dishPreviewImg.src = '';
    }

    openModal(dishModal);
  }

  btnAddDishBtn.addEventListener('click', () => openDishModal(null));

  // Dish photo canvas resize to max 800px ~75%
  dishFileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      processAndResizeImage(e.target.files[0], 800, 0.75, (base64, w, h) => {
        dishPendingBase64 = base64;
        dishPreviewImg.src = base64;
        dishPreviewBox.style.display = 'block';
        const kb = Math.round(base64.length * 0.75 / 1024);
        dishPreviewSize.textContent = `Optimized: ${w}×${h} (${kb} KB)`;
      });
    }
  });

  // Dish Dropzone drag & drop
  ['dragenter', 'dragover'].forEach(name => {
    dishDropzone.addEventListener(name, (e) => {
      e.preventDefault();
      dishDropzone.classList.add('dragover');
    });
  });
  ['dragleave', 'drop'].forEach(name => {
    dishDropzone.addEventListener(name, (e) => {
      e.preventDefault();
      dishDropzone.classList.remove('dragover');
    });
  });
  dishDropzone.addEventListener('drop', (e) => {
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
      processAndResizeImage(e.dataTransfer.files[0], 800, 0.75, (base64, w, h) => {
        dishPendingBase64 = base64;
        dishPreviewImg.src = base64;
        dishPreviewBox.style.display = 'block';
        const kb = Math.round(base64.length * 0.75 / 1024);
        dishPreviewSize.textContent = `Optimized: ${w}×${h} (${kb} KB)`;
      });
    }
  });

  btnRemoveDishImg.addEventListener('click', () => {
    dishPendingBase64 = null;
    dishFileInput.value = '';
    dishPreviewBox.style.display = 'none';
    dishPreviewImg.src = '';
  });

  dishForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title       = dishTitle.value.trim();
    const category    = dishCategory.value;
    const subcategory = dishSubcategory.value.trim() || 'Signature Specialties';
    const priceNum    = Math.round(Number(dishPrice.value));
    const desc        = dishDesc.value.trim();
    const ingredients = dishIngredients.value.trim();

    if (!title || isNaN(priceNum) || priceNum <= 0) {
      showToast('Please enter a valid dish name and price.', true);
      return;
    }

    const priceFormatted = `₹ ${priceNum}`;
    const imageSrc = dishPendingBase64 || 'assets/gallery/food-1.jpg';

    if (activeEditingDishIndex !== null) {
      const current = currentMenuData[activeEditingDishIndex];
      currentMenuData[activeEditingDishIndex] = Object.assign({}, current, {
        title,
        category,
        subcategory,
        price: priceFormatted,
        desc,
        ingredients,
        image: imageSrc
      });
      showToast(`Updated "${title}".`);
    } else {
      const newDish = {
        id: 'd_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        category,
        subcategory,
        title,
        desc,
        price: priceFormatted,
        image: imageSrc,
        ingredients
      };
      currentMenuData.push(newDish);
      showToast(`Added "${title}".`);
    }

    saveMenuData(false);
    closeModal(dishModal);
    renderCategoryPills();
    renderDishesList();
  });

  // --- Move Dish Modal ---
  function openMoveDishModal(index) {
    activeMovingDishIndex = index;
    const dish = currentMenuData[index];
    moveDishName.textContent = `"${dish.title}" (${dish.price})`;

    moveTargetCategory.innerHTML = '';
    currentCategoriesData.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat.id;
      opt.textContent = `${cat.icon || '🍽️'} ${cat.label || cat.id}`;
      if (cat.id === dish.category) opt.selected = true;
      moveTargetCategory.appendChild(opt);
    });

    function updateMoveSubcategories(catId) {
      moveSubcatList.innerHTML = '';
      const subs = [];
      currentMenuData.filter(d => d.category === catId).forEach(d => {
        if (d.subcategory && !subs.includes(d.subcategory)) subs.push(d.subcategory);
      });
      subs.forEach(s => {
        const o = document.createElement('option');
        o.value = s;
        moveSubcatList.appendChild(o);
      });
    }

    moveTargetCategory.onchange = () => {
      updateMoveSubcategories(moveTargetCategory.value);
    };

    updateMoveSubcategories(dish.category);
    moveTargetSubcategory.value = dish.subcategory || '';

    openModal(moveDishModal);
  }

  moveDishForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (activeMovingDishIndex === null) return;

    const dish = currentMenuData[activeMovingDishIndex];
    const targetCat = moveTargetCategory.value;
    const targetSub = moveTargetSubcategory.value.trim() || dish.subcategory || 'General';

    dish.category = targetCat;
    dish.subcategory = targetSub;

    saveMenuData(false);
    closeModal(moveDishModal);
    renderCategoryPills();
    renderDishesList();
    showToast(`Moved "${dish.title}" to ${targetCat}.`);
  });

  // --- Reset Menu to Original ---
  btnResetMenu.addEventListener('click', () => {
    openConfirmModal(
      'Reset Menu to Original',
      'This will reset all categories and dishes back to the original 8 categories and 92 dishes. All custom categories, added dishes, edited prices, and reorderings will be permanently replaced with default seed data. Continue?',
      () => {
        if (STORE) {
          STORE.resetCategories();
          STORE.resetMenu();
        }
        currentCategoriesData = JSON.parse(JSON.stringify(SEED.categories));
        currentMenuData = JSON.parse(JSON.stringify(SEED.menuItems));
        selectedMenuCategory = 'all';
        if (dishSearchInput) dishSearchInput.value = '';

        saveCategories(false);
        saveMenuData(false);
        renderMenuManager();
        showToast('Menu restored to original 8 categories and 92 dishes.');
      }
    );
  });

  // =========================================================================
  // 9. RESERVATIONS MANAGER
  // =========================================================================
  let activeReserveDateFilter   = 'all'; // 'all' | 'today' | 'upcoming' | 'past'
  let activeReserveStatusFilter = 'all'; // 'all' | 'Pending' | 'Confirmed' | 'Cancelled'
  let reserveSearchQuery        = '';
  let lastFilteredReservations  = [];

  function parseReservationDate(res) {
    if (res.rawDate && /^\d{4}-\d{2}-\d{2}$/.test(res.rawDate)) {
      const parts = res.rawDate.split('-');
      return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    }
    if (res.date) {
      const parsed = new Date(res.date);
      if (!isNaN(parsed.getTime())) return parsed;
    }
    if (res.createdAt) {
      const parsed = new Date(res.createdAt);
      if (!isNaN(parsed.getTime())) return parsed;
    }
    return new Date();
  }

  function getReservationDateCategory(res) {
    const targetDate = parseReservationDate(res);
    targetDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diff = targetDate.getTime() - today.getTime();
    if (diff === 0) return 'today';
    if (diff > 0) return 'upcoming';
    return 'past';
  }

  function updateReservationKPIs(allList) {
    const countToday    = allList.filter(r => getReservationDateCategory(r) === 'today').length;
    const countUpcoming = allList.filter(r => getReservationDateCategory(r) === 'upcoming').length;
    const countPending  = allList.filter(r => (r.status || 'Pending') === 'Pending').length;

    if (kpiTodayCount) kpiTodayCount.textContent = countToday;
    if (kpiUpcomingCount) kpiUpcomingCount.textContent = countUpcoming;
    if (kpiPendingCount) kpiPendingCount.textContent = countPending;

    if (kpiCardToday) kpiCardToday.classList.toggle('active', activeReserveDateFilter === 'today');
    if (kpiCardUpcoming) kpiCardUpcoming.classList.toggle('active', activeReserveDateFilter === 'upcoming');
    if (kpiCardPending) kpiCardPending.classList.toggle('active', activeReserveStatusFilter === 'Pending');
  }

  function syncReserveFilterUI() {
    if (dateFilterGroup) {
      dateFilterGroup.querySelectorAll('[data-date-filter]').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-date-filter') === activeReserveDateFilter);
      });
    }
    if (statusFilterGroup) {
      statusFilterGroup.querySelectorAll('[data-status-filter]').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-status-filter') === activeReserveStatusFilter);
      });
    }
  }

  function renderReservationsManager() {
    if (!reservationsTableBody) return;

    const rawList = STORE ? STORE.getReservations() : [];
    // Sort newest first by createdAt, then id
    const allList = rawList.slice().sort((a, b) => {
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return timeB - timeA;
    });

    updateReservationKPIs(allList);
    syncReserveFilterUI();

    const query = (reserveSearchQuery || '').trim().toLowerCase();
    if (btnClearReserveSearch) {
      btnClearReserveSearch.style.display = query ? 'block' : 'none';
    }

    const filtered = allList.filter(res => {
      // 1. Search by name or phone
      if (query) {
        const nameMatch     = (res.name || '').toLowerCase().includes(query);
        const phoneMatch    = (res.phone || '').toLowerCase().includes(query);
        const rawPhoneMatch = (res.rawPhone || '').toLowerCase().includes(query);
        if (!nameMatch && !phoneMatch && !rawPhoneMatch) return false;
      }

      // 2. Date category filter
      if (activeReserveDateFilter !== 'all') {
        const cat = getReservationDateCategory(res);
        if (cat !== activeReserveDateFilter) return false;
      }

      // 3. Status filter
      const status = res.status || 'Pending';
      if (activeReserveStatusFilter !== 'all' && status !== activeReserveStatusFilter) {
        return false;
      }

      return true;
    });

    lastFilteredReservations = filtered;
    reservationsTableBody.innerHTML = '';

    // Update stats text
    if (reserveStatsText) {
      if (allList.length === 0) {
        reserveStatsText.textContent = 'No reservations saved in storage.';
      } else {
        const parts = [];
        if (activeReserveDateFilter !== 'all') parts.push(activeReserveDateFilter.toUpperCase());
        if (activeReserveStatusFilter !== 'all') parts.push(activeReserveStatusFilter);
        if (query) parts.push(`matching "${query}"`);
        const desc = parts.length ? ` (${parts.join(', ')})` : '';
        reserveStatsText.textContent = `Showing ${filtered.length} of ${allList.length} reservation${allList.length === 1 ? '' : 's'}${desc}`;
      }
    }

    // Handle empty state
    if (allList.length === 0) {
      if (noReservationsNotice) noReservationsNotice.style.display = 'block';
      if (noReservationsTitle) noReservationsTitle.textContent = 'No reservations yet';
      if (noReservationsDesc) noReservationsDesc.textContent = 'Reservations submitted via the public site reservation form will automatically appear here.';
      if (btnEmptyAddSamples) btnEmptyAddSamples.style.display = 'inline-block';
      return;
    }

    if (filtered.length === 0) {
      if (noReservationsNotice) noReservationsNotice.style.display = 'block';
      if (noReservationsTitle) noReservationsTitle.textContent = 'No matching reservations';
      if (noReservationsDesc) noReservationsDesc.textContent = 'No reservations match your current search and filter settings. Try adjusting or clearing your filters.';
      if (btnEmptyAddSamples) btnEmptyAddSamples.style.display = 'none';
      return;
    }

    if (noReservationsNotice) noReservationsNotice.style.display = 'none';

    filtered.forEach(res => {
      const tr = document.createElement('tr');
      const status = res.status || 'Pending';
      const receivedDate = res.createdAt
        ? new Date(res.createdAt).toLocaleString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          })
        : '—';

      const guestDisplay = escapeHTML(res.name || 'Anonymous');
      const phoneDisplay = escapeHTML(res.phone || res.rawPhone || '—');
      const emailDisplay = escapeHTML(res.email || '—');
      const guestsCount  = escapeHTML(res.guests || '1');
      const dateDisplay  = escapeHTML(res.date || res.rawDate || '—');
      const timeDisplay  = escapeHTML(res.time || '—');
      const seatingDisp  = escapeHTML(res.seating || 'No preference');
      const occasionDisp = escapeHTML(res.occasion && res.occasion !== 'None' ? res.occasion : 'None');
      const noteDisplay  = escapeHTML(res.note && res.note !== 'None' ? res.note : '—');

      tr.innerHTML = `
        <td data-label="Guest">
          <div><strong style="color: var(--adm-green-deep); font-size: 0.95rem;">${guestDisplay}</strong></div>
          ${res.occasion && res.occasion !== 'None' ? `<span class="admin-dish-cat-badge" style="margin-top: 4px; display: inline-block;">🎉 ${occasionDisp}</span>` : ''}
        </td>
        <td data-label="Contact">
          <div><a href="tel:${escapeHTML(res.rawPhone || res.phone)}" style="color: var(--adm-green-deep); text-decoration: none; font-weight: 600;">${phoneDisplay}</a></div>
          <small style="color: var(--adm-text-muted);"><a href="mailto:${emailDisplay}" style="color: inherit; text-decoration: none;">${emailDisplay}</a></small>
        </td>
        <td data-label="Party">
          <span class="admin-nav-badge" style="background: #eae5d9; color: var(--adm-green-deep); font-size: 0.78rem;">${guestsCount} Guest${Number(guestsCount) === 1 ? '' : 's'}</span>
        </td>
        <td data-label="Occasion & Seating">
          <div>${seatingDisp}</div>
          <small style="color: var(--adm-text-muted);">${occasionDisp}</small>
        </td>
        <td data-label="Schedule">
          <div><strong>${dateDisplay}</strong></div>
          <small style="color: var(--adm-terracotta); font-weight: 700;">${timeDisplay}</small>
        </td>
        <td data-label="Special Requests">
          <small style="color: #4b443b; line-height: 1.35; display: inline-block; max-width: 200px;">${noteDisplay}</small>
        </td>
        <td data-label="Status">
          <div style="margin-bottom: 6px;">
            <span class="admin-status-badge status-badge-${status.toLowerCase()}">${status}</span>
          </div>
          <div class="admin-status-btn-group">
            <button type="button" class="admin-status-btn btn-pending ${status === 'Pending' ? 'active' : ''}" data-set-status="Pending" title="Mark as Pending">Pending</button>
            <button type="button" class="admin-status-btn btn-confirmed ${status === 'Confirmed' ? 'active' : ''}" data-set-status="Confirmed" title="Mark as Confirmed">Confirmed</button>
            <button type="button" class="admin-status-btn btn-cancelled ${status === 'Cancelled' ? 'active' : ''}" data-set-status="Cancelled" title="Mark as Cancelled">Cancelled</button>
          </div>
        </td>
        <td data-label="Booked On">
          <small style="color: var(--adm-text-muted); white-space: nowrap;">${receivedDate}</small>
        </td>
        <td data-label="Action" style="text-align: right;">
          <button class="admin-btn admin-btn-sm admin-btn-danger btn-del-res" type="button" title="Delete reservation">✕ Delete</button>
        </td>
      `;

      // Status change listeners (saved immediately)
      tr.querySelectorAll('[data-set-status]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const newStatus = btn.getAttribute('data-set-status');
          if (newStatus && newStatus !== (res.status || 'Pending')) {
            updateReservationStatus(res.id, newStatus);
          }
        });
      });

      // Delete listener with confirmation
      tr.querySelector('.btn-del-res').addEventListener('click', (e) => {
        e.stopPropagation();
        openConfirmModal(
          'Delete Reservation',
          `Permanently delete reservation request for "${res.name || 'Guest'}"?`,
          () => {
            if (STORE) STORE.removeReservation(res.id);
            renderReservationsManager();
            updateBadges();
            updateStorageMeter();
            showToast('Reservation deleted.');
          }
        );
      });

      reservationsTableBody.appendChild(tr);
    });
  }

  function updateReservationStatus(id, newStatus) {
    const list = STORE ? STORE.getReservations() : [];
    const item = list.find(r => r.id === id);
    if (!item) return;

    item.status = newStatus;
    if (STORE) STORE.setReservations(list);

    renderReservationsManager();
    updateBadges();
    showToast(`Reservation marked as ${newStatus}.`);
  }

  function exportReservationsToCSV() {
    const records = lastFilteredReservations;
    if (!records || records.length === 0) {
      showToast('No reservations to export.', true);
      return;
    }

    const headers = [
      'ID',
      'Guest Name',
      'Phone',
      'Email',
      'Guests',
      'Occasion',
      'Reservation Date',
      'Reservation Time',
      'Seating Preference',
      'Special Requests',
      'Status',
      'Booked On'
    ];

    function escapeCSV(val) {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    }

    const csvRows = [headers.join(',')];

    records.forEach(r => {
      const row = [
        escapeCSV(r.id || ''),
        escapeCSV(r.name || ''),
        escapeCSV(r.phone || r.rawPhone || ''),
        escapeCSV(r.email || ''),
        escapeCSV(r.guests || '1'),
        escapeCSV(r.occasion || 'None'),
        escapeCSV(r.date || r.rawDate || ''),
        escapeCSV(r.time || ''),
        escapeCSV(r.seating || 'No preference'),
        escapeCSV(r.note || ''),
        escapeCSV(r.status || 'Pending'),
        escapeCSV(r.createdAt || '')
      ];
      csvRows.push(row.join(','));
    });

    const csvContent = csvRows.join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const todayStr = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `tales-of-telugu-reservations-${todayStr}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast(`Exported ${records.length} reservations to CSV.`);
  }

  function addSampleReservations() {
    const now = new Date();
    function makeDate(daysOffset) {
      const d = new Date(now.getTime() + daysOffset * 86400000);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      return {
        rawDate: `${yyyy}-${mm}-${dd}`,
        date: d.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      };
    }

    const samples = [
      {
        name: 'Sravani Rao',
        phone: '+91 98480 12345',
        rawPhone: '9848012345',
        email: 'sravani.rao@gmail.com',
        guests: '4',
        occasion: 'Birthday',
        ...makeDate(0), // Today
        time: '8:00 PM',
        seating: 'Indoor',
        note: 'Corner table with space for birthday cake cutting please.',
        status: 'Pending',
        createdAt: new Date(now.getTime() - 1000 * 60 * 35).toISOString()
      },
      {
        name: 'Karthik Reddy',
        phone: '+91 99890 54321',
        rawPhone: '9989054321',
        email: 'karthik.reddy@outlook.com',
        guests: '2',
        occasion: 'Anniversary',
        ...makeDate(0), // Today
        time: '7:30 PM',
        seating: 'Outdoor',
        note: 'Celebrating 5th wedding anniversary. Quiet table on veranda.',
        status: 'Confirmed',
        createdAt: new Date(now.getTime() - 1000 * 60 * 120).toISOString()
      },
      {
        name: 'Ananya Chander',
        phone: '+91 94401 67890',
        rawPhone: '9440167890',
        email: 'ananya.chander@yahoo.com',
        guests: '6',
        occasion: 'Family Gathering',
        ...makeDate(1), // Tomorrow
        time: '1:15 PM',
        seating: 'Indoor',
        note: 'Traditional Telugu Bhojanam lunch. Need one high chair for infant.',
        status: 'Pending',
        createdAt: new Date(now.getTime() - 1000 * 60 * 240).toISOString()
      },
      {
        name: 'Venkat Raman',
        phone: '+91 98850 98765',
        rawPhone: '9885098765',
        email: 'venkat.raman@tcs.com',
        guests: '8',
        occasion: 'Business',
        ...makeDate(3), // In 3 days
        time: '8:30 PM',
        seating: 'Indoor',
        note: 'Client appreciation dinner. Attentive service appreciated.',
        status: 'Confirmed',
        createdAt: new Date(now.getTime() - 1000 * 60 * 600).toISOString()
      },
      {
        name: 'Divya Krishna',
        phone: '+91 97000 45678',
        rawPhone: '9700045678',
        email: 'divya.krishna@gmail.com',
        guests: '3',
        occasion: 'None',
        ...makeDate(-1), // Yesterday
        time: '8:00 PM',
        seating: 'Outdoor',
        note: 'All vegetarian guests, mild spice preference.',
        status: 'Confirmed',
        createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 28).toISOString()
      },
      {
        name: 'Prasad Raju',
        phone: '+91 98499 11223',
        rawPhone: '9849911223',
        email: 'prasad.raju@gmail.com',
        guests: '5',
        occasion: 'Family Gathering',
        ...makeDate(-3), // 3 days ago
        time: '1:00 PM',
        seating: 'Indoor',
        note: 'Guest cancelled due to delayed connecting flight.',
        status: 'Cancelled',
        createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 76).toISOString()
      }
    ];

    const current = STORE ? STORE.getReservations() : [];
    samples.forEach(s => {
      s.id = 'res_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
    });

    const updated = current.concat(samples);
    if (STORE) STORE.setReservations(updated);

    renderReservationsManager();
    updateBadges();
    updateStorageMeter();
    showToast('Added 6 realistic sample reservations.');
  }

  // --- Attach Reservations Toolbar & Action Listeners ---
  if (reserveSearchInput) {
    reserveSearchInput.addEventListener('input', (e) => {
      reserveSearchQuery = e.target.value;
      renderReservationsManager();
    });
  }

  if (btnClearReserveSearch) {
    btnClearReserveSearch.addEventListener('click', () => {
      if (reserveSearchInput) reserveSearchInput.value = '';
      reserveSearchQuery = '';
      renderReservationsManager();
    });
  }

  if (dateFilterGroup) {
    dateFilterGroup.querySelectorAll('[data-date-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeReserveDateFilter = btn.getAttribute('data-date-filter');
        syncReserveFilterUI();
        renderReservationsManager();
      });
    });
  }

  if (statusFilterGroup) {
    statusFilterGroup.querySelectorAll('[data-status-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeReserveStatusFilter = btn.getAttribute('data-status-filter');
        syncReserveFilterUI();
        renderReservationsManager();
      });
    });
  }

  // Quick filter shortcuts via KPI cards
  if (kpiCardToday) {
    kpiCardToday.addEventListener('click', () => {
      activeReserveDateFilter = 'today';
      activeReserveStatusFilter = 'all';
      syncReserveFilterUI();
      renderReservationsManager();
    });
  }

  if (kpiCardUpcoming) {
    kpiCardUpcoming.addEventListener('click', () => {
      activeReserveDateFilter = 'upcoming';
      activeReserveStatusFilter = 'all';
      syncReserveFilterUI();
      renderReservationsManager();
    });
  }

  if (kpiCardPending) {
    kpiCardPending.addEventListener('click', () => {
      activeReserveDateFilter = 'all';
      activeReserveStatusFilter = 'Pending';
      syncReserveFilterUI();
      renderReservationsManager();
    });
  }

  if (btnExportReservationsCSV) {
    btnExportReservationsCSV.addEventListener('click', exportReservationsToCSV);
  }

  if (btnAddSampleReservations) {
    btnAddSampleReservations.addEventListener('click', addSampleReservations);
  }

  if (btnEmptyAddSamples) {
    btnEmptyAddSamples.addEventListener('click', addSampleReservations);
  }

  if (btnClearReservations) {
    btnClearReservations.addEventListener('click', () => {
      openConfirmModal(
        'Clear All Reservations',
        'Are you sure you want to permanently clear all stored reservations?',
        () => {
          if (STORE) STORE.clearReservations();
          renderReservationsManager();
          updateBadges();
          updateStorageMeter();
          showToast('All reservations cleared.');
        }
      );
    });
  }

  // =========================================================================
  // 10. MODALS & TOAST UTILITIES
  // =========================================================================
  function openModal(el) {
    if (el) el.classList.add('open');
  }

  function closeModal(el) {
    if (el) el.classList.remove('open');
  }

  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-close-modal');
      const target = document.getElementById(modalId);
      if (target) closeModal(target);
    });
  });

  document.querySelectorAll('.admin-modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal(overlay);
    });
  });

  function openConfirmModal(title, message, callback) {
    confirmModalTitle.textContent = title;
    confirmModalMessage.textContent = message;
    confirmCallback = callback;
    openModal(confirmModal);
  }

  confirmModalActionBtn.addEventListener('click', () => {
    if (typeof confirmCallback === 'function') {
      confirmCallback();
    }
    closeModal(confirmModal);
    confirmCallback = null;
  });

  function showToast(msg, isError = false) {
    if (!adminToast) return;
    const textEl = adminToast.querySelector('.admin-toast-text');
    const iconEl = adminToast.querySelector('.admin-toast-icon');

    if (textEl) textEl.textContent = msg;
    if (iconEl) iconEl.textContent = isError ? '⚠️' : '✓';

    adminToast.classList.toggle('toast-error', isError);
    adminToast.classList.add('show');

    setTimeout(() => {
      adminToast.classList.remove('show');
    }, 3200);
  }

  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function updateBadges() {
    if (!currentGalleryData) {
      currentGalleryData = getOrInitGalleryData();
    }
    const galCount = (currentGalleryData.ambiance?.length || 0) + (currentGalleryData.food?.length || 0);
    if (badgeGalleryCount) badgeGalleryCount.textContent = galCount;

    if (!currentMenuData) {
      currentMenuData = getOrInitMenuData();
    }
    if (badgeMenuCount) badgeMenuCount.textContent = currentMenuData.length;

    const resList = STORE ? STORE.getReservations() : [];
    const pendingCount = resList.filter(r => (r.status || 'Pending') === 'Pending').length;
    if (badgeReserveCount) badgeReserveCount.textContent = pendingCount;
  }

  // Cross-tab real-time storage listener
  window.addEventListener('storage', (e) => {
    if (!e.key || e.key === 'tot_reservations') {
      if (currentNav === 'reservations') {
        renderReservationsManager();
      }
      updateBadges();
    }
    if (!e.key || e.key === 'tot_gallery') {
      currentGalleryData = getOrInitGalleryData();
      if (currentNav === 'gallery') renderGallery();
      updateBadges();
    }
    if (!e.key || e.key === 'tot_categories' || e.key === 'tot_menu_items') {
      currentCategoriesData = getOrInitCategories();
      currentMenuData = getOrInitMenuData();
      if (currentNav === 'menu') renderMenuManager();
      updateBadges();
    }
    if (!e.key || e.key === 'tot_about') {
      currentAboutData = getOrInitAboutData();
      if (currentNav === 'about') renderAboutEditor();
    }
    updateStorageMeter();
  });

  // =========================================================================
  // 11. INITIALIZATION
  // =========================================================================
  function initDashboard() {
    updateBadges();
    updateStorageMeter();

    const hash = window.location.hash.replace('#', '').trim();
    if (['gallery', 'about', 'menu', 'reservations'].includes(hash)) {
      switchNav(hash);
    } else {
      switchNav('gallery');
    }
  }

  if (isAuthenticated()) {
    showDashboard();
  } else {
    showLogin();
  }

})();
