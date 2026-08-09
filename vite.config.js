import { defineConfig } from 'vite';

// Base path is set for GitHub Project Pages (https://<user>.github.io/<repo>/).
// Update REPO_NAME once the GitHub repo is created, or set base: '/' for a
// User/Org page repo named <username>.github.io.
const REPO_NAME = 'resume-site';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? `/${REPO_NAME}/` : '/',
});
