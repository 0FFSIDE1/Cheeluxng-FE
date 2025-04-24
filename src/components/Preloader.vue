<template>
    <div id="preloader" class="preloader">
        <div class="jumper">
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div> 
</template>

<style scoped>
#preloader {
  overflow: hidden;
  background-color: #020202; /* Dark background */
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: fixed;
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* The "bar" or "weight" used to represent gym equipment */
#preloader .jumper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80px; /* Total width of the preloader */
}

/* The circles (representing weight plates or dumbbells) */
#preloader .jumper > div {
  background-color: #e4cdc6; /* Strong color like gym orange */
  width: 20px;
  height: 20px;
  border-radius: 50%;
  opacity: 0;
  animation: gymBounce 1.5s ease-in-out infinite;
}

#preloader .jumper > div:nth-child(1) {
  animation-delay: 0s;
}

#preloader .jumper > div:nth-child(2) {
  animation-delay: 0.3s;
}

#preloader .jumper > div:nth-child(3) {
  animation-delay: 0.6s;
}

/* Bounce animation simulating lifting weights */
@keyframes gymBounce {
  0% {
    opacity: 0;
    transform: translateY(0) scale(1);
  }
  30% {
    opacity: 1;
    transform: translateY(-12px) scale(1.2); /* Bounce up */
  }
  50% {
    opacity: 1;
    transform: translateY(0) scale(1); /* Return to original position */
  }
  70% {
    opacity: 1;
    transform: translateY(-8px) scale(1.1); /* Smaller bounce */
  }
  100% {
    opacity: 0;
    transform: translateY(0) scale(0.8); /* Shrink back */
  }
}

</style>