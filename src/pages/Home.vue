<script setup>
  import { computed, ref } from 'vue';
  import { useProductStore } from '../stores/productStore';
  
  const productStore = useProductStore();
  const wishlist = computed(() => productStore.wishlist);
  
  const currentSlide = ref(0);
  
  function prevSlide() {
    currentSlide.value = (currentSlide.value > 0) ? currentSlide.value - 1 : wishlist.value.length - 1;
  }
  
  function nextSlide() {
    currentSlide.value = (currentSlide.value < wishlist.value.length - 1) ? currentSlide.value + 1 : 0;
  }
  
  const trackStyle = computed(() => ({
    transform: `translateX(-${currentSlide.value * 100}%)`,
  }));
  </script>
  
  <template>
    <div :class="{'home-page-container-centered': wishlist.length === 0}">
      <!-- Welcome Message -->
      <div class="welcome-message">
        <h1 class="text-3xl font-bold text-center mb-6">Welcome to Swiftcart!</h1>
        <p class="text-center text-lg mb-6">South Africa's fastest e-commerce store</p>
        <p class="text-center text-lg mb-6">Explore our wide range of products and find something you love!</p>
        <div class="cta-buttons text-center">
          <router-link :to="{path: '/products'}" class="explore-btn">
            Explore Products
          </router-link>
        </div>
      </div>
  
      <!-- Carousel for Wishlist -->
      <div v-if="wishlist.length > 0" class="carousel-container mt-12">
        <h2 class="text-2xl font-bold text-center mb-4">Don't forget to checkout your wish list</h2>
        <div class="carousel">
          <button class="prev" @click="prevSlide">❮</button>
          <div class="carousel-track-container">
            <ul class="carousel-track" :style="trackStyle">
              <li
                v-for="(product, index) in wishlist"
                :key="product.id"
                class="carousel-slide"
              >
                <img :src="product.image" :alt="product.title" class="carousel-image" />
                <h3 class="product-title">{{ product.title }}</h3>
                <p class="product-price">$ {{ product.price }}</p>
              </li>
            </ul>
          </div>
          <button class="next" @click="nextSlide">❯</button>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .home-page-container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .home-page-container-centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
  
  .welcome-message {
    padding: 20px;
    text-align: center;
    background-color: #f8f9fa;
    border-radius: 8px;
  }
  
  .cta-buttons {
    margin-top: 20px;
  }
  
  .explore-btn {
    padding: 12px 24px;
    font-size: 18px;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .explore-btn:hover {
    background-color: #0056b3;
  }
  
  /* Carousel Styling */
  .carousel-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }
  
  .carousel {
    display: flex;
    align-items: center;
    position: relative;
  }
  
  .carousel-track-container {
    overflow: hidden;
    width: 100%;
  }
  
  .carousel-track {
    display: flex;
    transition: transform 0.5s ease-in-out;
  }
  
  .carousel-slide {
    min-width: 100%;
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .carousel-image {
    width: 100%;
    max-width: 200px; /* adjust the max width to your liking */
    height: auto;
    object-fit: contain;
    border-radius: 8px;
    margin-bottom: 12px;
  }
  
  .product-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
  }
  
  .product-price {
    font-size: 14px;
    color: #28a745;
  }
  
  .prev,
  .next {
    background-color: #333;
    color: white;
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 18px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  
  .prev {
    left: -40px;
  }
  
  .next {
    right: -40px;
  }
  </style>