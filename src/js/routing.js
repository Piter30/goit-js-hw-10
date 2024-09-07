document.addEventListener('DOMContentLoaded', () => {
  const repoName = '/goit-js-hw-10';
  const navLinks = document.querySelectorAll('.nav-link');

  const isGitHubPages = window.location.hostname.includes('github.io');

  if (isGitHubPages) {
    navLinks.forEach(link => {
      let href = link.getAttribute('href');

      href = href.replace(/^(\.\/|\.\.\/)+/, '');

      link.href = `${repoName}/${href}`;

      console.log(`Original href: ${link.getAttribute('href')}`);
      console.log(`Updated href: ${link.href}`);
    });
  }
});
