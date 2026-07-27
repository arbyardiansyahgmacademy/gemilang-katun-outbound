// Shared components & interactions for GemilangKatunOutbond website (Navy Blue Theme)

export function renderNavbar(activePage = 'home') {
  const navContainer = document.getElementById('navbar-mount');
  if (!navContainer) return;

  const links = [
    { name: 'Beranda', href: '/', key: 'home' },
    { name: 'Tentang Kami', href: '/about.html', key: 'about' },
    { name: 'Paket Outbound', href: '/paket.html', key: 'paket' },
    { name: 'Galeri', href: '/gallery.html', key: 'gallery' },
    { name: 'Blog', href: '/blog.html', key: 'blog' },
    { name: 'Kontak', href: '/contact.html', key: 'contact' },
  ];

  const navLinksHtml = links.map(link => {
    const isActive = activePage === link.key;
    return `
      <a href="${link.href}" class="nav-link ${isActive ? 'active-link' : ''}">
        ${link.name}
      </a>
    `;
  }).join('');

  navContainer.innerHTML = `
    <header class="sticky top-0 z-50 bg-[#0B132B]/95 backdrop-blur-md border-b border-[#1E2F4D] shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 sm:h-20">
          
          <!-- Logo with Pine Tree Icon -->
          <a href="/" class="flex items-center space-x-3 group">
            <img 
              src="/assets/images/logo.webp" 
              alt="Logo GemilangKatunOutbond" 
              class="w-10 h-10 object-contain rounded-full border border-[#1E2F4D] shadow-sm group-hover:scale-105 transition-all duration-300" 
              onerror="this.onerror=null; this.src='/src/assets/images/logo.webp';"
            />
            <div>
              <span class="text-lg sm:text-xl font-bold tracking-tight text-[#38BDF8]">GemilangKatun<span class="text-white">Outbond</span></span>
              <p class="text-[9px] text-[#94A3B8] font-medium tracking-widest uppercase">Provider No.1 Batu & Malang</p>
            </div>
          </a>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center space-x-2 lg:space-x-4">
            ${navLinksHtml}
          </nav>

          <!-- Right Action CTA -->
          <div class="hidden lg:flex items-center space-x-4">
            <a href="https://wa.me/6282211221909?text=Halo%20Tim%20GemilangKatunOutbond,%20saya%20ingin%20tanya%20paket%20outbound" target="_blank" class="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-2 hover:-translate-y-0.5">
              <svg class="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
              </svg>
              <span>Hubungi Admin</span>
            </a>
          </div>

          <!-- Mobile Hamburger Toggle -->
          <div class="md:hidden flex items-center">
            <button id="mobile-menu-btn" aria-label="Menu Switcher" class="p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-[#131F37] transition-colors focus:outline-none">
              <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>

        <!-- Mobile Menu Dropdown -->
        <div id="mobile-menu" class="hidden md:hidden pb-6 pt-2 border-t border-[#1E2F4D] space-y-2">
          ${links.map(link => `
            <a href="${link.href}" class="block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activePage === link.key ? 'bg-[#2563EB]/20 text-[#38BDF8] font-bold' : 'text-[#94A3B8] hover:bg-[#131F37] hover:text-white'}">
              ${link.name}
            </a>
          `).join('')}
          <div class="pt-2 px-4">
            <a href="https://wa.me/6282211221909?text=Halo%20GemilangKatunOutbond,%20saya%20ingin%20tanya%20paket" target="_blank" class="w-full py-3 rounded-full bg-[#2563EB] text-white text-center block text-xs font-bold uppercase tracking-wider shadow-md">
              Chat Admin via WhatsApp
            </a>
          </div>
        </div>

      </div>
    </header>
  `;

  // Mobile menu event binding
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (btn && menu) {
    btn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });
  }
}

export function renderFooter() {
  const footerContainer = document.getElementById('footer-mount');
  if (!footerContainer) return;

  footerContainer.innerHTML = `
    <footer class="bg-[#0A1128] border-t border-[#1E2F4D] pt-12 sm:pt-16 pb-10 text-[#94A3B8]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Main Footer 4 Columns Grid -->
        <div class="pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          <!-- Col 1: Brand Info & Logo (Span 4) -->
          <div class="lg:col-span-4 space-y-4">
            <a href="/" class="inline-flex items-center space-x-3 group">
              <img 
                src="/assets/images/logo.webp" 
                alt="Logo GemilangKatunOutbond" 
                class="w-10 h-10 object-contain rounded-full border border-[#1E2F4D] shadow-sm group-hover:scale-105 transition-all duration-300" 
                onerror="this.onerror=null; this.src='/src/assets/images/logo.webp';"
              />
              <div>
                <span class="text-lg font-bold tracking-tight text-[#38BDF8]">GemilangKatun<span class="text-white">Outbond</span></span>
                <p class="text-[9px] text-[#94A3B8] font-semibold tracking-widest uppercase">Provider No.1 Batu & Malang</p>
              </div>
            </a>

            <p class="text-xs text-[#94A3B8] leading-relaxed font-light">
              Penyedia layanan paket outbound Malang, Batu, team building perusahaan, rafting, paintball, & family gathering sekolah terpercaya dengan pengalaman lebih dari 10 tahun di Jawa Timur.
            </p>

            <div class="pt-2">
              <span class="text-[11px] uppercase font-bold tracking-wider text-[#38BDF8] block mb-2">Ikuti Media Sosial Kami</span>
              <div class="flex items-center space-x-2.5">
                <!-- Instagram -->
                <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram GemilangKatunOutbond" class="w-9 h-9 rounded-full bg-[#131F37] border border-[#1E2F4D] text-[#38BDF8] hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] flex items-center justify-center transition-all duration-300 shadow-sm hover:-translate-y-0.5">
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                <!-- YouTube -->
                <a href="https://youtube.com" target="_blank" rel="noopener" aria-label="YouTube GemilangKatunOutbond" class="w-9 h-9 rounded-full bg-[#131F37] border border-[#1E2F4D] text-[#38BDF8] hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] flex items-center justify-center transition-all duration-300 shadow-sm hover:-translate-y-0.5">
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>

                <!-- TikTok -->
                <a href="https://tiktok.com" target="_blank" rel="noopener" aria-label="TikTok GemilangKatunOutbond" class="w-9 h-9 rounded-full bg-[#131F37] border border-[#1E2F4D] text-[#38BDF8] hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] flex items-center justify-center transition-all duration-300 shadow-sm hover:-translate-y-0.5">
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.56-1.31 1.52-1.35 2.51-.05 1.2.53 2.39 1.52 3.01.92.58 2.11.62 3.08.18.89-.39 1.53-1.22 1.73-2.17.08-.47.09-.95.08-1.43-.02-3.88-.01-7.77-.01-11.66z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <!-- Col 2: Navigasi Utama (Span 2) -->
          <div class="lg:col-span-2 space-y-3">
            <h4 class="text-xs font-bold text-[#38BDF8] uppercase tracking-widest flex items-center space-x-2">
              <span class="w-1.5 h-1.5 rounded-full bg-[#38BDF8]"></span>
              <span>Navigasi</span>
            </h4>
            <ul class="space-y-2.5 text-xs font-medium">
              <li><a href="/" class="hover:text-white hover:translate-x-1 transition-all inline-block">Beranda</a></li>
              <li><a href="/about.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">Tentang Kami</a></li>
              <li><a href="/paket.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">Daftar Paket</a></li>
              <li><a href="/gallery.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">Galeri Foto</a></li>
              <li><a href="/blog.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">Blog Artikel</a></li>
              <li><a href="/contact.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">Hubungi Kami</a></li>
            </ul>
          </div>

          <!-- Col 3: Paket Terpopuler (Span 3) -->
          <div class="lg:col-span-3 space-y-3">
            <h4 class="text-xs font-bold text-[#38BDF8] uppercase tracking-widest flex items-center space-x-2">
              <span class="w-1.5 h-1.5 rounded-full bg-[#38BDF8]"></span>
              <span>Paket Populer</span>
            </h4>
            <ul class="space-y-2.5 text-xs font-medium">
              <li><a href="/paket/paket-outbound-perusahaan-malang.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">Outbound Perusahaan Malang</a></li>
              <li><a href="/paket/paket-outbound-rafting-batu.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">Outbound + Rafting Batu</a></li>
              <li><a href="/paket/paket-outbound-sekolah-edukasi.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">Outbound Edukasi Sekolah</a></li>
              <li><a href="/paket/paket-outbound-keluarga-gathering.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">Family Gathering Batu Malang</a></li>
              <li><a href="/paket/paket-outbound-paintball-batu.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">Paket Paintball War Games</a></li>
              <li><a href="/paket/paket-outbound-kampus-organisasi.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">Outbound Kampus & LDKS</a></li>
            </ul>
          </div>

          <!-- Col 4: Basecamp & Kontak (Span 3) -->
          <div class="lg:col-span-3 space-y-3">
            <h4 class="text-xs font-bold text-[#38BDF8] uppercase tracking-widest flex items-center space-x-2">
              <span class="w-1.5 h-1.5 rounded-full bg-[#38BDF8]"></span>
              <span>Kontak Basecamp</span>
            </h4>
            <ul class="space-y-3 text-xs">
              <li class="flex items-start space-x-2.5">
                <div class="w-6 h-6 rounded-md bg-[#2563EB]/20 text-[#38BDF8] flex items-center justify-center shrink-0 mt-0.5">
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span class="text-[#94A3B8] leading-relaxed">Jl. Raya Coban Rondo No. 88, Pandesari, Kec. Pujon, Kab. Malang, Jawa Timur 65391</span>
              </li>
              <li class="flex items-center space-x-2.5">
                <div class="w-6 h-6 rounded-md bg-[#2563EB]/20 text-[#38BDF8] flex items-center justify-center shrink-0">
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <a href="mailto:admin@gemilangkatunoutbond.co.id" class="text-[#94A3B8] hover:text-[#38BDF8] transition-colors truncate">admin@gemilangkatunoutbond.co.id</a>
              </li>
              <li class="flex items-center space-x-2.5">
                <div class="w-6 h-6 rounded-md bg-[#2563EB]/20 text-[#38BDF8] flex items-center justify-center shrink-0">
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <a href="https://wa.me/6282211221909" target="_blank" class="text-[#38BDF8] font-bold hover:underline">+62 822-1122-1909 (WA)</a>
              </li>
            </ul>
          </div>

        </div>

        <!-- Copyright & Bottom Bar -->
        <div class="border-t border-[#1E2F4D] pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#94A3B8] space-y-3 md:space-y-0">
          <p>© 2026 GemilangKatunOutbond Professional. Hak Cipta Dilindungi Undang-Undang.</p>
          <div class="flex items-center space-x-6 text-[11px]">
            <span>Provider Outbound Resmi Malang & Batu</span>
            <a href="/contact.html" class="hover:text-[#38BDF8] hover:underline">Lokasi Google Maps</a>
          </div>
        </div>

      </div>
    </footer>
  `;
}

export function renderFloatingWA() {
  // 1. Floating WhatsApp Button (Pojok Kanan Bawah)
  let waElement = document.getElementById('floating-wa');
  if (!waElement) {
    waElement = document.createElement('div');
    waElement.id = 'floating-wa';
    waElement.style.cssText = 'position: fixed; bottom: 24px; right: 24px; z-index: 9999; display: flex; align-items: center; pointer-events: auto;';
    waElement.className = 'group cursor-pointer';
    waElement.innerHTML = `
      <!-- Tooltip label -->
      <div class="hidden sm:flex items-center space-x-2 bg-[#131F37] text-white text-xs px-3.5 py-2 rounded-full border border-[#1E2F4D] shadow-2xl font-bold tracking-wide transition-all group-hover:scale-105 mr-3">
        <span class="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-ping"></span>
        <span>Chat Admin WA</span>
        <span class="text-[#38BDF8] font-bold text-[10px] bg-[#2563EB]/20 px-2 py-0.5 rounded-full">24/7</span>
      </div>

      <!-- Official Floating WhatsApp Button -->
      <a href="https://wa.me/6282211221909?text=Halo%20Admin%20GemilangKatunOutbond,%20saya%20ingin%20tanya%20informasi%20dan%20penawaran%20paket%20outbound" 
         target="_blank" 
         rel="noopener"
         aria-label="Chat Official WhatsApp Admin GemilangKatunOutbond"
         class="w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white hover:scale-110 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 border-2 border-white">
        <svg class="w-8 h-8 fill-current text-white" viewBox="0 0 32 32">
          <path d="M16 2a13.94 13.94 0 0 0-11.87 21.28L2 30l6.93-2.1A13.94 13.94 0 1 0 16 2zm0 25.5a11.51 11.51 0 0 1-5.87-1.6l-.42-.25-4.36 1.32 1.35-4.22-.27-.44a11.53 11.53 0 1 1 9.57 5.19zm6.31-8.62c-.34-.17-2.03-1-2.35-1.12s-.55-.17-.78.17-.9 1.12-1.1 1.35-.4.25-.74.08a9.36 9.36 0 0 1-2.75-1.7 10.3 10.3 0 0 1-1.9-2.36c-.2-.34 0-.52.16-.69s.34-.4.51-.6a2.3 2.3 0 0 0 .34-.57.63.63 0 0 0 0-.6c-.08-.17-.78-1.87-1.07-2.56s-.57-.58-.78-.59h-.67a1.29 1.29 0 0 0-.93.43 3.91 3.91 0 0 0-1.22 2.9 6.8 6.8 0 0 0 1.43 3.61c.17.23 2.45 3.75 5.94 5.25.83.36 1.48.57 1.99.73a4.78 4.78 0 0 0 2.19.14c.67-.1 2.03-.83 2.31-1.63a2.84 2.84 0 0 0 .2-1.63c-.08-.13-.25-.21-.59-.38z"/>
        </svg>
      </a>
    `;
    document.body.appendChild(waElement);
  }

  // 2. Floating Back To Top Button (Di atas icon WA)
  let bttElement = document.getElementById('back-to-top-btn');
  if (!bttElement) {
    bttElement = document.createElement('button');
    bttElement.id = 'back-to-top-btn';
    bttElement.setAttribute('aria-label', 'Kembali ke Atas');
    bttElement.style.cssText = 'position: fixed; bottom: 92px; right: 28px; z-index: 9999; pointer-events: auto;';
    bttElement.className = 'w-11 h-11 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-full flex items-center justify-center shadow-xl transition-all duration-300 border border-white/20 transform hover:scale-110 active:scale-95 group';
    bttElement.innerHTML = `
      <svg class="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
      </svg>
    `;
    bttElement.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.body.appendChild(bttElement);
  }
}

// Interactive Booking Modal Trigger
export function openBookingModal(packageData = {}) {
  let modal = document.getElementById('booking-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'booking-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 hidden';
    modal.innerHTML = `
      <div class="bg-[#131F37] border border-[#1E2F4D] rounded-3xl max-w-lg w-full p-6 sm:p-8 text-white relative shadow-2xl">
        <button id="close-modal-btn" class="absolute top-5 right-5 text-[#94A3B8] hover:text-white p-1 transition-colors">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        <div class="flex items-center space-x-3 mb-6">
          <div class="p-2.5 bg-[#2563EB]/20 text-[#38BDF8] rounded-xl border border-[#1E2F4D]">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          </div>
          <div>
            <h3 class="text-xl font-bold text-white">Formulir Reservasi Paket</h3>
            <p class="text-xs text-[#94A3B8]">Pesan langsung & dapatkan harga promo rombongan!</p>
          </div>
        </div>

        <form id="booking-modal-form" class="space-y-4">
          <input type="hidden" id="modal-package-id" value="">
          <div>
            <label class="block text-xs font-semibold text-[#94A3B8] mb-1">Paket Yang Dipilih</label>
            <input type="text" id="modal-package-name" readonly class="w-full bg-[#0B132B] border border-[#1E2F4D] rounded-xl px-3.5 py-2.5 text-sm text-[#38BDF8] font-bold focus:outline-none">
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#94A3B8] mb-1">Nama Pemesan / Instansi</label>
              <input type="text" id="modal-user-name" required placeholder="Contoh: Budi (PT Sentosa)" class="w-full bg-[#0B132B] border border-[#1E2F4D] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-[#64748B] focus:border-[#2563EB] focus:outline-none">
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#94A3B8] mb-1">No. WhatsApp</label>
              <input type="tel" id="modal-user-phone" required placeholder="083115542771" class="w-full bg-[#0B132B] border border-[#1E2F4D] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-[#64748B] focus:border-[#2563EB] focus:outline-none">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-[#94A3B8] mb-1">Estimasi Peserta</label>
              <input type="number" id="modal-participants" min="10" value="30" class="w-full bg-[#0B132B] border border-[#1E2F4D] rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-[#2563EB] focus:outline-none">
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#94A3B8] mb-1">Rencana Tanggal Acara</label>
              <input type="date" id="modal-event-date" class="w-full bg-[#0B132B] border border-[#1E2F4D] rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-[#2563EB] focus:outline-none">
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-[#94A3B8] mb-1">Catatan Khusus / Permintaan Tambahan</label>
            <textarea id="modal-notes" rows="2" placeholder="Contoh: Perlu opsi catering vegetarian, spanduk custom, dll." class="w-full bg-[#0B132B] border border-[#1E2F4D] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-[#64748B] focus:border-[#2563EB] focus:outline-none"></textarea>
          </div>

          <div id="booking-modal-alert" class="hidden text-xs p-3 rounded-xl bg-[#2563EB]/20 text-[#38BDF8] border border-[#2563EB]/30"></div>

          <button type="submit" class="w-full py-3.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold uppercase tracking-wider text-xs flex items-center justify-center space-x-2 transition-all shadow-lg">
            <span>Kirim via WhatsApp Admin</span>
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </button>
        </form>
      </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('close-modal-btn').addEventListener('click', () => {
      modal.classList.add('hidden');
    });

    const bookingForm = document.getElementById('booking-modal-form');
    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const pkgName = document.getElementById('modal-package-name').value;
      const userName = document.getElementById('modal-user-name').value;
      const userPhone = document.getElementById('modal-user-phone').value;
      const participants = document.getElementById('modal-participants').value;
      const dateVal = document.getElementById('modal-event-date').value;
      const notesVal = document.getElementById('modal-notes').value;

      const waMsg = `Halo Admin GemilangKatunOutbond, saya ingin reservasi/tanya penawaran paket:%0A%0A*Nama/Instansi:* ${userName}%0A*No WA:* ${userPhone}%0A*Paket:* ${pkgName}%0A*Jumlah Peserta:* ${participants} Orang%0A*Tanggal Acara:* ${dateVal || 'Belum pasti'}%0A*Catatan:* ${notesVal || '-'}`;

      window.open(`https://wa.me/6282211221909?text=${waMsg}`, '_blank');
      modal.classList.add('hidden');
    });
  }

  document.getElementById('modal-package-id').value = packageData.id || '';
  document.getElementById('modal-package-name').value = packageData.title || 'Paket Outbound GemilangKatunOutbond';
  modal.classList.remove('hidden');
}

// Advanced Gallery Lightbox with Prev / Next Navigation Controls & Photo Card Details
let galleryItemsState = [];
let currentGalleryIndex = 0;

export function setupLightboxGallery(itemsArray = []) {
  galleryItemsState = itemsArray;

  let modal = document.getElementById('lightbox-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'lightbox-modal';
    modal.className = 'fixed inset-0 z-[99999] bg-black/90 backdrop-blur-md hidden items-center justify-center p-3 sm:p-5 select-none overflow-hidden';
    modal.innerHTML = `
      <!-- Card Container Centered in Viewport -->
      <div id="lightbox-card-wrapper" class="relative bg-[#131F37] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full border border-[#1E2F4D] flex flex-col md:flex-row m-auto max-h-[90vh] sm:max-h-[85vh] transition-all animate-modal-pop">
        
        <!-- X Close Button (Prominent & Always Visible) -->
        <button id="close-lightbox-btn" aria-label="Tutup Galeri" class="absolute top-3 right-3 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-[#2563EB] text-white flex items-center justify-center shadow-xl transition-all transform hover:scale-110 focus:outline-none">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        <!-- Left / Top: Image View area with Prev/Next buttons -->
        <div class="relative md:w-3/5 bg-[#0B132B] flex items-center justify-center min-h-[220px] md:min-h-[360px] max-h-[48vh] md:max-h-none overflow-hidden group p-2">
          <img id="lightbox-img" src="" alt="Foto Galeri" class="w-full h-full object-contain max-h-[42vh] md:max-h-[70vh] rounded-lg" />
          
          <!-- Prev button -->
          <button id="prev-lightbox-btn" aria-label="Foto Sebelumnya" class="absolute left-2 sm:left-3 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-[#2563EB] text-white flex items-center justify-center border border-white/20 shadow-xl transition-all transform hover:scale-110 active:scale-95 focus:outline-none">
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
          </button>

          <!-- Next button -->
          <button id="next-lightbox-btn" aria-label="Foto Selanjutnya" class="absolute right-2 sm:right-3 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-[#2563EB] text-white flex items-center justify-center border border-white/20 shadow-xl transition-all transform hover:scale-110 active:scale-95 focus:outline-none">
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
          </button>

          <!-- Image counter badge -->
          <span id="lightbox-counter" class="absolute bottom-3 left-3 z-20 px-2.5 py-1 rounded-full bg-black/60 text-white text-[10px] sm:text-[11px] font-bold border border-white/20 backdrop-blur-sm">
            Foto 1 dari 8
          </span>
        </div>

        <!-- Right / Bottom: Description Card content -->
        <div class="md:w-2/5 p-4 sm:p-6 flex flex-col justify-between bg-[#131F37] text-white space-y-3 overflow-y-auto max-h-[44vh] md:max-h-none">
          <div class="space-y-2">
            <span id="lightbox-category" class="inline-block px-3 py-0.5 rounded-full bg-[#2563EB]/20 text-[#38BDF8] text-[11px] font-bold uppercase tracking-wider border border-[#2563EB]/30">
              Coban Rondo
            </span>

            <h3 id="lightbox-caption" class="text-base sm:text-xl font-bold text-white leading-snug">
              Flying Fox & High Ropes Coban Rondo
            </h3>

            <p id="lightbox-desc" class="text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-light">
              Dokumentasi kegiatan outbound & tantangan keberanian di kawasan hutan pinus Coban Rondo Batu Malang bersama fasilitator BNSP GemilangKatunOutbond.
            </p>
          </div>

          <div class="pt-3 border-t border-[#1E2F4D] space-y-2">
            <a id="lightbox-wa-btn" href="https://wa.me/6282211221909" target="_blank" class="w-full py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center space-x-2 shadow-md transition-all">
              <span>Tanya Paket Ini via WA</span>
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>
            
            <p class="text-[10px] text-[#94A3B8] text-center italic">
              Gunakan &lt; &gt; atau Panah Keyboard untuk beralih foto.
            </p>
          </div>
        </div>

      </div>
    `;
    document.body.appendChild(modal);

    // Event listeners for close, prev, next
    document.getElementById('close-lightbox-btn')?.addEventListener('click', closeLightbox);
    document.getElementById('prev-lightbox-btn')?.addEventListener('click', () => changeLightboxImage(-1));
    document.getElementById('next-lightbox-btn')?.addEventListener('click', () => changeLightboxImage(1));

    // Keyboard navigation support
    window.addEventListener('keydown', (e) => {
      const isVisible = !modal.classList.contains('hidden');
      if (!isVisible) return;

      if (e.key === 'ArrowLeft') {
        changeLightboxImage(-1);
      } else if (e.key === 'ArrowRight') {
        changeLightboxImage(1);
      } else if (e.key === 'Escape') {
        closeLightbox();
      }
    });

    // Close when clicking outside card wrapper
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeLightbox();
      }
    });
  }
}

export function openLightboxAtIndex(index = 0, customItems = []) {
  if (customItems.length > 0) {
    galleryItemsState = customItems;
  }
  setupLightboxGallery(galleryItemsState);

  if (!galleryItemsState || galleryItemsState.length === 0) return;

  currentGalleryIndex = (index + galleryItemsState.length) % galleryItemsState.length;
  updateLightboxDisplay();

  const modal = document.getElementById('lightbox-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';

    // Re-trigger animation
    const wrapper = document.getElementById('lightbox-card-wrapper');
    if (wrapper) {
      wrapper.classList.remove('animate-modal-pop');
      void wrapper.offsetWidth;
      wrapper.classList.add('animate-modal-pop');
    }
  }
}

function changeLightboxImage(direction) {
  if (!galleryItemsState || galleryItemsState.length === 0) return;
  currentGalleryIndex = (currentGalleryIndex + direction + galleryItemsState.length) % galleryItemsState.length;
  updateLightboxDisplay();
}

function updateLightboxDisplay() {
  if (!galleryItemsState || galleryItemsState.length === 0) return;
  const currentItem = galleryItemsState[currentGalleryIndex];

  const img = document.getElementById('lightbox-img');
  const cap = document.getElementById('lightbox-caption');
  const desc = document.getElementById('lightbox-desc');
  const counter = document.getElementById('lightbox-counter');
  const cat = document.getElementById('lightbox-category');
  const waBtn = document.getElementById('lightbox-wa-btn');

  if (img) {
    const fixPath = (url) => {
      if (!url) return '/assets/images/hero_outbound_malang_1784793004431.webp';
      if (url.startsWith('http://') || url.startsWith('https://')) return url;
      if (!url.startsWith('/')) return '/' + url;
      return url;
    };
    img.src = fixPath(currentItem.src);
    img.alt = currentItem.title || 'Foto Galeri GemilangKatunOutbond';
    img.setAttribute('referrerpolicy', 'no-referrer');
    img.onerror = function() {
      this.onerror = null;
      this.src = '/assets/images/hero_outbound_malang_1784793004431.webp';
    };
  }
  if (cap) cap.textContent = currentItem.title || 'Dokumentasi Outbound Malang Batu';
  if (desc) desc.textContent = currentItem.desc || `Dokumentasi asli kegiatan ${currentItem.title || 'outbound'} di kawasan Malang & Batu bersama provider resmi GemilangKatunOutbond.`;
  if (counter) counter.textContent = `Foto ${currentGalleryIndex + 1} dari ${galleryItemsState.length}`;
  if (cat) cat.textContent = currentItem.cat || currentItem.category || 'Galeri Outbound';
  if (waBtn) {
    waBtn.href = `https://wa.me/6282211221909?text=Halo%20Admin%20GemilangKatunOutbond,%20saya%20tertarik%20dengan%20kegiatan%20galeri:%20${encodeURIComponent(currentItem.title || '')}`;
  }
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }
}

// Auto Scroll Reveal Initializer
export function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('active'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.01,
    rootMargin: '100px 0px 50px 0px'
  });

  elements.forEach(el => {
    observer.observe(el);
  });
}

// Prefetch internal pages on hover for instant navigation
function initLinkPrefetch() {
  document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener('mouseenter', () => {
      const href = link.getAttribute('href');
      if (href && !document.querySelector(`link[rel="prefetch"][href="${href}"]`)) {
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = href;
        document.head.appendChild(prefetchLink);
      }
    }, { once: true });
  });
}

// Run initializers automatically when DOM is ready
if (typeof window !== 'undefined') {
  const runAuto = () => {
    renderFloatingWA();
    initScrollReveal();
    initLinkPrefetch();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAuto);
  } else {
    runAuto();
  }
}
