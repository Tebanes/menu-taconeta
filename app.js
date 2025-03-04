const app = Vue.createApp({
    data() {
        return {
            menu: [],
            modalOpen: false,
            selectedItem: {},
            currentImageIndex: 0,
            touchStartX: 0, // Posición inicial del toque
            touchEndX: 0,   // Posición final del toque
        };
    },
    created() {
        fetch('menu.json')
            .then(response => response.json())
            .then(data => {
                this.menu = data.menu;
            })
            .catch(error => console.error('Error cargando el menú:', error));
    },
    methods: {
        openModal(item) {
            this.selectedItem = item;
            this.currentImageIndex = 0;
            this.modalOpen = true;
        },
        closeModal() {
            this.modalOpen = false;
        },
        goToImage(index) {
            this.currentImageIndex = index;
        },
        handleTouchStart(event) {
            this.touchStartX = event.touches[0].clientX; // Guarda la posición inicial del toque
        },
        handleTouchMove(event) {
            this.touchEndX = event.touches[0].clientX; // Guarda la posición final del toque
        },
        handleTouchEnd() {
            if (this.touchStartX - this.touchEndX > 50) {
                // Deslizamiento hacia la izquierda (siguiente imagen)
                this.nextImage();
            } else if (this.touchEndX - this.touchStartX > 50) {
                // Deslizamiento hacia la derecha (imagen anterior)
                this.previousImage();
            }
        },
        nextImage() {
            if (this.currentImageIndex < this.selectedItem.images.length - 1) {
                this.currentImageIndex++;
            }
        },
        previousImage() {
            if (this.currentImageIndex > 0) {
                this.currentImageIndex--;
            }
        },
    },
});

app.mount('#app');