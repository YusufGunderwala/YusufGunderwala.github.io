function toggleMenu() {
  var sideMenu = document.getElementById('side-menu');
  sideMenu.classList.toggle('active');
  document.querySelector('.menu-toggle').classList.toggle('active');
}

function closeMenu() {
  var sideMenu = document.getElementById('side-menu');
  sideMenu.classList.remove('active');
  document.querySelector('.menu-toggle').classList.remove('active');
  document.querySelector('.logo h1').classList.add('closing');
  setTimeout(() => {
    document.querySelector('.logo h1').classList.remove('closing');
  }, 1000);
}

async function fetchNews(query = 'latest') {
  const apiKey = '728b80510feb4c75b0d64a483bafb761';
  const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  displayNews(data.articles);
}

function displayNews(articles) {
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = '';
  articles.forEach(article => {
    const newsItem = document.createElement('div');
    newsItem.className = 'news-item';
    newsItem.innerHTML = `
      <img src="${article.urlToImage || 'https://via.placeholder.com/500x300'}" alt="${article.title}">
      <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
      <p>${article.description}</p>
    `;
    newsContainer.appendChild(newsItem);
  });
}

fetchNews();

function changeCategory(category) {
  fetchNews(category);
}

document.querySelectorAll('.topnav a').forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    const category = this.textContent.trim();
    changeCategory(category);
  });
});

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function onScroll() {
  var newsItems = document.querySelectorAll('.news-item');
  newsItems.forEach(item => {
    if (isElementInViewport(item)) {
      item.style.opacity = '1';
    }
  });
}

window.addEventListener('scroll', onScroll);
onScroll();

// Dark mode toggle functionality
document.getElementById('checkbox').addEventListener('change', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// Check for saved theme preference on page load
window.addEventListener('load', () => {
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.body.classList.add('dark');
    document.getElementById('checkbox').checked = true;
  }
});

// Search functionality
document.getElementById('search-button').addEventListener('click', function () {
  const query = document.getElementById('search-input').value;
  if (query) {
    fetchNews(query);
  }
});

document.getElementById('search-input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    const query = e.target.value;
    if (query) {
      fetchNews(query);
    }
  }
});
