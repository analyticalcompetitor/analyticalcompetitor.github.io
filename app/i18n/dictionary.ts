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
    lede: "y name is Mateus Henrique, and I hold a Computer Science degree from the Federal University of Piauí, focused on building applied AI systems — Python, natural language processing, RAG, and data pipelines. My work sits at the boundary between data engineering and AI engineering: making sure information arrives clean, is retrieved accurately, and supports an answer someone can actually act on.",
    body: "As a PIBIC research fellow at UFPI, I worked in natural language processing. At MedSafe, a health-tech company, I built data pipelines and LLM report automation orchestrated in Airflow, combining data transformation, chart generation, and text production into a single workflow. I've also developed RAG solutions that connect institutional knowledge to accessible conversational interfaces, working with embeddings, vector databases, and retrieval evaluation. I'm interested in AI Engineer opportunities, contributing to production-oriented systems involving information retrieval, backend workflows, and applied machine learning.",
    capabilitiesLabel: "what i can build for you",
    capabilities: [
      {
        index: "i",
        title: "Automations",
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
      "Each one has a plain description, the stack, and what actually came out of it. Two are live — open them and ask something.",
    resultLabel: "Result:",
    demoLabel: "Open the live app →",
    repoLabel: "Source on GitHub →",
    siteLabel: "Visit MedSafe →",
    items: [
      {
        meta: "2026 · rag · ufpi",
        title: "DC/UFPI academic assistant",
        text: "A RAG assistant that answers student questions from the Computer Science course's own official documents — curriculum project, regulations, flowchart, academic calendar, faculty and PIBIC research calls. I built the ingestion and per-category chunking, a threshold retriever over ChromaDB, hybrid retrieval with Reciprocal Rank Fusion, and an evaluation suite that compares six embedding models with MRR, NDCG@6 and Recall@6.",
        result:
          "every answer cites the document it came from, and the embedding model was chosen by metric and significance test, not by intuition.",
        note: "",
        demo: "https://compchat.streamlit.app/",
        repo: "https://github.com/analyticalcompetitor/compChatUfpi",
      },
      {
        meta: "2026 · rag · medical literature",
        title: "ENT research assistant",
        text: "A knowledge base over recent otolaryngology literature. A harvesting pipeline collects DOIs and metadata from PubMed, pulls full text from PMC Open Access, resolves the rest through Unpaywall and tracks the top ENT journals via RSS — then that corpus becomes a retrieval layer you can ask questions in plain language.",
        result:
          "keeping up with new papers becomes a question you ask instead of a search you run.",
        note: "",
        demo: "https://ent-research-assistant.streamlit.app/",
        repo: "https://github.com/analyticalcompetitor/ENT-research-assistant",
      },
      {
        meta: "2025–2026 · medsafe · data engineering",
        title: "Reports that write themselves",
        text: "Airflow pipelines that pull data from the database every day, transform it, generate the charts, then hand the numbers and the images to an LLM that writes the report. Scheduling, retries and delivery included — the whole routine runs unattended.",
        result:
          "a manual reporting routine became a scheduled job nobody has to remember.",
        note: "Proprietary MedSafe project — the code isn't public.",
        demo: "https://medsafebrasil.com.br/",
        repo: "",
      },
    ],
  },

  experience: {
    eyebrow: "where i've worked and studied",
    title: "Where I've worked, in order.",
    cv: "Download the full CV (PDF) →",
    plateAlt: "Leonardo da Vinci, mechanical study from the Codex Atlanticus",
    asideLabel: "in short",
    asideText:
      "Research taught me to measure things. Industry taught me to ship them. I'd like to do both for you.",
    chart: `industry  ██████░░░░  medsafe
research  ████░░░░░░  pibic
teaching  ██░░░░░░░░  data struct`,
    entries: [
      {
        date: ["Jan 2025", "— Jun 2026"],
        duration: "medsafe",
        role: "Tech Intern · MedSafe",
        place: "Teresina, Brazil · health tech",
        text: "As a Technology Intern, I divided my focus between front-end development and data. In web development, I worked with Angular to build the *Piauí Primeira Infância* system. On a separate front, I performed data cleaning and structuring (Excel, CSV) using Python and Pandas. Additionally, I was responsible for orchestration using Airflow, creating specific workflows to both monitor routines and generate automated reports from the database.",
      },
      {
        date: ["Oct 2023", "— 2024"],
        duration: "jaguaracambé",
        role: "Developer · Jaguaracambé",
        place: "wildlife conservation NGO",
        text: "Jaguaracambé is a wild animal conservation NGO, where I had the opportunity to contribute to this initiative that I admire so much. I was responsible for building their website, as well as participating in the environmental education project they coordinate.",
      },
      {
        date: ["Jul 2022", "— Jun 2023"],
        duration: "pibic",
        role: "Undergraduate Researcher (PIBIC) · UFPI",
        place: "Department of Computer Science",
        text: "I conducted research on an automatic correction system for free-text answers. The project involved analyzing existing studies in the field and implementing various similarity measurement techniques. I compared the performance of Cosine Similarity, Jaccard Index, and Word Mover's Distance using different vector space models, including Bag of Words, TF-IDF, and word embeddings.",
      },
      {
        date: ["Aug 2022", "— Nov 2022"],
        duration: "monitoria",
        role: "Data Structures Teaching Assistant · UFPI",
        place: "",
        text: "Graded assignments and exams, and provided feedback to students. Also provided one-on-one support to students, helping them to understand and implement data structures and algorithms. Some of the topics covered: linked lists, stacks, queues, trees and graphs, hash tables, heaps, time and space complexity, algorithmic design.",
      },
      {
        date: ["Jul 2026"],
        duration: "graduated",
        role: "BSc Computer Science · Federal University of Piauí",
        place: "",
        text: "Coursework in Artificial Intelligence, Natural Language Processing, and Topics in AI with an emphasis on RAG applications.",
      },
    ],
  },

  footer: {
    eyebrow: "CREATION BEGINS IN CONTACT",
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
    lede: "eu nome é Mateus Henrique e sou formado em Ciência da Computação pela Universidade Federal do Piauí, com foco no desenvolvimento de sistemas de IA aplicada — Python, processamento de linguagem natural, RAG e pipelines de dados. Meu trabalho está na fronteira entre engenharia de dados e engenharia de IA: garantir que a informação chegue limpa, seja recuperada com precisão e sustente uma resposta que alguém possa usar para decidir algo.",
    body: "Como pesquisador PIBIC na UFPI, atuei em processamento de linguagem natural. Na MedSafe, healthtech, construí pipelines de dados e automação de relatórios com LLM, orquestrados em Airflow, unindo transformação de dados, geração de gráficos e produção de texto num único fluxo. Também desenvolvi soluções de RAG que conectam conhecimento institucional a interfaces conversacionais acessíveis, trabalhando com embeddings, bancos vetoriais e avaliação de recuperação. Tenho interesse em oportunidades como AI Engineer, contribuindo para sistemas voltados à produção com recuperação de informação, workflows de backend e machine learning aplicado.",
    capabilitiesLabel: "o que eu posso construir para você",
    capabilities: [
      {
        index: "i",
        title: "Automatizações",
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
        title: "Aplicações completas",
        text: "Next.js, SQL e NoSQL, Docker, fastApi, nodejs. Front-end, back-end e o deploy de ponta a ponta.",
      },
    ],
  },

  projects: {
    eyebrow: "três coisas que eu construí",
    title: "PROJETOS",
    plateAlt: "O Homem Vitruviano, de Leonardo da Vinci",
    panelTitle: "Feito, entregue e ainda rodando.",
    panelLede:
      "Cada um tem uma descrição direta, a stack e o que de fato saiu dali. Dois estão no ar — abra e faça uma pergunta.",
    resultLabel: "Resultado:",
    demoLabel: "Abrir o app →",
    repoLabel: "Código no GitHub →",
    siteLabel: "Conhecer a MedSafe →",
    items: [
      {
        meta: "2026 · rag · ufpi",
        title: "Assistente acadêmico do DC/UFPI",
        text: "Um assistente em RAG que responde dúvidas de aluno a partir dos documentos oficiais do curso de Ciência da Computação — PPC, regulamento, fluxograma, calendário acadêmico, corpo docente e editais do PIBIC. Construí a ingestão e o chunking por categoria de documento, um retriever com threshold sobre o ChromaDB, recuperação híbrida com Reciprocal Rank Fusion e uma suíte de avaliação que compara seis modelos de embedding por MRR, NDCG@6 e Recall@6.",
        result:
          "toda resposta cita o documento de onde veio, e o modelo de embedding foi escolhido por métrica e teste de significância, não por intuição.",
        note: "",
        demo: "https://compchat.streamlit.app/",
        repo: "https://github.com/analyticalcompetitor/compChatUfpi",
      },
      {
        meta: "2026 · rag · literatura médica",
        title: "Assistente de pesquisa em otorrinolaringologia",
        text: "Uma base de conhecimento sobre a literatura recente de otorrinolaringologia. Um pipeline de coleta busca DOIs e metadados no PubMed, baixa o texto completo do PMC Open Access, resolve o restante pelo Unpaywall e acompanha os principais periódicos da área por RSS — e esse corpus vira uma camada de recuperação que você consulta em linguagem natural.",
        result:
          "acompanhar artigo novo vira uma pergunta que se faz, e não uma busca que se repete.",
        note: "",
        demo: "https://ent-research-assistant.streamlit.app/",
        repo: "https://github.com/analyticalcompetitor/ENT-research-assistant",
      },
      {
        meta: "2025–2026 · medsafe · engenharia de dados",
        title: "Relatórios que se escrevem sozinhos",
        text: "Pipelines em Airflow que puxam os dados do banco todo dia, transformam, geram os gráficos e entregam números e imagens para um LLM que escreve o relatório. Agendamento, retentativa e entrega inclusos — a rotina inteira roda sem ninguém acompanhar.",
        result:
          "uma rotina manual de relatório virou um job agendado que ninguém precisa lembrar.",
        note: "Projeto proprietário da MedSafe — o código não é público.",
        demo: "https://medsafebrasil.com.br/",
        repo: "",
      },
    ],
  },

  experience: {
    eyebrow: "onde eu trabalhei e estudei",
    title: "Onde eu trabalhei, em ordem.",
    cv: "Baixar o CV completo (PDF) →",
    plateAlt: "Leonardo da Vinci, estudo mecânico do Códice Atlântico",
    asideLabel: "em resumo",
    asideText:
      "A pesquisa me ensinou a medir as coisas. A indústria me ensinou a entregar. Quero fazer as duas para você.",
    chart: `indústria ██████░░░░  medsafe
pesquisa  ████░░░░░░  pibic
monitoria ██░░░░░░░░  estrut. dados`,
    entries: [
      {
        date: ["Jan 2025", "— Jun 2026"],
        duration: "medsafe",
        role: "Estagiário de Tecnologia · MedSafe",
        place: "Teresina, Brasil · healthtech",
        text: "Como Estagiário de Tecnologia, dividi minha atuação entre o desenvolvimento front-end e dados. No desenvolvimento web, atuei com Angular na construção do sistema *Piauí Primeira Infância*. Em uma frente distinta, realizei a limpeza e estruturação de dados (Excel, CSV) utilizando Python e Pandas. Além disso, fui responsável pela orquestração com Airflow, criando fluxos específicos tanto para monitorar rotinas quanto para gerar relatórios automatizados a partir do banco de dados.",
      },
      {
        date: ["Out 2023", "— 2024"],
        duration: "jaguaracambé",
        role: "Desenvolvedor · Jaguaracambé",
        place: "ONG de preservação de animais selvagens",
        text: "Participei da criação do site da Jaguaracambé, uma ONG voltada para a preservação de animais selvagens, uma iniciativa que admiro profundamente. Contribuí para o desenvolvimento do site e atuei também em projetos de educação ambiental que a organização coordena.",
      },
      {
        date: ["Jul 2022", "— Jun 2023"],
        duration: "pibic",
        role: "Pesquisador de Iniciação Científica (PIBIC) · UFPI",
        place: "Departamento de Ciência da Computação",
        text: "Conduzi uma pesquisa sobre correção automática para questões discursivas. O projeto envolveu a análise de trabalhos relacionados e a implementação de diferentes técnicas de medidas de similaridade. Comparei o desempenho de diversas métricas de similaridade (como Cosine Similarity, Jaccard Index e Word Mover's Distance) utilizando diferentes modelos de representação vetorial, incluindo Bag of Words, TF-IDF e word embeddings.",
      },
      {
        date: ["Ago 2022", "— Nov 2022"],
        duration: "monitoria",
        role: "Monitor de Estrutura de Dados · UFPI",
        place: "",
        text: "Corrigi provas e trabalhos, além de fornecer feedback para os alunos. Também ofereci suporte individualizado, ajudando-os a entender e implementar estruturas de dados e algoritmos. Alguns dos tópicos abordados incluíam: listas encadeadas, pilhas, filas, árvores e grafos, tabelas hash, heaps, análise de tempo e espaço de execução e design de algoritmos.",
      },
      {
        date: ["Jul 2026"],
        duration: "formado",
        role: "Bacharelado em Ciência da Computação · Universidade Federal do Piauí",
        place: "",
        text: "Disciplinas de Inteligência Artificial, Processamento de Linguagem Natural e Tópicos em IA com ênfase em aplicações de RAG.",
      },
    ],
  },

  footer: {
    eyebrow: "A CRIAÇÃO COMEÇA NO CONTATO",
    inscription: "FALE · E NÓS CONSTRUÍMOS",
    lede: "Me conta o que está demorando demais e eu te digo se dá para automatizar. Entre em contato!",
    book: "Agendar uma conversa",
    cv: "Baixar o CV",
    phone: "+55 86 99826 7438",
    location: "Teresina, Piauí, Brasil",
  },
};

export const DICTIONARIES: Record<Lang, Dict> = { en, pt };
