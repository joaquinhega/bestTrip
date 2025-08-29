function equalizeFilterItemSizes() {
    const filterItems = document.querySelectorAll('.filter-item');
    let maxWidth = 0;
    let maxHeight = 0;

    filterItems.forEach(item => {
        item.style.width = 'auto';
        item.style.height = 'auto';

        if (item.offsetWidth > maxWidth) {
            maxWidth = item.offsetWidth;
        }
        if (item.offsetHeight > maxHeight) {
            maxHeight = item.offsetHeight;
        }
    });

    filterItems.forEach(item => {
        item.style.width = `${maxWidth}px`;
        item.style.height = `${maxHeight}px`;
    });
}

function handleResponsiveFilterItems() {
    const mobileMediaQuery = window.matchMedia('(max-width: 768px)');

    if (mobileMediaQuery.matches) {
        const filterItems = document.querySelectorAll('.filter-item');
        filterItems.forEach(item => {
            item.style.width = 'auto';
            item.style.height = 'auto';
        });
    } else {
        equalizeFilterItemSizes();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const heroImagesContainer = document.getElementById('hero-images-container');
    const heroImagePaths = [
        'assets/images/hero/amsterdam-hero.jpg',
        'assets/images/hero/bayahibe-hero.jpg',
        'assets/images/hero/paris-hero.jpg',
        'assets/images/hero/rio-hero.jpg',
        'assets/images/hero/barcelona-hero.jpg',
        'assets/images/hero/peru-hero.jpeg',
        'assets/images/hero/roma-hero.jpg',
    ];
    
    const allHeroImages = [...heroImagePaths, ...heroImagePaths];

    for (const path of allHeroImages) {
        const img = document.createElement('img');
        img.src = path;
        img.alt = 'Destino de viaje';
        heroImagesContainer.appendChild(img);
    }
    
    equalizeFilterItemSizes();
    const paquetes = {
        '1': {
            titulo: 'Paquete 1: Europa',
            descripcion: 'Un recorrido por los destinos más emblemáticos de Europa. Descubre la historia y la belleza de España, Francia e Italia, visitando ciudades como Madrid, París, Amsterdam y Roma.',
            fotos: [
                'assets/images/package/package-fontana.jpg',
                'assets/images/europa/barcelona.jpg',
                'assets/images/europa/pisa.jpg',
                'assets/images/europa/roma.jpg',
                'assets/images/europa/amsterdam.jpg',
                'assets/images/europa/paris.jpg'
            ]
        },
        '2': {
            titulo: 'Paquete 2: Caribe',
            descripcion: 'Disfruta de playas paradisíacas, aguas cristalinas y un ambiente de relajación total en el corazón del Caribe y Centroamérica. Destinos como Punta Cana, Playa del Carmen, Bayahibe, Cancún y Cartagena.',
            fotos: [
                'assets/images/package/package-bayahibe.jpg',
                'assets/images/caribe/punta-cana.jpg',
                'assets/images/caribe/chichen-itza.jpg',
                'assets/images/caribe/cartagena.jpg',
                'assets/images/caribe/tortugas.jpg',
                'assets/images/caribe/cancun.jpg'
            ]
        },
        '3': {
            titulo: 'Paquete 3: Perú',
            descripcion: 'Explora la rica historia y paisajes de Perú, desde las antiguas ruinas de Machu Picchu hasta la vibrante vida de Lima.',
            fotos: [
                'assets/images/package/package-peru.jpeg',
                'assets/images/peru/machu_picchu.jpg',
                'assets/images/peru/cerro.jpg',
                'assets/images/peru/telar.jpg',
                'assets/images/peru/cuatriciclo.jpeg',
                'assets/images/peru/machu_picchu2.jpeg',
            ]
        },
        '4': {
            titulo: 'Paquete 4: Brasil',
            descripcion: 'Descubre la alegría y la cultura de Brasil. Explora las playas de Copacabana e Ipanema, visita el Cristo Redentor y el Pan de Azúcar. Este paquete incluye vuelos y tours por los puntos turísticos más importantes.',
            fotos: [
                'assets/images/package/package-rio.jpeg',
                'assets/images/brasil/cristo-redentor.jpg',
                'assets/images/brasil/rio.jpg',
                'assets/images/brasil/playa.jpg',
                'assets/images/brasil/florianopolis.jpg',
                'assets/images/brasil/escaleras.jpg',
            ]
        }
    };

    // Funcionalidad del buscador y filtros
    const searchInput = document.getElementById('destination-search');
    const searchButton = document.getElementById('search-button');
    const packagesContainer = document.getElementById('packages-list');
    const allPackages = packagesContainer.querySelectorAll('.package-card');
    const filterButtons = document.querySelectorAll('.filter-item');
    let activeFilter = null; 

    function filterPackages(filterCategory = '') {
        const searchText = searchInput.value.toLowerCase().trim();

        allPackages.forEach(packageCard => {
            const keywords = packageCard.dataset.keywords.toLowerCase();
            const matchesSearch = keywords.includes(searchText);
            const matchesFilter = filterCategory === '' || keywords.includes(filterCategory);

            if (matchesSearch && matchesFilter) {
                packageCard.style.display = 'block';
            } else {
                packageCard.style.display = 'none';
            }
        });
    }

    searchButton.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        activeFilter = null;
        filterPackages();
    });
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            activeFilter = null;
            filterPackages();
        }
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterCategory = button.dataset.filter;
            if (activeFilter === filterCategory) {
                button.classList.remove('active');
                activeFilter = null;
                filterPackages(''); 
            } else {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                activeFilter = filterCategory;
                filterPackages(filterCategory);
            }
        });
    });

    // Lógica del formulario de contacto
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        console.log('Formulario de contacto enviado:');
        console.log('Nombre:', name);
        console.log('Email:', email);
        console.log('Mensaje:', message);

        alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
        contactForm.reset();
    });

    // Funcionalidad del Modal de "Más información"
    const modal = document.getElementById('info-modal');
    const closeBtn = modal.querySelector('.close-btn');
    const openModalBtns = document.querySelectorAll('[data-open-modal]');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalConsultBtn = document.getElementById('modal-consult-btn');
    const carouselImg = document.querySelector('.carousel-img');
    const prevBtn = document.querySelector('.carousel-nav .prev');
    const nextBtn = document.querySelector('.carousel-nav .next');
    let currentImgIndex = 0;
    let currentPhotos = [];

    function openModal(packageId) {
        const paquete = paquetes[packageId];
        if (!paquete) return;

        modalTitle.textContent = paquete.titulo;
        modalDescription.textContent = paquete.descripcion;
        modalConsultBtn.href = `https://wa.me/5492612098105?text=Hola!%20Tengo%20una%20consulta%20sobre%20el%20paquete:%20${encodeURIComponent(paquete.titulo)}.`;
        
        currentPhotos = paquete.fotos;
        currentImgIndex = 0;
        carouselImg.src = currentPhotos[currentImgIndex];

        modal.classList.add('open');
    }

    function closeModal() {
        modal.classList.remove('open');
    }

    function showNextImage() {
        currentImgIndex = (currentImgIndex + 1) % currentPhotos.length;
        carouselImg.src = currentPhotos[currentImgIndex];
    }

    function showPrevImage() {
        currentImgIndex = (currentImgIndex - 1 + currentPhotos.length) % currentPhotos.length;
        carouselImg.src = currentPhotos[currentImgIndex];
    }

    openModalBtns.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const packageId = button.dataset.openModal;
            openModal(packageId);
        });
    });

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    });

    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const mainMenu = document.getElementById('main-menu');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;

    hamburgerBtn.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        hamburgerBtn.classList.toggle('menu-open'); 
        body.classList.toggle('no-scroll');
    });

    // Cierra el menú cuando se hace clic en un enlace
    mainMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            hamburgerBtn.classList.remove('menu-open'); 
            body.classList.remove('no-scroll');
        });
    });

    window.addEventListener('resize', handleResponsiveFilterItems);

    handleResponsiveFilterItems();


    const packagesGrid = document.getElementById('packages-list');
    const prevArrow = document.querySelector('.carousel-arrow.left');
    const nextArrow = document.querySelector('.carousel-arrow.right');

    if (prevArrow && nextArrow) {
        prevArrow.addEventListener('click', () => {
            packagesGrid.scrollBy({
                left: -packagesGrid.offsetWidth,
                behavior: 'smooth'
            });
        });

        nextArrow.addEventListener('click', () => {
            packagesGrid.scrollBy({
                left: packagesGrid.offsetWidth,
                behavior: 'smooth'
            });
        });
    }
});