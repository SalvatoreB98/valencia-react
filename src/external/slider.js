import "./slider.css";

export class Slider {
    static instance;
    constructor(containerId, cardSlider) {
        if (Slider.instance) return Slider.instance;
        Slider.instance = this;
        this.slider = document.getElementById(containerId);
        if (!this.slider) return;
        this.cardSlider = cardSlider;
        this.cards = this.slider.querySelectorAll(".card");
        this.arrowLeft = this.slider.querySelector(".arrow-left"); // Left arrow
        this.arrowRight = this.slider.querySelector(".arrow-right"); // Right arrow
        this.index = 0;
        this.newPosition = 0;
        this.startX = 0;
        this.dragging = false;
        this.justDragged = false;
        this.init();
    }

    init() {
        if (!this.cardSlider || !this.cards.length) return;

        this.updateUI();
        this.addEventListeners();
    }

    static getInstance() {
        return Slider.instance || new Slider();
    }
    updateUI() {

        this.updateSliderPosition();
        this.updateArrowState();
    }

    updateArrowState() {
        if (this.arrowLeft) {
            this.arrowLeft.style.opacity = this.index === 0 ? "0.2" : "1"; // Disable left arrow if at the start
            this.arrowLeft.style.pointerEvents = this.index === 0 ? "none" : "auto"; // Prevent click
        }
        if (this.arrowRight) {
            this.arrowRight.style.opacity = this.index === this.cards.length - 1
                || this.cardSlider.scrollWidth < window.visualViewport.width ? "0.2" : "1"; // Disable right arrow if at the end
            this.arrowRight.style.pointerEvents = this.index === this.cards.length - 1 ? "none" : "auto"; // Prevent click
        }
    }

    touchInit() {
        let startX = 0;
        let dragging = false;
        this.frameRequested = false;
        
        this.cardSlider.addEventListener("pointerdown", (e) => {
            if (e.pointerType !== "touch") return; // solo touch (opzionale)
            startX = e.clientX;
            dragging = true;
            this.cardSlider.setPointerCapture(e.pointerId);
            this.cardSlider.style.transition = "none";
        });

        this.cardSlider.addEventListener("pointermove", (e) => {
            if (!dragging) return;
            const deltaX = e.clientX - startX;

            this.currentDeltaX = deltaX;
            this.cardSlider.style.transform = `translateX(${this.newPosition + deltaX}px)`;
        });

        this.cardSlider.addEventListener("pointerup", (e) => {
            if (!dragging) return;
            dragging = false;
            this.cardSlider.releasePointerCapture(e.pointerId);
            const deltaX = this.currentDeltaX || 0;
            this.currentDeltaX = 0;

            this.cardSlider.style.transition = "transform 0.3s ease-out";

            if (Math.abs(deltaX) > 15) {
                this.handleSwipe(deltaX);
            } else {
                this.cardSlider.style.transform = `translateX(${this.newPosition}px)`;
            }
        });
    }


    desktopGrabInit() {
        const images = this.cardSlider.querySelectorAll("img");
        images.forEach((img) => {
            img.addEventListener("dragstart", (e) => e.preventDefault());
        });

        this.cardSlider.addEventListener("mousedown", (e) => {
            if (e.button !== 0) return;
            this.dragging = true;
            this.startX = e.pageX;
            this.cardSlider.style.transition = "";
        });

        this.cardSlider.addEventListener("mousemove", (e) => {
            if (!this.dragging) return;
            const currentX = e.pageX;
            const translateX = this.newPosition + currentX - this.startX;
            this.cardSlider.style.transform = `translateX(${translateX}px)`;
        });

        this.cardSlider.addEventListener("mouseup", (e) => {
            if (!this.dragging) return;
            this.dragging = false;
            const endX = e.pageX;
            const deltaX = endX - this.startX;
            this.handleSwipe(deltaX);
            if (Math.abs(deltaX) > 5) {
                this.handleSwipe(deltaX);
                this.justDragged = true;
                setTimeout(() => {
                    this.justDragged = false;
                }, 100);
            }
        });

        this.cardSlider.addEventListener("mouseleave", (e) => {
            if (!this.dragging) return;
            this.dragging = false;
            const endX = e.pageX;
            const deltaX = endX - this.startX;
            this.handleSwipe(deltaX);
        });
    }

    handleSwipe(deltaX) {
        const threshold = 2;
        if (deltaX < -threshold) {
            this.index = Math.min(this.index + 1, this.cards.length - 1);
        } else if (deltaX > threshold) {
            this.index = Math.max(this.index - 1, 0);
        }
        this.updateUI();
    }


    updateSliderPosition() {
        const cardElement = this.cards[0]; // Assuming all card have the same dimensions
        const cardStyles = window.getComputedStyle(cardElement);

        // Get the full width of a card, including margins
        const cardWidth = cardElement.offsetWidth;
        const cardMarginLeft = parseFloat(cardStyles.marginLeft);
        const cardMarginRight = parseFloat(cardStyles.marginRight);
        const cardTotalWidth = cardWidth + cardMarginLeft + cardMarginRight;

        // Calculate the maximum slide position (total content width - visible container width)
        const maxSlide = this.cardSlider.scrollWidth - this.cardSlider.offsetWidth;

        // Calculate the new position
        this.newPosition = -(this.index * cardTotalWidth);

        // Ensure we don’t overscroll
        this.newPosition = Math.max(this.newPosition, -maxSlide);

        // Apply the updated position to the slider
        this.cardSlider.style.transition = "transform 0.3s ease-out";
        this.cardSlider.style.transform = `translateX(${this.newPosition}px)`;
    }

    handleArrowClick(direction) {
        if (direction === "left") {
            this.index = Math.max(this.index - 1, 0);
        } else if (direction === "right") {
            this.index = Math.min(this.index + 1, this.cards.length - 1);
        }
        this.updateUI();
    }

    addEventListeners() {
        this.touchInit();
        this.desktopGrabInit();

        if (this.arrowLeft) {
            this.arrowLeft.addEventListener("click", () => this.handleArrowClick("left"));
        }
        if (this.arrowRight) {
            this.arrowRight.addEventListener("click", () => this.handleArrowClick("right"));
        }

        window.addEventListener("resize", () => this.updateUI());
    }
}
