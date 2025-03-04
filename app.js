const app = Vue.createApp({
    data() {
        return {
            menu: [],
            modalOpen: false,
            selectedItem: {},
            currentImageIndex: 0,
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
    },
});

app.mount('#app');