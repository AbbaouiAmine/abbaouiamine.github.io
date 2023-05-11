import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "typing1": '[ "Hi, I am Software engineer.", "I am freelancer.", " I am designer.", "I am software Craftsman." ]',
      "title": "WELCOME TO MY DIGITAL HOME",
      "profil":"SOFTWARE ENGINEER",
      "home" :"HOME",
      "about":"ABOUT",
      "services":"SERVICES",
      "technos":"TECHNOLOGIES",
      "projects":"PROJECTS",
      "certificats":"CERTIFICATES",
      "contact":"CONTACT",
      "abouttext":"I specialize in the design of management software. I have developed my activity since 2015 around the various IT services dedicated to companies. I am at your disposal to advise you and guide you as best as possible towards software solutions adapted to your profession and your needs. We can meet to discuss your projects.",  
      "aboutt1":"A customized analysis and design.",
      "aboutt2":"A PROFESSIONAL WORK METHOD",
      "aboutt3":"BUSINESS-READY TECHNOLOGIES",
      "aboutt4":"A MODERN AND ADAPTIVE DESIGN",
      "abouttxt1":"A study conducted upstream of our projects in order to understand and analyze the habits and needs of users.",
      "abouttxt2":"I have the professional skills adapted to the management of IT projects.",
      "abouttxt3":"My knowledge of development techniques leads me to propose solutions to the company's IT department.",
      "abouttxt4":"The design of neat and intuitive interfaces on a software or web tool for a result of a great simplicity of use (UI/UX).",

      "aboutname":"AMINE ABBAOUI",
      "aboutprofil":"Developer & Graphic Designer",

      "servicet1":"DESIGN AND CREATION OF WEBSITES",
      "servicet2":"DESKTOP APPLICATION DEVELOPMENT",
      "servicet3":"CREATION AND DESIGN OF MOBILE APPLICATIONS",
      "servicet4":"CREATION OF BUSINESS CARDS",
      "servicet5":"DESIGN OF PROFESSIONAL LOGOS",
      "servicet6":"CREATION OF ADVERTISING POSTERS",

      "servicetxt1":"The website creation will include all the basic and advanced features you want",
      "servicetxt2":"Afin d'utiliser de la façon la plus efficace possible les ressources à disposition",
      "servicetxt3":"In order to make the most efficient use of available resources",
      "servicetxt4":"Stand out from the crowd by creating your own business cards with a custom design",
      "servicetxt5":"Large selection of logos. Each logo is customized for your organization or company",
      "servicetxt6":"Graphic creation of poster for your communication, adapted to your message and your graphic charter",

      "technotitle":"A collection of technologies to meet the needs of your information system  ",

      "projectstitle":"Three areas of activity: Web applications, desktop applications and mobile applications.",

      "certificatt1":"DATABASE ADMINISTRATION FUNDAMENTALS",
      "certificatt2":"CERTIFIED JAVA DEVELOPER",
      "certificatt3":"DESIGN A MOBILE APPLICATION IN PHOTOSHOP FROM SCRATCH",
      "certificatt4":"PROJECT MANAGEMENT CLASSIC PATH",

      "certificattxt1":"This certificate proves that the owner has successfully completed the requirements.",
      "certificattxt2":"This certifies that the owner of this document has taken the necessary courses with a fundamental knowledge of web development.",
      "certificattxt3":"Learn Complete UI/UX design by Photoshop from Scratch and Design Uber app from Scratch.",
      "certificattxt4":"The holder of this certificate is able to design and manage a project, lead a meeting ...",

      "firstname":"First name",
      "name":"Name",
      "email":"Email",
      "message":"Message for me",
      "nameph":"Enter your last name",
      "firstnameph":"Enter your first name",
      "emailph":"Enter your Email",
      "messageph":"Enter your message",

      "send":"SEND THE MESSAGE",

      "messagetxt1":"To contact me, nothing is easier! Simply fill out the form and I will contact you as soon as possible.",
      "messagetxt2":"You can also contact me on the network of your choice: facebook or LinkedIn.",

      "tel":"TEL",
      "git"  :"GIT",
      "blog":"BLOG",
      "copyright":"2022 ABBAOUI AMINE",

    }
  },
  fr: {
    translation: {
      "typing1": '[ "Salut, Je suis un ingénieur logiciel.", "I am Creative.", "I Love Design.", "I Love to Develop." ]',
      "title": "BIENVENUE SUR MA MAISON NUMÉRIQUE",
      "profil":"INGÉNIEUR LOGICIEL",

      "home" :"ACCUEIL",
      "about":"À PROPOS",
      "services":"SERVICES",
      "technos":"TECHNOLOGIES",
      "projects":"PROJETS",
      "certificats":"CERTIFICATS",
      "contact":"CONTACT",

      "abouttext":"Je suis spécialisé dans la conception des logiciels de gestion. J'ai développé mon activité depuis 2015 autour des différentes prestations de services informatiques dédiées aux entreprises. Je suis à votre écoute pour vous conseiller et vous orienter au mieux vers des solutions logicielles adaptées à votre profession et à vos besoins. Nous pouvons nous rencontrer pour discuter de vos projets.",

      "aboutt1":"Une analyse et conception sur mesure.",
      "aboutt2":"UNE METHODE DE TRAVAIL PROFESSIONELLE",
      "aboutt3":"DES TECHNOLOGIES ADAPTÉES À L'ENTREPRISE",
      "aboutt4":"UN DESIGN MODERN ET ADAPTATIF",

      "abouttxt1":"Un travail d’étude mené en amont de nos projets afin de comprendre et analyser les habitudes et les besoins des utilisateurs.",
      "abouttxt2":"Je dispose des compétences professionnelles adaptées à la gestion des projets informatiques. ",
      "abouttxt3":"Mes connaissances sur les techniques de développement me conduisent à proposer des solutions au service informatique de l'entreprise.",
      "abouttxt4":"La conception des interfaces soignées et intuitives sur un outil logiciel ou web pour un résultat d’une grande simplicité d’utilisation (UI/UX).",

      "aboutname":"AMINE ABBAOUI",
      "aboutprofil":"Développeur et Concepteur graphique",

      "servicet1":"LA CRÉATION ET LA CONCEPTION DES SITES WEB",
      "servicet2":"DÉVELOPPEMENT D'APPLICATIONS DE BUREAU",
      "servicet3":"CRÉATION ET CONCEPTION DES APPLICATIONS MOBILES",
      "servicet4":"CRÉATION DES CARTES DE VISITE",
      "servicet5":"CRÉATION DES LOGOS PROFESSIONNELS",
      "servicet6":"CRÉATION DES AFFICHES PUBLICITAIRES",

      "servicetxt1":"La création de site web inclura toutes les fonctions de base et avancées que vous souhaitez",
      "servicetxt2":"Afin d'utiliser de la façon la plus efficace possible les ressources à disposition",
      "servicetxt3":"Vous permettre de mettre toutes les fonctionnalités des smartphones au service de votre business",
      "servicetxt4":"Démarquez-vous en créant vos propres cartes de visite avec une conception personnalisée",
      "servicetxt5":"Grande sélection de logos. Chaque logo est personnalisé pour votre organisation ou votre société",
      "servicetxt6":"Création graphique d'affiche pour votre communication, adapté à votre message et votre charte graphique",

      "technotitle":"Une collection de technologies permettant de répondre aux besoins de votre système d'information",

      "projectstitle":"Trois domaines d'activité : Les applications web, les applications desktop et les applications mobile.",

      "certificatt1":"DATABASE ADMINISTRATION FUNDAMENTALS",
      "certificatt2":"DÉVELOPPEUR   JAVA CERTIFIÉ",
      "certificatt3":"CONCEPTION D'UNE APPLICATION MOBILE DANS PHOTOSHOP À PARTIR DE ZÉRO",
      "certificatt4":"GESTION DE PROJET PARCOURS CLASSIQUE",

      "certificattxt1":"Ce certificat prouve que son propriétaire a rempli avec succès les exigences.",
      "certificattxt2":"Cela certifie que le propriétaire de ce document a suivi les cours nécessaires avec une connaissance fondamentale du développement web.",
      "certificattxt3":"Apprenez la conception complète UI/UX par Photoshop from Scratch et concevez l'application Uber from Scratch.",
      "certificattxt4":"Le titulaire de cette attestation est capable de concevoir et piloter un projet, d’animer une réunion ...",

      "firstname":"Prénom",
      "name":"Nom",
      "email":"Email",
      "message":"Message pour moi ",
      "nameph":"Entrez votre nom de famille",
      "firstnameph":"Entrez votre prénom",
      "emailph":"Entrez votre Email",
      "messageph":"Entrez votre message",

      "send":"ENVOYER LE MESSAGE",

      "messagetxt1":"Pour me contacter, rien de plus simple! Remplissez tout simplement le formulaire et je vous contacterai le plus rapidement possible.",
      "messagetxt2":"Vous pouvez aussi me contacter sur le réseau de votre choix: facebook ou LinkedIn .",

      "tel":"TEL",
      "git"  :"GIT",
      "blog":"BLOG",
      "copyright":"2022 ABBAOUI AMINE",

    }
  },
  ar: {
    translation: {
      "typing1": '[ "Salut, Je suis un ingénieur logiciel.", "I am Creative.", "I Love Design.", "I Love to Develop." ]',
      "title": "أهلاً بكم في منزلي الرقمي",
      "profil":"مهندس برمجيات",
      "home" :"الرئيسية",
      "about":"عني",
      "services":"خدمات",
      "technos":"تقنيات",
      "projects":"مشاريع",
      "certificats":"شهادات",
      "contact":"اتصال",
      "abouttext":"مهندس برمجيات متخصص في تصميم وإنشاء التطبيقات البرمجية. لقد طورت نشاطي منذ عام 2015 حول خدمات تكنولوجيا المعلومات المختلفة المخصصة للشركات. أنا تحت تصرفك لتقديم المشورة لك وإرشادك قدر الإمكان نحو حلول برمجية تتكيف مع مهنتك واحتياجاتك. يمكننا أن نجتمع لمناقشة مشاريعك.",
      "aboutt1":"تحليل وتصميم حسب الطلب.",
      "aboutt2":"طريقة عمل احترافية",
      "aboutt3":"تقنيات جاهزة للأعمال التجارية",
      "aboutt4":"تصميم حديث ومتكيف",

      "abouttxt1":"دراسة يتم إجراؤها في المراحل الأولى من مشاريعنا من أجل فهم وتحليل عادات واحتياجات المستخدمين.",
      "abouttxt2":"لدي مهارات مهنية تتكيف مع إدارة مشاريع تكنولوجيا المعلومات.",
      "abouttxt3":"تقودني معرفتي بتقنيات التطوير إلى اقتراح حلول لقسم تكنولوجيا المعلومات في الشركة.",
      "abouttxt4":"تصميم واجهات أنيقة وبديهية على برنامج و أدوات عصرية للحصول على سهولة كبيرة في الاستخدام (UI / UX).", 

      "aboutname":" أمين عباوي",
      "aboutprofil":"مبرمج ومصمم جرافيك",

      "servicet1":"إنشاء وتصميم المواقع الإلكترونية",
      "servicet2":"تطوير تطبيقات سطح المكتب",
      "servicet3":"إنشاء وتصميم تطبيقات الجوال",
      "servicet4":"إنشاء بطاقات الأعمال",
      "servicet5":"إنشاء الشعارات المهنية",
      "servicet6":"إنشاء الملصقات الإعلانية",

      "servicetxt1":"سيتضمن إنشاء موقع الويب جميع الميزات الأساسية والمتقدمة التي تريدها",
      "servicetxt2":"من أجل تحقيق أقصى استفادة من الموارد المتاحة",
      "servicetxt3":"تسمح لك بوضع جميع ميزات الهواتف الذكية في خدمة عملك",
      "servicetxt4":"تميز عن طريق إنشاء بطاقات العمل الخاصة بك بتصميم مخصص",
      "servicetxt5":"مجموعة كبيرة من الشعارات. كل شعار مخصص لمؤسستك أو شركتك",
      "servicetxt6":"تصميم رسومي لملصق لتواصلك ، يتلاءم مع رسالتك وميثاقك الجرافيكي",

      "technotitle":"مجموعة من التقنيات لتلبية احتياجات نظام المعلومات الخاص بك",
      "projectstitle":"ثلاثة مجالات للنشاط: تطبيقات الويب وتطبيقات سطح المكتب وتطبيقات الجوال.",

      "certificatt1":"أساسيات إدارة قواعد البيانات",
      "certificatt2":"مطور JAVA معتمد",
      "certificatt3":"تصميم تطبيقات الهاتف المحمول في PHOTOSHOP من الصفر",
      "certificatt4":"إدارة المشاريع الدورة الكلاسيكية",

      "certificattxt1":"  تثبت هذه الشهادة أن مالكها قد استوفى المتطلبات بنجاح.",
      "certificattxt2":"  يشهد على أن مالك هذا المستند قد أخذ الدورات اللازمة مع معرفة أساسية لتطوير الويب.",
      "certificattxt3":"تعلم تصميم UI / UX الكامل بواسطة Photoshop من تطبيق Scratch and Design Uber من سكراتش.",
      "certificattxt4":"يستطيع حامل هذه الشهادة تصميم مشروع وإدارته وقيادة اجتماع ...",

      "firstname":"الاسم",
      "name":"اللقب",
      "email":"البريد",
      "message":"رسالة لي",
      "nameph":"أدخل اسمك الأخير",
      "firstnameph":"أدخل اسمك الأول",
      "emailph":"أدخل بريدك الإلكتروني",
      "messageph":"أدخل رسالتك",

      "send":"أرسل الرسالة",

      "messagetxt1":"للاتصال بي ، لا شيء أكثر بساطة! ما عليك سوى ملء النموذج وسأتصل بك في أقرب وقت ممكن.",
      "messagetxt2":"يمكنك أيضًا الاتصال بي على الشبكة التي تختارها: Facebook أو LinkedIn.",
      
      "tel":"الهاتف",
      "git"  :"GIT",
      "blog":"المدونة",
      "copyright":"2022 أمين عباوي",

    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;