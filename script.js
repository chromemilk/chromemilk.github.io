document.addEventListener("DOMContentLoaded", () => {
  // Hamburger Menu Logic
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  const languageSelect = document.getElementById("language-select");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }

  // Reveal animated sections; without this they remain hidden by CSS.
  const fadeSections = document.querySelectorAll(".fade-in-section");
  if (fadeSections.length > 0) {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      fadeSections.forEach((section) => observer.observe(section));
    } else {
      // Fallback for older browsers.
      fadeSections.forEach((section) => section.classList.add("is-visible"));
    }
  }

  // Language Translation System
  if (languageSelect) {
    const storageKey = "hicswa-language";
    let translationData = null;
    const originalText = {};

    // Get page name
    const getPageName = () => window.location.pathname.split("/").pop() || "index.html";
    const pageName = getPageName();

    // Save original text on first load
    const saveOriginalText = () => {
      const selectors = getSelectors();
      Object.values(selectors).forEach((selector) => {
        const element = document.querySelector(selector);
        if (element) {
          originalText[selector] = element.textContent.trim();
        }
      });
    };

    const getSelectors = () => {
      const selectorMap = {
        "index.html": {
          navMission: "#nav-links a:nth-of-type(1)",
          navProjects: "#nav-links a:nth-of-type(2)",
          navRobotics: "#nav-links a:nth-of-type(3)",
          navResources: "#nav-links a:nth-of-type(4)",
          navTeam: "#nav-links a:nth-of-type(5)",
          footerCopyright: ".footer p",
          heroPill: "header.hero .pill",
          heroTitle: "header.hero h1",
          heroSub: "header.hero .hero-sub",
          heroBtn1: "header.hero .button-group a:nth-of-type(1)",
          heroBtn2: "header.hero .button-group a:nth-of-type(2)",
          missionHeading: "#mission h2",
          missionCard1Title: "#mission .card:nth-of-type(1) h3",
          missionCard1Text: "#mission .card:nth-of-type(1) p",
          missionCard2Title: "#mission .card:nth-of-type(2) h3",
          missionCard2Text: "#mission .card:nth-of-type(2) p",
          missionCard3Title: "#mission .card:nth-of-type(3) h3",
          missionCard3Text: "#mission .card:nth-of-type(3) p",
          featuredHeading: "#featured h2",
          photonPeekPill: "#featured .card:nth-of-type(1) .pill",
          photonPeekTitle: "#featured .card:nth-of-type(1) h3",
          photonPeekText: "#featured .card:nth-of-type(1) > p",
          photonPeekResolution: "#featured .card:nth-of-type(1) .stat-val",
          photonPeekResolutionLabel: "#featured .card:nth-of-type(1) .stat-label",
          photonPeekPrice: "#featured .card:nth-of-type(1) .stat-item:nth-of-type(2) .stat-val",
          photonPeekPriceLabel: "#featured .card:nth-of-type(1) .stat-item:nth-of-type(2) .stat-label",
          photonPeekLink: "#featured .card:nth-of-type(1) .btn-outline",
          planckSimPill: "#featured .card:nth-of-type(2) .pill",
          planckSimTitle: "#featured .card:nth-of-type(2) h3",
          planckSimText: "#featured .card:nth-of-type(2) > p",
          planckSimElements: "#featured .card:nth-of-type(2) .stat-val",
          planckSimElementsLabel: "#featured .card:nth-of-type(2) .stat-label",
          planckSimStack: "#featured .card:nth-of-type(2) .stat-item:nth-of-type(2) .stat-val",
          planckSimStackLabel: "#featured .card:nth-of-type(2) .stat-item:nth-of-type(2) .stat-label",
          upcomingHeading: "#upcoming h2",
          glassesTitle: "#upcoming .card:nth-of-type(1) h3",
          glassesText: "#upcoming .card:nth-of-type(1) > p:nth-of-type(2)",
          glassesCamera: "#upcoming .card:nth-of-type(1) .stat-val",
          glassesCameraDesc: "#upcoming .card:nth-of-type(1) .stat-label",
          glassesAudio: "#upcoming .card:nth-of-type(1) .stat-item:nth-of-type(2) .stat-val",
          glassesAudioDesc: "#upcoming .card:nth-of-type(1) .stat-item:nth-of-type(2) .stat-label",
          glassesStatus: "#upcoming .card:nth-of-type(1) > p:last-of-type",
          frcScoutPill: "#upcoming .card:nth-of-type(2) .pill",
          frcScoutTitle: "#upcoming .card:nth-of-type(2) h3",
          frcScoutText: "#upcoming .card:nth-of-type(2) > p",
          frcScoutAnalysis: "#upcoming .card:nth-of-type(2) .stat-val",
          frcScoutAnalysisDesc: "#upcoming .card:nth-of-type(2) .stat-label",
          frcScoutTech: "#upcoming .card:nth-of-type(2) .stat-item:nth-of-type(2) .stat-val",
          frcScoutTechDesc: "#upcoming .card:nth-of-type(2) .stat-item:nth-of-type(2) .stat-label",
          resourcesHeading: "#resources h2",
          hardwareDocsTitle: "#resources .bento-card:nth-of-type(1) h3",
          hardwareDocsText: "#resources .bento-card:nth-of-type(1) p",
          pythonAnalysisTitle: "#resources .bento-card:nth-of-type(2) h3",
          pythonAnalysisText: "#resources .bento-card:nth-of-type(2) p",
          firmwareTitle: "#resources .bento-card:nth-of-type(3) h3",
          firmwareText: "#resources .bento-card:nth-of-type(3) p",
        },
        "projects.html": {
          navMission: "#nav-links a:nth-of-type(1)",
          navProjects: "#nav-links a:nth-of-type(2)",
          navRobotics: "#nav-links a:nth-of-type(3)",
          navResources: "#nav-links a:nth-of-type(4)",
          navTeam: "#nav-links a:nth-of-type(5)",
          footerCopyright: ".footer p",
          pageTitle: ".section.fade-in-section h1",
          pageSub: ".section.fade-in-section .hero-sub",
          project1Title: ".project-card:nth-of-type(1) h3",
          project1Summary: ".project-card:nth-of-type(1) .project-summary",
          project1Feature1: ".project-card:nth-of-type(1) .feature-list li:nth-of-type(1)",
          project1Feature2: ".project-card:nth-of-type(1) .feature-list li:nth-of-type(2)",
          project1Feature3: ".project-card:nth-of-type(1) .feature-list li:nth-of-type(3)",
          project1Btn1: ".project-card:nth-of-type(1) .btn-primary",
          project2Title: ".project-card:nth-of-type(2) h3",
          project2Summary: ".project-card:nth-of-type(2) .project-summary",
          project2Feature1: ".project-card:nth-of-type(2) .feature-list li:nth-of-type(1)",
          project2Feature2: ".project-card:nth-of-type(2) .feature-list li:nth-of-type(2)",
          project2Feature3: ".project-card:nth-of-type(2) .feature-list li:nth-of-type(3)",
          project2Btn1: ".project-card:nth-of-type(2) .btn-primary",
          project3Title: ".project-card:nth-of-type(3) h3",
          project3Summary: ".project-card:nth-of-type(3) .project-summary",
          project3Feature1: ".project-card:nth-of-type(3) .feature-list li:nth-of-type(1)",
          project3Feature2: ".project-card:nth-of-type(3) .feature-list li:nth-of-type(2)",
          project3Feature3: ".project-card:nth-of-type(3) .feature-list li:nth-of-type(3)",
          project3Btn1: ".project-card:nth-of-type(3) .btn-primary",
        },
        "members.html": {
          navMission: "#nav-links a:nth-of-type(1)",
          navProjects: "#nav-links a:nth-of-type(2)",
          navRobotics: "#nav-links a:nth-of-type(3)",
          navResources: "#nav-links a:nth-of-type(4)",
          navTeam: "#nav-links a:nth-of-type(5)",
          footerCopyright: ".footer p",
          headerPill: "header.section .pill",
          headerTitle: "header.section h1",
          headerSub: "header.section .hero-sub",
          roleFounder: ".member-grid .member-card:nth-of-type(1) p",
          roleCoFounder: ".member-grid .member-card:nth-of-type(2) p",
          roleMember1: ".member-grid .member-card:nth-of-type(3) p",
          roleMember2: ".member-grid .member-card:nth-of-type(4) p",
          roleMember3: ".container > .member-card p",
          governanceTitle: ".card h3",
          governanceText: ".card p",
        },
        "robotics.html": {
          navMission: "#nav-links a:nth-of-type(1)",
          navProjects: "#nav-links a:nth-of-type(2)",
          navRobotics: "#nav-links a:nth-of-type(3)",
          navResources: "#nav-links a:nth-of-type(4)",
          navTeam: "#nav-links a:nth-of-type(5)",
          footerCopyright: ".footer p",
          headerPill: "header.section .pill",
          headerTitle: "header.section h1",
          teamTitle: ".bento-card.large h3",
          teamSummary: ".bento-card.large p:last-of-type",
          ourRoleTitle: ".bento-card:nth-of-type(2) h3:nth-of-type(1)",
          membersTitle: ".bento-card:nth-of-type(2) h3:nth-of-type(2)",
          ourRoleFunding: ".bento-card:nth-of-type(2) .feature-list li:nth-of-type(1)",
          memberAndrea: ".bento-card:nth-of-type(2) .feature-list li:nth-of-type(2)",
          memberIsabella: ".bento-card:nth-of-type(2) .feature-list li:nth-of-type(3)",
          memberKaleb: ".bento-card:nth-of-type(2) .feature-list li:nth-of-type(4)",
          memberKoen: ".bento-card:nth-of-type(2) .feature-list li:nth-of-type(5)",
          memberBelle: ".bento-card:nth-of-type(2) .feature-list li:nth-of-type(6)",
          sponsorsTitle: ".bento-card.wide h3",
          sponsorsText: ".bento-card.wide p",
          logoTitle: ".bento-card:nth-of-type(4) h3",
          revealTitle: ".bento-card:nth-of-type(5) h3",
          revealText: ".bento-card:nth-of-type(5) p",
          pitTitle: ".bento-card:nth-of-type(6) h3",
          pitBtn: ".bento-card:nth-of-type(6) .btn-outline",
          autoTitle: ".bento-card:nth-of-type(7) h3",
          autoBtn: ".bento-card:nth-of-type(7) .btn-outline",
        },
        "frcanalysis.html": {
          navMission: "#nav-links a:nth-of-type(1)",
          navProjects: "#nav-links a:nth-of-type(2)",
          navRobotics: "#nav-links a:nth-of-type(3)",
          navResources: "#nav-links a:nth-of-type(4)",
          navTeam: "#nav-links a:nth-of-type(5)",
          footerCopyright: ".footer p",
          heroPill: "header.hero .pill",
          heroTitle: "header.hero h1",
          heroSub: "header.hero .hero-sub",
          heroBtn1: "header.hero .btn-primary",
          heroBtn2: "header.hero .btn-secondary",
          capabilitiesHeading: "#features h2",
          cap1: "#features .grid-2 > div:nth-of-type(1) .feature-list li:nth-of-type(1)",
          cap2: "#features .grid-2 > div:nth-of-type(1) .feature-list li:nth-of-type(2)",
          cap3: "#features .grid-2 > div:nth-of-type(1) .feature-list li:nth-of-type(3)",
          cap4: "#features .grid-2 > div:nth-of-type(1) .feature-list li:nth-of-type(4)",
          cap5: "#features .grid-2 > div:nth-of-type(2) .feature-list li:nth-of-type(1)",
          cap6: "#features .grid-2 > div:nth-of-type(2) .feature-list li:nth-of-type(2)",
          cap7: "#features .grid-2 > div:nth-of-type(2) .feature-list li:nth-of-type(3)",
          cap8: "#features .grid-2 > div:nth-of-type(2) .feature-list li:nth-of-type(4)",
          techTitle: ".bg-offset .card:nth-of-type(1) h3",
          techNote: ".bg-offset .card:nth-of-type(1) p",
          deploymentTitle: ".bg-offset .card:nth-of-type(2) h3",
          deploymentText: ".bg-offset .card:nth-of-type(2) p",
        },
        "moleculesimulator.html": {
          navMission: "#nav-links a:nth-of-type(1)",
          navProjects: "#nav-links a:nth-of-type(2)",
          navRobotics: "#nav-links a:nth-of-type(3)",
          navResources: "#nav-links a:nth-of-type(4)",
          navTeam: "#nav-links a:nth-of-type(5)",
          footerCopyright: ".footer p",
          heroPill: "header.hero .pill",
          heroTitle: "header.hero h1",
          heroSub: "header.hero .hero-sub",
          heroBtn1: "header.hero .btn-primary",
          heroBtn2: "header.hero .btn-secondary",
          featureHeading: ".section.fade-in-section h2",
          featureL1: ".section.fade-in-section .grid-2 > div:nth-of-type(1) .feature-list li:nth-of-type(1)",
          featureL2: ".section.fade-in-section .grid-2 > div:nth-of-type(1) .feature-list li:nth-of-type(2)",
          featureL3: ".section.fade-in-section .grid-2 > div:nth-of-type(1) .feature-list li:nth-of-type(3)",
          featureL4: ".section.fade-in-section .grid-2 > div:nth-of-type(1) .feature-list li:nth-of-type(4)",
          featureL5: ".section.fade-in-section .grid-2 > div:nth-of-type(1) .feature-list li:nth-of-type(5)",
          featureL6: ".section.fade-in-section .grid-2 > div:nth-of-type(1) .feature-list li:nth-of-type(6)",
          featureL7: ".section.fade-in-section .grid-2 > div:nth-of-type(1) .feature-list li:nth-of-type(7)",
          featureR1: ".section.fade-in-section .grid-2 > div:nth-of-type(2) .feature-list li:nth-of-type(1)",
          featureR2: ".section.fade-in-section .grid-2 > div:nth-of-type(2) .feature-list li:nth-of-type(2)",
          featureR3: ".section.fade-in-section .grid-2 > div:nth-of-type(2) .feature-list li:nth-of-type(3)",
          featureR4: ".section.fade-in-section .grid-2 > div:nth-of-type(2) .feature-list li:nth-of-type(4)",
          featureR5: ".section.fade-in-section .grid-2 > div:nth-of-type(2) .feature-list li:nth-of-type(5)",
          featureR6: ".section.fade-in-section .grid-2 > div:nth-of-type(2) .feature-list li:nth-of-type(6)",
          featureR7: ".section.fade-in-section .grid-2 > div:nth-of-type(2) .feature-list li:nth-of-type(7)",
          techTitle: ".bg-offset .card:nth-of-type(1) h3",
          techNote: ".bg-offset .card:nth-of-type(1) p",
          gettingStartedTitle: ".bg-offset .card:nth-of-type(2) h3",
          gettingStartedText: ".bg-offset .card:nth-of-type(2) p",
        },
        "photonpeek.html": {
          navMission: "#nav-links a:nth-of-type(1)",
          navProjects: "#nav-links a:nth-of-type(2)",
          navRobotics: "#nav-links a:nth-of-type(3)",
          navResources: "#nav-links a:nth-of-type(4)",
          navTeam: "#nav-links a:nth-of-type(5)",
          footerCopyright: ".footer p",
          heroPill: "header.hero .pill",
          heroTitle: "header.hero h1",
          heroSub: "header.hero .hero-sub",
          heroBtn1: "header.hero .btn-primary",
          heroBtn2: "header.hero .btn-secondary",
          overviewTitle: "#details .card h3",
          overviewText: "#details .card p",
          coreGoalsTitle: "#details .feature-block:nth-of-type(1) h3",
          coreGoal1: "#details .feature-block:nth-of-type(1) .feature-list li:nth-of-type(1)",
          coreGoal2: "#details .feature-block:nth-of-type(1) .feature-list li:nth-of-type(2)",
          coreGoal3: "#details .feature-block:nth-of-type(1) .feature-list li:nth-of-type(3)",
          coreGoal4: "#details .feature-block:nth-of-type(1) .feature-list li:nth-of-type(4)",
          perfTitle: "#details .feature-block:nth-of-type(2) h3",
          perf1: "#details .feature-block:nth-of-type(2) .feature-list li:nth-of-type(1)",
          perf2: "#details .feature-block:nth-of-type(2) .feature-list li:nth-of-type(2)",
          perf3: "#details .feature-block:nth-of-type(2) .feature-list li:nth-of-type(3)",
          perf4: "#details .feature-block:nth-of-type(2) .feature-list li:nth-of-type(4)",
          partsTitle: ".bg-offset h3",
          partsText: ".bg-offset p",
          part1Title: ".parts-grid .part:nth-of-type(1) h4",
          part1Text: ".parts-grid .part:nth-of-type(1) p",
          part2Title: ".parts-grid .part:nth-of-type(2) h4",
          part2Text: ".parts-grid .part:nth-of-type(2) p",
          part3Title: ".parts-grid .part:nth-of-type(3) h4",
          part3Text: ".parts-grid .part:nth-of-type(3) p",
          part4Title: ".parts-grid .part:nth-of-type(4) h4",
          part4Text: ".parts-grid .part:nth-of-type(4) p",
          part5Title: ".parts-grid .part:nth-of-type(5) h4",
          part5Text: ".parts-grid .part:nth-of-type(5) p",
          part6Title: ".parts-grid .part:nth-of-type(6) h4",
          part6Text: ".parts-grid .part:nth-of-type(6) p",
          part7Title: ".parts-grid .part:nth-of-type(7) h4",
          part7Text: ".parts-grid .part:nth-of-type(7) p",
          part8Title: ".parts-grid .part:nth-of-type(8) h4",
          part8Text: ".parts-grid .part:nth-of-type(8) p",
          flowTitle: ".split-layout > div:nth-of-type(1) h3",
          flowIntro: ".split-layout > div:nth-of-type(1) > p",
          flow1: ".split-layout > div:nth-of-type(1) .flow-steps li:nth-of-type(1)",
          flow2: ".split-layout > div:nth-of-type(1) .flow-steps li:nth-of-type(2)",
          flow3: ".split-layout > div:nth-of-type(1) .flow-steps li:nth-of-type(3)",
          flow4: ".split-layout > div:nth-of-type(1) .flow-steps li:nth-of-type(4)",
          flow5: ".split-layout > div:nth-of-type(1) .flow-steps li:nth-of-type(5)",
          flow6: ".split-layout > div:nth-of-type(1) .flow-steps li:nth-of-type(6)",
          flow7: ".split-layout > div:nth-of-type(1) .flow-steps li:nth-of-type(7)",
          flow8: ".split-layout > div:nth-of-type(1) .flow-steps li:nth-of-type(8)",
          flow9: ".split-layout > div:nth-of-type(1) .flow-steps li:nth-of-type(9)",
          flow10: ".split-layout > div:nth-of-type(1) .flow-steps li:nth-of-type(10)",
          serialTitle: ".split-layout > div:nth-of-type(2) h3:nth-of-type(1)",
          serialIntro: ".split-layout > div:nth-of-type(2) > p",
          roadmapTitle: ".split-layout > div:nth-of-type(2) h3:nth-of-type(2)",
          roadmap1: ".split-layout > div:nth-of-type(2) .feature-list li:nth-of-type(1)",
          roadmap2: ".split-layout > div:nth-of-type(2) .feature-list li:nth-of-type(2)",
          roadmap3: ".split-layout > div:nth-of-type(2) .feature-list li:nth-of-type(3)",
          roadmap4: ".split-layout > div:nth-of-type(2) .feature-list li:nth-of-type(4)",
          roadmap5: ".split-layout > div:nth-of-type(2) .feature-list li:nth-of-type(5)",
        },
      };

      const commonSelectors = {
        navMission: "#nav-links a:nth-of-type(1)",
        navProjects: "#nav-links a:nth-of-type(2)",
        navRobotics: "#nav-links a:nth-of-type(3)",
        navResources: "#nav-links a:nth-of-type(4)",
        navTeam: "#nav-links a:nth-of-type(5)",
        footerCopyright: ".footer p",
      };

      return selectorMap[pageName] || commonSelectors;
    };

    const loadTranslations = async () => {
      try {
        const response = await fetch("translations.json");
        if (!response.ok) {
          console.error("Failed to load translations");
          return null;
        }
        return await response.json();
      } catch (error) {
        console.error("Translation error:", error);
        return null;
      }
    };

    const applyLanguage = async (lang) => {
      try {
        if (lang === "en") {
          // Restore English - use saved original text
          Object.entries(originalText).forEach(([selector, text]) => {
            const element = document.querySelector(selector);
            if (element) element.textContent = text;
          });
          document.documentElement.lang = "en";
          return;
        }

        // Load translations if not already loaded
        if (!translationData) {
          translationData = await loadTranslations();
          if (!translationData) {
            console.error("No translation data available");
            return;
          }
        }

        const langData = translationData[lang];
        if (!langData) {
          console.error(`Language ${lang} not found`);
          return;
        }

        const pageKey = pageName.replace(".html", "");
        const pageTranslations = langData[pageName] || langData[pageKey] || {};
        const translations = { ...langData.common, ...pageTranslations };
        const selectors = getSelectors();

        Object.entries(selectors).forEach(([key, selector]) => {
          const element = document.querySelector(selector);
          if (element && translations[key]) {
            element.textContent = translations[key];
          }
        });

        document.documentElement.lang = lang;
      } catch (error) {
        console.error("Error applying language:", error);
      }
    };

    // Initialize
    saveOriginalText();
    const savedLang = localStorage.getItem(storageKey) || "en";
    languageSelect.value = savedLang;

    if (savedLang !== "en") {
      applyLanguage(savedLang);
    }

    languageSelect.addEventListener("change", (e) => {
      const lang = e.target.value;
      localStorage.setItem(storageKey, lang);
      applyLanguage(lang);
    });
  }
});

