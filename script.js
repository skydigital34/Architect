/**
 * Thought Parallels Architecture - Ultra-Fast Interactive Engine
 * Performance-tuned vanilla JavaScript with zero external bloat
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerBackdrop = document.querySelector('.drawer-backdrop');
  const drawerClose = document.querySelector('.drawer-close');
  const navLinks = document.querySelectorAll('.nav-link, .drawer-link');
  
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxClose = document.querySelector('.lightbox-close');
  
  const inquiryModal = document.getElementById('inquiry-modal');
  const inquiryBtns = document.querySelectorAll('.trigger-inquiry');
  const inquiryClose = document.querySelector('.modal-close-btn');
  const inquiryForm = document.getElementById('inquiry-form');
  
  const toast = document.getElementById('toast-msg');
  const copyButtons = document.querySelectorAll('.copy-btn');

  // Project data for Lightbox Viewer
  const galleryItems = [
    {
      id: 'hero',
      title: 'Studio Thought Parallels — Spatial Harmony',
      desc: 'Double-height volume and natural teak wood staircase integrated with floor-to-ceiling garden glazing.',
      src1x: 'assets/images/hero-ai-2x.webp',
      src2x: 'assets/images/hero-ai-4k.webp',
      alt: 'Thought Parallels Architectural Interior in 4K'
    },
    {
      id: 'project-1',
      title: 'Ananda Residence',
      desc: 'Chevayur, Calicut — Exposed brickwork, sweeping cantilevered concrete entry, lush bougainvillea, and vertical teak wood portal.',
      src1x: 'assets/images/project-1-2x.webp',
      src2x: 'assets/images/project-1-4k.webp',
      alt: 'Ananda Residence - Thought Parallels'
    },
    {
      id: 'project-2',
      title: 'The Skew House',
      desc: 'Malappuram, Kerala — 12,000 sq.ft. modern tropical estate featuring traditional Mangalore roof slopes and hand-cut cobblestone courtyard.',
      src1x: 'assets/images/project-2-2x.webp',
      src2x: 'assets/images/project-2-4k.webp',
      alt: 'The Skew House - Thought Parallels'
    },
    {
      id: 'contact-studio',
      title: 'Thought Parallels & White Triad Design Studio',
      desc: 'Calicut & Coimbatore — Contemporary collaborative architectural workspace and client consultation lounge.',
      src1x: 'assets/images/contact-studio-lounge.webp',
      src2x: 'assets/images/contact-studio-lounge.jpg',
      alt: 'Architectural Studio and Consultation Lounge'
    }
  ];

  let currentGalleryIndex = 0;

  // 1. Header scroll effect
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Drawer Navigation
  const openDrawer = () => {
    mobileDrawer.classList.add('open');
    drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // 3. Lightbox Gallery Controller
  const openLightboxByIndex = (index) => {
    currentGalleryIndex = index;
    const item = galleryItems[index];
    if (!item) return;

    lightboxImg.src = item.src1x;
    lightboxImg.srcset = `${item.src1x} 1x, ${item.src2x} 2x`;
    lightboxImg.alt = item.alt;
    lightboxTitle.textContent = item.title;
    lightboxDesc.textContent = item.desc;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Attach Lightbox to triggers
  const allTriggers = Array.from(document.querySelectorAll('[data-gallery-target]'));

  allTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      if (e.target.closest('.hero-curated-panel') || e.target.closest('.hero-scroll-indicator')) return;
      e.preventDefault();
      const targetId = trigger.getAttribute('data-gallery-target');
      const staticIdx = galleryItems.findIndex(item => item.id === targetId);

      if (staticIdx !== -1) {
        openLightboxByIndex(staticIdx);
      } else {
        // Dynamic card in portfolio grid
        const img = trigger.querySelector('img');
        const titleEl = trigger.querySelector('.portfolio-card-title') || trigger.querySelector('h3');
        const title = titleEl ? titleEl.textContent.trim() : 'Thought Parallels Project';
        const src = img ? img.currentSrc || img.src : '';

        lightboxImg.src = src;
        lightboxImg.srcset = '';
        lightboxImg.alt = title;
        lightboxTitle.textContent = title;
        lightboxDesc.textContent = 'Thought Parallels Architecture & Design Practice';

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-media')) {
        closeLightbox();
      }
    });
  }

  // 4. Copy to Clipboard Utility
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  };

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied: ${textToCopy}`);
        }).catch(() => {
          showToast('Copied to clipboard');
        });
      }
    });
  });

  // 5. Inquiry Modal
  const openInquiryModal = () => {
    if (!inquiryModal) return;
    inquiryModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeInquiryModal = () => {
    if (!inquiryModal) return;
    inquiryModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  inquiryBtns.forEach(btn => btn.addEventListener('click', openInquiryModal));
  if (inquiryClose) inquiryClose.addEventListener('click', closeInquiryModal);
  if (inquiryModal) {
    inquiryModal.addEventListener('click', (e) => {
      if (e.target === inquiryModal) closeInquiryModal();
    });
  }

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = inquiryForm.querySelector('.form-submit-btn');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = 'Message Sent';
        showToast('Inquiry sent successfully. We will be in touch shortly.');
        setTimeout(() => {
          closeInquiryModal();
          inquiryForm.reset();
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 1200);
      }, 700);
    });
  }

  // Subscribe Form Handler
  const subscribeForm = document.getElementById('subscribe-form');
  if (subscribeForm) {
    subscribeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = subscribeForm.querySelector('.subscribe-btn');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Subscribing...';
      submitBtn.disabled = true;

      setTimeout(() => {
        showToast('Thank you! You are now subscribed to project updates.');
        subscribeForm.reset();
        submitBtn.textContent = 'SUBSCRIBED';
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 2200);
      }, 600);
    });
  }

  // Dedicated Contact Page Form Handler
  const contactPageForm = document.getElementById('contact-page-form');
  if (contactPageForm) {
    contactPageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactPageForm.querySelector('.contact-exact-submit-btn');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Sending...</span>';
      submitBtn.disabled = true;

      setTimeout(() => {
        showToast('Thank you! Your message has been sent to Thought Parallels.');
        contactPageForm.reset();
        submitBtn.innerHTML = '<span>Submitted &check;</span>';
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 2500);
      }, 600);
    });
  }

  // 7. Dynamic Services Page Filtering & Specifications Modal
  const serviceCards = Array.from(document.querySelectorAll('.service-card'));
  const filterBtns = Array.from(document.querySelectorAll('.service-filter-btn'));
  const serviceModal = document.getElementById('service-modal');
  const serviceModalClose = document.querySelector('.service-modal-close');
  const serviceModalBackdrop = document.querySelector('.service-modal-backdrop');

  // Comprehensive Services Catalog Metadata
  const servicesData = {
    'modular-kitchen': {
      title: 'Modular Kitchen',
      category: 'Kitchen & Utility',
      desc: 'Engineered for seamless culinary flow and architectural refinement. Includes custom tall pantry units, under-mount sinks, tandem drawers, appliance garages, and bespoke anti-scratch quartz worktops.',
      materials: 'Action TESA BWP HDHMR, Blum Tandembox & Hinges, Silestone Quartz, Hafele Lighting',
      timeline: '3 to 4 Weeks',
      warranty: '10-Year Comprehensive Warranty',
      process: '3D Ergonomic Layout &bull; Factory CNC Precision &bull; 48-Hour On-site Installation'
    },
    'storage-wardrobe': {
      title: 'Storage and Wardrobe',
      category: 'Bedrooms & Storage',
      desc: 'Bespoke floor-to-ceiling wardrobe configurations tailored to your personal collection. Features concealed sensor LED hangers, velvet jewelry trays, full-length mirror pullouts, and acoustic soft-close sliding doors.',
      materials: 'Merino Laminates, Fluted Tinted Glass, Hettich Sliding Track Systems, Solid Teak Accents',
      timeline: '2 to 3 Weeks',
      warranty: '10-Year Hardware Guarantee',
      process: 'Wardrobe Audit &bull; Modular Fabrication &bull; Precision Alignment'
    },
    'crockery-unit': {
      title: 'Crockery Unit',
      category: 'Living & Dining',
      desc: 'A statement focal piece connecting your dining and formal lounge. Features integrated warm 3000K LED perimeter profiles, tempered fluted glass, concealed wine storage, and tactile marble tops.',
      materials: 'Teak Veneer, Saint-Gobain Fluted Glass, Italian Botticino Marble, Soft-close Runners',
      timeline: '2 Weeks',
      warranty: '5-Year Warranty',
      process: 'Architectural Proportions &bull; Veneer Grain Matching &bull; Seamless Integration'
    },
    'space-saving-furniture': {
      title: 'Space Saving Furniture',
      category: 'Living & Dining',
      desc: 'Precision-engineered multifunctional architectural elements that maximize floor area. Includes wall-mounted folding study stations, hydraulic lift-up beds, and extendable solid wood dining consoles.',
      materials: 'Heavy-duty German Gas Pistons, Marine Grade Plywood, High-tensile Steel Hinges',
      timeline: '3 Weeks',
      warranty: '5-Year Mechanism Guarantee',
      process: 'Space Kinematic Design &bull; Weight-load Testing &bull; Flush Wall Mounting'
    },
    'tv-unit': {
      title: 'TV Unit & Media Wall',
      category: 'Living & Dining',
      desc: 'Cinema-grade entertainment backdrops designed with acoustic sound-dampening louvers, Italian Statuario marble slabs, floating low consoles, and completely invisible wiring management conduits.',
      materials: 'Natural Charcoal Louvers, Bookmatched Sintered Stone, Smoked Oak Veneer, Concealed Trays',
      timeline: '2 to 3 Weeks',
      warranty: '5-Year Aesthetic Warranty',
      process: 'Acoustic Mapping &bull; Slab Dry-lay &bull; Cable Concealment Engineering'
    },
    'study-table': {
      title: 'Study Table & Workstation',
      category: 'Bedrooms & Storage',
      desc: 'Ergonomically tuned home office environments designed for extended focus. Features acoustic felt sound-absorbing boards, wireless charging integration, wire management raceways, and floating book alcoves.',
      materials: 'Anti-fingerprint Matte Laminates, Solid Ash Wood Edging, Acoustic Fabric Paneling',
      timeline: '10 to 14 Days',
      warranty: '5-Year Warranty',
      process: 'Ergonomic Height Profiling &bull; Wire Ducting &bull; Surface Finishing'
    },
    'false-ceiling': {
      title: 'False Ceiling & Architectural Coves',
      category: 'Finishes & Lighting',
      desc: 'Architectural ceiling sculpting that controls ambient sound and defines room volumes. Features shadowline perimeter reveals, concealed AC grilles, wooden acoustic baffles, and indirect cove illuminations.',
      materials: 'Saint-Gobain Gyproc Elite Boards, Galvanized Steel Framework, Solid Pine Baffles',
      timeline: '10 to 15 Days',
      warranty: '7-Year Anti-crack Warranty',
      process: 'Laser Leveling &bull; Structural Grid Framework &bull; Multi-coat Skim & Paint'
    },
    'lights': {
      title: 'Architectural Lighting Design',
      category: 'Finishes & Lighting',
      desc: 'A complete layered lighting scheme balancing general, task, and accent illuminations. Features low-voltage magnetic track systems, anti-glare dark-light COBs, and customized brass feature pendants.',
      materials: 'CRI 95+ High-fidelity LEDs, DALI Dimming Drivers, Architectural Anodized Aluminum',
      timeline: '7 to 10 Days',
      warranty: '3-Year Luminaire Replacement',
      process: 'Lux-level Lux Calculation &bull; Circuit Automation &bull; Aiming & Commissioning'
    },
    'wallpaper': {
      title: 'Luxury Wallpaper & Wallcoverings',
      category: 'Finishes & Lighting',
      desc: 'Tactile and visual accentuation using artisanal wallpapers. Features metallic gold foil inlays, textured Belgian linen textiles, panoramic botanical murals, and wipe-clean vinyl backings.',
      materials: 'Non-woven Breathable Substrates, Eco-solvent Inks, Organic Starch Adhesives',
      timeline: '3 to 5 Days',
      warranty: '5-Year Anti-peel Guarantee',
      process: 'Wall Moisture Check &bull; Primer Sealing &bull; Precision Pattern Matching'
    },
    'paints': {
      title: 'Artisanal Paints & Microcement',
      category: 'Finishes & Lighting',
      desc: 'Sophisticated surface finishes creating calm, tactile living environments. Features breathable lime plasters, artisanal Venetian stucco, microcement floors/walls, and ultra-matte zero-VOC architectural emulsions.',
      materials: 'Italian Imported Lime Putty, Carrara Marble Dust, Low-VOC Mineral Emulsions',
      timeline: '1 to 2 Weeks',
      warranty: '5-Year Flake-free Warranty',
      process: 'Substrate Sanding &bull; Multi-layer Trowel Application &bull; Wax Protective Burnishing'
    },
    'bathroom': {
      title: 'Luxury Bathroom & Spa Sanctuaries',
      category: 'Kitchen & Utility',
      desc: 'Complete spa-inspired bathroom interventions with separate wet/dry zones, frameless fluted shower glass, concealed floor drains, wall-hung sanitaryware, and monolithic quartz vanity counters.',
      materials: 'Grohe & Kohler Concealed Systems, 12mm Toughened Glass, Large Format Porcelain Slabs',
      timeline: '3 to 4 Weeks',
      warranty: '10-Year Leak-proof Warranty',
      process: 'Multi-layer Waterproofing &bull; Pressure Testing &bull; Precision Tile Jointing'
    },
    'pooja-unit': {
      title: 'Pooja Unit & Sacred Mandir',
      category: 'Living & Dining',
      desc: 'A tranquil sacred enclave honoring tradition through contemporary architectural language. Features backlit Corian Om/mandala screens, brass temple bell installations, and teakwood drawer storage.',
      materials: 'Solid Burma Teakwood, Seamless Backlit Corian, Solid Brass Accents, Smoke Exhaust Nooks',
      timeline: '2 to 3 Weeks',
      warranty: 'Lifetime Wood Guarantee',
      process: 'Vastu Directional Alignment &bull; CNC Laser Lattice Carving &bull; Hand Wax Polish'
    },
    'foyer': {
      title: 'Entry Foyer & Arrival Experience',
      category: 'Living & Dining',
      desc: 'The defining transition from exterior to private sanctuary. Features ventilated shoe credenzas with internal disinfectant lights, key drop trays, ambient toe-kick lighting, and sculptural bronze mirrors.',
      materials: 'Louvered Natural Oak, Brushed Brass Trims, Bronze Tinted Mirrors, Quartz Drop-ledges',
      timeline: '10 to 14 Days',
      warranty: '5-Year Warranty',
      process: 'Sightline Spatial Study &bull; Built-in Cabinetry &bull; Welcome Light Scene Tuning'
    },
    'movable-furniture': {
      title: 'Movable Furniture & Bespoke Seating',
      category: 'Living & Dining',
      desc: 'Custom upholstered seating and accent pieces curated specifically for your floor plan. Features high-density resilient foam cores, stain-resistant European fabrics, and solid kiln-dried hardwood frames.',
      materials: 'Kiln-dried Teak & Oak, High-resilience 40D Foam, D’Decor & Sarom Performance Fabrics',
      timeline: '2 to 3 Weeks',
      warranty: '5-Year Frame & Foam Warranty',
      process: 'Ergonomic Prototyping &bull; Fabric Swatch Curation &bull; Hand Upholstery Craft'
    },
    'kids-bedroom': {
      title: 'Kids Bedroom & Play Suites',
      category: 'Bedrooms & Storage',
      desc: 'Safe, imaginative, and growth-adaptive spaces for younger minds. Features solid bunk suites with safety handrails, chalkboard/whiteboard wall sectors, rounded furniture corners, and modular toy cubbies.',
      materials: 'Non-toxic Water-based Finishes, Rounded Beechwood Edges, Heavy-duty Safety Hardware',
      timeline: '3 Weeks',
      warranty: '5-Year Durability Warranty',
      process: 'Safety Hazard Audit &bull; Modular Growth Planning &bull; Secure Anchoring'
    }
  };

  // 1. Dynamic Category Filtering
  if (filterBtns.length > 0 && serviceCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const filter = btn.getAttribute('data-filter');

        serviceCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.classList.remove('is-hidden');
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 30);
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });
  }

  // 2. Open Service Detail Modal
  const openServiceModal = (serviceId, cardEl) => {
    const data = servicesData[serviceId];
    if (!data || !serviceModal) return;

    document.getElementById('modal-service-name').textContent = data.title;
    document.getElementById('modal-service-category').textContent = data.category;
    document.getElementById('modal-service-desc').textContent = data.desc;
    document.getElementById('modal-service-materials').textContent = data.materials;
    document.getElementById('modal-service-timeline').textContent = data.timeline;
    document.getElementById('modal-service-warranty').textContent = data.warranty;
    document.getElementById('modal-service-process').innerHTML = data.process;

    // Clone icon from card
    const iconWrap = cardEl.querySelector('.service-icon-wrap');
    const modalIconBadge = document.getElementById('modal-service-icon');
    if (iconWrap && modalIconBadge) {
      modalIconBadge.innerHTML = iconWrap.innerHTML;
    }

    serviceModal.classList.add('active');
    serviceModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeServiceModal = () => {
    if (!serviceModal) return;
    serviceModal.classList.remove('active');
    serviceModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (serviceCards.length > 0) {
    serviceCards.forEach(card => {
      const exploreBtn = card.querySelector('.service-explore-btn');
      const serviceId = card.getAttribute('data-service-id');

      if (exploreBtn) {
        exploreBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          openServiceModal(serviceId, card);
        });
      }

      card.addEventListener('click', (e) => {
        // If clicking on footer or anywhere on card
        if (!e.target.closest('.service-explore-btn')) {
          openServiceModal(serviceId, card);
        }
      });
    });
  }

  if (serviceModalClose) {
    serviceModalClose.addEventListener('click', closeServiceModal);
  }
  if (serviceModalBackdrop) {
    serviceModalBackdrop.addEventListener('click', closeServiceModal);
  }

  // Connect Service Modal Inquire Button to Consultation Form
  const modalInquireTrigger = document.getElementById('modal-inquire-trigger');
  if (modalInquireTrigger) {
    modalInquireTrigger.addEventListener('click', () => {
      const serviceTitle = document.getElementById('modal-service-name').textContent;
      closeServiceModal();

      setTimeout(() => {
        openInquiryModal();
        const projectTypeInput = document.getElementById('project-type');
        if (projectTypeInput) {
          projectTypeInput.value = `Home Interior: ${serviceTitle}`;
        }
      }, 250);
    });
  }

  // 7. Gravity Contact Page Handlers
  const gravityMobileBtn = document.getElementById('gravity-mobile-btn');
  const gravityMobileDrawer = document.getElementById('gravity-mobile-drawer');
  const gravityDrawerBackdrop = document.getElementById('gravity-drawer-backdrop');
  const gravityDrawerClose = document.getElementById('gravity-drawer-close');
  const gravityContactForm = document.getElementById('gravity-contact-form');

  const openGravityDrawer = () => {
    if (gravityMobileDrawer && gravityDrawerBackdrop) {
      gravityMobileDrawer.classList.add('open');
      gravityDrawerBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeGravityDrawer = () => {
    if (gravityMobileDrawer && gravityDrawerBackdrop) {
      gravityMobileDrawer.classList.remove('open');
      gravityDrawerBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (gravityMobileBtn) gravityMobileBtn.addEventListener('click', openGravityDrawer);
  if (gravityDrawerClose) gravityDrawerClose.addEventListener('click', closeGravityDrawer);
  if (gravityDrawerBackdrop) gravityDrawerBackdrop.addEventListener('click', closeGravityDrawer);

  if (gravityContactForm) {
    gravityContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('gravity-submit-btn');
      const nameInput = document.getElementById('user-name');
      const emailInput = document.getElementById('user-email');
      const phoneInput = document.getElementById('user-phone');
      const messageInput = document.getElementById('user-message');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !phoneInput.value.trim() || !messageInput.value.trim()) {
        showToast('Please fill out all required fields marked with *');
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>SENDING...</span>`;
      }

      setTimeout(() => {
        showToast('Thank you! Your consultation inquiry has been sent to our Coimbatore studio.');
        gravityContactForm.reset();

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `
            <span class="btn-text">SEND</span>
            <svg class="btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          `;
        }
      }, 700);
    });
  }

  // 6. Keyboard Accessibility (Esc to close modals, Arrows for gallery)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightbox && lightbox.classList.contains('active')) closeLightbox();
      if (inquiryModal && inquiryModal.classList.contains('active')) closeInquiryModal();
      if (serviceModal && serviceModal.classList.contains('active')) closeServiceModal();
      if (mobileDrawer && mobileDrawer.classList.contains('open')) closeDrawer();
      if (gravityMobileDrawer && gravityMobileDrawer.classList.contains('open')) closeGravityDrawer();
    } else if (lightbox && lightbox.classList.contains('active')) {
      if (e.key === 'ArrowRight') {
        openLightboxByIndex((currentGalleryIndex + 1) % galleryItems.length);
      } else if (e.key === 'ArrowLeft') {
        openLightboxByIndex((currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length);
      }
    }
  });
});
