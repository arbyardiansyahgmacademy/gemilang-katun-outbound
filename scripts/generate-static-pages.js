import fs from 'fs';
import path from 'path';
import { packagesData } from '../src/data/packages.js';
import { blogsData } from '../src/data/blogs.js';

const rootDir = process.cwd();
const paketDir = path.join(rootDir, 'paket');
const blogDir = path.join(rootDir, 'blog');

// Ensure image directories exist and copy all images to public
const srcImgDir = path.join(rootDir, 'src', 'assets', 'images');
const pubImgDir = path.join(rootDir, 'public', 'assets', 'images');
const pubSrcImgDir = path.join(rootDir, 'public', 'src', 'assets', 'images');

[pubImgDir, pubSrcImgDir, paketDir, blogDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

if (fs.existsSync(srcImgDir)) {
  fs.readdirSync(srcImgDir).forEach(file => {
    const srcFile = path.join(srcImgDir, file);
    if (fs.statSync(srcFile).isFile()) {
      fs.copyFileSync(srcFile, path.join(pubImgDir, file));
      fs.copyFileSync(srcFile, path.join(pubSrcImgDir, file));
    }
  });
  console.log('Successfully synchronized all image assets to public folders.');
}

const paketTemplate = fs.readFileSync(path.join(rootDir, 'paket-detail.html'), 'utf-8');
const blogTemplate = fs.readFileSync(path.join(rootDir, 'blog-detail.html'), 'utf-8');

const escapeAttr = (str) => (str || '').replace(/"/g, '&quot;');

const cleanPath = (url, fallback = '/assets/images/hero_outbound_malang_1784793004431.webp') => {
  if (!url) return fallback;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  let filename = url.split('/').pop().replace(/%20/g, ' ');
  filename = filename.replace(/photo\s*\((\d+)\)\.webp/g, 'photo_$1.webp');
  if (!filename || filename === 'photo_.webp' || filename.includes('photo_.webp') || filename.includes('undefined')) return fallback;
  return '/assets/images/' + filename;
};

// 1. GENERATE PAKET STATIC HTML PAGES
packagesData.forEach((pkg) => {
  const filePath = path.join(paketDir, `${pkg.id}.html`);

  let html = paketTemplate;

  // Title & Meta
  html = html.replace(
    '<title id="page-title">Detail Paket Outbound | GemilangKatunOutbond</title>',
    `<title id="page-title">${pkg.title} - Paket Outbound Malang | GemilangKatunOutbond</title>`
  );

  html = html.replace(
    'content="Rincian fasilitas, harga, dan rundown acara Paket Outbound GemilangKatunOutbond Malang."',
    `content="${escapeAttr(pkg.shortDesc)}"`
  );

  html = html.replace(
    '<span id="breadcrumb-title" class="text-[#38BDF8] font-bold">Detail Paket</span>',
    `<span id="breadcrumb-title" class="text-[#38BDF8] font-bold">${pkg.categoryLabel || pkg.title}</span>`
  );

  // Pre-render Paket Detail Content Card
  const staticPaketContent = `
    <!-- Top Hero Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start reveal">
      
      <!-- Large Image -->
      <div class="lg:col-span-7">
        <div class="rounded-3xl overflow-hidden border border-[#1E2F4D] shadow-md relative">
          <img src="${cleanPath(pkg.image)}" alt="${pkg.title}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='/assets/images/paket_team_building_1784793017845.webp'" class="w-full h-[380px] sm:h-[450px] object-cover" />
          <span class="absolute top-4 right-4 px-3.5 py-1 rounded-full bg-[#2563EB] text-white font-bold text-xs uppercase tracking-wider shadow-sm">
            ${pkg.badge}
          </span>
          <span class="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-[#0B132B]/90 text-[#38BDF8] text-xs font-semibold backdrop-blur-md border border-[#1E2F4D] flex items-center space-x-1">
            <svg class="w-4 h-4 text-[#38BDF8]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
            <span>${pkg.location}</span>
          </span>
        </div>
      </div>

      <!-- Right Key Info Box -->
      <div class="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-[#131F37] border border-[#1E2F4D] shadow-sm space-y-6">
        
        <div class="space-y-1.5">
          <span class="text-xs font-bold text-[#38BDF8] uppercase tracking-widest block">${pkg.categoryLabel}</span>
          <h1 class="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">${pkg.title}</h1>
        </div>

        <!-- Price Box -->
        <div class="p-4 rounded-2xl bg-[#0B132B] border border-[#1E2F4D] space-y-1">
          <span class="text-xs text-[#94A3B8] block">Biaya Investasi Program:</span>
          <div class="text-2xl sm:text-3xl font-bold text-[#38BDF8]">
            ${pkg.price} <small class="text-xs font-normal text-[#94A3B8]">${pkg.priceUnit}</small>
          </div>
          <div class="text-[11px] text-[#94A3B8] pt-1 flex items-center space-x-1">
            <svg class="w-3.5 h-3.5 text-[#38BDF8]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span>Durasi: <strong class="text-white font-semibold">${pkg.duration}</strong></span>
          </div>
        </div>

        <p class="text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-light">${pkg.description}</p>

        <!-- Action Buttons -->
        <div class="space-y-3 pt-2">
          <button onclick="window.bookingTrigger('${pkg.id}')" class="w-full py-3.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold uppercase text-xs tracking-wider flex items-center justify-center space-x-2 shadow-md transition-colors">
            <span>Pesan Sekarang via WA Admin</span>
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </button>

          <a href="https://wa.me/6283115542771?text=Halo%20Admin%20GemilangKatunOutbond,%20mohon%20kirimkan%20PDF%20Proposal%20untuk%20${encodeURIComponent(pkg.title)}" target="_blank" class="w-full py-3 rounded-full bg-[#0B132B] hover:bg-[#1E2F4D] text-[#38BDF8] border border-[#1E2F4D] text-center font-bold text-xs flex items-center justify-center space-x-2 transition-colors">
            <svg class="w-4 h-4 text-[#38BDF8]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            <span>Minta Proposal PDF Resmi</span>
          </a>
        </div>

      </div>

    </div>

    <!-- Bottom Grid: Fasilitas & Rundown -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t border-[#1E2F4D] reveal">
      
      <!-- Fasilitas Included -->
      <div class="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-[#131F37] border border-[#1E2F4D] shadow-sm space-y-4">
        <h3 class="text-lg font-serif font-bold text-white flex items-center space-x-2">
          <span class="w-6 h-6 rounded-full bg-[#2563EB]/20 text-[#38BDF8] flex items-center justify-center text-xs font-bold">✓</span>
          <span>Fasilitas Terhitung (ALL-IN)</span>
        </h3>
        <ul class="space-y-2.5 text-xs sm:text-sm text-[#94A3B8]">
          ${pkg.facilities.map(fac => `
            <li class="flex items-start space-x-2.5">
              <svg class="w-4 h-4 text-[#38BDF8] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
              <span>${fac}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <!-- Rundown / Itinerary -->
      <div class="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-[#131F37] border border-[#1E2F4D] shadow-sm space-y-4">
        <h3 class="text-lg font-serif font-bold text-white flex items-center space-x-2">
          <span class="w-6 h-6 rounded-full bg-[#2563EB]/20 text-[#38BDF8] flex items-center justify-center text-xs">
            <svg class="w-3.5 h-3.5 text-[#38BDF8]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </span>
          <span>Estimasi Rundown Acara</span>
        </h3>
        <div class="space-y-2.5 text-xs sm:text-sm text-[#94A3B8]">
          ${pkg.itinerary.map(item => `
            <div class="p-3 rounded-xl bg-[#0B132B] border border-[#1E2F4D] flex items-center space-x-3">
              <span class="w-2 h-2 rounded-full bg-[#2563EB] flex-shrink-0"></span>
              <span>${item}</span>
            </div>
          `).join('')}
        </div>
      </div>

    </div>
  `;

  html = html.replace(
    '<div id="detail-card-mount" class="space-y-12">',
    `<div id="detail-card-mount" class="space-y-12">${staticPaketContent}`
  );

  html = html.replace(
    "const pkgId = urlParams.get('id') || packagesData[0].id;",
    `const pkgId = "${pkg.id}";`
  );

  fs.writeFileSync(filePath, html, 'utf-8');
  console.log(`Generated Paket: /paket/${pkg.id}.html`);
});

// 2. GENERATE BLOG STATIC HTML PAGES
blogsData.forEach((blog, currentBlogIndex) => {
  const filePath = path.join(blogDir, `${blog.id}.html`);

  let html = blogTemplate;

  // Title & Meta
  html = html.replace(
    '<title id="blog-meta-title">Detail Artikel | GemilangKatunOutbond</title>',
    `<title id="blog-meta-title">${blog.title} | GemilangKatunOutbond</title>`
  );

  html = html.replace(
    'content="Artikel terpercaya seputar panduan outbound, lokasi wisata, dan harga paket di Malang Batu dari GemilangKatunOutbond."',
    `content="${escapeAttr(blog.excerpt)}"`
  );

  // Category, Title, Author, Date, Read Time, Image, Content
  html = html.replace(
    '<span id="blog-category" class="px-3 py-1 rounded-full bg-[#3A5A40] text-white text-xs font-bold uppercase tracking-widest inline-block shadow-sm">\n            Tips Outbound\n          </span>',
    `<span id="blog-category" class="px-3 py-1 rounded-full bg-[#2563EB] text-white text-xs font-bold uppercase tracking-widest inline-block shadow-sm">${blog.category}</span>`
  );

  html = html.replace(
    '<h1 id="blog-title" class="text-2xl sm:text-4xl font-serif font-bold text-[#3A5A40] leading-tight">\n            Panduan Memilih Paket Outbound\n          </h1>',
    `<h1 id="blog-title" class="text-2xl sm:text-4xl font-serif font-bold text-white leading-tight">${blog.title}</h1>`
  );

  html = html.replace(
    'src="" alt="Penulis"',
    `src="${cleanPath(blog.authorAvatar, '/assets/images/author.webp')}" alt="Penulis"`
  );

  html = html.replace(
    '<strong id="blog-author" class="text-[#3A5A40] font-semibold">GemilangKatunOutbond</strong>',
    `<strong id="blog-author" class="text-white font-semibold">${blog.author}</strong>`
  );

  html = html.replace(
    '<span id="blog-date" class="text-[#3A5A40]">18 Juli 2026</span>',
    `<span id="blog-date" class="text-[#38BDF8]">${blog.date}</span>`
  );

  html = html.replace(
    '<span id="blog-read-time" class="text-[#3A5A40] font-bold">5 menit</span>',
    `<span id="blog-read-time" class="text-[#38BDF8] font-bold">${blog.readTime}</span>`
  );

  html = html.replace(
    '<img id="blog-image" src="" alt="Artikel Outbound Malang"',
    `<img id="blog-image" src="${cleanPath(blog.image)}" alt="${blog.title}"`
  );

  const captionText = blog.imageCaption || `Dokumentasi kegiatan ${blog.title} - GemilangKatunOutbond Malang Batu`;
  html = html.replace(
    'Dokumentasi kegiatan outbound team building GemilangKatunOutbond Malang Batu',
    captionText
  );

  html = html.replace(
    '<div id="blog-body" class="prose max-w-none text-[#5A5A40] text-xs sm:text-sm leading-relaxed space-y-4 pt-2 font-light">\n          <!-- Injected via JS -->\n        </div>',
    `<div id="blog-body" class="prose max-w-none text-[#94A3B8] text-xs sm:text-sm leading-relaxed space-y-4 pt-2 font-light">${blog.content}</div>`
  );

  html = html.replace(
    '<img id="blog-author-bio-avatar" src="" alt="Avatar Penulis"',
    `<img id="blog-author-bio-avatar" src="${cleanPath(blog.authorAvatar, '/assets/images/author.webp')}" alt="Avatar Penulis"`
  );

  html = html.replace(
    '<h4 id="blog-author-bio-name" class="text-base font-serif font-bold text-[#3A5A40]"></h4>',
    `<h4 id="blog-author-bio-name" class="text-base font-serif font-bold text-white">${blog.author}</h4>`
  );

  html = html.replace(
    '<p id="blog-author-bio-desc" class="text-xs text-[#5A5A40] leading-relaxed font-light"></p>',
    `<p id="blog-author-bio-desc" class="text-xs text-[#94A3B8] leading-relaxed font-light">${blog.authorBio || 'Praktisi & Tim Expert Outbound Malang. Berpengalaman lebih dari 8 tahun memandu kegiatan Team Building, Rafting, Gathering, dan Outbound Training.'}</p>`
  );

  // Recommendations Generation
  const otherBlogs = blogsData.filter(b => b.id !== blog.id);

  // Sidebar 3 Blogs
  if (otherBlogs.length > 0) {
    const sidebar3Blogs = [];
    for (let i = 0; i < Math.min(3, otherBlogs.length); i++) {
      const idx = (currentBlogIndex + i) % otherBlogs.length;
      sidebar3Blogs.push(otherBlogs[idx]);
    }

    const sidebarHtml = sidebar3Blogs.map(rec => `
      <a href="/blog/${rec.id}.html" class="flex items-center space-x-3 group border-b border-[#1E2F4D] pb-3 last:border-0 last:pb-0">
        <img src="${cleanPath(rec.image)}" alt="${rec.title}" onerror="this.onerror=null; this.src='/assets/images/hero_outbound_malang_1784793004431.webp'" class="w-14 h-14 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform" />
        <div class="space-y-0.5">
          <span class="text-[10px] text-[#38BDF8] font-bold uppercase block tracking-wider">${rec.category}</span>
          <h4 class="text-xs font-bold text-white group-hover:text-[#38BDF8] transition-colors line-clamp-2 leading-snug">${rec.title}</h4>
          <span class="text-[10px] text-[#94A3B8] block">${rec.date}</span>
        </div>
      </a>
    `).join('');

    html = html.replace(
      '<div id="recommended-blogs-container" class="space-y-4 max-h-[750px] overflow-y-auto pr-1">\n            <!-- Injected via JS (Limit 3 Items) -->\n          </div>',
      `<div id="recommended-blogs-container" class="space-y-4 max-h-[750px] overflow-y-auto pr-1">${sidebarHtml}</div>`
    );
  }

  // Bottom 3 Blogs
  if (otherBlogs.length > 0) {
    const bottom3Blogs = [];
    const offset = 3;
    for (let i = 0; i < Math.min(3, otherBlogs.length); i++) {
      const idx = (currentBlogIndex + offset + i) % otherBlogs.length;
      bottom3Blogs.push(otherBlogs[idx]);
    }

    const bottomHtml = bottom3Blogs.map(item => `
      <article class="rounded-2xl bg-[#131F37] border border-[#1E2F4D] shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all">
        <div>
          <div class="relative h-44 overflow-hidden">
            <img src="${cleanPath(item.image)}" alt="${item.title}" onerror="this.onerror=null; this.src='/assets/images/hero_outbound_malang_1784793004431.webp'" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#2563EB] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
              ${item.category}
            </span>
          </div>
          <div class="p-5 space-y-2.5">
            <div class="flex items-center space-x-2 text-[11px] text-[#94A3B8]">
              <span>${item.date}</span>
              <span>•</span>
              <span>${item.readTime}</span>
            </div>
            <h3 class="text-sm font-bold text-white group-hover:text-[#38BDF8] transition-colors line-clamp-2 leading-snug">${item.title}</h3>
            <p class="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed font-light">${item.excerpt}</p>
          </div>
        </div>
        <div class="px-5 pb-5 pt-1">
          <a href="/blog/${item.id}.html" class="text-xs font-bold text-[#38BDF8] hover:underline inline-flex items-center space-x-1">
            <span>Baca Artikel</span>
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </a>
        </div>
      </article>
    `).join('');

    html = html.replace(
      '<div id="bottom-related-blogs-container" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">\n        <!-- Injected via JS (3 Cards) -->\n      </div>',
      `<div id="bottom-related-blogs-container" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">${bottomHtml}</div>`
    );
  }

  // Set JS fallback blogId
  html = html.replace(
    "const blogId = urlParams.get('id') || blogsData[0].id;",
    `const blogId = "${blog.id}";`
  );

  fs.writeFileSync(filePath, html, 'utf-8');
  console.log(`Generated Blog: /blog/${blog.id}.html`);
});

console.log(`Successfully generated ${packagesData.length} paket pages and ${blogsData.length} blog pages with full static HTML!`);
