const app = Vue.createApp({
    data() {
        return {
            menu: [],
            modalOpen: false,
            selectedItem: {},
            currentImageIndex: 0,
            touchStartX: 0,
            touchEndX: 0,
        };
    },
    created() {
        fetch('menu.json')
            .then(response => response.json())
            .then(data => {
                // Filtra los platillos activos (enable: true)
                const activeMenu = data.menu.filter(item => item.enable);

                // Ordena los platillos según la propiedad "order"
                this.menu = activeMenu.sort((a, b) => a.order - b.order);
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
            this.touchStartX = event.touches[0].clientX;
        },
        handleTouchMove(event) {
            this.touchEndX = event.touches[0].clientX;
        },
        handleTouchEnd() {
            if (this.touchStartX - this.touchEndX > 50) {
                this.nextImage();
            } else if (this.touchEndX - this.touchStartX > 50) {
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