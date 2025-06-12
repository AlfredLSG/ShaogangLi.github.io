// 读取 publication.tsv 并渲染文章列表
fetch('publication.tsv')
  .then(response => response.text())
  .then(data => {
    const lines = data.split('\n');
    const headers = lines[0].split('\t');
    const publicationsContainer = document.getElementById('publications-container');

    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split('\t');
      if (parts.length !== headers.length) continue; 

      const pubObj = {};
      headers.forEach((header, idx) => {
        pubObj[header] = parts[idx];
      });

      const pubDiv = document.createElement('div');
      pubDiv.className = 'publication-item';
      pubDiv.innerHTML = `
        <h4><a href="${pubObj.download_link}" target="_blank">${pubObj.title}</a></h4>
        <p>Published in <em>${pubObj.journal}</em>, ${pubObj.published_info}</p>
        <p>${pubObj.description} ${pubObj.author_note}</p>
        <a href="${pubObj.download_link}" target="_blank">${pubObj.download_link}</a>
      `;
      publicationsContainer.appendChild(pubDiv);
    }
  })
  .catch(error => console.error('读取 publication.tsv 失败:', error));

// 读取 CV.md 并渲染（简单展示文本，如需解析 Markdown 需引入 marked.js 等库）
fetch('CV.md')
  .then(response => response.text())
  .then(cvText => {
    const cvContainer = document.getElementById('cv-container');
    cvContainer.textContent = cvText;
  })
  .catch(error => console.error('读取 CV.md 失败:', error));