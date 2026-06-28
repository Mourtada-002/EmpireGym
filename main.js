// Initialisation des icônes
      lucide.createIcons();

      // Animation au Scroll (Intersection Observer)
      const observerOptions = {
        threshold: 0.1,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      }, observerOptions);

      document
        .querySelectorAll(".reveal")
        .forEach((el) => observer.observe(el));

      // Effet Navbar au scroll
      window.addEventListener("scroll", () => {
        const nav = document.getElementById("navbar");

        if (window.scrollY > 50) {
          // État compressé (en scrollant)
          nav.classList.add("shadow-md");
          nav.style.paddingTop =
            "calc(env(safe-area-inset-top, 20px) + 0.5rem)";
          nav.style.paddingBottom = "0.5rem";
        } else {
          // État initial (tout en haut)
          nav.classList.remove("shadow-md");
          // On remet 1rem pour que le logo redescende un peu par rapport à l'encoche
          nav.style.paddingTop =
            "calc(env(safe-area-inset-top, 20px) + 1.2rem)";
          nav.style.paddingBottom = "1.2rem";
        }
      });

      // Simple Testimonial Loop (Bonus)
      const testimonials = [
        {
          text: "La meilleure salle d'Abatta sans hésiter. Le matériel est toujours propre et l'ambiance est parfaite.",
          name: "Jean-Marc Koffi",
          meta: "Membre depuis 2 ans",
        },
        {
          text: "Un coaching de qualité. J'ai perdu 8kg en 3 mois grâce au programme personnalisé de SelectFit.",
          name: "Marie-Claire D.",
          meta: "Membre Standard",
        },
      ];

      // Logique simple pour changer le témoignage toutes les 5 secondes
      let currentIdx = 0;
      const container = document.getElementById("testimonial-container");
      // (Pour cet exemple, on reste sur un design statique propre, mais on peut injecter du JS ici)

      // Gestion du menu Mobile
      const menuBtn = document.getElementById("menu-btn");
      const mobileMenu = document.getElementById("mobile-menu");

      menuBtn.addEventListener("click", () => {
        const isHidden = mobileMenu.classList.contains("hidden");

        if (isHidden) {
          // Ouvrir le menu
          mobileMenu.classList.remove("hidden");
          menuBtn.innerHTML = '<i data-lucide="x" class="w-6 h-6"></i>';
        } else {
          // Fermer le menu
          mobileMenu.classList.add("hidden");
          menuBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
        }

        // On demande à Lucide de transformer le nouveau <i data-lucide="..."></i> en SVG
        lucide.createIcons();
      });

      // Fermer le menu quand on clique sur un lien
      document.querySelectorAll(".mobile-link").forEach((link) => {
        link.addEventListener("click", () => {
          mobileMenu.classList.add("hidden");
          menuBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
          lucide.createIcons();
        });
      });

      // COPYRIGHT - année dynamique
      const currentYearEl = document.getElementById("current-year");
      if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
      }