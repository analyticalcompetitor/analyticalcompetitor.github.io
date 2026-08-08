# Deploy — GitHub Pages

O site é exportado estaticamente (`output: "export"` no `next.config.ts`) e
publicado por GitHub Actions em `analyticalcompetitor.github.io`.

## 1. Conferir o remote (uma vez)

Este repositório é o `analyticalcompetitor.github.io`; o portfólio antigo já foi
renomeado para outro nome. Se o `origin` local ainda apontar para o nome antigo:

```bash
cd /home/mateo/Projects/analyticalcompetitor
git remote -v
git remote set-url origin https://github.com/analyticalcompetitor/analyticalcompetitor.github.io.git
```

## 2. Enviar o código

```bash
git add -A
git commit -m "novo portfólio em Next.js"
git push origin main
```

## 3. Ativar o GitHub Pages (uma vez)

No repositório: **Settings → Pages → Build and deployment → Source:
GitHub Actions**.

A partir daí, todo push na `main` dispara `.github/workflows/deploy.yml`, que
roda `npm ci`, `npm run build` e publica a pasta `out/`. O resultado aparece em
https://analyticalcompetitor.github.io em um ou dois minutos.

## Notas

- O site é 100% estático: sem rotas de API, sem SSR e sem otimização de imagem
  do Next (`images.unoptimized`). Se algum dia entrar uma API route, o Pages
  deixa de servir e o destino passa a ser Vercel.
- As fontes vêm do Google Fonts via `next/font`, baixadas em tempo de build. O
  runner do Actions tem acesso à internet, então isso funciona lá.
- Domínio próprio: adicione um arquivo `public/CNAME` com o domínio e configure
  o DNS.
