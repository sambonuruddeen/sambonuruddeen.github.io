
  // Replace {username} with your GitHub username
  const url = `https://api.github.com/users/sambonuruddeen/events`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const activityList = document.getElementById('github-activity');

      // Iterate over the activity data and create HTML elements for each event
      data.forEach(event => {
        const eventType = event.type;
        const repoName = event.repo.name;
        const createdAt = new Date(event.created_at).toLocaleDateString();
        const eventUrl = event.payload.ref || event.payload.commits[0].url;

        const eventElement = document.createElement('div');
        eventElement.innerHTML = `
          <span>${eventType}</span>
          <a href="${eventUrl}">${repoName}</a>
          <span>${createdAt}</span>
        `;

        activityList.appendChild(eventElement);
      });
    })
    .catch(error => {
      console.error(error);
    });
