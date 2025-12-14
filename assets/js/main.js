document.addEventListener('DOMContentLoaded', () => {
  /* ===== mobile menu toggles ===== */
  const mobileBtn = document.getElementById('mobileBtn');
  const mobileNav = document.getElementById('mobileNav');

  if (mobileBtn && mobileNav) {
    mobileBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('show');
      mobileNav.setAttribute('aria-hidden', mobileNav.classList.contains('show') ? 'false' : 'true');
    });
  }

  /* ===== dropdown hover + keyboard accessible ===== */
  const navItems = document.querySelectorAll('.nav-item[data-menu]');

  navItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    const drop = item.querySelector('.dropdown');

    if (!link || !drop) return;

    // show on hover (desktop)
    item.addEventListener('mouseenter', () => item.classList.add('show'));
    item.addEventListener('mouseleave', () => item.classList.remove('show'));

    // toggle on click (mobile / keyboard)
    link.addEventListener('click', (e) => {
      e.preventDefault();
      item.classList.toggle('show');
      const expanded = item.classList.contains('show');
      link.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });

    // keyboard accessibility
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.classList.toggle('show');
      } else if (e.key === 'Escape') {
        item.classList.remove('show');
      }
    });
  });

  /* ===== Top 10 districts list (links to district pages) ===== */
  const top10 = [
    "Hyderabad", "Warangal", "Karimnagar", "Nizamabad", "Khammam",
    "Mahbubnagar", "Adilabad", "Medak", "Sangareddy", "Nalgonda"
  ];

  function slugify(name) {
    return name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/–/g, '-')
      .replace(/&/g, 'and');
  }
   //
     /* ===== district → image mapping ===== */
  const districtImages = {
    "Hyderabad": "images/hussain sagar.jpg",
    "Warangal": "images/warangal.jpg",
    "Karimnagar": "images/karimnagar.jpg",
    "Nizamabad": "images/nizamabad.jpg",
    "Khammam": "images/khammam.jpg",
    "Mahbubnagar": "images/mahabubnagar.jpg",
    "Adilabad": "images/adilabad.jpg",
    "Medak": "images/medak.jpg",
    "Sangareddy": "images/sangareddy.jpg",
    "Nalgonda": "images/nalgonda.jpg"
  };

  

  const grid = document.getElementById('top10Grid');
  if (grid) {
    top10.forEach(d => {
      const slug = slugify(d);
      const card = document.createElement('article');
      card.className = 'district-card';
      card.innerHTML = `
        <a href="districts/${slug}.html"
           style="color:inherit;text-decoration:none;display:flex;flex-direction:column;height:100%;">
         <img src="${districtImages[d] || 'images/placeholder.jpg'}"

               alt="${d}"
               onerror="this.src='images/placeholder.jpg'">
          <div class="d-body">
            <h4>${d}</h4>
            <div class="muted" style="font-size:13px">Explore →</div>
          </div>
        </a>
      `;
      grid.appendChild(card);
    });
  }

  /* ===== smooth scroll to video from hero button ===== */
  const watchVideoBtn = document.getElementById('watchVideoBtn');
  const videoSection = document.getElementById('videoSection');

  if (watchVideoBtn && videoSection) {
    watchVideoBtn.addEventListener('click', () => {
      videoSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ===== close dropdowns & mobile nav when clicking outside ===== */
  document.addEventListener('click', (e) => {
    const isNav = e.target.closest('.nav-item[data-menu]');
    const isMobileBtn = e.target.closest('#mobileBtn') || e.target.closest('#mobileNav');

    if (!isNav) {
      document.querySelectorAll('.nav-item[data-menu]').forEach(it => it.classList.remove('show'));
    }

    if (!isMobileBtn && mobileNav && mobileNav.classList.contains('show')) {
      mobileNav.classList.remove('show');
      mobileNav.setAttribute('aria-hidden', 'true');
    }
  });
});
