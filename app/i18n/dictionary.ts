/*
  dictionary.ts — every string on the page, in both languages.
  ─────────────────────────────────────────────────────────
  Conventions:

  · Text wrapped in *asterisks* is rendered in italics by <Emphasis>.
    Use it instead of embedding JSX here, so this file stays plain data.
  · Arrays of strings are rendered as separate lines (joined with <br>).
  · Stack names, code and terminal output stay in English in both
    languages — that's how they're written in Brazilian tech work.
  · Job titles ARE translated.
  ─────────────────────────────────────────────────────────
*/

export type Lang = "en" | "pt";

export const LANGS: Lang[] = ["en", "pt"];

const en = {
  htmlLang: "en",

  nav: {
    brand: "Mateus Henrique",
    about: "who i am",
    projects: "projects",
    experience: "experience",
  },

  hero: {
    title: "CREATION BEGINS IN CONTACT",
    adamAlt: "Adam's arm",
    godAlt: "God's arm",
  },

  about: {
    eyebrow: "who i am & what i do",
    portraitAlt: "Portrait of Mateus Henrique",
    location: "Teresina, Piauí · Brazil · UTC−3",
    availability: "AI Engineer · open to remote roles and freelance builds",
    statement: ["I build the machinery", "that makes AI actually useful."],
    dropCap: "M",
    lede: "y name is Mateus Henrique. I'm a Computer Science student at the Federal University of Piauí, graduating in July 2026, and I've spent the last five years doing one thing: taking messy real-world data and turning it into systems that run by themselves.",
    body: "Two years of NLP research. A year building ETL pipelines and LLM-generated reports for a health-tech company. A retrieval chatbot that answers from an institution's own documents. Not demos — things that stayed running after I walked away.",
    capabilitiesLabel: "what i can build for you",
    capabilities: [
      {
        index: "i",
        title: "Automate the work nobody wants to do",
        text: "Spreadsheets cleaned, reports generated, sites scraped, jobs scheduled. Python, Pandas, Airflow, Playwright.",
      },
      {
        index: "ii",
        title: "Chatbots that answer from *your* documents",
        text: "RAG done properly: ingestion, chunking, embeddings, retrieval you can measure — and every answer cites its source.",
      },
      {
        index: "iii",
        title: "Put an LLM inside your product",
        text: "Prompt workflows, structured output, text and images in one pipeline. Integrated into the system you already have.",
      },
      {
        index: "iv",
        title: "Ship the whole thing",
        text: "Angular, Next.js, SQL and NoSQL, Docker. Front end, back end, and the deployment in between.",
      },
    ],
  },

  projects: {
    eyebrow: "three things i built",
    title: "PROJECTS",
    plateAlt: "Leonardo da Vinci's Vitruvian Man",
    panelTitle: "Built, shipped, still running.",
    panelLede:
      "Each one has a plain description, the stack, and what actually came out of it. Click a card for the full case study.",
    resultLabel: "Result:",
    caseStudy: "Read the case study →",
    items: [
      {
        meta: "2026 · retrieval-augmented generation",
        title: "Institutional document chatbot",
        text: "A chatbot that answers questions using an institution's own documents instead of guessing. I worked on ingestion, chunking and retrieval quality — the parts that decide whether the answer is right.",
        result:
          "staff find policy answers in seconds instead of digging through PDFs.",
      },
      {
        meta: "2025–2026 · medsafe · data engineering",
        title: "Reports that write themselves",
        text: "Airflow pipelines that pull data from the database every day, transform it, generate the charts, then hand the numbers and images to an LLM that writes the report.",
        result:
          "a manual reporting routine became a scheduled job nobody has to remember.",
      },
      {
        meta: "2021–2023 · ufpi research · nlp",
        title: "Grading written answers automatically",
        text: "Two years of research on scoring free-text exam answers by meaning rather than keywords. I compared cosine, Jaccard and Word Mover Distance across Bag of Words, TF-IDF and word embeddings.",
        result:
          "a measured answer to which similarity method a teacher should trust.",
      },
    ],
  },

  experience: {
    eyebrow: "where i've worked and studied",
    title: "Five years, in order.",
    cv: "Download the full CV (PDF) →",
    plateAlt: "Leonardo da Vinci, mechanical study from the Codex Atlanticus",
    asideLabel: "in short",
    asideText:
      "Two years in research taught me to measure things. One year in industry taught me to ship them. I'd like to do both for you.",
    chart: `research  ██████░░░░  2 yr
industry  ████░░░░░░  1.2 yr
teaching  █░░░░░░░░░  4 mo`,
    entries: [
      {
        date: ["Feb 2025", "— Mar 2026"],
        duration: "1 yr 2 mo",
        role: "Tech Intern · Medsafe",
        place: "Teresina, Brazil · health tech",
        text: "Built Airflow ETL pipelines that transformed database data, generated visual outputs, and fed both structured data and images into LLM-based automated reporting. Cleaned and structured Excel and CSV datasets with Python and Pandas. Also worked on the front end in Angular for the *Piauí Primeira Infância* early-childhood system.",
      },
      {
        date: ["Aug 2021", "— Nov 2023"],
        duration: "2 yr 4 mo",
        role: "Undergraduate Researcher (PIBIC) · UFPI",
        place: "Department of Computer Science",
        text: "Researched automatic grading of free-text answers using NLP similarity methods, and built the experimental evaluation pipelines that compared them.",
      },
      {
        date: ["Aug 2021", "— Nov 2021"],
        duration: "4 mo",
        role: "Data Structures Teaching Assistant · UFPI",
        place: "",
        text: "Reviewed assignments and exams and taught linked lists, stacks, queues, trees, graphs, hash tables, heaps and algorithmic complexity one student at a time.",
      },
      {
        date: ["→ Jul 2026"],
        duration: "graduating",
        role: "BSc Computer Science · Federal University of Piauí",
        place: "",
        text: "Coursework in Artificial Intelligence, Natural Language Processing, and Topics in AI with an emphasis on RAG applications.",
      },
    ],
  },

  footer: {
    eyebrow: "inscription over the door",
    inscription: "SPEAK · AND WE BUILD",
    lede: "Tell me what's taking too long and I'll tell you whether it can be automated. Half an hour, free, no pitch.",
    book: "Book a call",
    cv: "Download CV",
    phone: "+55 86 99826 7438",
    location: "Teresina, Piauí, Brazil",
  },
};

/* The PT-BR side must mirror the EN shape exactly. */
export type Dict = typeof en;

const pt: Dict = {
  htmlLang: "pt-BR",

  nav: {
    brand: "Mateus Henrique",
    about: "quem eu sou",
    projects: "projetos",
    experience: "experiência",
  },

  hero: {
    title: "A CRIAÇÃO COMEÇA NO CONTATO",
    adamAlt: "O braço de Adão",
    godAlt: "O braço de Deus",
  },

  about: {
    eyebrow: "quem eu sou e o que eu faço",
    portraitAlt: "Retrato de Mateus Henrique",
    location: "Teresina, Piauí · Brasil · UTC−3",
    availability:
      "Engenheiro de IA · aberto a vagas remotas e projetos freelance",
    statement: ["Eu construo a máquina", "que faz a IA ser realmente útil."],
    dropCap: "M",
    lede: "eu nome é Mateus Henrique. Sou estudante de Ciência da Computação na Universidade Federal do Piauí, com formatura em julho de 2026, e passei os últimos cinco anos fazendo uma coisa só: pegar dado bagunçado do mundo real e transformar em sistema que roda sozinho.",
    body: "Dois anos de pesquisa em PLN. Um ano construindo pipelines de ETL e relatórios gerados por LLM em uma healthtech. Um chatbot que responde a partir dos documentos da própria instituição. Nada de demo — coisas que continuaram rodando depois que eu saí.",
    capabilitiesLabel: "o que eu posso construir para você",
    capabilities: [
      {
        index: "i",
        title: "Automatizar o trabalho que ninguém quer fazer",
        text: "Planilhas limpas, relatórios gerados, sites raspados, rotinas agendadas. Python, Pandas, Airflow, Playwright.",
      },
      {
        index: "ii",
        title: "Chatbots que respondem a partir dos *seus* documentos",
        text: "RAG feito direito: ingestão, chunking, embeddings, recuperação que dá para medir — e toda resposta cita a fonte.",
      },
      {
        index: "iii",
        title: "Colocar um LLM dentro do seu produto",
        text: "Fluxos de prompt, saída estruturada, texto e imagem no mesmo pipeline. Integrado ao sistema que você já tem.",
      },
      {
        index: "iv",
        title: "Entregar a coisa inteira",
        text: "Angular, Next.js, SQL e NoSQL, Docker. Front-end, back-end e o deploy no meio do caminho.",
      },
    ],
  },

  projects: {
    eyebrow: "três coisas que eu construí",
    title: "PROJETOS",
    plateAlt: "O Homem Vitruviano, de Leonardo da Vinci",
    panelTitle: "Feito, entregue e ainda rodando.",
    panelLede:
      "Cada um tem uma descrição direta, a stack e o que de fato saiu dali. Clique num card para ver o estudo de caso completo.",
    resultLabel: "Resultado:",
    caseStudy: "Ver o estudo de caso →",
    items: [
      {
        meta: "2026 · geração aumentada por recuperação",
        title: "Chatbot de documentos institucionais",
        text: "Um chatbot que responde perguntas usando os documentos da própria instituição, em vez de chutar. Trabalhei na ingestão, no chunking e na qualidade da recuperação — as partes que decidem se a resposta está certa.",
        result:
          "a equipe acha resposta sobre norma interna em segundos, sem garimpar PDF.",
      },
      {
        meta: "2025–2026 · medsafe · engenharia de dados",
        title: "Relatórios que se escrevem sozinhos",
        text: "Pipelines em Airflow que puxam os dados do banco todo dia, transformam, geram os gráficos e entregam números e imagens para um LLM que escreve o relatório.",
        result:
          "uma rotina manual de relatório virou um job agendado que ninguém precisa lembrar.",
      },
      {
        meta: "2021–2023 · pesquisa ufpi · pln",
        title: "Correção automática de respostas discursivas",
        text: "Dois anos de pesquisa sobre pontuar resposta discursiva por significado, e não por palavra-chave. Comparei cosseno, Jaccard e Word Mover Distance entre Bag of Words, TF-IDF e word embeddings.",
        result:
          "uma resposta medida sobre em qual método de similaridade o professor pode confiar.",
      },
    ],
  },

  experience: {
    eyebrow: "onde eu trabalhei e estudei",
    title: "Cinco anos, em ordem.",
    cv: "Baixar o CV completo (PDF) →",
    plateAlt: "Leonardo da Vinci, estudo mecânico do Códice Atlântico",
    asideLabel: "em resumo",
    asideText:
      "Dois anos de pesquisa me ensinaram a medir as coisas. Um ano de indústria me ensinou a entregar. Quero fazer as duas para você.",
    chart: `pesquisa  ██████░░░░  2 anos
indústria ████░░░░░░  1,2 ano
monitoria █░░░░░░░░░  4 meses`,
    entries: [
      {
        date: ["Fev 2025", "— Mar 2026"],
        duration: "1 ano 2 meses",
        role: "Estagiário de Tecnologia · Medsafe",
        place: "Teresina, Brasil · healthtech",
        text: "Construí pipelines de ETL em Airflow que transformavam dados do banco, geravam saídas visuais e alimentavam com dados estruturados e imagens um relatório automatizado escrito por LLM. Limpei e estruturei bases em Excel e CSV com Python e Pandas. Também trabalhei no front-end em Angular do sistema *Piauí Primeira Infância*.",
      },
      {
        date: ["Ago 2021", "— Nov 2023"],
        duration: "2 anos 4 meses",
        role: "Pesquisador de Iniciação Científica (PIBIC) · UFPI",
        place: "Departamento de Ciência da Computação",
        text: "Pesquisei correção automática de respostas discursivas com métodos de similaridade de PLN, e construí os pipelines experimentais que compararam esses métodos.",
      },
      {
        date: ["Ago 2021", "— Nov 2021"],
        duration: "4 meses",
        role: "Monitor de Estrutura de Dados · UFPI",
        place: "",
        text: "Corrigi listas e provas e ensinei listas encadeadas, pilhas, filas, árvores, grafos, tabelas hash, heaps e complexidade de algoritmos, um aluno por vez.",
      },
      {
        date: ["→ Jul 2026"],
        duration: "formando",
        role: "Bacharelado em Ciência da Computação · Universidade Federal do Piauí",
        place: "",
        text: "Disciplinas de Inteligência Artificial, Processamento de Linguagem Natural e Tópicos em IA com ênfase em aplicações de RAG.",
      },
    ],
  },

  footer: {
    eyebrow: "inscrição sobre a porta",
    inscription: "FALE · E NÓS CONSTRUÍMOS",
    lede: "Me conta o que está demorando demais e eu te digo se dá para automatizar. Meia hora, de graça, sem enrolação.",
    book: "Agendar uma conversa",
    cv: "Baixar o CV",
    phone: "+55 86 99826 7438",
    location: "Teresina, Piauí, Brasil",
  },
};

export const DICTIONARIES: Record<Lang, Dict> = { en, pt };
