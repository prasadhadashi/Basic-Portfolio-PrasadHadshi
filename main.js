let typed = new Typed(".text", {
    strings: ["Frontend Developer", "Web Developer", "Learner"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true,
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    class NavigationHighlighter {
      constructor(navSelector, activeClass = "active", activeColor = "#00EEFF") {
        this.navLinks = document.querySelectorAll(navSelector);
        this.activeClass = activeClass;
        this.activeColor = activeColor;
        this.currentActive = null;
  
        this.handleScroll = this.handleScroll.bind(this);
        this.handleClick = this.handleClick.bind(this);
  
        this.setupEventListeners();
        this.highlightActiveLink();
      }
  
      setupEventListeners() {
        window.addEventListener("scroll", this.handleScroll);
        this.navLinks.forEach((link) => {
          link.addEventListener("click", this.handleClick);
        });
      }
  
      getSectionIdFromLink(link) {
        const href = link.getAttribute("href");
        return href.startsWith("#") ? href.slice(1) : null;
      }
  
      getSectionPosition(sectionId) {
        const section = document.getElementById(sectionId);
        return section ? section.offsetTop : null;
      }
  
      handleScroll() {
        this.highlightActiveLink();
      }
  
      handleClick(event) {
        event.preventDefault();
        const clickedLink = event.target;
        const sectionId = this.getSectionIdFromLink(clickedLink);
  
        if (sectionId) {
          let sectionPosition = this.getSectionPosition(sectionId);
  
          // Special case for "home" or links that target the top
          if (sectionId === "home" || sectionPosition === null) {
            sectionPosition = 0; // Scroll to the top
          }
  
          if (sectionPosition !== null) {
            window.scrollTo({
              top: sectionPosition,
              behavior: "smooth",
            });
          }
          this.setActiveLink(clickedLink);
        }
      }
  
      highlightActiveLink() {
        let currentSection = "";
        const scrollY = window.scrollY;
  
        this.navLinks.forEach((link) => {
          const sectionId = this.getSectionIdFromLink(link);
          if (sectionId) {
            const sectionPosition = this.getSectionPosition(sectionId);
            if (sectionPosition !== null && sectionPosition <= scrollY + 50) {
              currentSection = sectionId;
            }
          }
        });
  
        if (currentSection) {
          const activeLink = Array.from(this.navLinks).find((link) => {
            return this.getSectionIdFromLink(link) === currentSection;
          });
          if (activeLink) {
            this.setActiveLink(activeLink);
          }
        }
      }
  
      setActiveLink(link) {
        if (this.currentActive) {
          this.currentActive.classList.remove(this.activeClass);
          this.currentActive.style.color = "";
        }
        link.classList.add(this.activeClass);
        link.style.color = this.activeColor;
        this.currentActive = link;
      }
    }
  
    new NavigationHighlighter(".navbar a");
  });
